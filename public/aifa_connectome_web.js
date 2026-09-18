/**
 * AIfa Connectome Index (ACI) - Web & Node.js Zero-Dependency Engine
 * 
 * Drosophila Connectome Bio-Vector search in pure JavaScript / TypedArrays.
 * Enables instant client-side semantic retrieval (< 1 ms) directly in the browser
 * without hitting any server or consuming backend GPU/RAM.
 * 
 * Compatible with aifa.works and radio.aifa.works.
 */

class SplitMix32 {
  constructor(seed) {
    this.state = seed | 0;
  }
  next() {
    this.state = (this.state + 0x9E3779B9) | 0;
    let z = this.state;
    z = Math.imul(z ^ (z >>> 16), 0x85EBCA6B);
    z = Math.imul(z ^ (z >>> 13), 0xC2B2AE35);
    return ((z ^ (z >>> 16)) >>> 0) / 4294967296.0;
  }
  nextInt(max) {
    return Math.floor(this.next() * max);
  }
}

export class AIfaConnectomeWeb {
  constructor(vocabSize = 8192, kcCells = 16384, sparsityTarget = 0.035, seed = 20260917) {
    this.vocabSize = vocabSize;
    this.kcCells = kcCells;
    this.targetActive = Math.max(16, Math.floor(kcCells * sparsityTarget));
    this.seed = seed;
    
    // Inverted posting lists: Array of Uint32Array
    this.postings = new Array(kcCells);
    for (let i = 0; i < kcCells; i++) this.postings[i] = new Uint32Array(0);
    this.documents = [];
    this.projectionW = null; // sparse col-pointer, rows
    this.initProjection();
  }

  initProjection() {
    const rng = new SplitMix32(this.seed);
    // Connectome Claw Distribution: median ~ 7 inputs
    this.kcInputs = new Array(this.kcCells);
    for (let kc = 0; kc < this.kcCells; kc++) {
      // Approximate lognormal degree ~ 4 to 16
      const u = Math.max(0.001, rng.next());
      const v = Math.max(0.001, rng.next());
      const z0 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      const degree = Math.min(24, Math.max(3, Math.round(Math.exp(2.0 + 0.35 * z0))));
      
      const inputs = new Set();
      while (inputs.size < Math.min(degree, this.vocabSize)) {
        inputs.add(rng.nextInt(this.vocabSize));
      }
      this.kcInputs[kc] = Array.from(inputs);
    }
  }

  tokenize(text) {
    if (!text) return [];
    const t = text.toLowerCase();
    const words = t.match(/[a-zа-яё0-9_\-\.]{2,28}/g) || [];
    const tokens = [...words];
    for (let w of words) {
      if (w.length >= 4 && !/^\d+$/.test(w)) {
        for (let i = 0; i < w.length - 2; i++) {
          tokens.push('~' + w.slice(i, i + 3));
        }
      }
    }
    return tokens;
  }

  fnv1a(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h;
  }

  computeHash(tokens) {
    // 1. Project tokens to features
    const counts = new Map();
    for (let tok of tokens) {
      counts.set(tok, (counts.get(tok) || 0) + 1);
    }
    const feat = new Map();
    let normSq = 0.0;
    for (let [tok, c] of counts.entries()) {
      const col = this.fnv1a(tok) % this.vocabSize;
      const w = 1.0 + Math.log(c);
      const cur = (feat.get(col) || 0) + w;
      feat.set(col, cur);
    }
    for (let val of feat.values()) {
      normSq += val * val;
    }
    const norm = Math.sqrt(normSq);
    if (norm > 0) {
      for (let [col, val] of feat.entries()) {
        feat.set(col, val / norm);
      }
    }

    // 2. Kenyon Cell activations
    const activations = new Float32Array(this.kcCells);
    for (let kc = 0; kc < this.kcCells; kc++) {
      let sum = 0.0;
      const inputs = this.kcInputs[kc];
      for (let s of inputs) {
        if (feat.has(s)) sum += feat.get(s);
      }
      activations[kc] = sum;
    }

    // 3. APL Dynamic Homeostatic Inhibition (Top targetActive)
    const active = [];
    for (let kc = 0; kc < this.kcCells; kc++) {
      if (activations[kc] > 0) {
        active.push({ kc, act: activations[kc] });
      }
    }
    active.sort((a, b) => b.act - a.act);
    const top = active.slice(0, this.targetActive).map(x => x.kc);
    return new Uint32Array(top);
  }

