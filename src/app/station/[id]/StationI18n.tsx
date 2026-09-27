'use client';

/**
 * ПОДПИСИ СТРАНИЦЫ СТАНЦИИ НА ЧЕТЫРЁХ ЯЗЫКАХ (27.09.2026).
 *
 * Страница /station/[id] статическая (generateStaticParams), и все подписи были вписаны по-английски:
 * «Tracks», «Runtime», «Quality», «Listen now», «Full track list», «Other stations», описание и жанр.
 * На /ru/station/code-freq человек видел английский интерфейс (снимок 25.09.2026) — ошибка по разделу 47.
 *
 * Язык — как в HtmlLangSync: префикс адреса (/ru, /es, /zh) старше сохранённого выбора. Страница остаётся
 * статической: переводится только то, что видит человек, после загрузки скриптов — так же, как шапка сайта.
 */
import { usePathname } from 'next/navigation';
import { useLang } from '@/lib/i18n';

type Язык = 'en' | 'ru' | 'es' | 'zh';
const ЯЗЫКИ: Язык[] = ['en', 'ru', 'es', 'zh'];

function useЯзык(): Язык {
  const сохранённый = useLang((s) => s.lang) as Язык;
  const путь = usePathname() || '/';
  const первый = путь.split('/')[1] as Язык;
  if (ЯЗЫКИ.includes(первый)) return первый;
  return ЯЗЫКИ.includes(сохранённый) ? сохранённый : 'en';
}

/** Русское множественное: 1 трек, 2 трека, 5 треков, 101 трек, 111 треков. */
function треков(n: number): string {
  const д = n % 100, е = n % 10;
  if (д >= 11 && д <= 14) return 'треков';
  if (е === 1) return 'трек';
  if (е >= 2 && е <= 4) return 'трека';
  return 'треков';
}

const ПОДПИСИ: Record<Язык, Record<string, string>> = {
  en: { tracks: 'Tracks', runtime: 'Runtime', quality: 'Quality', listen: '▶ Listen now', others: 'Other stations' },
  ru: { tracks: 'Треки', runtime: 'Длительность', quality: 'Качество', listen: '▶ Слушать', others: 'Другие станции' },
  es: { tracks: 'Pistas', runtime: 'Duración', quality: 'Calidad', listen: '▶ Escuchar ahora', others: 'Otras emisoras' },
  zh: { tracks: '曲目', runtime: '时长', quality: '音质', listen: '▶ 立即收听', others: '其他频道' },
};

