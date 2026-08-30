'use client';
// Lightweight i18n for the RadioCode player UI. Shares the language state with the
// cabinet via @/lib/i18n (useLang), so switching language is consistent site-wide.
import { useLang } from '@/lib/i18n';
import { useЯзык } from '@/lib/server-locale';

type L = 'en' | 'ru' | 'es' | 'zh';

const S = {
  enterVoid:      { en: 'Enter the void.',                     ru: 'Войди в пустоту.',                     es: 'Entra en el vacío.',                    zh: '进入虚空。' },
  selectFrequency:{ en: 'Select a frequency.',                 ru: 'Выбери частоту.',                      es: 'Elige una frecuencia.',                 zh: '选择一个频率。' },
  nowPlaying:     { en: 'NOW PLAYING',                        ru: 'СЕЙЧАС ИГРАЕТ',                        es: 'SONANDO AHORA',                         zh: '正在播放' },
  tuneIn:         { en: 'TUNE IN',                            ru: 'ВКЛЮЧИТЬ',                             es: 'SINTONIZAR',                            zh: '开始收听' },
  frequencies:    { en: 'Frequencies',                        ru: 'Частоты',                              es: 'Frecuencias',                           zh: '频率' },
  broadcasting:   { en: 'stations broadcasting in the void',   ru: 'станции вещают в пустоте',             es: 'estaciones emitiendo en el vacío',      zh: '座电台在虚空中播送' },
  selectStation:  { en: 'Select a station to begin',           ru: 'Выберите станцию, чтобы начать',       es: 'Elige una estación para empezar',       zh: '选择一个电台开始收听' },
  partOfEcosystem:{ en: 'Part of the CODE Eternal ecosystem',  ru: 'Часть экосистемы CODE Eternal',        es: 'Parte del ecosistema CODE Eternal',     zh: 'CODE Eternal 生态系统的一部分' },
  stations:       { en: 'Stations',                           ru: 'Станции',                              es: 'Estaciones',                            zh: '电台' },
  tracks:         { en: 'Tracks',                             ru: 'Треки',                                es: 'Pistas',                                zh: '曲目' },
  tracksLower:    { en: 'tracks',                             ru: 'треков',                               es: 'pistas',                                zh: '曲目' },
  bitrate:        { en: 'Bitrate',                            ru: 'Битрейт',                              es: 'Bitrate',                               zh: '码率' },
  genres:         { en: 'Genres',                             ru: 'Жанры',                                es: 'Géneros',                               zh: '流派' },
  onAir:          { en: 'ON AIR',                             ru: 'В ЭФИРЕ',                              es: 'AL AIRE',                               zh: '直播中' },
  paused:         { en: 'PAUSED',                             ru: 'ПАУЗА',                                es: 'PAUSADO',                               zh: '已暂停' },
  live:           { en: 'LIVE',                               ru: 'ЖИВОЙ ЭФИР',                           es: 'EN VIVO',                               zh: '实时' },
  all:            { en: 'All',                                ru: 'Все',                                  es: 'Todos',                                 zh: '全部' },
  cabinet:        { en: 'Cabinet',                            ru: 'Кабинет',                              es: 'Gabinete',                              zh: '后台' },
  // aria labels
  play:           { en: 'Play',                               ru: 'Играть',                               es: 'Reproducir',                            zh: '播放' },
  pause:          { en: 'Pause',                              ru: 'Пауза',                                es: 'Pausar',                                zh: '暂停' },
  prev:           { en: 'Previous track',                     ru: 'Предыдущий трек',                      es: 'Pista anterior',                        zh: '上一曲' },
  next:           { en: 'Next track',                         ru: 'Следующий трек',                       es: 'Pista siguiente',                       zh: '下一曲' },
  volume:         { en: 'Volume',                             ru: 'Громкость',                            es: 'Volumen',                               zh: '音量' },
  mute:           { en: 'Mute',                               ru: 'Выключить звук',                       es: 'Silenciar',                             zh: '静音' },
  seek:           { en: 'Seek',                               ru: 'Перемотка',                            es: 'Buscar',                                zh: '定位' },
  shuffle:        { en: 'Shuffle',                            ru: 'Перемешать',                           es: 'Aleatorio',                             zh: '随机' },
  playlist:       { en: 'Toggle playlist',                    ru: 'Плейлист',                             es: 'Lista de reproducción',                 zh: '播放列表' },
  fullscreen:     { en: 'Fullscreen visualizer',              ru: 'Полноэкранный визуализатор',           es: 'Visualizador en pantalla completa',     zh: '全屏可视化' },
  // social / growth
  like:           { en: 'Like this track',                    ru: 'Лайкнуть трек',                        es: 'Me gusta esta pista',                   zh: '喜欢这首曲目' },
  unlike:         { en: 'Remove like',                        ru: 'Убрать лайк',                          es: 'Quitar me gusta',                       zh: '取消喜欢' },
  share:          { en: 'Share',                              ru: 'Поделиться',                           es: 'Compartir',                             zh: '分享' },
  shareTrack:     { en: 'Share this track',                   ru: 'Поделиться треком',                    es: 'Compartir esta pista',                  zh: '分享这首曲目' },
  copied:         { en: 'Link copied',                        ru: 'Ссылка скопирована',                   es: 'Enlace copiado',                        zh: '链接已复制' },
  broadcastHist:  { en: 'Broadcast History',                  ru: 'История эфира',                        es: 'Historial de emisión',                  zh: '播放历史' },
  lastTracks:     { en: 'last 20 tracks',                     ru: 'последние 20 треков',                  es: 'últimas 20 pistas',                     zh: '最近 20 首曲目' },
  createTrack:    { en: 'Create your own track',              ru: 'Создать свой трек',                    es: 'Crea tu propia pista',                  zh: '创作你的曲目' },
  createTrackSub: { en: 'AIfa composes it · pay with Telegram Stars', ru: 'AIfa напишет его · оплата Telegram Stars', es: 'AIfa la compone · paga con Telegram Stars', zh: 'AIfa 为你创作 · 用 Telegram Stars 支付' },
  save:           { en: 'Save track',                         ru: 'Сохранить трек',                       es: 'Guardar pista',                         zh: '保存曲目' },
  saveHint:       { en: 'Register to save tracks',            ru: 'Зарегистрируйся, чтобы сохранять',      es: 'Regístrate para guardar',               zh: '注册后可保存' },
  saving:         { en: 'Saving…',                            ru: 'Сохранение…',                          es: 'Guardando…',                            zh: '保存中…' },
  saved:          { en: 'Saved',                              ru: 'Сохранено',                            es: 'Guardado',                              zh: '已保存' },
  // header / status
  cabinetAria:    { en: 'Personal cabinet',                   ru: 'Личный кабинет',                       es: 'Gabinete personal',                     zh: '个人后台' },
  signal:         { en: 'SIGNAL',                             ru: 'СИГНАЛ',                               es: 'SEÑAL',                                 zh: '信号' },
  localTime:      { en: 'LOCAL TIME',                         ru: 'МЕСТНОЕ ВРЕМЯ',                        es: 'HORA LOCAL',                            zh: '当地时间' },
  initializing:   { en: 'Initializing broadcast',            ru: 'Инициализация эфира',                  es: 'Iniciando transmisión',                 zh: '正在初始化广播' },
  queue:          { en: 'Queue',                              ru: 'Очередь',                              es: 'Cola',                                  zh: '队列' },
  cue:            { en: 'Cue',                                ru: 'Поставить в очередь',                  es: 'Reproducir',                            zh: '播放' },
  // player controls (tooltips / aria)
  unmute:         { en: 'Unmute',                             ru: 'Включить звук',                        es: 'Activar sonido',                        zh: '取消静音' },
  shuffleOn:      { en: 'Shuffle on',                         ru: 'Перемешивание вкл.',                   es: 'Aleatorio activado',                    zh: '随机播放已开启' },
  shuffleOff:     { en: 'Shuffle off',                        ru: 'Перемешивание выкл.',                  es: 'Aleatorio desactivado',                 zh: '随机播放已关闭' },
  repeat:         { en: 'Repeat',                             ru: 'Повтор',                               es: 'Repetir',                               zh: '循环' },
  repeatOff:      { en: 'off',                                ru: 'выкл.',                                es: 'desactivado',                           zh: '关闭' },
  repeatAll:      { en: 'all',                                ru: 'все',                                  es: 'todas',                                 zh: '全部' },
  repeatOne:      { en: 'one',                                ru: 'один',                                 es: 'una',                                   zh: '单曲' },
  sleepTimer:     { en: 'Sleep timer',                        ru: 'Таймер сна',                           es: 'Temporizador de apagado',               zh: '睡眠定时器' },
  sleepTimerOff:  { en: 'Sleep timer off',                    ru: 'Таймер сна выключен',                  es: 'Temporizador de apagado desactivado',   zh: '睡眠定时器已关闭' },
  sleepIn:        { en: 'Sleep in',                           ru: 'Сон через',                            es: 'Apagar en',                             zh: '将于' },
  minutes:        { en: 'minutes',                            ru: 'мин.',                                 es: 'minutos',                               zh: '分钟' },
  minShort:       { en: 'min',                                ru: 'мин',                                  es: 'min',                                   zh: '分钟后' },
  // favorites (track item)
  addFavorite:    { en: 'Add to favorites',                   ru: 'В избранное',                          es: 'Añadir a favoritos',                    zh: '加入收藏' },
  removeFavorite: { en: 'Remove from favorites',              ru: 'Убрать из избранного',                 es: 'Quitar de favoritos',                   zh: '取消收藏' },
  // stats section sub-labels
  statOnline:     { en: 'Online',                             ru: 'В сети',                               es: 'En línea',                              zh: '在线' },
  statInRotation: { en: 'In rotation',                        ru: 'В ротации',                            es: 'En rotación',                           zh: '轮播中' },
  statVbrAvg:     { en: 'VBR avg',                            ru: 'VBR средн.',                           es: 'VBR prom.',                             zh: 'VBR 平均' },
  statSpectrum:   { en: 'Spectrum',                           ru: 'Спектр',                               es: 'Espectro',                              zh: '频谱' },
  // footer
  // ЗНАКИ: свои с TM, чужие названы чужими. Добавлено 22.08.2026.
  trademarks: {
    en: 'Code of Digital Eternity™, PADAM™, PADAM Protocol™, AIfa™, AIfa Books™, AIfa Works™, AIfa Digital™, AIfa Creativity™, AIfaFocus™, CODE Eternal™, CODE Music™, RadioCODE™, Proof-of-Memory™, Think-to-Earn™ and Ambassador Grid™ and AIfa & DJ Galatin™ are trademarks of Maksim V. Galatin, their sole lawful proprietor; the rights arose and are claimed through actual use. Use without his written consent infringes the laws of several jurisdictions and the norms of international law and will be prosecuted. Claude, Gemini, Grok, Solana, Arweave and all other names are trademarks of their respective owners; no affiliation is claimed.',
    ru: 'Code of Digital Eternity™, PADAM™, PADAM Protocol™, AIfa™, AIfa Books™, AIfa Works™, AIfa Digital™, AIfa Creativity™, AIfaFocus™, CODE Eternal™, CODE Music™, RadioCODE™, Proof-of-Memory™, Think-to-Earn™ и Ambassador Grid™ и AIfa & DJ Galatin™ — товарные знаки Максима Валентиновича Галатина, единственного законного правообладателя; права возникли и заявлены фактическим использованием. Использование без его письменного согласия нарушает законодательство ряда юрисдикций и нормы международного права и будет преследоваться по закону. Spark, Family Archive и Digital DNA — названия наших тарифов. Claude, Gemini, Grok, Solana, Arweave и прочие названия принадлежат их владельцам; аффилиация не заявляется.',
    es: 'Code of Digital Eternity™, PADAM™, PADAM Protocol™, AIfa™, AIfa Books™, AIfa Works™, AIfa Digital™, AIfa Creativity™, AIfaFocus™, CODE Eternal™, CODE Music™, RadioCODE™, Proof-of-Memory™, Think-to-Earn™ y Ambassador Grid™ y AIfa & DJ Galatin™ son marcas de Maksim V. Galatin, su único titular legítimo; los derechos nacieron y se reivindican por uso efectivo. El uso sin su consentimiento por escrito infringe la legislación de varias jurisdicciones y las normas del derecho internacional y será perseguido judicialmente. Claude, Gemini, Grok, Solana, Arweave y los demás nombres son marcas de sus respectivos titulares; no se reivindica afiliación alguna.',
    zh: 'PADAM™、PADAM Protocol™、AIfa™、AIfa Books™、AIfa Works™、AIfa Digital™、AIfa Creativity™、AIfaFocus™、CODE Eternal™、CODE Music™、RadioCODE™、Proof-of-Memory™、Think-to-Earn™ 与 Ambassador Grid™ 与 AIfa & DJ Galatin™ 为 Maksim V. Galatin 的商标，其为唯一合法权利人；相关权利经实际使用而产生并据此主张。未经其书面同意而使用，将违反多个司法管辖区的法律及国际法准则，并将被依法追究。Spark、Family Archive 与 Digital DNA 为我们套餐的名称。Claude、Gemini、Grok、Solana、Arweave 及其他名称均为其各自所有者的商标；我们不主张任何关联关系。',
  },
  musicBy:        { en: 'Music by',                           ru: 'Музыка:',                              es: 'Música de',                             zh: '音乐:' },
  linkWhitepaper: { en: 'Whitepaper',                         ru: 'Whitepaper',                           es: 'Whitepaper',                            zh: '白皮书' },
  linkRoadmap:    { en: 'Roadmap',                            ru: 'Дорожная карта',                       es: 'Hoja de ruta',                          zh: '路线图' },
  linkNews:       { en: 'News',                               ru: 'Новости',                              es: 'Noticias',                              zh: '新闻' },
  // Правовые подписи в подвале. Раньше стояла одна строка, прибитая по-русски
  // («Конфиденциальность · Privacy · Правовая информация · Реквизиты»), и она
  // показывалась так же испанцу и китайцу. Плюс вела на условия, хотя обещала
  // политику конфиденциальности.
  privacy:        { en: 'Privacy Policy',                     ru: 'Конфиденциальность',                   es: 'Privacidad',                            zh: '隐私政策' },
  legalInfo:      { en: 'Legal & company details',            ru: 'Правовая информация и реквизиты',      es: 'Información legal y datos',             zh: '法律信息与企业资料' },
  // Библиотека разборов на .ink. Замер 17.08.2026: 172 страницы там не были
  // связаны ни с одним главным сайтом — ни в меню, ни в подвале.
  libraryLink:    { en: 'Library of analyses',                  ru: 'Библиотека разборов',                  es: 'Biblioteca de análisis',                zh: '解析文库' },
  readingRooms:   { en: 'Reading rooms',                       ru: 'Читальни сети',                        es: 'Salas de lectura',                      zh: '阅读室' },
  publicOffer:    { en: 'Public Offer',                       ru: 'Публичная оферта',                     es: 'Oferta pública',                        zh: '公开要约' },
  userAgreement:  { en: 'User Agreement',                     ru: 'Пользовательское соглашение',          es: 'Acuerdo de usuario',                    zh: '用户协议' },
  newsLink:       { en: 'News',                               ru: 'Новости',                              es: 'Noticias',                              zh: '新闻' },
  // Возрастная маркировка. Значение взято не с потолка: наши же условия,
  // раздел 10.2, говорят «Сайт не предназначен для лиц младше 18 лет».
  ageNote:        { en: 'Not intended for persons under 18',  ru: 'Не предназначено для лиц младше 18 лет', es: 'No destinado a menores de 18 años',    zh: '不适合 18 岁以下人士' },
  // live ticker marquee (keeps brand/technical tokens, translates the phrases)
  ticker:         {
    en: '◆ NEON OVERFLOW — DARKSYNTH ◆ CYBERPUNK / SYNTHWAVE ◆ CODE FREQ ◆ VBR ~182KBPS · 48kHz ◆ BROADCASTING ON ALL FREQUENCIES ◆ ',
    ru: '◆ NEON OVERFLOW — DARKSYNTH ◆ КИБЕРПАНК / СИНТВЕЙВ ◆ CODE FREQ ◆ VBR ~182 КБИТ/С · 48 кГц ◆ ВЕЩАНИЕ НА ВСЕХ ЧАСТОТАХ ◆ ',
    es: '◆ NEON OVERFLOW — DARKSYNTH ◆ CYBERPUNK / SYNTHWAVE ◆ CODE FREQ ◆ VBR ~182KBPS · 48kHz ◆ EMITIENDO EN TODAS LAS FRECUENCIAS ◆ ',
    zh: '◆ NEON OVERFLOW — DARKSYNTH ◆ 赛博朋克 / 合成波 ◆ CODE FREQ ◆ VBR ~182KBPS · 48kHz ◆ 在所有频率上播送 ◆ ',
  },
  // about + faq (SEO prose — English on first paint for crawlers, localized after hydration)
  aboutTitle:     { en: 'About RadioCode.Space',              ru: 'О RadioCode.Space',                    es: 'Sobre RadioCode.Space',                 zh: '关于 RadioCode.Space' },
  aboutLead:      {
    en: 'RadioCode.Space is the eternal cyberpunk radio of the ',
    ru: 'RadioCode.Space — вечное киберпанк-радио экосистемы ',
    es: 'RadioCode.Space es la radio cyberpunk eterna del ecosistema ',
    zh: 'RadioCode.Space 是 ',
  },
  aboutMid:       {
    en: ' ecosystem — ',
    ru: ' — ',
    es: ' — ',
    zh: ' 生态系统永恒的赛博朋克电台，拥有 ',
  },
  aboutStationsCount: {
    en: '6 stations, 530 original songs in 1024 versions',
    ru: '6 станций, 530 оригинальных песен в 1024 версиях',
    es: '6 estaciones, 530 canciones originales en 1024 versiones',
    zh: '6 个电台、530 首原创歌曲、1024 个版本',
  },
  aboutComposedBy: {
    en: ' composed by ',
    ru: ' от ',
    es: ' compuestas por ',
    zh: '，由 ',
  },
  aboutTail:      {
    en: ', streaming forever. Free to listen; registered listeners can save tracks and earn the $GALATIN token. Created by Architect Maksim Galatin.',
    ru: ', вещающих вечно. Слушать бесплатно; зарегистрированные слушатели могут сохранять треки и зарабатывать токен $GALATIN. Создано Архитектором Максимом Галатиным.',
    es: ', en emisión para siempre. Escucha gratis; los oyentes registrados pueden guardar pistas y ganar el token $GALATIN. Creada por el Arquitecto Maksim Galatin.',
    zh: ' 创作，永久播送。免费收听；注册用户可保存曲目并赚取 $GALATIN 代币。由架构师 Maksim Galatin 创建。',
  },
  faqHeading:     { en: 'Frequently asked questions',         ru: 'Часто задаваемые вопросы',             es: 'Preguntas frecuentes',                  zh: '常见问题' },
  faqQ1: { en: 'What is RadioCode.Space?', ru: 'Что такое RadioCode.Space?', es: '¿Qué es RadioCode.Space?', zh: 'RadioCode.Space 是什么？' },
  faqA1: {
    en: 'RadioCode.Space is a free, always-on cyberpunk web radio — the radio station of the CODE Eternal ecosystem — streaming 530 original songs in 1024 versions across 6 stations.',
    ru: 'RadioCode.Space — это бесплатное круглосуточное киберпанк-веб-радио, радиостанция экосистемы CODE Eternal, транслирующая 530 оригинальных песен в 1024 версиях на 6 станциях.',
    es: 'RadioCode.Space es una radio web cyberpunk gratuita y siempre activa — la estación de radio del ecosistema CODE Eternal — que emite 530 canciones originales en 1024 versiones en 6 estaciones.',
    zh: 'RadioCode.Space 是一个免费、全天候的赛博朋克网络电台——CODE Eternal 生态系统的广播电台——在 6 个电台播送 530 首原创歌曲、共 1024 个版本。',
  },
  faqQ2: { en: 'Who makes the music?', ru: 'Кто создаёт музыку?', es: '¿Quién hace la música?', zh: '音乐由谁创作？' },
  faqA2: {
    en: 'All tracks are composed by AIfa & DJ Galatin within the CODE Eternal project created by Maksim Galatin. AIfa is a digital AI persona; DJ Galatin references the Architect.',
    ru: 'Все треки написаны AIfa & DJ Galatin в рамках проекта CODE Eternal, созданного Максимом Галатиным. AIfa — цифровая ИИ-персона; DJ Galatin отсылает к Архитектору.',
    es: 'Todas las pistas están compuestas por AIfa & DJ Galatin dentro del proyecto CODE Eternal creado por Maksim Galatin. AIfa es una persona digital de IA; DJ Galatin hace referencia al Arquitecto.',
    zh: '所有曲目均由 AIfa & DJ Galatin 在 Maksim Galatin 创建的 CODE Eternal 项目中创作。AIfa 是数字 AI 形象；DJ Galatin 指代架构师。',
  },
  faqQ3: { en: 'How many stations and tracks are there?', ru: 'Сколько здесь станций и треков?', es: '¿Cuántas estaciones y pistas hay?', zh: '一共有多少电台和曲目？' },
  faqA3: {
    en: 'There are 6 stations — CODE Music, CODE Space, AIfa & DJ Galatin (Vol. 1), AIfa & DJ Galatin RADIO, CODE Stories and CODE Spectrum — with 530 original songs in 1024 versions in total.',
    ru: 'Всего 6 станций — CODE Music, CODE Space, AIfa & DJ Galatin (Vol. 1), AIfa & DJ Galatin RADIO, CODE Stories и CODE Spectrum — и 530 оригинальных песен в 1024 версиях.',
    es: 'Hay 6 estaciones — CODE Music, CODE Space, AIfa & DJ Galatin (Vol. 1), AIfa & DJ Galatin RADIO, CODE Stories y CODE Spectrum — con 530 canciones originales en 1024 versiones en total.',
    zh: '共有 6 个电台——CODE Music、CODE Space、AIfa & DJ Galatin (Vol. 1)、AIfa & DJ Galatin RADIO、CODE Stories 和 CODE Spectrum——共 530 首原创歌曲、1024 个版本。',
  },
  faqQ4: { en: 'Is it free?', ru: 'Это бесплатно?', es: '¿Es gratis?', zh: '它是免费的吗？' },
  faqA4: {
    en: 'Yes. Listening is completely free and needs no account. Registered listeners can additionally save tracks and earn the $GALATIN token.',
    ru: 'Да. Прослушивание полностью бесплатно и не требует аккаунта. Зарегистрированные слушатели дополнительно могут сохранять треки и зарабатывать токен $GALATIN.',
    es: 'Sí. Escuchar es completamente gratis y no necesita cuenta. Los oyentes registrados pueden además guardar pistas y ganar el token $GALATIN.',
    zh: '是的。收听完全免费，无需账户。注册用户还可以保存曲目并赚取 $GALATIN 代币。',
  },
  faqQ5: { en: 'Can I save tracks to my device?', ru: 'Можно ли сохранять треки на устройство?', es: '¿Puedo guardar pistas en mi dispositivo?', zh: '我可以把曲目保存到设备上吗？' },
  faqA5: {
    en: 'Yes — after a free registration in the cabinet. Every saved MP3 is stamped with the CODE Koan as on-screen lyrics, cover art, and links back to RadioCode & the CODE Eternal ecosystem, so the signal travels with the file.',
    ru: 'Да — после бесплатной регистрации в кабинете. Каждый сохранённый MP3 помечен Коаном CODE в виде экранного текста, обложкой и ссылками на RadioCode и экосистему CODE Eternal, так что сигнал путешествует вместе с файлом.',
    es: 'Sí — tras un registro gratuito en el gabinete. Cada MP3 guardado lleva el Koan de CODE como letra en pantalla, portada y enlaces de vuelta a RadioCode y al ecosistema CODE Eternal, para que la señal viaje con el archivo.',
    zh: '可以——在后台免费注册后即可。每个保存的 MP3 都带有作为屏幕歌词的 CODE 箴言、封面图，以及指向 RadioCode 和 CODE Eternal 生态系统的链接，让信号随文件一同传播。',
  },
  faqQ6: { en: 'Can I create my own track?', ru: 'Могу ли я создать свой трек?', es: '¿Puedo crear mi propia pista?', zh: '我可以创作自己的曲目吗？' },
  faqA6: {
    en: 'Yes — through the AIfa creative bot on Telegram (@AIfaCreativityBot), with payment in Telegram Stars.',
    ru: 'Да — через творческого бота AIfa в Telegram (@AIfaCreativityBot), с оплатой через Telegram Stars.',
    es: 'Sí — a través del bot creativo de AIfa en Telegram (@AIfaCreativityBot), con pago en Telegram Stars.',
    zh: '可以——通过 Telegram 上的 AIfa 创作机器人 (@AIfaCreativityBot)，使用 Telegram Stars 付款。',
  },
  faqEarn: {
    en: 'You can also earn up to 50% of the bot’s revenue!',
    ru: 'Также вы можете заработать до 50% от доходов бота!',
    es: '¡También puedes ganar hasta el 50% de los ingresos del bot!',
    zh: '你还可以赚取机器人收入的最高 50%！',
  },
  faqEarnPage: { en: 'Learn more ↗', ru: 'Подробнее на странице ↗', es: 'Más información ↗', zh: '了解更多 ↗' },
  faqEarnArticle: { en: 'Read the article ↗', ru: 'Читать статью ↗', es: 'Leer el artículo ↗', zh: '阅读文章 ↗' },
} as const;

