/**
 * Услуги AIfa Creativity для страницы /AIfacreativity — 30.09.2026, поручение Архитектора:
 * «красиво расписать ВСЕ услуги и как всё работает… кликая по каждой из услуг должен быть
 * образец».
 *
 * ИСТОЧНИК ПРАВДЫ — бот `aifa-works-bot` (30.09.2026):
 *   • описания — shared/src/catalog.ts (SKU_INFO.desc);
 *   • «о чём спросит AIfa» — shared/src/oprosy.ts (ОПРОСЫ), варианты-кнопки там же;
 *   • что приходит — workers/src/worker.ts и движок историй bot/src/bot.ts (строки 1460–1700:
 *     главы с выбором, единый облик героя, PDF-книга в конце);
 *   • цены — таблица products живой базы бота (сверено 24.09.2026).
 * Бот говорит на трёх языках: английском, русском и испанском (`Lang = "en" | "ru" | "es"`).
 *
 * Образцы лежат в public/creativity/samples/<id>.json — это НАСТОЯЩИЕ выдачи бота (samples_media),
 * собранные скриптом E:/Aifa/_агент/творчество_образцы/собрать_образцы.py. Услуга без образца
 * показывает честное «образец готовится». Выдуманных образцов здесь быть не может.
 */

export type L = { ru: string; en: string; es: string; zh: string };
export type LList = { ru: string[]; en: string[]; es: string[]; zh: string[] };

/** Услуги, у которых образец уже собран и прочитан целиком (30.09.2026; 01.10.2026 — ещё четыре, затем ещё четыре). */
export const SAMPLE_IDS = new Set([
  'song', 'song_vocal', 'lyric_video', 'music_card', 'voice', 'postcard', 'image', 'love_letter',
  'dream', 'year_ahead', 'tarot', 'tale', 'detective',
  'compatibility', 'name_secrets', 'astro_full', 'bundle_mystic',
  'poem', 'stickerpack', 'bundle_romance', 'bundle', 'aifa_plus',
]);

export interface Service {
  id: string;
  cat: 'music' | 'books' | 'texts' | 'mystic' | 'sets';
  icon: string;
  price: string;
  t: L;
  d: L;
  full: L;
  asks: LList;
  gets: LList;
  time: L;
  /** Подпись к цене — для подписки. */
  per?: L;
}

export const CATS: Record<Service['cat'], L> = {
  music: { ru: 'Музыка и видео', en: 'Music and video', es: 'Música y video', zh: '音乐与视频' },
  books: { ru: 'Книги и истории', en: 'Books and stories', es: 'Libros e historias', zh: '书籍与故事' },
  texts: { ru: 'Тексты, открытки и стикеры', en: 'Texts, cards and stickers', es: 'Textos, postales y stickers', zh: '文字、贺卡与贴纸' },
  mystic: { ru: 'Астрология и мистика', en: 'Astrology and mystic', es: 'Astrología y misticismo', zh: '占星与神秘学' },
  sets: { ru: 'Наборы подарков', en: 'Gift sets', es: 'Sets de regalo', zh: '礼物套装' },
};

// общие вопросы — те же формулировки, что в опроснике бота
const КОМУ: L = { ru: 'Кому это: имя и кто он вам', en: 'Who it is for: the name and who they are to you', es: 'Para quién es: el nombre y quién es para ti', zh: '送给谁：名字以及与你的关系' };
const ПОВОД: L = { ru: 'Повод: день рождения, годовщина, свадьба, признание, поддержка, благодарность, Новый год или просто так', en: 'The occasion: birthday, anniversary, wedding, declaration of love, support, gratitude, New Year or just because', es: 'La ocasión: cumpleaños, aniversario, boda, declaración de amor, apoyo, gratitud, Año Nuevo o porque sí', zh: '场合：生日、纪念日、婚礼、表白、鼓励、感谢、新年或无需理由' };
const НАСТРОЕНИЕ: L = { ru: 'Настроение: нежное, торжественное, весёлое, с юмором, трогательное или вдохновляющее', en: 'The tone: tender, solemn, cheerful, humorous, touching or inspiring', es: 'El tono: tierno, solemne, alegre, con humor, conmovedor o inspirador', zh: '基调：温柔、庄重、欢快、幽默、感人或励志' };
const ПОЖЕЛАНИЯ: L = { ru: 'Что обязательно включить или чего избегать — по желанию', en: 'Anything to include or avoid — optional', es: 'Algo que incluir o evitar — opcional', zh: '必须包含或需要避免的内容（可选）' };
const ПЕСНЯ_ВОПРОСЫ: L[] = [
  КОМУ, ПОВОД,
  { ru: 'История для текста: какой это человек, ваши моменты, шутки, имена, места', en: 'The story for the lyrics: what the person is like, your moments, jokes, names, places', es: 'La historia para la letra: cómo es la persona, vuestros momentos, bromas, nombres, lugares', zh: '歌词素材：这个人的样子、你们的回忆、玩笑、名字和地点' },
  { ru: 'Жанр: поп, баллада, рок, хип-хоп, акустика, джаз, электроника или кантри', en: 'Genre: pop, ballad, rock, hip-hop, acoustic, jazz, electronic or country', es: 'Género: pop, balada, rock, hip-hop, acústico, jazz, electrónica o country', zh: '风格：流行、抒情、摇滚、嘻哈、原声、爵士、电子或乡村' },
  { ru: 'Голос: женский или мужской', en: 'Voice: female or male', es: 'Voz: femenina o masculina', zh: '人声：女声或男声' },
  { ru: 'Язык песни: русский, английский или испанский', en: 'Language of the lyrics: English, Russian or Spanish', es: 'Idioma de la letra: español, inglés o ruso', zh: '歌词语言：英语、俄语或西班牙语' },
  НАСТРОЕНИЕ, ПОЖЕЛАНИЯ,
];

function list(items: L[]): LList {
  return { ru: items.map((x) => x.ru), en: items.map((x) => x.en), es: items.map((x) => x.es), zh: items.map((x) => x.zh) };
}
function l(ru: string, en: string, es: string, zh: string): L { return { ru, en, es, zh }; }