  search(queryText, topK = 10) {
    const tokens = this.tokenize(queryText);
    const qActive = this.computeHash(tokens);
    if (qActive.length === 0 || this.documents.length === 0) return [];

    const N = this.documents.length;
    const counts = new Uint16Array(N);

    // Inverted posting accumulation
    for (let i = 0; i < qActive.length; i++) {
      const kc = qActive[i];
      const pl = this.postings[kc];
      if (pl && pl.length > 0) {
        for (let j = 0; j < pl.length; j++) {
          counts[pl[j]]++;
        }
      }
    }

    const candidates = [];
    for (let docId = 0; docId < N; docId++) {
      const c = counts[docId];
      if (c > 0) {
        const docKcs = this.documents[docId].active_kc_count || 300;
        const union = qActive.length + docKcs - c;
        const jaccard = c / Math.max(1, union);
        candidates.push({
          doc_id: docId,
          score: jaccard,
          overlap_bits: c,
          external_id: this.documents[docId].external_id,
          snippet: this.documents[docId].snippet,
          metadata: this.documents[docId].metadata
        });
      }
    }

    candidates.sort((a, b) => b.score - a.score);
    return candidates.slice(0, topK);
  }

  /**
   * Loads index from an ArrayBuffer (.aci binary file)
   */
  loadBinary(arrayBuffer) {
    const view = new DataView(arrayBuffer);
    const magic = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
    if (magic !== 'ACIF') {
      throw new Error(`Invalid ACI Magic: ${magic}`);
    }
    this.vocabSize = view.getUint32(8, true);
    this.kcCells = view.getUint32(12, true);
    // uint64 seed:
    const seedLow = view.getUint32(16, true);
    this.seed = seedLow;
    const nDocs = view.getUint32(24, true);

    this.initProjection();

    // Read offset table: m * 8 bytes
    let curPtr = 28;
    const offsets = [];
    for (let i = 0; i < this.kcCells; i++) {
      const off = view.getUint32(curPtr, true);
      const cnt = view.getUint32(curPtr + 4, true);
      offsets.push([off, cnt]);
      curPtr += 8;
    }

    const postingsStart = curPtr;
    let totalEntries = 0;
    for (let [off, cnt] of offsets) totalEntries += cnt;
    const postingsBytes = totalEntries * 4;

    this.postings = new Array(this.kcCells);
    for (let i = 0; i < this.kcCells; i++) {
      const [offBytes, cnt] = offsets[i];
      if (cnt === 0) {
        this.postings[i] = new Uint32Array(0);
      } else {
        const byteOffset = postingsStart + offBytes;
        this.postings[i] = new Uint32Array(arrayBuffer, byteOffset, cnt);
      }
    }

    const metaLenPtr = postingsStart + postingsBytes;
    if (metaLenPtr < arrayBuffer.byteLength) {
      const metaLen = view.getUint32(metaLenPtr, true);
      const dec = new TextDecoder('utf-8');
      const jsonBytes = new Uint8Array(arrayBuffer, metaLenPtr + 4, metaLen);
      const metaJson = dec.decode(jsonBytes);
      this.documents = JSON.parse(metaJson);
    } else {
      this.documents = [];
    }
    return this;
  }
}

if (typeof window !== 'undefined') {
  window.AIfaConnectomeWeb = AIfaConnectomeWeb;
}