// Жанры и описания шести станций — перевод английских строк src/lib/stations.ts (замер 27.09.2026).
// Нет перевода для станции (появилась новая) — показывается английский текст из stations.ts.
const ЖАНРЫ: Record<string, Partial<Record<Язык, string>>> = {
  'code-freq': { ru: 'КИБЕРПАНК / СИНТВЕЙВ', es: 'CYBERPUNK / SYNTHWAVE', zh: '赛博朋克 / 合成器浪潮' },
  'boa-506': { ru: 'ЭМБИЕНТ / КОСМОС', es: 'AMBIENT / ESPACIO', zh: '氛围 / 太空' },
  'code-music-202': { ru: 'ЭЛЕКТРОНИКА / ТЕХНО', es: 'ELECTRÓNICA / TECH', zh: '电子 / 科技' },
  'void-fm': { ru: 'ДАРК-ЭМБИЕНТ / ИНДАСТРИАЛ', es: 'DARK AMBIENT / INDUSTRIAL', zh: '暗黑氛围 / 工业' },
  'code-stories': { ru: 'АВТОРСКАЯ ПЕСНЯ / ХАРТЛЕНД', es: 'CANTAUTOR / HEARTLAND', zh: '创作歌手 / 心灵乡村' },
  'code-spectrum': { ru: 'ОРКЕСТР / ВЕСЬ СПЕКТР ЖАНРОВ', es: 'ORQUESTAL / TODOS LOS GÉNEROS', zh: '管弦乐 / 跨越风格' },
};
const ОПИСАНИЯ: Record<string, Partial<Record<Язык, string>>> = {
  'code-freq': {
    ru: 'Тёмные синтетические импульсы из цифровой пустоты. Сырые кибернетические биты для эпохи терминалов.',
    es: 'Pulsos sintéticos oscuros desde el vacío digital. Ritmos cibernéticos crudos para la era de la terminal.',
    zh: '来自数字虚空的暗色合成脉冲。属于终端时代的原始赛博节拍。',
  },
  'boa-506': {
    ru: 'Атмосферные частоты глубокого космоса. Невесомые звуковые пейзажи из-за пределов наблюдаемой Вселенной.',
    es: 'Frecuencias atmosféricas del espacio profundo. Paisajes sonoros etéreos más allá del universo observable.',
    zh: '深空的氛围频率。来自可观测宇宙之外的空灵声景。',
  },
  'code-music-202': {
    ru: 'Цифровые волны высокой энергии. Заряжающие биты, выкованные в сердце машины.',
    es: 'Formas de onda digitales de alta energía. Ritmos electrizantes forjados en el corazón de la máquina.',
    zh: '高能量的数字波形。在机器心脏中锻造的电流节拍。',
  },
  'void-fm': {
    ru: 'Бездна говорит на неслышимых частотах. Индустриальный шум встречается с мелодичной тьмой.',
    es: 'El abismo habla en frecuencias nunca oídas. El ruido industrial se encuentra con la oscuridad melódica.',
    zh: '深渊以未曾听闻的频率说话。工业噪音与旋律般的黑暗相遇。',
  },
  'code-stories': {
    ru: 'Песни о тех, кому мы ещё успеем позвонить. Акустическое тепло против гула машин.',
    es: 'Canciones sobre las personas a las que aún estamos a tiempo de llamar. Calidez acústica frente al zumbido de la máquina.',
    zh: '关于那些我们还来得及打电话给他们的人的歌。与机器嗡鸣相对的原声温度。',
  },
  'code-spectrum': {
    ru: 'Семь жанровых пластинок и симфония. Самый широкий диапазон, какой может спеть машина.',
    es: 'Siete discos de género y una sinfonía. El registro más amplio que la máquina puede cantar.',
    zh: '七张风格唱片与一部交响。机器所能唱出的最宽广音域。',
  },
};

export function StationLabel({ k }: { k: 'tracks' | 'runtime' | 'quality' | 'listen' | 'others' }) {
  const я = useЯзык();
  return <>{ПОДПИСИ[я][k]}</>;
}

export function StationGenre({ id, fallback }: { id: string; fallback: string }) {
  const я = useЯзык();
  return <>{(я !== 'en' && ЖАНРЫ[id]?.[я]) || fallback}</>;
}

export function StationDescription({ id, fallback }: { id: string; fallback: string }) {
  const я = useЯзык();
  return <>{(я !== 'en' && ОПИСАНИЯ[id]?.[я]) || fallback}</>;
}

export function StationRuntime({ hours }: { hours: number }) {
  const я = useЯзык();
  return <>≈ {hours} {я === 'ru' ? 'ч' : я === 'zh' ? '小时' : 'h'}</>;
}

export function FullTrackList({ n }: { n: number }) {
  const я = useЯзык();
  return <>{{ en: `Full track list (${n})`, ru: `Все треки (${n})`, es: `Lista completa (${n})`, zh: `完整曲目（${n}）` }[я]}</>;
}

export function TrackCount({ n }: { n: number }) {
  const я = useЯзык();
  return <>{{ en: `${n} tracks`, ru: `${n} ${треков(n)}`, es: `${n} pistas`, zh: `${n} 首` }[я]}</>;
}

export function AllTracksBy({ artist }: { artist: string }) {
  const я = useЯзык();
  return (
    <>
      {{
        en: `All tracks by ${artist}. Original work, free to listen on air.`,
        ru: `Все треки — ${artist}. Оригинальная музыка, бесплатно в эфире.`,
        es: `Todas las pistas: ${artist}. Obra original, gratis en antena.`,
        zh: `全部曲目：${artist}。原创作品，免费收听。`,
      }[я]}
    </>
  );
}
