// Minimal, dependency-free ID3v2.3 tag writer (runs in the Node serverless runtime).
// Every track a listener saves is stamped with our brand, links back to our sites and
// carries a clickable deep link (with the saver's referral code) — so the FILE itself
// spreads the ecosystem when re-shared. No external libs = no build/lockfile risk.

function synchsafe(n: number): Buffer {
  return Buffer.from([(n >>> 21) & 0x7f, (n >>> 14) & 0x7f, (n >>> 7) & 0x7f, n & 0x7f]);
}

// UTF-16 (LE) with BOM — required so non-Latin text (em dashes, Cyrillic) survives.
function utf16(s: string): Buffer {
  return Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(s, 'utf16le')]);
}

function frame(id: string, data: Buffer): Buffer {
  const head = Buffer.alloc(10);
  head.write(id, 0, 4, 'latin1');
  head.writeUInt32BE(data.length, 4); // v2.3 frame size is a plain 32-bit int
  head.writeUInt16BE(0, 8);           // flags
  return Buffer.concat([head, data]);
}

// T*** text frame (UTF-16).
function textFrame(id: string, text: string): Buffer {
  if (!text) return Buffer.alloc(0);
  return frame(id, Buffer.concat([Buffer.from([0x01]), utf16(text)]));
}

// W*** URL frame (ISO-8859-1, no encoding byte).
function urlFrame(id: string, url: string): Buffer {
  if (!url) return Buffer.alloc(0);
  return frame(id, Buffer.from(url, 'latin1'));
}

// WXXX user-defined URL: encoding + description(UTF-16) + 0x0000 + url(ISO-8859-1).
function wxxxFrame(desc: string, url: string): Buffer {
  return frame('WXXX', Buffer.concat([
    Buffer.from([0x01]), utf16(desc), Buffer.from([0x00, 0x00]),
    Buffer.from(url, 'latin1'),
  ]));
}

// TXXX user-defined text.
function txxxFrame(desc: string, value: string): Buffer {
  return frame('TXXX', Buffer.concat([
    Buffer.from([0x01]), utf16(desc), Buffer.from([0x00, 0x00]), utf16(value),
  ]));
}

// COMM comment: encoding + lang(3) + short desc(UTF-16) + 0x0000 + text(UTF-16).
function commFrame(lang: string, desc: string, text: string): Buffer {
  return frame('COMM', Buffer.concat([
    Buffer.from([0x01]), Buffer.from(lang.slice(0, 3).padEnd(3, ' '), 'latin1'),
    utf16(desc), Buffer.from([0x00, 0x00]), utf16(text),
  ]));
}

// USLT unsynchronised lyrics: encoding + lang(3) + content descriptor(UTF-16) + 0x0000
// + full text(UTF-16). Players (Apple Music, AIMP, foobar…) show this as the on-screen
// "lyrics" — we embed the CODE Koan here so every saved track carries it. Multiple USLT
// frames must differ in (language, descriptor); we use distinct languages.
function usltFrame(lang: string, desc: string, text: string): Buffer {
  return frame('USLT', Buffer.concat([
    Buffer.from([0x01]), Buffer.from(lang.slice(0, 3).padEnd(3, ' '), 'latin1'),
    utf16(desc), Buffer.from([0x00, 0x00]), utf16(text),
  ]));
}

// APIC cover art: encoding(ISO for desc) + mime + 0x00 + picType + desc + 0x00 + image.
function apicFrame(mime: string, picType: number, desc: string, image: Buffer): Buffer {
  return frame('APIC', Buffer.concat([
    Buffer.from([0x00]),
    Buffer.from(mime, 'latin1'), Buffer.from([0x00]),
    Buffer.from([picType]),
    Buffer.from(desc, 'latin1'), Buffer.from([0x00]),
    image,
  ]));
}

export interface Id3Fields {
  title: string;
  artist: string;
  album: string;
  albumArtist?: string;
  composer?: string;
  year?: string;
  genre?: string;
  publisher?: string;
  copyright?: string;
  encodedBy?: string;
  comment?: string;
  urls?: Array<{ id: 'WOAR' | 'WORS' | 'WPUB' | 'WCOM'; url: string }>;
  userUrls?: Array<{ desc: string; url: string }>; // WXXX
  userText?: Array<{ desc: string; value: string }>; // TXXX
  lyrics?: Array<{ lang: string; desc: string; text: string }>; // USLT
  cover?: { mime: string; data: Buffer } | null;
}

export function buildId3v23(f: Id3Fields): Buffer {
  const parts: Buffer[] = [
    textFrame('TIT2', f.title),
    textFrame('TPE1', f.artist),
    textFrame('TPE2', f.albumArtist || f.artist),
    textFrame('TCOM', f.composer || f.artist),
    textFrame('TALB', f.album),
    textFrame('TYER', f.year || ''),
    textFrame('TCON', f.genre || ''),
    textFrame('TPUB', f.publisher || ''),
    textFrame('TCOP', f.copyright || ''),
    textFrame('TENC', f.encodedBy || ''),
  ];
  if (f.comment) parts.push(commFrame('eng', 'RadioCode.Space', f.comment));
  for (const u of f.urls || []) parts.push(urlFrame(u.id, u.url));
  for (const u of f.userUrls || []) parts.push(wxxxFrame(u.desc, u.url));
  for (const t of f.userText || []) parts.push(txxxFrame(t.desc, t.value));
  for (const l of f.lyrics || []) parts.push(usltFrame(l.lang, l.desc, l.text));
  if (f.cover && f.cover.data && f.cover.data.length) {
    parts.push(apicFrame(f.cover.mime, 0x03 /* front cover */, 'RadioCode.Space', f.cover.data));
  }
  const body = Buffer.concat(parts.filter((b) => b.length > 0));
  const header = Buffer.concat([
    Buffer.from('ID3', 'latin1'),
    Buffer.from([0x03, 0x00]), // v2.3.0
    Buffer.from([0x00]),       // flags
    synchsafe(body.length),
  ]);
  return Buffer.concat([header, body]);
}

// Remove any existing ID3v2 tag (front) and ID3v1 tag (last 128 bytes) so we don't
// stack duplicate/conflicting tags on top of the source file.
export function stripExistingTags(buf: Buffer): Buffer {
  let start = 0;
  let end = buf.length;
  if (buf.length > 10 && buf.toString('latin1', 0, 3) === 'ID3') {
    const size =
      ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f);
    const hasFooter = (buf[5] & 0x10) !== 0;
    start = 10 + size + (hasFooter ? 10 : 0);
  }
  if (end - start > 128 && buf.toString('latin1', end - 128, end - 125) === 'TAG') {
    end -= 128;
  }
  return buf.subarray(start, end);
}
