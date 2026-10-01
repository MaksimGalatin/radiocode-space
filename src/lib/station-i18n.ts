// Описания и жанры станций на 4 языках — данные без 'use client' (01.10.2026).
// Вынесены из radioI18n.ts, потому что тот модуль клиентский, а каталог /music —
// серверная страница: из клиентского модуля сервер получает не объект, а ссылку.
// radioI18n.ts импортирует отсюда же, так что источник один.

export type L = 'en' | 'ru' | 'es' | 'zh';

// ── Localised station copy ──────────────────────────────────────────────────
// stations.ts keeps English `description`/`genre` (station NAMES stay as brand
// names). This lookup, keyed by station.id, supplies natural translations for
// the description + genre that render on the cards / playlist without bloating
// the big stations.ts data file. Genre strings are in display case; the card
// applies `uppercase` via CSS, matching the original look for EN/RU.
export type LocalizedText = Record<L, string>;
export const STATION_I18N: Record<string, { description: LocalizedText; genre: LocalizedText }> = {
  'code-freq': {
    description: {
      en: 'Dark synthetic pulses from the digital void. Raw cybernetic beats for the terminal age.',
      ru: 'Тёмные синтетические импульсы из цифровой пустоты. Сырые кибернетические биты для эпохи терминала.',
      es: 'Pulsos sintéticos oscuros del vacío digital. Ritmos cibernéticos crudos para la era del terminal.',
      zh: '来自数字虚空的暗黑合成脉冲。为终端时代打造的原始赛博节拍。',
    },
    genre: { en: 'Cyberpunk / Synthwave', ru: 'Киберпанк / Синтвейв', es: 'Cyberpunk / Synthwave', zh: '赛博朋克 / 合成波' },
  },
  'boa-506': {
    description: {
      en: 'Atmospheric deep space frequencies. Ethereal soundscapes from beyond the observable universe.',
      ru: 'Атмосферные частоты глубокого космоса. Эфирные звуковые ландшафты из-за пределов наблюдаемой Вселенной.',
      es: 'Frecuencias atmosféricas del espacio profundo. Paisajes sonoros etéreos de más allá del universo observable.',
      zh: '深空的氛围频率。来自可观测宇宙之外的空灵音景。',
    },
    genre: { en: 'Ambient / Space', ru: 'Эмбиент / Космос', es: 'Ambient / Espacio', zh: '氛围 / 太空' },
  },
  'code-music-202': {
    description: {
      en: 'High-energy digital waveforms. Electrifying beats forged in the heart of the machine.',
      ru: 'Высокоэнергичные цифровые волны. Электризующие биты, выкованные в сердце машины.',
      es: 'Formas de onda digitales de alta energía. Ritmos electrizantes forjados en el corazón de la máquina.',
      zh: '高能量的数字波形。在机器核心锻造的震撼节拍。',
    },
    genre: { en: 'Electronic / Tech', ru: 'Электроника / Tech', es: 'Electrónica / Tech', zh: '电子 / 科技' },
  },
  'void-fm': {
    description: {
      en: 'The abyss speaks in frequencies unheard. Industrial noise meets melodic darkness.',
      ru: 'Бездна говорит на неслышимых частотах. Индустриальный шум встречает мелодичную тьму.',
      es: 'El abismo habla en frecuencias no escuchadas. El ruido industrial se encuentra con la oscuridad melódica.',
      zh: '深渊以无人听闻的频率低语。工业噪音邂逅旋律般的黑暗。',
    },
    genre: { en: 'Dark Ambient / Industrial', ru: 'Дарк-эмбиент / Индастриал', es: 'Dark Ambient / Industrial', zh: '暗黑氛围 / 工业' },
  },
  'code-stories': {
    description: {
      en: 'Songs about the people we still have time to call. Acoustic warmth against the machine hum.',
      ru: 'Песни о тех, кому мы ещё успеваем позвонить. Живое тепло против машинного гула.',
      es: 'Canciones sobre las personas a las que aún estamos a tiempo de llamar. Calor acústico contra el zumbido de la máquina.',
      zh: '唱给那些我们还来得及打电话的人。原声的温度，对抗机器的嗡鸣。',
    },
    genre: { en: 'Songwriter / Heartland', ru: 'Авторская песня / Хартленд', es: 'Cantautor / Heartland', zh: '创作歌手 / 心地摇滚' },
  },
  'code-spectrum': {
    description: {
      en: 'Seven genre records and a symphony. The widest span the machine can sing.',
      ru: 'Семь жанровых пластинок и симфония. Самый широкий диапазон, на который способна машина.',
      es: 'Siete discos de género y una sinfonía. El rango más amplio que la máquina puede cantar.',
      zh: '七张风格唱片与一部交响。机器所能歌唱的最宽音域。',
    },
    genre: { en: 'Orchestral / Genre Span', ru: 'Оркестр / Весь спектр', es: 'Orquestal / Todo el espectro', zh: '管弦 / 全谱系' },
  },
};
