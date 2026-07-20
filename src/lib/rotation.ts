// Composition-aware playlist rotation for RadioCode.Space
//
// Rules (per Architect):
//  - Every version file (-v1, -v2, ...) is a distinct musical work and MUST be kept.
//  - A second version of a composition must NOT play until every OTHER composition
//    of the station has been played once (epoch model).
//  - Applies to sequential rotation AND to the shuffle/randomizer.
//  - Versions of one composition cycle round-robin (not a predictable v1->v2->v3).
//  - State survives page reload via localStorage.
//
// Type-only import (erased at runtime) so this module can run under Node's
// native type-stripping for the autotest without any framework dependency.
import type { Track, Station } from './stations';

export const ROTATION_VERSION = 1;

/** Normalise a track URL/filename to its composition id (strip index prefix + version suffix). */
export function compositionIdFromPath(path: string): string {
  const file = (path.split('/').pop() || path).replace(/\.mp3$/i, '');
  return file
    .replace(/^\d+[-_]/, '')              // "3-brother"            -> "brother"
    .replace(/-opus-4-8(?=-v\d+|$)/, '')  // model marker: "...-opus-4-8-v1" -> "...-v1"
    .replace(/-v\d+(?:-\d+)?$/, '');      // "-v10", "-v3-2"        -> ""
}

export interface RotationStorage {
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
}

interface PersistShape {
  v: number;
  shuffled: boolean;
  queue: string[];
  variantCursor: Record<string, number>;
  lastEpochTail: string[];
  historyIds: string[];
  pointer: number;
}

