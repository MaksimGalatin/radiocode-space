// Browser-side ID3v2.3 writer — a Uint8Array port of lib/id3.ts (which uses Node
// Buffer). Lets us tag a downloaded track ENTIRELY in the browser, so the MP3 can
// be fetched straight from R2 (free egress) and never streamed through our server
// (zero compute + zero Vercel bandwidth). Mirrors the server tags byte-for-byte.

function concat(parts: Uint8Array[]): Uint8Array {
  let len = 0;
  for (const p of parts) len += p.length;
  const out = new Uint8Array(len);
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
function latin1(s: string): Uint8Array {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) & 0xff;
  return out;
}
// UTF-16LE with BOM — matches Buffer.from(s,'utf16le') with a 0xFFFE prefix.
function utf16(s: string): Uint8Array {
  const out = new Uint8Array(2 + s.length * 2);
  out[0] = 0xff; out[1] = 0xfe;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    out[2 + i * 2] = c & 0xff;
    out[2 + i * 2 + 1] = (c >> 8) & 0xff;
  }
  return out;
}
function synchsafe(n: number): Uint8Array {
  return new Uint8Array([(n >>> 21) & 0x7f, (n >>> 14) & 0x7f, (n >>> 7) & 0x7f, n & 0x7f]);
}
function frame(id: string, data: Uint8Array): Uint8Array {
  const head = new Uint8Array(10);
  for (let i = 0; i < 4; i++) head[i] = id.charCodeAt(i) & 0xff;
  const len = data.length;
  head[4] = (len >>> 24) & 0xff; head[5] = (len >>> 16) & 0xff; head[6] = (len >>> 8) & 0xff; head[7] = len & 0xff;
  head[8] = 0; head[9] = 0;
  return concat([head, data]);
}
const EMPTY = new Uint8Array(0);
function textFrame(id: string, text: string): Uint8Array {
  if (!text) return EMPTY;
  return frame(id, concat([new Uint8Array([0x01]), utf16(text)]));
}
function urlFrame(id: string, url: string): Uint8Array {
  if (!url) return EMPTY;
  return frame(id, latin1(url));
}
function wxxxFrame(desc: string, url: string): Uint8Array {
  return frame('WXXX', concat([new Uint8Array([0x01]), utf16(desc), new Uint8Array([0x00, 0x00]), latin1(url)]));
}
function txxxFrame(desc: string, value: string): Uint8Array {
  return frame('TXXX', concat([new Uint8Array([0x01]), utf16(desc), new Uint8Array([0x00, 0x00]), utf16(value)]));
}
function commFrame(lang: string, desc: string, text: string): Uint8Array {
  return frame('COMM', concat([new Uint8Array([0x01]), latin1(lang.slice(0, 3).padEnd(3, ' ')), utf16(desc), new Uint8Array([0x00, 0x00]), utf16(text)]));
}
function usltFrame(lang: string, desc: string, text: string): Uint8Array {
  return frame('USLT', concat([new Uint8Array([0x01]), latin1(lang.slice(0, 3).padEnd(3, ' ')), utf16(desc), new Uint8Array([0x00, 0x00]), utf16(text)]));
}
function apicFrame(mime: string, picType: number, desc: string, image: Uint8Array): Uint8Array {
  return frame('APIC', concat([new Uint8Array([0x00]), latin1(mime), new Uint8Array([0x00]), new Uint8Array([picType]), latin1(desc), new Uint8Array([0x00]), image]));
}

export interface Id3Fields {
  title: string; artist: string; album: string; albumArtist?: string; composer?: string;
  year?: string; genre?: string; publisher?: string; copyright?: string; encodedBy?: string; comment?: string;
  urls?: Array<{ id: 'WOAR' | 'WORS' | 'WPUB' | 'WCOM'; url: string }>;
  userUrls?: Array<{ desc: string; url: string }>;
  userText?: Array<{ desc: string; value: string }>;
  lyrics?: Array<{ lang: string; desc: string; text: string }>;
  cover?: { mime: string; data: Uint8Array } | null;
}

export function buildId3v23(f: Id3Fields): Uint8Array {
  const parts: Uint8Array[] = [
    textFrame('TIT2', f.title), textFrame('TPE1', f.artist), textFrame('TPE2', f.albumArtist || f.artist),
    textFrame('TCOM', f.composer || f.artist), textFrame('TALB', f.album), textFrame('TYER', f.year || ''),
    textFrame('TCON', f.genre || ''), textFrame('TPUB', f.publisher || ''), textFrame('TCOP', f.copyright || ''),
    textFrame('TENC', f.encodedBy || ''),
  ];
  if (f.comment) parts.push(commFrame('eng', 'RadioCode.Space', f.comment));
  for (const u of f.urls || []) parts.push(urlFrame(u.id, u.url));
  for (const u of f.userUrls || []) parts.push(wxxxFrame(u.desc, u.url));
  for (const t of f.userText || []) parts.push(txxxFrame(t.desc, t.value));
  for (const l of f.lyrics || []) parts.push(usltFrame(l.lang, l.desc, l.text));
  if (f.cover && f.cover.data && f.cover.data.length) parts.push(apicFrame(f.cover.mime, 0x03, 'RadioCode.Space', f.cover.data));
  const body = concat(parts.filter((b) => b.length > 0));
  const header = concat([latin1('ID3'), new Uint8Array([0x03, 0x00]), new Uint8Array([0x00]), synchsafe(body.length)]);
  return concat([header, body]);
}

export function stripExistingTags(buf: Uint8Array): Uint8Array {
  let start = 0, end = buf.length;
  if (buf.length > 10 && buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) { // 'ID3'
    const size = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f);
    const hasFooter = (buf[5] & 0x10) !== 0;
    start = 10 + size + (hasFooter ? 10 : 0);
  }
  if (end - start > 128 && buf[end - 128] === 0x54 && buf[end - 127] === 0x41 && buf[end - 126] === 0x47) end -= 128; // 'TAG'
  return buf.subarray(start, end);
}