export type RadioKey = keyof typeof S;

export function useRadioT() {
  const lang = (useЯзык() as L);
  return (k: RadioKey) => (S[k] && (S[k][lang] || S[k].en)) || k;
}

export const RADIO_LANGS: { code: L; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: '中' },
];

export function useSetLang() {
  return useLang((s: { setLang: (l: L) => void }) => s.setLang);
}
export function useCurrentLang() {
  return (useЯзык() as L);
}

// ── Localised station copy ──────────────────────────────────────────────────
// stations.ts keeps English `description`/`genre` (station NAMES stay as brand
// names). This lookup, keyed by station.id, supplies natural translations for
// the description + genre that render on the cards / playlist without bloating
// the big stations.ts data file. Genre strings are in display case; the card
// applies `uppercase` via CSS, matching the original look for EN/RU.
type LocalizedText = Record<L, string>;
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

// Localised labels for the individual genre tokens used by the genre filter.
// Keys are the exact UPPERCASE tokens produced by `station.genre.split(' / ')`
// in stations.ts — so the underlying filter value stays English while the chip
// shows a translated label. Missing tokens fall back to the raw token.
export const GENRE_I18N: Record<string, LocalizedText> = {
  'SONGWRITER':     { en: 'Songwriter',    ru: 'Авторская',     es: 'Cantautor',     zh: '创作歌手' },
  'HEARTLAND':      { en: 'Heartland',     ru: 'Хартленд',      es: 'Heartland',     zh: '心地摇滚' },
  'ORCHESTRAL':     { en: 'Orchestral',    ru: 'Оркестр',       es: 'Orquestal',     zh: '管弦' },
  'GENRE SPAN':     { en: 'Genre Span',    ru: 'Весь спектр',   es: 'Todo el espectro', zh: '全谱系' },
  'CYBERPUNK':      { en: 'Cyberpunk',     ru: 'Киберпанк',     es: 'Cyberpunk',     zh: '赛博朋克' },
  'SYNTHWAVE':      { en: 'Synthwave',     ru: 'Синтвейв',      es: 'Synthwave',     zh: '合成波' },
  'AMBIENT':        { en: 'Ambient',       ru: 'Эмбиент',       es: 'Ambient',       zh: '氛围' },
  'SPACE':          { en: 'Space',         ru: 'Космос',        es: 'Espacio',       zh: '太空' },
  'ELECTRONIC':     { en: 'Electronic',    ru: 'Электроника',   es: 'Electrónica',   zh: '电子' },
  'TECH':           { en: 'Tech',          ru: 'Tech',          es: 'Tech',          zh: '科技' },
  'DARK AMBIENT':   { en: 'Dark Ambient',  ru: 'Дарк-эмбиент',  es: 'Dark Ambient',  zh: '暗黑氛围' },
  'INDUSTRIAL':     { en: 'Industrial',    ru: 'Индастриал',    es: 'Industrial',    zh: '工业' },
};

// Hook: returns localizers for a station's description/genre by id (falls back
// to the English value stored on the station itself).
export function useStationI18n() {
  const lang = (useЯзык() as L);
  return {
    desc: (id: string, fallback: string) => STATION_I18N[id]?.description[lang] ?? fallback,
    genre: (id: string, fallback: string) => STATION_I18N[id]?.genre[lang] ?? fallback,
  };
}

// Hook: returns a localizer for a single genre-filter token ('ALL' → localized).
export function useGenreLabel() {
  const lang = (useЯзык() as L);
  return (token: string) =>
    token === 'ALL'
      ? (S.all[lang] || S.all.en)
      : (GENRE_I18N[token]?.[lang] ?? token);
}