function shuffleInPlace<T>(arr: T[], rng: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const HISTORY_CAP = 400;

export class StationRotation {
  readonly stationId: string;
  private compositions: string[] = [];
  private byComposition = new Map<string, Track[]>();
  private byId = new Map<string, Track>();
  private variantCursor = new Map<string, number>();
  private queue: string[] = [];
  private lastEpochTail: string[] = [];
  private history: Track[] = [];
  private pointer = -1;
  private shuffled = false;
  private storage?: RotationStorage;
  private rng: () => number;

  constructor(
    station: Station,
    opts?: { storage?: RotationStorage; rng?: () => number; shuffled?: boolean }
  ) {
    this.stationId = station.id;
    this.storage = opts?.storage;
    this.rng = opts?.rng ?? Math.random;
    this.shuffled = opts?.shuffled ?? false;

    // Build composition groups in first-seen (station array) order.
    for (const t of station.tracks) {
      const comp = compositionIdFromPath(t.url);
      if (!this.byComposition.has(comp)) {
        this.byComposition.set(comp, []);
        this.compositions.push(comp);
      }
      this.byComposition.get(comp)!.push(t);
      this.byId.set(t.id, t);
    }
    // Randomise the version order inside each composition once, so it is not v1->v2->v3.
    for (const list of this.byComposition.values()) shuffleInPlace(list, this.rng);

    if (!this.load()) {
      this.queue = [];
      this.history = [];
      this.pointer = -1;
    }
  }

  get compositionCount(): number {
    return this.compositions.length;
  }
  private get H(): number {
    return Math.floor(this.compositions.length / 2);
  }

  /** Current track (or first generated one). */
  start(): Track {
    if (this.pointer >= 0 && this.pointer < this.history.length) {
      return this.history[this.pointer];
    }
    return this.next();
  }

  next(): Track {
    // Replaying forward through recorded history (after a "prev").
    if (this.pointer < this.history.length - 1) {
      this.pointer++;
      this.persist();
      return this.history[this.pointer];
    }
    const t = this.generateNext();
    this.history.push(t);
    this.pointer = this.history.length - 1;
    this.trim();
    this.persist();
    return t;
  }

  prev(): Track | null {
    if (this.pointer > 0) {
      this.pointer--;
      this.persist();
      return this.history[this.pointer];
    }
    return this.history[this.pointer] ?? null;
  }

  /** User explicitly jumped to a specific track — register it as the new "now". */
  consume(track: Track): void {
    this.history = this.history.slice(0, this.pointer + 1);
    const comp = compositionIdFromPath(track.url);
    const qi = this.queue.indexOf(comp);
    if (qi >= 0) this.queue.splice(qi, 1);
    const variants = this.byComposition.get(comp);
    if (variants) {
      const vi = variants.findIndex((t) => t.id === track.id);
      if (vi >= 0) this.variantCursor.set(comp, (vi + 1) % variants.length);
    }
    this.history.push(track);
    this.pointer = this.history.length - 1;
    this.trim();
    this.persist();
  }

  setShuffled(s: boolean): void {
    if (s === this.shuffled) return;
    this.shuffled = s;
    // Rebuild the remaining epoch in the new mode; keep cursors + history.
    this.lastEpochTail = this.recentComps(this.H);
    this.buildEpoch();
    this.persist();
  }

  isShuffled(): boolean {
    return this.shuffled;
  }

  // ── internals ──────────────────────────────────────────────────────────────

  private generateNext(): Track {
    if (this.queue.length === 0) {
      this.lastEpochTail = this.recentComps(this.H);
      this.buildEpoch();
    }
    const comp = this.queue.shift()!;
    const variants = this.byComposition.get(comp)!;
    const cur = this.variantCursor.get(comp) ?? 0;
    const track = variants[cur % variants.length];
    this.variantCursor.set(comp, (cur + 1) % variants.length);
    return track;
  }

  private buildEpoch(): void {
    let order = [...this.compositions];
    if (this.shuffled) {
      shuffleInPlace(order, this.rng);
      order = this.enforceBoundary(order);
    }
    this.queue = order;
  }

  /** No composition from the previous epoch's tail (H) may sit in the new epoch's first H slots. */
  private enforceBoundary(order: string[]): string[] {
    const H = this.H;
    if (H <= 0 || this.lastEpochTail.length === 0 || this.compositions.length <= 2) return order;
    const tail = new Set(this.lastEpochTail);
    for (let i = 0; i < H && i < order.length; i++) {
      if (tail.has(order[i])) {
        for (let j = Math.max(i + 1, H); j < order.length; j++) {
          if (!tail.has(order[j])) {
            [order[i], order[j]] = [order[j], order[i]];
            break;
          }
        }
      }
    }
    return order;
  }

  private recentComps(h: number): string[] {
    const out: string[] = [];
    for (let i = this.pointer; i >= 0 && out.length < h; i--) {
      const c = compositionIdFromPath(this.history[i].url);
      if (!out.includes(c)) out.push(c);
    }
    return out;
  }

  private trim(): void {
    if (this.history.length > HISTORY_CAP) {
      const drop = this.history.length - HISTORY_CAP;
      this.history = this.history.slice(drop);
      this.pointer -= drop;
      if (this.pointer < 0) this.pointer = 0;
    }
  }

  private key(): string {
    return `radiocode:rotation:v${ROTATION_VERSION}:${this.stationId}`;
  }

  private persist(): void {
    if (!this.storage) return;
    try {
      const data: PersistShape = {
        v: ROTATION_VERSION,
        shuffled: this.shuffled,
        queue: this.queue,
        variantCursor: Object.fromEntries(this.variantCursor),
        lastEpochTail: this.lastEpochTail,
        historyIds: this.history.map((t) => t.id),
        pointer: this.pointer,
      };
      this.storage.setItem(this.key(), JSON.stringify(data));
    } catch {
      /* storage full / unavailable — ignore */
    }
  }

  private load(): boolean {
    if (!this.storage) return false;
    try {
      const raw = this.storage.getItem(this.key());
      if (!raw) return false;
      const data = JSON.parse(raw) as PersistShape;
      if (!data || data.v !== ROTATION_VERSION) return false;
      const history = (data.historyIds || []).map((id) => this.byId.get(id)).filter(Boolean) as Track[];
      // Only accept queue comps that still exist.
      const valid = new Set(this.compositions);
      this.queue = (data.queue || []).filter((c) => valid.has(c));
      this.variantCursor = new Map(
        Object.entries(data.variantCursor || {}).filter(([c]) => valid.has(c))
      );
      this.lastEpochTail = (data.lastEpochTail || []).filter((c) => valid.has(c));
      this.history = history;
      this.pointer = Math.min(
        typeof data.pointer === 'number' ? data.pointer : history.length - 1,
        history.length - 1
      );
      this.shuffled = !!data.shuffled;
      return this.history.length > 0;
    } catch {
      return false;
    }
  }
}