export const SERVICES: Service[] = [
  // ───────────── Музыка и видео ─────────────
  {
    id: 'song', cat: 'music', icon: 'Music', price: '$1.99 · ⭐120',
    t: l('Инструментальный трек', 'Instrumental track', 'Pista instrumental', '器乐曲'),
    d: l('Своя мелодия на 2–3 минуты в выбранном жанре и настроении, с обложкой.', 'Your own 2–3 minute tune in the genre and mood you choose, with cover art.', 'Tu propia melodía de 2–3 minutos en el género y ánimo que elijas, con portada.', '按你选择的风格与氛围创作 2–3 分钟的专属旋律，附封面。'),
    full: l(
      'Собственный музыкальный трек, которого больше нет нигде: AIfa сочиняет композицию с нуля под ваш повод и настроение — нежную колыбельную, драйвовый бит для тренировки, романтическую тему для свидания или фон для видео. Это не нарезка из чужих песен, а новая музыка, которую можно слушать, дарить и использовать где угодно.',
      'A piece of music that exists nowhere else: AIfa composes it from scratch for your occasion and mood — a tender lullaby, a driving workout beat, a romantic theme for a date or background music for a video. Not a remix of someone else’s songs, but new music you can listen to, give as a gift and use anywhere.',
      'Una pieza musical que no existe en ningún otro lugar: AIfa la compone desde cero para tu ocasión y ánimo — una nana tierna, un ritmo para entrenar, un tema romántico para una cita o música de fondo para un video. No es un remix de canciones ajenas, sino música nueva que puedes escuchar, regalar y usar donde quieras.',
      '一首世上独一无二的乐曲：AIfa 根据你的场合与心情从零创作——温柔的摇篮曲、健身用的动感节拍、约会的浪漫主题或视频背景音乐。它不是别人歌曲的拼贴，而是全新的音乐，可以聆听、赠送并随处使用。'),
    asks: list([
      l('Для чего трек: подарок, фон для видео, тренировка, сон и отдых, свидание, работа и фокус', 'What it is for: a gift, a video background, a workout, sleep, a date, work and focus', 'Para qué es: un regalo, fondo para video, entrenamiento, dormir, una cita, trabajo y concentración', '用途：礼物、视频背景、健身、睡眠放松、约会、工作专注'),
      l('Стиль и инструменты: оркестр как в кино, фортепиано, лоу-фай, электроника, рок, джаз, эмбиент, акустическая гитара', 'Style and instruments: cinematic orchestra, solo piano, lo-fi, electronic, rock, jazz, ambient, acoustic guitar', 'Estilo e instrumentos: orquesta de cine, piano, lo-fi, electrónica, rock, jazz, ambient, guitarra acústica', '风格与乐器：电影管弦乐、钢琴独奏、Lo-fi、电子、摇滚、爵士、氛围音乐、原声吉他'),
      l('Настроение: спокойное, радостное, романтичное, эпичное или грустное', 'Mood: calm, joyful, romantic, epic or sad', 'Ánimo: tranquilo, alegre, romántico, épico o triste', '情绪：平静、欢快、浪漫、史诗或忧伤'),
      l('Темп: медленный, средний или быстрый', 'Tempo: slow, medium or fast', 'Tempo: lento, medio o rápido', '节奏：慢、中或快'),
      ПОЖЕЛАНИЯ,
    ]),
    gets: list([
      l('Аудиофайл на 2–3 минуты', 'An audio file of 2–3 minutes', 'Un archivo de audio de 2–3 minutos', '一段 2–3 分钟的音频'),
      l('Собственную обложку трека', 'Its own cover art', 'Su propia portada', '专属封面'),
    ]),
    time: l('Несколько минут', 'A few minutes', 'Unos minutos', '几分钟'),
  },
  {
    id: 'song_vocal', cat: 'music', icon: 'Mic', price: '$2.99 · ⭐180',
    t: l('Песня с вокалом', 'Song with vocals', 'Canción con voz', '人声歌曲'),
    d: l('Настоящая песня около трёх минут: текст про вашего человека и живой поющий голос.', 'A real song of about three minutes: lyrics about your person and a singing voice.', 'Una canción real de unos tres minutos: letra sobre tu persona y una voz que la canta.', '约三分钟的完整歌曲：唱的是你想献给的人，配真实歌声。'),
    full: l(
      'Самый личный подарок: песня, написанная про одного конкретного человека. Вы рассказываете, кто он и почему именно сейчас — день рождения, годовщина, признание, поддержка в трудную минуту, — а AIfa пишет слова, сочиняет мелодию и поёт их. Это трек, который будут переслушивать годами, когда цветы давно завянут.',
      'The most personal gift: a song written about one real person. You tell who they are and why now — a birthday, an anniversary, a confession, support in a hard time — and AIfa writes the words, composes the melody and sings them. It becomes a track people replay for years, long after the flowers have faded.',
      'El regalo más personal: una canción escrita sobre una persona real. Cuentas quién es y por qué ahora — un cumpleaños, un aniversario, una confesión, apoyo en un momento difícil — y AIfa escribe la letra, compone la melodía y la canta. Un tema que se escucha durante años, cuando las flores ya se marchitaron.',
      '最有心意的礼物：一首专为某个人写的歌。你讲讲他是谁、为什么是现在——生日、纪念日、告白、困难时的鼓励——AIfa 写词、作曲并演唱。花早已凋谢，这首歌却会被反复聆听多年。'),
    asks: list(ПЕСНЯ_ВОПРОСЫ),
    gets: list([
      l('Песню в MP3 около трёх минут, с вокалом', 'An MP3 song of about three minutes, with vocals', 'Una canción en MP3 de unos tres minutos, con voz', '约三分钟的 MP3 人声歌曲'),
      l('Текст песни', 'The lyrics', 'La letra', '歌词'),
    ]),
    time: l('Несколько минут', 'A few minutes', 'Unos minutos', '几分钟'),
  },
  {
    id: 'lyric_video', cat: 'music', icon: 'Video', price: '$4.99 · ⭐300',
    t: l('Песня + видео со словами', 'Song + lyric video', 'Canción + video con letra', '歌曲 + 歌词视频'),
    d: l('Песня с вокалом и квадратное видео, где слова идут в такт пению.', 'A vocal song and a square video where the words move in time with the singing.', 'Una canción con voz y un video cuadrado donde la letra va al ritmo del canto.', '人声歌曲，外加歌词随演唱同步出现的方形视频。'),
    full: l(
      'Всё то же, что в песне с вокалом, плюс готовое видео: квадратный ролик, в котором слова появляются на экране в такт пению. Его можно выложить в сторис, отправить в любой чат или включить на празднике.',
      'Everything in the song with vocals, plus a finished video: a square clip where the words appear on screen in time with the singing. Post it to stories, send it in any chat or play it at the celebration.',
      'Todo lo de la canción con voz, más un video terminado: un clip cuadrado donde la letra aparece al ritmo del canto. Publícalo en historias, envíalo a cualquier chat o ponlo en la fiesta.',
      '包含人声歌曲的全部内容，另加一段成品视频：方形短片中歌词随演唱同步出现。可以发到快拍、任何聊天或在聚会上播放。'),
    asks: list(ПЕСНЯ_ВОПРОСЫ),
    gets: list([
      l('Песню в MP3 с вокалом', 'The vocal song as an MP3', 'La canción con voz en MP3', 'MP3 人声歌曲'),
      l('Квадратное видео MP4 со словами в такт', 'A square MP4 video with the words in time', 'Un video MP4 cuadrado con la letra al ritmo', '歌词同步的方形 MP4 视频'),
    ]),
    time: l('Несколько минут', 'A few minutes', 'Unos minutos', '几分钟'),
  },
  {
    id: 'music_card', cat: 'music', icon: 'Gift', price: '$2.99 · ⭐180',
    t: l('Живая музыкальная открытка', 'Living musical card', 'Tarjeta musical viva', '音乐视频贺卡'),
    d: l('Иллюстрация к поводу и своя мелодия, собранные в короткое видео.', 'An illustration for the occasion and its own tune, combined into a short video.', 'Una ilustración para la ocasión y su propia melodía, unidas en un video corto.', '为场合创作的插画与专属旋律，合成一段短视频。'),
    full: l(
      'Короткое видео-поздравление: AIfa рисует открытку под ваш повод и сочиняет к ней нежную инструментальную мелодию, а потом соединяет их в квадратный MP4. Маленький фильм-подарок, который ощущается живым, — куда особеннее статичной картинки. Вокала здесь нет, только музыка.',
      'A short video greeting: AIfa paints a card for your occasion, composes a gentle instrumental tune for it and joins them into a square MP4. A little movie-gift that feels alive — far more special than a static picture. There are no vocals here, only music.',
      'Una felicitación en video: AIfa pinta una tarjeta para tu ocasión, compone una melodía instrumental suave y las une en un MP4 cuadrado. Un pequeño regalo-película que se siente vivo, mucho más especial que una imagen fija. Sin voz, solo música.',
      '一段简短的视频祝福：AIfa 为你的场合画一张贺卡，配上一段温柔的器乐旋律，合成方形 MP4。一份有生命力的小电影礼物，远比静态图片特别。没有人声，只有音乐。'),
    asks: list([
      ПОВОД, КОМУ,
      l('Что нарисовать: букет, торт, закат, звёздное небо — или доверить AIfa', 'What to paint: flowers, a cake, a sunset, a starry sky — or leave it to AIfa', 'Qué pintar: flores, un pastel, un atardecer, un cielo estrellado — o dejarlo a AIfa', '画什么：花束、蛋糕、日落、星空——或交给 AIfa'),
      l('Какая музыка: нежная, праздничная, романтичная или весёлая', 'What music: gentle, festive, romantic or playful', 'Qué música: suave, festiva, romántica o alegre', '音乐：温柔、喜庆、浪漫或轻快'),
    ]),
    gets: list([l('Квадратное видео MP4 с иллюстрацией и мелодией', 'A square MP4 video with the illustration and the tune', 'Un video MP4 cuadrado con la ilustración y la melodía', '含插画与旋律的方形 MP4 视频')]),
    time: l('Несколько минут', 'A few minutes', 'Unos minutos', '几分钟'),
  },
  {
    id: 'voice', cat: 'music', icon: 'Volume2', price: '$0.99 · ⭐60',
    t: l('Голосовое сообщение от AIfa', 'Voice message from AIfa', 'Mensaje de voz de AIfa', 'AIfa 语音祝福'),
    d: l('Тёплое обращение на 30–60 секунд, которое AIfa произнесёт голосом.', 'A warm 30–60 second message that AIfa says aloud.', 'Un mensaje cálido de 30–60 segundos que AIfa dice en voz alta.', 'AIfa 亲口说出的 30–60 秒温暖祝福。'),
    full: l(
      'Поздравление, слова поддержки, признание или пожелание доброго утра — голосом AIfa. Она пишет текст на 30–60 секунд по вашим ответам и произносит его. Приходит обычным голосовым сообщением Telegram, которое можно переслать кому угодно.',
      'Birthday wishes, words of support, a confession or a good-morning note — in AIfa’s voice. She writes 30–60 seconds of text from your answers and says it. It arrives as an ordinary Telegram voice message you can forward to anyone.',
      'Una felicitación, palabras de apoyo, una confesión o unos buenos días — con la voz de AIfa. Escribe 30–60 segundos de texto con tus respuestas y lo dice. Llega como un mensaje de voz normal de Telegram que puedes reenviar a quien quieras.',
      '生日祝福、鼓励的话、告白或早安问候——由 AIfa 亲口说出。她根据你的回答写出 30–60 秒的文字并朗读，以普通的 Telegram 语音消息送达，可以转发给任何人。'),
    asks: list([
      КОМУ,
      l('От кого и как вас назвать в сообщении', 'Who it is from and how to name you', 'De parte de quién y cómo nombrarte', '来自谁，以及在消息中如何称呼你'),
      ПОВОД,
      l('Что главное сказать', 'The main thing to say', 'Lo principal que decir', '最想说的话'),
      НАСТРОЕНИЕ,
      l('Язык: русский, английский или испанский', 'Language: English, Russian or Spanish', 'Idioma: español, inglés o ruso', '语言：英语、俄语或西班牙语'),
    ]),
    gets: list([
      l('Голосовое сообщение Telegram на 30–60 секунд', 'A 30–60 second Telegram voice message', 'Un mensaje de voz de Telegram de 30–60 segundos', '30–60 秒的 Telegram 语音消息'),
      l('Текст сообщения — чтобы переслать и письменно', 'The text of the message, to forward in writing too', 'El texto del mensaje, para enviarlo también por escrito', '消息文字稿，也可以文字形式转发'),
    ]),
    time: l('Около минуты', 'About a minute', 'Alrededor de un minuto', '约一分钟'),
  },

  // ───────────── Книги и истории ─────────────
  {
    id: 'tale', cat: 'books', icon: 'BookOpen', price: '$6.99 · ⭐420',
    t: l('Интерактивная сказка', 'Interactive fairy tale', 'Cuento interactivo', '互动童话'),
    d: l('10 глав с иллюстрациями: герой — ваш ребёнок, сюжет выбираете вы. В конце — книга в PDF.', '10 illustrated chapters: your child is the hero and you choose the plot. Ends with a PDF book.', '10 capítulos ilustrados: tu hijo es el héroe y tú eliges la trama. Al final, un libro en PDF.', '10 章配图故事：你的孩子是主角，情节由你选择。最后生成 PDF 书。'),
    full: l(
      'Волшебная история из десяти глав, где главный герой — ваш ребёнок, вы сами или любимый человек. К каждой главе AIfa рисует иллюстрацию, и герой на всех картинках один и тот же. После каждой главы вы выбираете, куда повернёт сюжет, — и следующая глава продолжает именно ваш выбор. В конце история собирается в книгу PDF с обложкой, всеми главами и иллюстрациями: её можно читать перед сном, распечатать и подарить.',
      'A magical ten-chapter story where the hero is your child, yourself or someone you love. AIfa paints an illustration for every chapter, and the hero looks the same in every picture. After each chapter you choose where the story goes next — and the next chapter continues from your choice. At the end the story becomes a PDF book with a cover, every chapter and every illustration: read it at bedtime, print it and give it as a gift.',
      'Una historia mágica de diez capítulos donde el héroe es tu hijo, tú o alguien a quien quieres. AIfa pinta una ilustración para cada capítulo y el héroe es el mismo en todas. Tras cada capítulo eliges hacia dónde va la historia, y el siguiente capítulo continúa tu elección. Al final se convierte en un libro PDF con portada, todos los capítulos e ilustraciones: para leer antes de dormir, imprimir y regalar.',
      '一个十章的魔法故事，主角是你的孩子、你自己或你爱的人。AIfa 为每一章绘制插画，每幅画中的主角形象保持一致。每章结束后由你决定情节走向，下一章正是从你的选择继续。最后故事汇编成带封面、全部章节与插画的 PDF 书，可以睡前阅读、打印并作为礼物。'),
    asks: list([
      l('Как зовут героя', 'The hero’s name', 'El nombre del héroe', '主角的名字'),
      l('Сколько ему лет: 3–5, 6–8, 9–12 или взрослый', 'Their age: 3–5, 6–8, 9–12 or an adult', 'Su edad: 3–5, 6–8, 9–12 o adulto', '年龄：3–5 岁、6–8 岁、9–12 岁或成人'),
      l('Что он любит: увлечения, игрушки, животные', 'What they love: hobbies, toys, animals', 'Lo que le gusta: aficiones, juguetes, animales', '喜欢什么：爱好、玩具、动物'),
      l('Где происходит сказка: волшебный лес, космос, подводное царство и другие миры', 'Where it happens: an enchanted forest, outer space, an underwater kingdom and other worlds', 'Dónde ocurre: un bosque encantado, el espacio, un reino submarino y otros mundos', '故事发生在哪里：魔法森林、太空、海底王国等'),
      l('Чему сказка должна научить: смелости, доброте, дружбе, честности', 'What it should teach: courage, kindness, friendship, honesty', 'Qué debe enseñar: valentía, bondad, amistad, honestidad', '想传达的道理：勇气、善良、友谊、诚实'),
    ]),
    gets: list([
      l('10 глав, после каждой — выбор, куда пойдёт сюжет', '10 chapters, each followed by a choice of where the story goes', '10 capítulos, cada uno seguido de una elección sobre la trama', '10 章故事，每章后选择情节走向'),
      l('Иллюстрацию к каждой главе, герой везде одинаковый', 'An illustration for every chapter, with the same-looking hero', 'Una ilustración por capítulo, con el mismo héroe en todas', '每章一幅插画，主角形象一致'),
      l('Книгу PDF с обложкой, всеми главами и картинками', 'A PDF book with a cover, all chapters and pictures', 'Un libro PDF con portada, todos los capítulos e imágenes', '含封面、全部章节与插画的 PDF 书'),
    ]),
    time: l('Каждая глава — около минуты, всё зависит от вашего темпа', 'About a minute per chapter — it goes at your pace', 'Alrededor de un minuto por capítulo, a tu ritmo', '每章约一分钟，进度由你掌握'),
  },
  {
    id: 'detective', cat: 'books', icon: 'ShieldAlert', price: '$6.99 · ⭐420',
    t: l('Интерактивный детектив', 'Interactive detective', 'Detective interactivo', '互动侦探故事'),
    d: l('10 иллюстрированных глав расследования, решения принимаете вы. В конце — книга в PDF.', '10 illustrated chapters of an investigation where you make the decisions. Ends with a PDF book.', '10 capítulos ilustrados de una investigación donde tú decides. Al final, un libro en PDF.', '10 章配图侦查故事，由你做出决定。最后生成 PDF 书。'),
    full: l(
      'Расследование, в котором сыщик — вы. AIfa создаёт персональное дело, ведёт от улики к улике и иллюстрирует каждую главу, а на каждом повороте именно вы решаете, что делать дальше: кого допросить, какую улику проверить, кому поверить. Каждое прохождение своё. В конце всё дело собирается в книгу PDF с иллюстрациями.',
      'An investigation where you are the detective. AIfa builds a personal case, leads you from clue to clue and illustrates every chapter, while at every turn you decide what to do next: whom to question, which clue to check, whom to trust. Every playthrough is different. At the end the whole case becomes an illustrated PDF book.',
      'Una investigación donde el detective eres tú. AIfa crea un caso personal, te lleva de pista en pista e ilustra cada capítulo, y en cada giro tú decides qué hacer: a quién interrogar, qué pista revisar, en quién confiar. Cada partida es distinta. Al final todo el caso se convierte en un libro PDF ilustrado.',
      '一场由你担任侦探的调查。AIfa 为你打造专属案件，带你从一条线索走向下一条，并为每一章配图；每个转折点都由你决定下一步：审问谁、核查哪条线索、相信谁。每次体验都不同。最后整个案件汇编成带插画的 PDF 书。'),
    asks: list([
      l('Как зовут сыщика — можно своё имя', 'The detective’s name — it can be yours', 'El nombre del detective — puede ser el tuyo', '侦探的名字——可以用你自己的'),
      l('Где и когда дело: нуар 40-х, викторианский Лондон, современный мегаполис, космическая станция, загородная усадьба', 'Where and when: 1940s noir, Victorian London, a modern city, a space station, a country manor', 'Dónde y cuándo: noir de los 40, Londres victoriano, una metrópolis moderna, una estación espacial, una mansión de campo', '时间与地点：40 年代黑色电影风、维多利亚时代伦敦、现代都市、太空站、乡间庄园'),
      l('Настроение: классическое, мрачное или с юмором', 'Tone: classic, dark or with humour', 'Tono: clásico, oscuro o con humor', '基调：经典、黑暗或幽默'),
    ]),
    gets: list([
      l('10 глав расследования с выбором на каждом повороте', '10 chapters of the case with a choice at every turn', '10 capítulos del caso con una elección en cada giro', '10 章案件，每个转折都由你选择'),
      l('Иллюстрацию к каждой главе', 'An illustration for every chapter', 'Una ilustración por capítulo', '每章一幅插画'),
      l('Книгу PDF со всем делом', 'A PDF book of the whole case', 'Un libro PDF con todo el caso', '完整案件的 PDF 书'),
    ]),
    time: l('Каждая глава — около минуты, всё зависит от вашего темпа', 'About a minute per chapter — it goes at your pace', 'Alrededor de un minuto por capítulo, a tu ritmo', '每章约一分钟，进度由你掌握'),
  },
  {
    id: 'year_ahead', cat: 'books', icon: 'Star', price: '$4.99 · ⭐300',
    t: l('Прогноз на год вперёд', 'Your year ahead', 'Tu año por delante', '未来一年运势'),
    d: l('Обзор года, каждый из 12 месяцев подробно и с иллюстрацией, разбор главных сфер жизни.', 'A year overview, each of the 12 months in detail with an illustration, and the main areas of life.', 'Un resumen del año, cada uno de los 12 meses en detalle con ilustración, y las áreas principales de la vida.', '全年概览、12 个月逐月详解并配插画，以及人生主要领域解读。'),
    full: l(
      'Целая личная книга о наступающем годе: масштабный обзор, потом подробно каждый из двенадцати месяцев — с отдельной атмосферной иллюстрацией, — и разборы по главным сферам: любовь, деньги, карьера, здоровье, личный рост и удача. Тёплый, вдохновляющий и конкретный текст, написанный лично под вас, с акцентом на то, что для вас сейчас важнее всего.',
      'A whole private book about the coming year: a broad overview, then each of the twelve months in detail — with its own atmospheric illustration — and readings for the main areas of life: love, money, career, health, personal growth and luck. Warm, inspiring and concrete text written for you, with the focus on what matters most to you now.',
      'Todo un libro personal sobre el año que llega: un gran panorama, cada uno de los doce meses en detalle — con su propia ilustración — y lecturas de las áreas principales: amor, dinero, carrera, salud, crecimiento personal y suerte. Un texto cálido, inspirador y concreto escrito para ti, centrado en lo que más te importa ahora.',
      '一本关于来年的私人之书：先是全年总览，再逐月详解十二个月——每月配一幅氛围插画——并解读爱情、财富、事业、健康、个人成长与运气等主要领域。温暖、励志又具体的文字，专为你书写，重点放在你当下最在意的事情上。'),
    asks: list([
      l('Имя и дата рождения', 'Name and birth date', 'Nombre y fecha de nacimiento', '姓名与出生日期'),
      l('Главная цель или мечта на этот год', 'Your main goal or dream for the year', 'Tu meta o sueño principal del año', '今年最重要的目标或梦想'),
      l('На чём сделать акцент: любовь, карьера, деньги, здоровье или всё поровну', 'The focus: love, career, money, health or everything equally', 'El enfoque: amor, carrera, dinero, salud o todo por igual', '重点：爱情、事业、财富、健康或均衡'),
    ]),
    gets: list([
      l('Обзор года', 'A year overview', 'Un resumen del año', '全年概览'),
      l('12 месяцев подробно, у каждого своя иллюстрация', 'All 12 months in detail, each with its own illustration', 'Los 12 meses en detalle, cada uno con su ilustración', '12 个月逐月详解，每月一幅插画'),
      l('Разборы по сферам жизни', 'Readings for each area of life', 'Lecturas por área de la vida', '各人生领域的解读'),
    ]),
    time: l('Несколько минут', 'A few minutes', 'Unos minutos', '几分钟'),
  },

  // ───────────── Тексты, открытки и стикеры ─────────────
  {
    id: 'poem', cat: 'texts', icon: 'PenTool', price: '$0.99 · ⭐60',
    t: l('Персональный стих', 'Personal poem', 'Poema personal', '专属诗歌'),
    d: l('Стихотворение про вашего человека и ваш повод — от короткого до длинного.', 'A poem about your person and your occasion — from short to long.', 'Un poema sobre tu persona y tu ocasión, de corto a largo.', '为你的人与场合写的诗——长短可选。'),
    full: l(
      'Стихотворение, в котором каждая строчка — про одного конкретного человека. Вы рассказываете, кому оно, о ваших общих моментах и о том, что чувствуете, выбираете стиль и длину — а AIfa подбирает слова, рифму и ритм. Готовый текст можно отправить, прочитать вслух на празднике или вложить в открытку. Текст можно бесплатно переделать дважды.',
      'A poem where every line is about one real person. You tell who it is for, your shared moments and what you feel, pick the style and length — and AIfa finds the words, rhyme and rhythm. Send the finished text, read it aloud at a celebration or tuck it into a card. You can have it redone twice for free.',
      'Un poema en el que cada verso habla de una persona real. Cuentas para quién es, vuestros momentos y lo que sientes, eliges estilo y extensión, y AIfa encuentra las palabras, la rima y el ritmo. Envíalo, léelo en voz alta en la fiesta o ponlo en una tarjeta. Puedes rehacerlo dos veces gratis.',
      '一首每一行都写给某个人的诗。你讲讲送给谁、你们共同的回忆和你的感受，选择风格与长度——AIfa 为你找到词句、韵脚与节奏。成品可以发送、在聚会上朗读或放进贺卡。可免费修改两次。'),
    asks: list([
      КОМУ, ПОВОД,
      l('О человеке: какой он, что вас связывает, общие воспоминания, имена и детали', 'About the person: what they are like, what connects you, shared memories, names and details', 'Sobre la persona: cómo es, qué os une, recuerdos, nombres y detalles', '关于这个人：他的样子、你们的联系、共同回忆、名字与细节'),
      l('Как писать: классика с рифмой, современный стих, свободный стих или как песня с припевом', 'How to write it: classic rhymed, modern, free verse or song-like with a refrain', 'Cómo escribirlo: clásico con rima, moderno, verso libre o como canción con estribillo', '写法：经典押韵、现代诗、自由诗或带副歌的歌谣体'),
      НАСТРОЕНИЕ,
      l('Длина: 4–8, 12–16 или 20–28 строк', 'Length: 4–8, 12–16 or 20–28 lines', 'Extensión: 4–8, 12–16 o 20–28 versos', '长度：4–8 行、12–16 行或 20–28 行'),
      ПОЖЕЛАНИЯ,
    ]),
    gets: list([
      l('Готовое стихотворение нужной длины', 'The finished poem at the length you chose', 'El poema terminado con la extensión elegida', '所选长度的完整诗作'),
      l('Голосовое: AIfa читает стих вслух', 'A voice message: AIfa reads the poem aloud', 'Un mensaje de voz: AIfa lee el poema en voz alta', '语音：AIfa 朗读这首诗'),
      l('Открытку с первыми строками', 'A card with the opening lines', 'Una postal con los primeros versos', '附开头诗句的贺卡'),
      l('Две бесплатные переделки', 'Two free rewrites', 'Dos reescrituras gratis', '两次免费修改'),
    ]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'love_letter', cat: 'texts', icon: 'Heart', price: '$0.99 · ⭐60',
    t: l('Любовное письмо', 'Love letter', 'Carta de amor', '情书'),
    d: l('Искреннее признание по вашим воспоминаниям, в вашем тоне.', 'A sincere confession built on your memories, in your own tone.', 'Una confesión sincera basada en tus recuerdos, con tu propio tono.', '以你的回忆写成的真挚告白，保留你的语气。'),
    full: l(
      'Письмо, которое говорит то, что трудно выразить самому. Вы делитесь, сколько вы вместе, что любите в человеке, какие моменты вспоминаете и что главное хотите сказать, — и AIfa сплетает из этого строки в вашем собственном тоне, от первого трепета до глубокой преданности. Такие письма перечитывают и хранят между страниц книги.',
      'A letter that says what is hard to put into words yourself. You share how long you have been together, what you love about them, the moments you remember and the main thing you want to say — and AIfa weaves it into lines in your own voice, from the first flutter to deep devotion. Letters like this get reread and kept between the pages of a book.',
      'Una carta que dice lo que cuesta expresar uno mismo. Compartes cuánto tiempo lleváis juntos, qué amas de esa persona, los momentos que recuerdas y lo principal que quieres decir, y AIfa lo teje en líneas con tu propia voz, del primer temblor a la devoción más honda. Cartas así se releen y se guardan entre las páginas de un libro.',
      '一封替你说出难以启齿之言的信。你分享在一起多久、爱对方的哪些地方、难忘的时刻和最想说的话——AIfa 用你自己的语气把它们织成字句，从最初的心动到深沉的眷恋。这样的信会被反复阅读，夹在书页里珍藏。'),
    asks: list([
      l('Имя любимого человека', 'Your beloved’s name', 'El nombre de tu amor', '爱人的名字'),
      l('Сколько вы вместе и как познакомились — по желанию', 'How long you have been together and how you met — optional', 'Cuánto tiempo lleváis juntos y cómo os conocisteis — opcional', '在一起多久、如何相识（可选）'),
      l('Что вы в нём любите, какие моменты вспоминаете', 'What you love about them, which moments you remember', 'Qué amas de esa persona, qué momentos recuerdas', '你爱对方的哪些地方、记得哪些时刻'),
      l('Что главное хотите сказать', 'The main thing you want to say', 'Lo principal que quieres decir', '最想说的话'),
      l('Настроение: нежное, страстное, трогательное или игривое', 'Tone: tender, passionate, touching or playful', 'Tono: tierno, apasionado, conmovedor o juguetón', '基调：温柔、热烈、感人或俏皮'),
      l('Длина: около 100, 200 или 350 слов', 'Length: about 100, 200 or 350 words', 'Extensión: unas 100, 200 o 350 palabras', '长度：约 100、200 或 350 词'),
    ]),
    gets: list([
      l('Готовое письмо выбранной длины', 'The finished letter at the chosen length', 'La carta terminada con la extensión elegida', '所选长度的完整情书'),
      l('Голосовое: AIfa читает письмо вслух', 'A voice message: AIfa reads the letter aloud', 'Un mensaje de voz: AIfa lee la carta en voz alta', '语音：AIfa 朗读这封信'),
      l('Открытку с началом письма', 'A card with the opening of the letter', 'Una postal con el comienzo de la carta', '附信件开头的贺卡'),
      l('Две бесплатные переделки', 'Two free rewrites', 'Dos reescrituras gratis', '两次免费修改'),
    ]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'postcard', cat: 'texts', icon: 'Send', price: '$0.99 · ⭐60',
    t: l('Открытка', 'Greeting card', 'Postal', '祝福贺卡'),
    d: l('Красивая картинка к поводу и тёплый текст поздравления.', 'A beautiful picture for the occasion and a warm greeting.', 'Una imagen bonita para la ocasión y un cálido texto de felicitación.', '为场合精心绘制的图片和温暖的祝福语。'),
    full: l(
      'Открытка, нарисованная под ваш повод и человека, с тёплым текстом поздравления. Вы выбираете вид — классический, современный, милый или роскошный с золотом, — подсказываете, что пожелать и от кого подписать. Её можно отправить в любой чат или распечатать.',
      'A card painted for your occasion and person, with a warm greeting text. You choose the design — classic, modern, cute or luxurious with gold — say what to wish and who it is from. Send it in any chat or print it.',
      'Una postal pintada para tu ocasión y tu persona, con un cálido texto de felicitación. Eliges el diseño — clásico, moderno, tierno o lujoso con oro — y dices qué desear y de parte de quién. Envíala a cualquier chat o imprímela.',
      '一张为你的场合与对象绘制的贺卡，配有温暖的祝福语。你可以选择风格——经典、现代、可爱或金色奢华——并说明祝福内容和署名。可以发到任何聊天或打印出来。'),
    asks: list([
      ПОВОД, КОМУ,
      l('Вид: классическая, современная, милая или роскошная с золотом', 'Design: classic, modern, cute or luxurious with gold', 'Diseño: clásica, moderna, tierna o lujosa con oro', '风格：经典、现代、可爱或金色奢华'),
      l('Что пожелать — или доверить AIfa', 'What to wish — or leave it to AIfa', 'Qué desear — o dejarlo a AIfa', '祝福内容——或交给 AIfa'),
      l('От кого подписать — по желанию', 'Who it is signed from — optional', 'De parte de quién — opcional', '署名（可选）'),
    ]),
    gets: list([
      l('Иллюстрацию-открытку', 'The illustrated card', 'La postal ilustrada', '插画贺卡'),
      l('Текст поздравления', 'The greeting text', 'El texto de felicitación', '祝福语'),
    ]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'image', cat: 'texts', icon: 'Image', price: '$0.99 · ⭐60',
    t: l('Картинка по описанию', 'Image from a description', 'Imagen por descripción', '按描述生成图片'),
    d: l('Иллюстрация, арт или обложка по вашему описанию, в нужном стиле.', 'An illustration, artwork or cover from your description, in the style you want.', 'Una ilustración, arte o portada según tu descripción, en el estilo que quieras.', '按你的描述与风格生成插画、艺术作品或封面。'),
    full: l(
      'Уникальная картинка высокого качества точно по вашему описанию: открытка, сказочный портрет, фантастический пейзаж, арт для аватара или иллюстрация идеи из головы. Вы выбираете стиль — фотореализм, акварель, масло, аниме, 3D-мультфильм, цифровой арт или карандаш — и настроение цвета. Без водяных знаков и кривых надписей.',
      'A unique high-quality picture made exactly from your description: a card, a fairy-tale portrait, a fantasy landscape, avatar art or an illustration of an idea in your head. You choose the style — photorealistic, watercolour, oil, anime, 3D animated film, digital art or pencil — and the colour mood. No watermarks and no broken lettering.',
      'Una imagen única de alta calidad exactamente según tu descripción: una tarjeta, un retrato de cuento, un paisaje fantástico, arte para tu avatar o la ilustración de una idea. Eliges el estilo — fotorrealista, acuarela, óleo, anime, animación 3D, arte digital o lápiz — y el ambiente de color. Sin marcas de agua ni texto roto.',
      '完全依照你的描述生成的高质量独特图片：贺卡、童话肖像、奇幻风景、头像艺术或脑海中的创意插画。你可以选择风格——写实、水彩、油画、动漫、3D 动画、数字艺术或铅笔素描——以及色彩氛围。没有水印，也没有错乱的文字。'),
    asks: list([
      l('Что изобразить: кто или что, где, что происходит', 'What to show: who or what, where, what is happening', 'Qué mostrar: quién o qué, dónde, qué ocurre', '画什么：谁或什么、在哪里、正在发生什么'),
      l('Стиль: фотореализм, акварель, масло, аниме, 3D-мультфильм, цифровой арт, карандаш', 'Style: photorealistic, watercolour, oil, anime, 3D animated film, digital art, pencil', 'Estilo: fotorrealista, acuarela, óleo, anime, animación 3D, arte digital, lápiz', '风格：写实、水彩、油画、动漫、3D 动画、数字艺术、铅笔'),
      l('Цвета и настроение — по желанию', 'Colours and mood — optional', 'Colores y ambiente — opcional', '色彩与氛围（可选）'),
      ПОЖЕЛАНИЯ,
    ]),
    gets: list([l('Готовое изображение высокого качества', 'A finished high-quality image', 'Una imagen terminada de alta calidad', '一幅高质量成品图片')]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'stickerpack', cat: 'texts', icon: 'Smile', price: '$3.99 · ⭐240',
    t: l('Набор стикеров', 'Sticker pack', 'Pack de stickers', '贴纸包'),
    d: l('6 стикеров с вашим персонажем — настоящий набор Telegram.', '6 stickers of your character — a real Telegram pack.', '6 stickers de tu personaje: un pack real de Telegram.', '6 张以你的角色为主角的贴纸——真正的 Telegram 贴纸包。'),
    full: l(
      'Шесть стикеров вашего персонажа с шестью эмоциями: радость, любовь, смех, грусть, удивление и «привет» — или свои. AIfa создаёт настоящий набор стикеров Telegram: одно нажатие «Добавить стикеры», и он работает во всех чатах на телефоне и компьютере. Друзьям достаточно отправить любой стикер — и они добавят набор себе.',
      'Six stickers of your character with six emotions: joy, love, laughter, sadness, surprise and hello — or your own. AIfa creates a real Telegram sticker set: one tap on “Add stickers” and it works in every chat on phone and computer. Send any sticker to friends and they can add the set too.',
      'Seis stickers de tu personaje con seis emociones: alegría, amor, risa, tristeza, sorpresa y hola — o las tuyas. AIfa crea un pack real de Telegram: un toque en «Añadir stickers» y funciona en todos los chats del móvil y el ordenador. Envía cualquier sticker a tus amigos y también podrán añadir el pack.',
      '你的角色的六张贴纸，六种情绪：开心、爱、大笑、难过、惊讶和打招呼——也可以自定义。AIfa 创建真正的 Telegram 贴纸包：点一下“添加贴纸”，即可在手机和电脑的所有聊天中使用。把任意一张贴纸发给朋友，他们也能添加整套。'),
    asks: list([
      l('Кто на стикерах: котик, пёсик, лисёнок, девушка, парень — или опишите своего персонажа', 'Who is on the stickers: a cat, a puppy, a fox, a girl, a guy — or describe your own character', 'Quién sale: un gatito, un perrito, un zorrito, una chica, un chico — o describe tu personaje', '贴纸主角：小猫、小狗、小狐狸、女孩、男孩——或描述你自己的角色'),
      l('Стиль: мультяшный, аниме, чиби, 3D или пиксель-арт', 'Style: cartoon, anime, chibi, 3D or pixel art', 'Estilo: caricatura, anime, chibi, 3D o pixel art', '风格：卡通、动漫、Q 版、3D 或像素'),
      l('Шесть эмоций — стандартный набор или свои', 'Six emotions — the standard set or your own', 'Seis emociones — el set estándar o las tuyas', '六种情绪——标准组合或自定义'),
    ]),
    gets: list([l('Настоящий набор стикеров Telegram из 6 штук', 'A real Telegram sticker set of 6', 'Un pack real de Telegram con 6 stickers', '包含 6 张贴纸的真正 Telegram 贴纸包')]),
    time: l('Около минуты', 'About a minute', 'Alrededor de un minuto', '约一分钟'),
  },

  // ───────────── Астрология и мистика ─────────────
  {
    id: 'astro_full', cat: 'mystic', icon: 'Sparkles', price: '$0.99 · ⭐60',
    t: l('Полный гороскоп', 'Full horoscope', 'Horóscopo completo', '完整星座运势'),
    d: l('Подробный личный разбор по имени и дате рождения, с PDF.', 'A detailed personal reading by name and birth date, with a PDF.', 'Una lectura personal detallada por nombre y fecha de nacimiento, con PDF.', '根据姓名与出生日期的详细个人解读，附 PDF。'),
    full: l(
      'Глубокий астрологический разбор по имени и дате рождения: ваш знак, характер и скрытые сильные стороны, тенденции в любви, деньгах, карьере и здоровье и то, на что звёзды указывают сейчас. Не сухой гороскоп из газеты, а тёплый подробный текст, в котором вы узнаёте себя. Приходит сообщением и файлом PDF.',
      'A deep astrological reading by name and birth date: your sign, your character and hidden strengths, your tendencies in love, money, career and health, and what the stars are pointing to right now. Not a dry newspaper horoscope but a warm, detailed text you recognise yourself in. It arrives as a message and as a PDF.',
      'Una lectura astrológica profunda por nombre y fecha de nacimiento: tu signo, tu carácter y fortalezas ocultas, tus tendencias en amor, dinero, carrera y salud, y lo que señalan las estrellas ahora. No es un horóscopo de periódico, sino un texto cálido y detallado en el que te reconoces. Llega como mensaje y en PDF.',
      '根据姓名与出生日期的深度占星解读：你的星座、性格与隐藏优势，你在爱情、财富、事业与健康上的倾向，以及星象此刻的指引。不是报纸上的干巴巴运势，而是一篇让你认出自己的温暖详细文字。以消息和 PDF 文件送达。'),
    asks: list([l('Имя и дата рождения', 'Name and birth date', 'Nombre y fecha de nacimiento', '姓名与出生日期')]),
    gets: list([
      l('Подробный личный гороскоп', 'A detailed personal horoscope', 'Un horóscopo personal detallado', '详细的个人星座运势'),
      l('Тот же текст в PDF', 'The same text as a PDF', 'El mismo texto en PDF', '同一内容的 PDF 文件'),
    ]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'name_secrets', cat: 'mystic', icon: 'Compass', price: '$0.99 · ⭐60',
    t: l('Тайна имени', 'Secret of your name', 'El secreto de tu nombre', '名字的奥秘'),
    d: l('Значение и происхождение имени, скрытая энергия и сильные стороны, с PDF.', 'The meaning and origin of a name, its hidden energy and strengths, with a PDF.', 'El significado y origen de un nombre, su energía oculta y fortalezas, con PDF.', '名字的含义与由来、隐藏能量与优势，附 PDF。'),
    full: l(
      'Путешествие в глубину любого имени: историческое значение и происхождение, скрытая энергия, сильные черты характера, которые оно обычно дарит, счастливые символы и тихие подсказки судьбы. Назовите своё имя или имя дорогого человека — и получите красивый текст-портрет. Приходит сообщением и файлом PDF.',
      'A journey into the depth of any name: its historical meaning and origin, its hidden energy, the character strengths it tends to give, lucky symbols and quiet hints of destiny. Give your own name or that of someone dear and get a beautiful word-portrait. It arrives as a message and as a PDF.',
      'Un viaje a la profundidad de cualquier nombre: su significado e historia, su energía oculta, las fortalezas que suele dar, sus símbolos de suerte y sus pistas de destino. Da tu nombre o el de un ser querido y recibe un hermoso retrato en palabras. Llega como mensaje y en PDF.',
      '走进任何一个名字的深处：它的历史含义与由来、隐藏的能量、通常赋予的性格优势、幸运象征与命运的轻声提示。说出你自己或亲人的名字，就能得到一幅优美的文字肖像。以消息和 PDF 文件送达。'),
    asks: list([l('Имя — своё или дорогого человека', 'A name — yours or someone dear to you', 'Un nombre — el tuyo o el de un ser querido', '一个名字——你的或亲人的')]),
    gets: list([
      l('Текст-портрет имени', 'A word-portrait of the name', 'Un retrato del nombre en palabras', '名字的文字肖像'),
      l('Тот же текст в PDF', 'The same text as a PDF', 'El mismo texto en PDF', '同一内容的 PDF 文件'),
    ]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'dream', cat: 'mystic', icon: 'Moon', price: '$0.99 · ⭐60',
    t: l('Толкование сна', 'Dream interpretation', 'Interpretación de sueños', '解梦'),
    d: l('Символический и психологический разбор сна с учётом вашей жизни.', 'A symbolic and psychological reading of your dream in the context of your life.', 'Una lectura simbólica y psicológica de tu sueño según tu vida.', '结合你的生活，对梦境做象征与心理解读。'),
    full: l(
      'Вдумчивый разбор вашего сна: AIfa раскрывает возможные значения его образов и связывает их с вашими чувствами и тем, что сейчас происходит в жизни. Не банальный «сонник», а тёплая интерпретация, которая помогает услышать подсказку подсознания. Чем подробнее вы опишете сон и свою ситуацию, тем точнее толкование.',
      'A thoughtful reading of your dream: AIfa unfolds the possible meanings of its images and connects them with your feelings and what is happening in your life now. Not a clichéd dream dictionary but a warm interpretation that helps you hear what your subconscious is hinting at. The more detail you give, the more precise the reading.',
      'Una lectura reflexiva de tu sueño: AIfa despliega los posibles significados de sus imágenes y los relaciona con tus emociones y lo que vives ahora. No es un diccionario de sueños, sino una interpretación cálida que te ayuda a oír a tu subconsciente. Cuanto más detalle des, más precisa será.',
      '对你的梦进行细致解读：AIfa 揭示梦中意象可能的含义，并与你的感受和当下生活联系起来。不是陈词滥调的“解梦词典”，而是帮助你听见潜意识提示的温暖解读。梦和处境描述得越详细，解读越准确。'),
    asks: list([
      l('Сон как можно подробнее: что видели, кто был рядом, чем закончилось', 'The dream in as much detail as possible: what you saw, who was there, how it ended', 'El sueño con el mayor detalle: qué viste, quién estaba, cómo terminó', '尽量详细地描述梦境：看到了什么、谁在身边、如何结束'),
      l('Что вы чувствовали: страх, радость, тревогу, покой, удивление', 'What you felt: fear, joy, anxiety, peace, surprise', 'Qué sentiste: miedo, alegría, ansiedad, paz, sorpresa', '梦中的感受：恐惧、喜悦、焦虑、平静、惊讶'),
      l('Что сейчас происходит в жизни — по желанию, но так точнее', 'What is going on in your life — optional, but it makes it more precise', 'Qué pasa en tu vida — opcional, pero lo hace más preciso', '当下的生活状况（可选，但会更准确）'),
    ]),
    gets: list([l('Подробное толкование сна', 'A detailed interpretation', 'Una interpretación detallada', '详细的梦境解读')]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'compatibility', cat: 'mystic', icon: 'Users', price: '$1.99 · ⭐120',
    t: l('Совместимость пары', 'Couple compatibility', 'Compatibilidad de pareja', '情侣契合度'),
    d: l('Астрология и нумерология двух людей: сильные стороны союза и советы.', 'Astrology and numerology of two people: the strengths of the bond and advice.', 'Astrología y numerología de dos personas: fortalezas y consejos.', '两人的占星与数字命理：关系优势与建议。'),
    full: l(
      'Тёплый и проницательный разбор связи двух людей: ваша химия, настоящие сильные стороны союза, точки притяжения и зоны, где стоит быть бережнее, — и в конце добрый практичный совет. Подходит влюблённым, супругам, друзьям, коллегам, родителям и детям — или просто из любопытства.',
      'A warm and insightful reading of the bond between two people: your chemistry, the real strengths of the union, the points that draw you together and the areas to handle with care — ending with kind, practical advice. For lovers, spouses, friends, colleagues, parents and children — or simply out of curiosity.',
      'Una lectura cálida y perspicaz del vínculo entre dos personas: vuestra química, las fortalezas reales, los puntos de atracción y las zonas a cuidar, con un consejo amable y práctico al final. Para parejas, esposos, amigos, colegas, padres e hijos — o por pura curiosidad.',
      '对两人关系的温暖而深刻的解读：你们的化学反应、关系的真正优势、彼此吸引之处与需要呵护的方面，最后给出贴心实用的建议。适合恋人、夫妻、朋友、同事、父母与子女——或只是出于好奇。'),
    asks: list([
      l('Первый человек: имя и дата рождения', 'First person: name and birth date', 'Primera persona: nombre y fecha de nacimiento', '第一人：姓名与出生日期'),
      l('Второй человек: имя и дата рождения', 'Second person: name and birth date', 'Segunda persona: nombre y fecha de nacimiento', '第二人：姓名与出生日期'),
      l('Кто вы друг другу: пара, супруги, друзья, коллеги, родитель и ребёнок', 'Your relationship: a couple, married, friends, colleagues, parent and child', 'Vuestra relación: pareja, casados, amigos, colegas, padre e hijo', '关系：情侣、夫妻、朋友、同事、父母与子女'),
      l('Что особенно хочется понять — по желанию', 'Anything you especially want to understand — optional', 'Algo que quieras entender especialmente — opcional', '特别想了解的问题（可选）'),
    ]),
    gets: list([l('Подробный разбор совместимости с советами', 'A detailed compatibility reading with advice', 'Una lectura detallada de compatibilidad con consejos', '含建议的详细契合度解读')]),
    time: l('15–30 секунд', '15–30 seconds', '15–30 segundos', '15–30 秒'),
  },
  {
    id: 'tarot', cat: 'mystic', icon: 'Award', price: '$1.99 · ⭐120',
    t: l('Таро на 3 карты', '3-card tarot', 'Tarot de 3 cartas', '三张塔罗牌'),
    d: l('Прошлое, настоящее и будущее по вашему вопросу — с картами и PDF.', 'Past, present and future for your question — with the cards and a PDF.', 'Pasado, presente y futuro para tu pregunta, con las cartas y PDF.', '针对你的问题解读过去、现在与未来，附牌面与 PDF。'),
    full: l(
      'Настоящий расклад на ваш вопрос: AIfa вытягивает три карты колоды Уэйта в позициях Прошлое · Настоящее · Будущее, показывает изображение каждой и даёт глубокую понятную интерпретацию именно под вашу ситуацию, с конкретным советом в конце. Приходят сами карты, толкование и PDF с раскладом.',
      'A real spread for your question: AIfa draws three Rider-Waite cards in the positions Past · Present · Future, shows you each card and gives a deep, clear interpretation for your exact situation, ending with concrete advice. You receive the cards, the reading and a PDF of the spread.',
      'Una tirada real para tu pregunta: AIfa saca tres cartas de Rider-Waite en las posiciones Pasado · Presente · Futuro, te muestra cada una y da una interpretación profunda y clara para tu situación, con un consejo concreto al final. Recibes las cartas, la lectura y un PDF con la tirada.',
      '针对你的问题的真实牌阵：AIfa 从韦特塔罗牌中抽出三张，分别对应过去 · 现在 · 未来，展示每张牌面，并针对你的具体处境给出深刻清晰的解读，最后附上具体建议。你将收到牌面、解读和牌阵 PDF。'),
    asks: list([
      l('О какой сфере вопрос: любовь, работа и деньги, здоровье, выбор и решение', 'Which area: love, work and money, health, a choice to make', 'Qué área: amor, trabajo y dinero, salud, una decisión', '哪个领域：爱情、工作与财富、健康、抉择'),
      l('Сам вопрос своими словами', 'The question in your own words', 'La pregunta con tus palabras', '用你自己的话提出问题'),
    ]),
    gets: list([
      l('Три карты с изображениями', 'Three cards with their images', 'Tres cartas con sus imágenes', '三张牌及牌面图片'),
      l('Толкование и совет', 'The interpretation and advice', 'La interpretación y un consejo', '解读与建议'),
      l('PDF с раскладом', 'A PDF of the spread', 'Un PDF con la tirada', '牌阵 PDF'),
    ]),
    time: l('Около минуты', 'About a minute', 'Alrededor de un minuto', '约一分钟'),
  },
  {
    id: 'aifa_plus', cat: 'mystic', icon: 'CalendarHeart', price: '$4.99 · ⭐300',
    per: l('в месяц, отмена в любой момент', 'per month, cancel anytime', 'al mes, cancela cuando quieras', '每月，可随时取消'),
    t: l('AIfa+: прогноз каждый день', 'AIfa+: a forecast every day', 'AIfa+: un pronóstico cada día', 'AIfa+：每日运势'),
    d: l('Подписка: каждое утро — полный личный прогноз примерно на страницу.', 'Subscription: every morning, a full personal forecast of about a page.', 'Suscripción: cada mañana, un pronóstico personal completo de una página aprox.', '订阅：每天早晨收到约一页的完整个人运势。'),
    full: l(
      'Каждое утро AIfa присылает личный прогноз на день — примерно на страницу, по вашей дате рождения. Подписка оформляется звёздами Telegram на месяц и отменяется в любой момент.',
      'Every morning AIfa sends a personal forecast for the day — about a page, based on your birth date. The subscription is paid monthly in Telegram Stars and can be cancelled at any time.',
      'Cada mañana AIfa envía un pronóstico personal del día — de una página aprox., según tu fecha de nacimiento. La suscripción se paga mensualmente en Telegram Stars y se cancela cuando quieras.',
      'AIfa 每天早晨根据你的出生日期发送约一页的当日个人运势。订阅按月以 Telegram Stars 支付，可随时取消。'),
    asks: list([l('Дата рождения', 'Birth date', 'Fecha de nacimiento', '出生日期')]),
    gets: list([l('Прогноз на день каждое утро', 'A daily forecast every morning', 'Un pronóstico del día cada mañana', '每天早晨的当日运势')]),
    time: l('Каждое утро', 'Every morning', 'Cada mañana', '每天早晨'),
  },

  // ───────────── Наборы подарков ─────────────
  {
    id: 'bundle_romance', cat: 'sets', icon: 'Heart', price: '$1.99 · ⭐120',
    t: l('Романтический набор', 'Romantic set', 'Set romántico', '浪漫套装'),
    d: l('Стих, любовное письмо и иллюстрация — одним заказом.', 'A poem, a love letter and an illustration — in one order.', 'Un poema, una carta de amor y una ilustración, en un solo pedido.', '一首诗、一封情书和一幅插画，一次下单。'),
    full: l(
      'Три подарка про одного человека и одно чувство: персональный стих, нежное любовное письмо и красивая романтическая иллюстрация. Приходят вместе, как один сюрприз, — для годовщины, признания или просто чтобы человек почувствовал, как сильно он любим. Дешевле, чем по отдельности.',
      'Three gifts about one person and one feeling: a personal poem, a tender love letter and a beautiful romantic illustration. They arrive together as one surprise — for an anniversary, a confession or just to make someone feel how deeply they are loved. Cheaper than separately.',
      'Tres regalos sobre una persona y un sentimiento: un poema personal, una tierna carta de amor y una bella ilustración romántica. Llegan juntos como una sola sorpresa, para un aniversario, una confesión o para que alguien sienta cuánto se le quiere. Más barato que por separado.',
      '围绕同一个人、同一份感情的三份礼物：一首专属诗、一封温柔的情书和一幅美丽的浪漫插画。它们作为一个惊喜同时送达——适合纪念日、告白，或只是让对方感受到被深爱。比单独购买更便宜。'),
    asks: list([КОМУ, l('Что у вас на сердце: ваша история и чувства', 'What is in your heart: your story and feelings', 'Lo que hay en tu corazón: vuestra historia y sentimientos', '你的心意：你们的故事与感受'), НАСТРОЕНИЕ]),
    gets: list([
      l('Персональный стих', 'A personal poem', 'Un poema personal', '专属诗歌'),
      l('Любовное письмо', 'A love letter', 'Una carta de amor', '情书'),
      l('Романтическую иллюстрацию', 'A romantic illustration', 'Una ilustración romántica', '浪漫插画'),
    ]),
    time: l('Около минуты', 'About a minute', 'Alrededor de un minuto', '约一分钟'),
  },
  {
    id: 'bundle_mystic', cat: 'sets', icon: 'Sparkles', price: '$2.49 · ⭐150',
    t: l('Мистический набор', 'Mystic set', 'Set místico', '神秘套装'),
    d: l('Гороскоп, тайна имени и расклад Таро — одним заказом.', 'A horoscope, the secret of a name and a tarot reading — in one order.', 'Un horóscopo, el secreto de un nombre y una lectura de tarot, en un solo pedido.', '星座运势、名字的奥秘和塔罗解读，一次下单。'),
    full: l(
      'Три мистических разбора в одном: персональная астрология, тайна имени и настоящий расклад Таро на 3 карты. Назовите имя, дату рождения и вопрос для карт — и получите целый мистический портрет. Дешевле, чем по отдельности.',
      'Three mystical readings in one: personal astrology, the secret of a name and a real 3-card tarot spread. Give a name, a birth date and a question for the cards, and receive a whole mystical portrait. Cheaper than separately.',
      'Tres lecturas místicas en una: astrología personal, el secreto de un nombre y una tirada real de tarot de 3 cartas. Da un nombre, una fecha de nacimiento y una pregunta para las cartas, y recibe todo un retrato místico. Más barato que por separado.',
      '三份神秘解读合而为一：个人占星、名字的奥秘和真实的三张塔罗牌阵。提供姓名、出生日期和想问塔罗的问题，即可获得一幅完整的神秘画像。比单独购买更便宜。'),
    asks: list([
      l('Имя и дата рождения', 'Name and birth date', 'Nombre y fecha de nacimiento', '姓名与出生日期'),
      l('Вопрос для карт Таро', 'A question for the tarot cards', 'Una pregunta para el tarot', '想问塔罗的问题'),
    ]),
    gets: list([
      l('Астрологический разбор', 'An astrology reading', 'Una lectura astrológica', '占星解读'),
      l('Тайну имени', 'The secret of the name', 'El secreto del nombre', '名字的奥秘'),
      l('Расклад Таро с картами', 'A tarot spread with the cards', 'Una tirada de tarot con las cartas', '附牌面的塔罗牌阵'),
    ]),
    time: l('Около минуты', 'About a minute', 'Alrededor de un minuto', '约一分钟'),
  },
  {
    id: 'bundle', cat: 'sets', icon: 'Package', price: '$9.99 · ⭐600',
    t: l('Мега-набор: 7 подарков', 'Mega set: 7 gifts', 'Mega set: 7 regalos', '超级套装：7 份礼物'),
    d: l('Песня с вокалом, стих, письмо, иллюстрации, гороскоп, голосовое и открытка.', 'A vocal song, a poem, a letter, illustrations, a horoscope, a voice message and a card.', 'Canción con voz, poema, carta, ilustraciones, horóscopo, mensaje de voz y postal.', '人声歌曲、诗歌、情书、插画、星座运势、语音祝福和贺卡。'),
    full: l(
      'Семь подарков одному человеку, созданных вокруг одной истории: песня с вокалом, персональный стих, любовное письмо, две иллюстрации, астропрогноз с PDF, голосовое сообщение от AIfa и живая музыкальная открытка. По отдельности это стоило бы около $12.',
      'Seven gifts for one person, all built around one story: a song with vocals, a personal poem, a love letter, two illustrations, an astrology forecast with a PDF, a voice message from AIfa and a living musical card. Separately it would cost about $12.',
      'Siete regalos para una persona, todos en torno a una historia: una canción con voz, un poema personal, una carta de amor, dos ilustraciones, un pronóstico astral con PDF, un mensaje de voz de AIfa y una tarjeta musical viva. Por separado costaría unos $12.',
      '围绕同一个故事、送给同一个人的七份礼物：人声歌曲、专属诗歌、情书、两幅插画、附 PDF 的星座运势、AIfa 语音祝福和音乐视频贺卡。单独购买约需 $12。'),
    asks: list(ПЕСНЯ_ВОПРОСЫ),
    gets: list([
      l('Песню с вокалом', 'A song with vocals', 'Una canción con voz', '人声歌曲'),
      l('Стих и любовное письмо', 'A poem and a love letter', 'Un poema y una carta de amor', '诗歌与情书'),
      l('Две иллюстрации', 'Two illustrations', 'Dos ilustraciones', '两幅插画'),
      l('Астропрогноз с PDF', 'An astrology forecast with a PDF', 'Un pronóstico astral con PDF', '附 PDF 的星座运势'),
      l('Голосовое сообщение от AIfa', 'A voice message from AIfa', 'Un mensaje de voz de AIfa', 'AIfa 语音祝福'),
      l('Живую музыкальную открытку', 'A living musical card', 'Una tarjeta musical viva', '音乐视频贺卡'),
    ]),
    time: l('Несколько минут', 'A few minutes', 'Unos minutos', '几分钟'),
  },
];

/**
 * 01.10.2026, вечер — карточки до клика. Слово Архитектора: «РАСПИСАТЬ детально ВСЁ на странице, каждую услугу!»
 * и следом «Нужно просто сделать их шире и информативнее до клика мышью».
 *   for     — кому и для какого повода подходит услуга (видно на карточке без клика);
 *   preview — картинка из НАСТОЯЩЕГО образца этой же услуги (public/creativity/samples), чужих картинок нет;
 *   contain — показывать картинку целиком (стикеры на прозрачном фоне, карта Таро), без обрезки.
 * Услуги без картинки в образце (стих, письмо, голосовое, разборы) показывают знак услуги.
 */
export const CARD: Record<string, { for: L; preview?: string; contain?: boolean }> = {
  song: { preview: '/creativity/samples/song/cover.webp', for: l(
    'Для подарка, фона к видео, тренировки, сна или свидания — когда нужна своя музыка, которой нет ни у кого.',
    'For a gift, a video background, a workout, sleep or a date — when you want music nobody else has.',
    'Para un regalo, fondo de video, entrenamiento, dormir o una cita — cuando quieres música que nadie más tiene.',
    '适合作为礼物、视频背景、健身、助眠或约会——想要一首别人没有的音乐时。') },
  song_vocal: { for: l(
    'Маме на день рождения, любимой на годовщину, друзьям на свадьбу — когда хочется подарить то, что будут переслушивать годами.',
    'For mom’s birthday, an anniversary, friends’ wedding — when you want a gift people will replay for years.',
    'Para el cumpleaños de mamá, un aniversario, la boda de unos amigos — cuando quieres un regalo que se escuche durante años.',
    '妈妈的生日、纪念日、朋友的婚礼——想送一份会被反复聆听多年的礼物时。') },
  lyric_video: { preview: '/creativity/samples/lyric_video/poster.webp', for: l(
    'Когда песню хочется не только подарить, но и показать: в сторис, в семейном чате, на экране во время праздника.',
    'When you want to not only give the song but show it: in stories, in the family chat, on screen at the party.',
    'Cuando quieres no solo regalar la canción sino mostrarla: en historias, en el chat familiar, en pantalla durante la fiesta.',
    '不只想送出这首歌，还想展示出来：发快拍、发家庭群、在聚会上投屏播放。') },
  music_card: { preview: '/creativity/samples/music_card/poster.webp', for: l(
    'Вместо обычной картинки в мессенджере — поздравление, которое звучит. Для дня рождения, праздника, «спасибо» или «скучаю».',
    'Instead of an ordinary picture in a messenger — a greeting that plays music. For a birthday, a holiday, a “thank you” or “I miss you”.',
    'En lugar de una imagen común — una felicitación que suena. Para un cumpleaños, una fiesta, un «gracias» o un «te extraño».',
    '代替聊天里普通的图片——一份会响起音乐的祝福。适合生日、节日、道谢或“想你了”。') },
  voice: { for: l(
    'Когда не можете позвонить сами или не находите слов: поздравление, поддержка, «доброе утро» любимому человеку.',
    'When you can’t call yourself or can’t find the words: birthday wishes, support, a “good morning” to someone you love.',
    'Cuando no puedes llamar o no encuentras las palabras: felicitaciones, apoyo, un «buenos días» a quien quieres.',
    '当你无法亲自打电话或找不到合适的话：生日祝福、鼓励，或对爱人说声“早安”。') },
  tale: { preview: '/creativity/samples/tale/ch01.webp', for: l(
    'Ребёнку 3–12 лет на ночь, в подарок на день рождения, бабушке — читать внуку. Ребёнок узнаёт себя в главном герое.',
    'For a child aged 3–12 at bedtime, as a birthday gift, for grandma to read to her grandchild. The child recognises themselves in the hero.',
    'Para un niño de 3 a 12 años antes de dormir, como regalo de cumpleaños, para que la abuela se lo lea al nieto. El niño se reconoce en el héroe.',
    '适合 3–12 岁孩子的睡前故事、生日礼物，或让奶奶读给孙辈听。孩子会在主角身上认出自己。') },
  detective: { for: l(
    'Для любителей загадок — себе на вечер или в подарок: друг станет сыщиком в собственном деле.',
    'For mystery lovers — an evening for yourself or a gift: a friend becomes the detective of their own case.',
    'Para amantes del misterio — una tarde para ti o un regalo: tu amigo se convierte en el detective de su propio caso.',
    '献给推理爱好者——给自己一个夜晚，或作为礼物：让朋友成为自己案件的侦探。') },
  year_ahead: { preview: '/creativity/samples/year_ahead/m01.webp', for: l(
    'На день рождения, Новый год или начало нового этапа — себе или близкому, который строит планы.',
    'For a birthday, New Year or the start of a new chapter — for yourself or someone making plans.',
    'Para un cumpleaños, Año Nuevo o el inicio de una nueva etapa — para ti o para alguien que hace planes.',
    '适合生日、新年或人生新阶段的开始——送给自己或正在规划未来的人。') },
  poem: { for: l(
    'Прочитать вслух на юбилее, вложить в открытку, отправить утром — маме, жене, учителю, другу.',
    'Read it aloud at a jubilee, tuck it into a card, send it in the morning — to mom, a partner, a teacher, a friend.',
    'Para leerlo en voz alta en una celebración, ponerlo en una tarjeta o enviarlo por la mañana — a mamá, a tu pareja, a un maestro, a un amigo.',
    '在寿宴上朗读、放进贺卡、清晨发送——献给妈妈、爱人、老师或朋友。') },
  love_letter: { for: l(
    'Для годовщины, признания, примирения или когда вы далеко друг от друга.',
    'For an anniversary, a confession, making up after a quarrel or when you are far apart.',
    'Para un aniversario, una confesión, una reconciliación o cuando estáis lejos.',
    '适合纪念日、告白、和好，或两人相隔两地时。') },
  postcard: { preview: '/creativity/samples/postcard/card.webp', for: l(
    'Поздравить коллегу, родственника или клиента красиво и лично — за полминуты.',
    'To congratulate a colleague, a relative or a client beautifully and personally — in half a minute.',
    'Para felicitar a un colega, un familiar o un cliente de forma bonita y personal — en medio minuto.',
    '半分钟内，用精美而有心意的方式祝贺同事、亲戚或客户。') },
  image: { preview: '/creativity/samples/image/image.webp', for: l(
    'Аватар, обложка, иллюстрация к посту, подарок-портрет или картинка, которая давно живёт у вас в голове.',
    'An avatar, a cover, a post illustration, a portrait gift or a picture that has long lived in your head.',
    'Un avatar, una portada, una ilustración para un post, un retrato de regalo o esa imagen que llevas tiempo imaginando.',
    '头像、封面、帖子配图、肖像礼物，或你脑海中早已成形的画面。') },
  stickerpack: { preview: '/creativity/samples/stickerpack/s2.webp', contain: true, for: l(
    'Свои стикеры для семейного чата, пары, команды или канала: питомец, вы сами, талисман бренда.',
    'Your own stickers for a family chat, a couple, a team or a channel: your pet, yourself, a brand mascot.',
    'Stickers propios para el chat familiar, la pareja, el equipo o un canal: tu mascota, tú mismo, la mascota de una marca.',
    '为家庭群、情侣、团队或频道打造专属贴纸：你的宠物、你自己或品牌吉祥物。') },
  astro_full: { for: l(
    'Себе — чтобы лучше понять себя, или близкому на день рождения: нужны только имя и дата рождения.',
    'For yourself — to understand yourself better — or for someone dear on their birthday: just a name and birth date.',
    'Para ti — para conocerte mejor — o para un ser querido en su cumpleaños: solo nombre y fecha de nacimiento.',
    '送给自己，更好地了解自己；或在亲人生日时送给对方：只需姓名和出生日期。') },
  name_secrets: { for: l(
    'Будущим родителям, выбирающим имя, на именины или просто чтобы узнать, что скрыто в вашем имени.',
    'For parents-to-be choosing a name, for a name day, or just to learn what your name holds.',
    'Para futuros padres que eligen nombre, para un santo, o simplemente para saber qué guarda tu nombre.',
    '适合正在为宝宝取名的准父母、命名日，或只是想知道自己名字里藏着什么。') },
  dream: { for: l(
    'Когда сон не отпускает с утра и хочется понять, о чём он.',
    'When a dream stays with you all morning and you want to understand it.',
    'Cuando un sueño no te suelta en toda la mañana y quieres entenderlo.',
    '当一个梦整个早上挥之不去，你想弄明白它在说什么。') },
  compatibility: { for: l(
    'Паре, супругам, друзьям, коллегам или родителю с ребёнком — с ответом на ваш собственный вопрос.',
    'For a couple, spouses, friends, colleagues or a parent and child — with an answer to your own question.',
    'Para una pareja, esposos, amigos, colegas o padre e hijo — con respuesta a tu propia pregunta.',
    '适合情侣、夫妻、朋友、同事或父母与孩子——并回答你自己的问题。') },
  tarot: { preview: '/creativity/samples/tarot/card1.webp', contain: true, for: l(
    'Когда стоите перед выбором — работа, отношения, переезд — и хочется взглянуть на ситуацию со стороны.',
    'When you face a choice — work, a relationship, a move — and want to see the situation from the outside.',
    'Cuando estás ante una decisión — trabajo, relación, mudanza — y quieres ver la situación desde fuera.',
    '当你面临抉择——工作、感情、搬家——想从旁观者的角度看清局面时。') },
  aifa_plus: { for: l(
    'Тем, кто любит начинать утро с прогноза: каждый день AIfa пишет новый текст лично под вашу дату рождения.',
    'For those who like to start the morning with a forecast: every day AIfa writes a new text for your own birth date.',
    'Para quien le gusta empezar la mañana con un pronóstico: cada día AIfa escribe un texto nuevo para tu fecha de nacimiento.',
    '献给喜欢以运势开启早晨的人：AIfa 每天根据你的出生日期写一篇全新的文字。') },
  bundle_romance: { preview: '/creativity/samples/bundle_romance/image.webp', for: l(
    'Годовщина, 14 февраля, предложение руки и сердца — три подарка одним сюрпризом за $1.99 вместо $2.97 по отдельности.',
    'An anniversary, Valentine’s Day, a proposal — three gifts in one surprise for $1.99 instead of $2.97 separately.',
    'Un aniversario, San Valentín, una pedida de mano — tres regalos en una sola sorpresa por $1.99 en vez de $2.97 por separado.',
    '纪念日、情人节、求婚——三份礼物合成一个惊喜，只需 $1.99，单买需 $2.97。') },
  bundle_mystic: { preview: '/creativity/samples/bundle_mystic/card1.webp', contain: true, for: l(
    'Подруге, которая любит астрологию, или себе — полный мистический портрет за $2.49 вместо $3.97 по отдельности.',
    'For a friend who loves astrology, or for yourself — a whole mystical portrait for $2.49 instead of $3.97 separately.',
    'Para una amiga a la que le encanta la astrología, o para ti — un retrato místico completo por $2.49 en vez de $3.97 por separado.',
    '送给热爱占星的朋友，或送给自己——完整的神秘画像只需 $2.49，单买需 $3.97。') },
  bundle: { preview: '/creativity/samples/bundle/img2.webp', for: l(
    'Юбилей, свадьба, большая годовщина — когда одного подарка мало. Семь подарков вокруг одной вашей истории за $9.99 вместо ~$12.',
    'A milestone birthday, a wedding, a big anniversary — when one gift is not enough. Seven gifts around one story of yours for $9.99 instead of ~$12.',
    'Un cumpleaños redondo, una boda, un gran aniversario — cuando un regalo no basta. Siete regalos en torno a una historia tuya por $9.99 en vez de ~$12.',
    '整寿生日、婚礼、重要纪念日——一份礼物不够时。围绕你的一个故事的七份礼物，只需 $9.99，单买约 $12。') },
};

/** Услуги, которые бот открывает сразу по ссылке ?start=buy_<sku> (bot/src/bot.ts, SKU_INFO; у AIfa+ своего входа нет). */
export const В_БОТЕ_СРАЗУ = new Set([
  'song', 'song_vocal', 'lyric_video', 'music_card', 'voice', 'tale', 'detective', 'year_ahead', 'poem', 'love_letter',
  'postcard', 'image', 'stickerpack', 'astro_full', 'name_secrets', 'dream', 'compatibility', 'tarot',
  'bundle_romance', 'bundle_mystic', 'bundle',
]);

/** Образцы, у которых есть отдельный файл на язык: <id>.<lang>.json (01.10.2026 — песни, видео, иллюстрации
 * у каждого языка свои, из настоящего заказа на этом языке). Пишет сборщик собрать_образцы_0110_медиа.py. */
export const SAMPLE_LANGS: Record<string, string[]> = { bundle: ['en', 'es'], bundle_mystic: ['en', 'es'], bundle_romance: ['en', 'es'], lyric_video: ['en', 'es'], postcard: ['en', 'es'], song_vocal: ['en', 'es'], tale: ['en', 'es'], detective: ['en', 'es', 'zh'], year_ahead: ['en', 'es'] };
