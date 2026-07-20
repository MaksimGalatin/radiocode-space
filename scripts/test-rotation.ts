// Autotest for the composition-aware rotation engine.
// Run: node --experimental-strip-types scripts/test-rotation.ts
import { stations } from '../src/lib/stations.ts';
import { StationRotation, compositionIdFromPath } from '../src/lib/rotation.ts';

class MemStorage {
  private m = new Map<string, string>();
  getItem(k: string) {
    return this.m.has(k) ? this.m.get(k)! : null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
}

const ITERS = 5000;
const AVG_SEC = 255; // 4:15
let failures = 0;
const rows: string[] = [];

function fail(msg: string) {
  failures++;
  console.log('  ❌ ' + msg);
}

for (const st of stations) {
  const N = new Set(st.tracks.map((t) => compositionIdFromPath(t.url))).size;
  const H = Math.floor(N / 2);
  const rot = new StationRotation(st, { storage: new MemStorage(), shuffled: true });

  const comps: string[] = [];
  const tracks: string[] = [];
  for (let i = 0; i < ITERS; i++) {
    const t = rot.next();
    tracks.push(t.id);
    comps.push(compositionIdFromPath(t.url));
  }

  // Check 1: within every epoch (N picks) no composition repeats.
  let epochRepeat = false;
  for (let e = 0; e + N <= comps.length; e += N) {
    const seen = new Set<string>();
    for (let i = e; i < e + N; i++) {
      if (seen.has(comps[i])) {
        epochRepeat = true;
        break;
      }
      seen.add(comps[i]);
    }
    if (epochRepeat) break;
  }
  if (epochRepeat) fail(`${st.name}: composition repeated within an epoch`);

  // Check 2: min gap between two plays of the same composition >= floor(N/2).
  const lastIdx = new Map<string, number>();
  let minGap = Infinity;
  for (let i = 0; i < comps.length; i++) {
    const c = comps[i];
    if (lastIdx.has(c)) {
      const gap = i - lastIdx.get(c)! - 1; // compositions strictly between
      if (gap < minGap) minGap = gap;
    }
    lastIdx.set(c, i);
  }
  if (N > 2 && minGap < H) fail(`${st.name}: min gap ${minGap} < floor(N/2)=${H}`);

  // Check 3: over maxVariants epochs every (composition, version) played at least once.
  const maxVariants = Math.max(...[...new Map<string, number>(
    st.tracks.reduce((acc, t) => {
      const c = compositionIdFromPath(t.url);
      acc.set(c, (acc.get(c) || 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).values()]);
  const window = tracks.slice(0, maxVariants * N);
  const distinctTracks = new Set(window).size;
  if (distinctTracks < st.tracks.length) {
    fail(`${st.name}: only ${distinctTracks}/${st.tracks.length} versions seen in ${maxVariants} epochs`);
  }

  // Check 4: epoch start composition is not deterministic.
  const firsts = new Set<string>();
  for (let k = 0; k < 100; k++) {
    const r = new StationRotation(st, { storage: new MemStorage(), shuffled: true });
    firsts.add(compositionIdFromPath(r.next().url));
  }
  if (N > 1 && firsts.size < 2) fail(`${st.name}: deterministic epoch start (${firsts.size})`);

  // Check 5: state restores from storage mid-epoch and preserves the gap invariant
  // across the reload boundary (a comp played just before reload must not reappear
  // within H picks after reload).
  const store = new MemStorage();
  const rotA = new StationRotation(st, { storage: store, shuffled: true });
  const seq: string[] = [];
  const steps = Math.floor(N * 1.5); // mid second epoch
  for (let i = 0; i < steps; i++) seq.push(compositionIdFromPath(rotA.next().url));
  const rotB = new StationRotation(st, { storage: store, shuffled: true }); // reload
  for (let i = 0; i < N; i++) seq.push(compositionIdFromPath(rotB.next().url));
  const last = new Map<string, number>();
  let reloadMinGap = Infinity;
  for (let i = 0; i < seq.length; i++) {
    if (last.has(seq[i])) reloadMinGap = Math.min(reloadMinGap, i - last.get(seq[i])! - 1);
    last.set(seq[i], i);
  }
  if (N > 2 && reloadMinGap < H) {
    fail(`${st.name}: gap ${reloadMinGap} < ${H} across reload boundary`);
  }

  const epochHours = ((N * AVG_SEC) / 3600).toFixed(1);
  rows.push(
    `  ${st.name.padEnd(28)} N=${String(N).padStart(3)}  H=${String(H).padStart(3)}  ` +
      `minGap=${minGap === Infinity ? '-' : minGap}  versions=${st.tracks.length}  ` +
      `epoch=${N} tracks (~${epochHours} h)`
  );
}

console.log('\n=== RadioCode rotation autotest (' + ITERS + ' iters/station) ===');
for (const r of rows) console.log(r);
console.log(failures === 0 ? '\n✅ ALL CHECKS PASSED' : `\n❌ ${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
