"use client";

/**
 * Голос AIfa — слух и речь.
 *
 * Слух (речь → текст) работает в браузере: Web Speech API, бесплатно, ничего
 * никуда не уходит. Речь (текст → голос) устроена ЛЕСЕНКОЙ, сверху вниз:
 *
 *   1. СЕРВЕРНЫЙ НЕЙРОГОЛОС — `/api/voice`. Живая интонация, дыхание, паузы.
 *      Включается Архитектором и стоит денег, поэтому может быть выключен.
 *   2. ГОЛОС БРАУЗЕРА — всегда бесплатен и работает везде.
 *
 * Если верхняя ступень недоступна по любой причине — выключена, нет ключа,
 * исчерпан месячный потолок, упала сеть, — клиент молча берёт нижнюю. Пользователь
 * не видит ошибок: голос просто становится проще. Сломаться эта конструкция не
 * может по устройству.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ПОЧЕМУ ГОЛОС БРАУЗЕРА ЗВУЧАЛ ХУЖЕ, ЧЕМ УМЕЕТ. Прежний код имел три изъяна, и
 * каждый слышен ухом:
 *
 *   • `getVoices()` в Chrome заполняется АСИНХРОННО. При первом вызове список
 *     пуст, а спрашивали его прямо в момент речи — поэтому ПЕРВУЮ фразу (ту
 *     самую, по которой судят) читал голос по умолчанию, обычно худший из всех.
 *     Теперь список забирается заранее и обновляется по событию `voiceschanged`.
 *
 *   • Отбор голоса шёл по образцу `/female|woman|Milena|Google/`. Русскую
 *     «Microsoft Irina» он не узнаёт, испанскую «Monica» тоже — и выбор
 *     сваливался на первый попавшийся голос языка, сплошь и рядом мужской.
 *     Теперь есть поимённый список хороших голосов на каждый наш язык.
 *
 *   • Ответ произносился одним куском. Отсюда монотонность — и обрыв на
 *     полуслове: Chrome глушит речь примерно через пятнадцать секунд. Теперь
 *     текст делится на предложения, между ними живая пауза, а таймер Chrome
 *     каждый раз начинается заново и до обрыва не доживает.
 *
 * И главная бесплатная находка: в Edge и Chrome под Windows среди голосов есть
 * НАСТОЯЩИЕ НЕЙРОСЕТЕВЫЕ — у них в названии стоит «Natural» или «Online». Они
 * звучат несравнимо живее обычных и не стоят ничего. Ищем их первыми.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/** Наш код языка (ru/en/es/zh) → метка, понятная речевым движкам. */
function localeToBcp47(locale: string): string {
  switch (locale) {
    case "ru":
      return "ru-RU";
    case "es":
      return "es-ES";
    case "zh":
      return "zh-CN";
    default:
      return "en-US";
  }
}

/**
 * Убирает всё, что AIfa не должна произносить вслух: значки, разметку Markdown,
 * ссылки и голые адреса. На экране текст остаётся каким был — это только для речи.
 */
function sanitizeForSpeech(input: string): string {
  let s = input || "";
  // Ссылки и картинки Markdown: [подпись](адрес) -> подпись
  s = s.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1");
  // Голые адреса
  s = s.replace(/https?:\/\/\S+/g, "");
  // Значки, пиктограммы, служебные символы склейки
  try {
    s = s.replace(/\p{Extended_Pictographic}/gu, "");
    s = s.replace(/[️‍⃣]/g, "");
  } catch {
    // Старые движки без свойств Unicode — убираем суррогатные пары и блоки символов
    s = s.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
    s = s.replace(/[←-➿⬀-⯿️‍⃣]/g, "");
  }
  // Знаки выделения, заголовков, цитат и кода
  s = s.replace(/[*_#`~>|]/g, "");
  // Схлопываем остатки пробелов
  s = s.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

/**
 * Делит текст на предложения для произнесения по одному.
 *
 * Даёт сразу три вещи: естественные паузы вместо сплошного бормотания, обход
 * пятнадцатисекундного глушителя Chrome и возможность остановиться мгновенно —
 * не дожидаясь конца длинного куска.
 *
 * Слишком длинное предложение дополнительно рубим по запятым: читать на одном
 * дыхании строку в триста знаков не станет и человек.
 */
function toSentences(text: string): string[] {
  const грубо = text
    .replace(/\n+/g, " \n ")
    // Три способа разделения, и третий здесь не для красоты: в китайском точка
    // и восклицательный знак — свои («。», «！», «？»), и пробела после них не
    // ставят. Прежний образец их не знал, поэтому ВЕСЬ китайский ответ уходил
    // одним куском: без пауз и прямо под пятнадцатисекундный глушитель Chrome.
    .split(/(?<=[.!?…])\s+|(?<=[。！？])|\s*\n\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  const итог: string[] = [];
  for (const кусок of грубо) {
    if (кусок.length <= 220) {
      итог.push(кусок);
      continue;
    }
    let текущий = "";
    // Здесь тоже нужны китайские запятые «，» и «、»: без них длинная китайская
    // фраза осталась бы одним куском даже после деления на предложения.
    for (const часть of кусок.split(/(?<=[,;:，、])\s*/)) {
      if ((текущий + " " + часть).trim().length > 220 && текущий) {
        итог.push(текущий.trim());
        текущий = часть;
      } else {
        текущий = (текущий + " " + часть).trim();
      }
    }
    if (текущий.trim()) итог.push(текущий.trim());
  }
  return итог;
}

/**
 * Поимённые списки хороших голосов на каждый наш язык, от лучшего к худшему.
 * Сравнение по вхождению подстроки без учёта регистра — названия у движков
 * отличаются припиской вроде «Desktop» или «Online (Natural)».
 */
const ХОРОШИЕ_ГОЛОСА: Record<string, string[]> = {
  ru: ["svetlana", "dariya", "irina", "milena", "katja", "google русский"],
  en: ["aria", "jenny", "michelle", "samantha", "zira", "google us english", "google uk english female"],
  es: ["elvira", "helena", "monica", "paulina", "laura", "google español"],
  zh: ["xiaoxiao", "xiaoyi", "huihui", "ting-ting", "tingting", "google 普通话"],
};

/** Голоса, которых избегаем: мужские там, где AIfa должна звучать собой. */
const МУЖСКИЕ = ["yuri", "pavel", "dmitry", "david", "mark", "guy", "jorge",
                 "pablo", "alvaro", "kangkang", "yunxi", "daniel", "george"];

/**
 * Выбирает лучший доступный голос для языка.
 *
 * Порядок важен и выстроен по слышимому качеству:
 *   1. нейросетевой голос нужного языка («Natural» / «Online») — их дают Edge и
 *      Chrome под Windows бесплатно, и они живее всех прочих на голову;
 *   2. голос из поимённого списка хороших;
 *   3. любой женский голос языка;
 *   4. любой голос языка вообще.
 */
function pickVoice(voices: SpeechSynthesisVoice[], bcp: string): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const база = bcp.split("-")[0];
  const свои = voices.filter((v) => v.lang?.toLowerCase().startsWith(база));
  if (!свои.length) return null;

  const имя = (v: SpeechSynthesisVoice) => (v.name || "").toLowerCase();
  const неМужской = (v: SpeechSynthesisVoice) => !МУЖСКИЕ.some((м) => имя(v).includes(м));

  const нейро = свои.filter((v) => /natural|online|neural/i.test(v.name) && неМужской(v));
  if (нейро.length) {
    const точный = нейро.find((v) => v.lang?.toLowerCase() === bcp.toLowerCase());
    return точный || нейро[0];
  }

  for (const образец of ХОРОШИЕ_ГОЛОСА[база] || []) {
    const найден = свои.find((v) => имя(v).includes(образец));
    if (найден) return найден;
  }

  const женский = свои.find((v) => /female|woman|женск/i.test(v.name) || неМужской(v));
  return женский || свои[0];
}

export interface UseVoiceChat {
  /** Микрофон сейчас слушает и расшифровывает. */
  listening: boolean;
  /** Ответ AIfa сейчас звучит вслух. */
  speaking: boolean;
  /** Умеет ли этот браузер распознавать речь. */
  supportsSTT: boolean;
  /** Умеет ли этот браузер произносить текст. */
  supportsTTS: boolean;
  /** Черновая расшифровка по ходу речи — для показа на экране. */
  interim: string;
  /** Код последней ошибки: '' | 'denied' | 'no-mic' | 'unsupported' | 'no-speech' | 'generic'. */
  error: string;
  /** Начать слушать; `onFinal` сработает один раз с готовой фразой. */
  startListening: (onFinal: (text: string) => void) => void;
  /** Прекратить слушать досрочно (если не слушали — ничего не делает). */
  stopListening: () => void;
  /** Произнести текст на текущем языке. */
  speak: (text: string) => void;
  /** Немедленно оборвать речь. */
  cancelSpeak: () => void;
  /**
   * Разблокировать звук внутри жеста пользователя. Мобильные браузеры не дают
   * ни говорить, ни проигрывать звук, если это не началось с касания, — зовём
   * при нажатии на кнопку микрофона, чтобы пришедший позже ответ смог зазвучать.
   */
  unlockTTS: () => void;
}

export function useVoiceChat(locale: string): UseVoiceChat {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState("");
  const [supportsSTT, setSupportsSTT] = useState(false);
  const [supportsTTS, setSupportsTTS] = useState(false);

  const recognitionRef = useRef<any>(null);
  const onFinalRef = useRef<((text: string) => void) | null>(null);
  const finalSentRef = useRef(false);

  /** Список голосов браузера. Заполняется асинхронно — держим наготове. */
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  /** Растёт на каждую новую речь: по нему прежняя понимает, что её отменили. */
  const поколениеRef = useRef(0);
  /** Проигрыватель серверного звука. */
  const audioRef = useRef<HTMLAudioElement | null>(null);
  /** Кэш серверных озвучек на этой вкладке: повтор не стоит ни запроса, ни денег. */
  const звукКэшRef = useRef<Map<string, string>>(new Map());
  /** Верхняя ступень недоступна — больше не дёргаем сервер до перезагрузки. */
  const серверМолчитRef = useRef(false);

  // Определяем возможности и заранее забираем список голосов.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    setSupportsSTT(!!SR);
    const синтез = typeof window.speechSynthesis !== "undefined";
    setSupportsTTS(синтез);
    if (!синтез) return;

    // 🔴 Здесь и была главная беда: в Chrome список приходит НЕ СРАЗУ. Спросив
    // его в момент речи, мы получали пустоту и читали первую фразу худшим
    // голосом. Забираем заранее и обновляем по событию.
    const обновить = () => {
      try {
        const список = window.speechSynthesis.getVoices?.() || [];
        if (список.length) voicesRef.current = список;
      } catch {
        /* движок недоступен — останемся с прежним списком */
      }
    };
    обновить();
    window.speechSynthesis.addEventListener?.("voiceschanged", обновить);
    // Подстраховка для движков, которые событие не шлют вовсе.
    const повтор = window.setTimeout(обновить, 1200);
    return () => {
      window.speechSynthesis.removeEventListener?.("voiceschanged", обновить);
      window.clearTimeout(повтор);
    };
  }, []);

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        /* уже остановлено */
      }
    }
    setListening(false);
  }, []);

  const cancelSpeak = useCallback(() => {
    поколениеRef.current += 1;              // прежняя речь считает себя отменённой
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
    const a = audioRef.current;
    if (a) {
      try {
        a.pause();
        a.currentTime = 0;
      } catch {
        /* ignore */
      }
    }
    setSpeaking(false);
  }, []);

  const startListening = useCallback(
    (onFinal: (text: string) => void) => {
      if (typeof window === "undefined") return;
      const SR =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (!SR) {
        setError("unsupported");
        return;
      }

      // Не говорим сами с собой — глушим речь перед открытием микрофона.
      cancelSpeak();
      setError("");

      const begin = () => {
        // Свернуть прежний сеанс, если он завис.
        if (recognitionRef.current) {
          try {
            recognitionRef.current.onend = null;
            recognitionRef.current.stop();
          } catch {
            /* ignore */
          }
        }

        const rec = new SR();
        rec.lang = localeToBcp47(locale);
        rec.interimResults = true;
        rec.continuous = false;
        rec.maxAlternatives = 1;

        onFinalRef.current = onFinal;
        finalSentRef.current = false;
        setInterim("");

        rec.onresult = (event: any) => {
          let finalText = "";
          let interimText = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const res = event.results[i];
            if (res.isFinal) finalText += res[0].transcript;
            else interimText += res[0].transcript;
          }
          if (interimText) setInterim(interimText);
          if (finalText && !finalSentRef.current) {
            finalSentRef.current = true;
            setInterim("");
            onFinalRef.current?.(finalText.trim());
          }
        };

        rec.onerror = (event: any) => {
          // Показываем отказ, чтобы кнопка не выглядела молча мёртвой.
          const code = event?.error;
          if (code === "not-allowed" || code === "service-not-allowed") {
            setError("denied");
          } else if (code === "no-speech") {
            setError("no-speech");
          } else if (code === "audio-capture") {
            setError("no-mic");
          } else if (code === "aborted") {
            // остановлено пользователем — не ошибка
          } else {
            setError("generic");
          }
          setListening(false);
          setInterim("");
        };

        rec.onend = () => {
          setListening(false);
          setInterim("");
        };

        recognitionRef.current = rec;
        try {
          rec.start();
          setListening(true);
        } catch {
          setListening(false);
          setError("generic");
        }
      };

      // Спрашиваем доступ к микрофону явно. getUserMedia надёжно поднимает
      // запрос браузера и даёт внятную ошибку при отказе — в отличие от
      // молчаливого пути внутри SpeechRecognition.
      const md = (navigator as any)?.mediaDevices;
      if (md?.getUserMedia) {
        md.getUserMedia({ audio: true })
          .then((stream: MediaStream) => {
            // Нужно было только разрешение — отпускаем микрофон сразу.
            stream.getTracks().forEach((track) => track.stop());
            begin();
          })
          .catch((err: any) => {
            const name = err?.name || "";
            if (name === "NotAllowedError" || name === "SecurityError") {
              setError("denied");
            } else if (name === "NotFoundError" || name === "OverconstrainedError") {
              setError("no-mic");
            } else {
              // getUserMedia почему-то недоступен — пробуем распознавание напрямую.
              begin();
            }
          });
      } else {
        begin();
      }
    },
    [locale, cancelSpeak]
  );

  // Мобильные браузеры не дают звучать тому, что не началось с касания.
  // Короткая беззвучная фраза и пустой проигрыватель внутри жеста «распечатывают»
  // оба движка, чтобы пришедший позже ответ смог зазвучать.
  const ttsUnlockedRef = useRef(false);
  const unlockTTS = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.speechSynthesis?.resume();
      if (!ttsUnlockedRef.current && window.speechSynthesis) {
        const warmup = new SpeechSynthesisUtterance(" ");
        warmup.volume = 0;
        window.speechSynthesis.speak(warmup);
      }
    } catch {
      /* ignore */
    }
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.preload = "auto";
      }
      if (!ttsUnlockedRef.current) {
        // Беззвучный запуск внутри жеста — снимает запрет автопроигрывания.
        audioRef.current.muted = true;
        audioRef.current.play().catch(() => {});
        audioRef.current.pause();
        audioRef.current.muted = false;
      }
    } catch {
      /* ignore */
    }
    ttsUnlockedRef.current = true;
  }, []);

  /** Нижняя ступень: голос браузера, по предложениям, с живыми паузами. */
  const говоритьБраузером = useCallback(
    (clean: string, поколение: number) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const предложения = toSentences(clean);
      if (!предложения.length) return;

      const bcp = localeToBcp47(locale);
      const голос = pickVoice(voicesRef.current, bcp);

      let индекс = 0;
      const дальше = () => {
        if (поколение !== поколениеRef.current) return;   // нас отменили
        if (индекс >= предложения.length) {
          setSpeaking(false);
          return;
        }
        const фраза = предложения[индекс++];
        const utter = new SpeechSynthesisUtterance(фраза);
        utter.lang = bcp;
        if (голос) utter.voice = голос;

        // Лёгкая разница между фразами вместо ровного бормотания: вопрос звучит
        // чуть выше и медленнее, восклицание — живее. Разброс намеренно
        // маленький: большие скачки звучат не живо, а нелепо.
        const вопрос = /[?？]\s*$/.test(фраза);
        const восклицание = /[!！]\s*$/.test(фраза);
        utter.rate = вопрос ? 0.98 : восклицание ? 1.06 : 1.02;
        utter.pitch = вопрос ? 1.14 : восклицание ? 1.12 : 1.06;

        utter.onstart = () => {
          if (поколение === поколениеRef.current) setSpeaking(true);
        };
        // Небольшая тишина между предложениями — то самое «дыхание».
        utter.onend = () => window.setTimeout(дальше, 140);
        utter.onerror = () => window.setTimeout(дальше, 60);

        try {
          window.speechSynthesis.resume();   // мобильные любят вставать на паузу
          window.speechSynthesis.speak(utter);
        } catch {
          setSpeaking(false);
        }
      };

      try {
        window.speechSynthesis.cancel();     // сбрасываем очередь прежней речи
      } catch {
        /* ignore */
      }
      дальше();
    },
    [locale]
  );

  /** Верхняя ступень: нейроголос с сервера. Вернёт false — значит не вышло. */
  const говоритьСервером = useCallback(
    async (clean: string, поколение: number): Promise<boolean> => {
      if (серверМолчитRef.current) return false;

      const ключ = `${locale}|${clean}`;
      let адрес = звукКэшRef.current.get(ключ);

      if (!адрес) {
        let ответ: Response;
        try {
          const управление = new AbortController();
          const таймер = window.setTimeout(() => управление.abort(), 15_000);
          try {
            ответ = await fetch("/api/voice", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: clean, locale }),
              signal: управление.signal,
            });
          } finally {
            window.clearTimeout(таймер);
          }
        } catch {
          return false;                       // сеть подвела — пусть скажет браузер
        }

        // 204 — «озвучки нет». Это штатный ответ: выключено, нет ключа или
        // исчерпан месячный потолок. Больше не спрашиваем до перезагрузки
        // страницы, чтобы не слать заведомо пустые запросы на каждую реплику.
        // 404 значит, что на этом сайте роут озвучки ещё не выложен, — тоже
        // навсегда, иначе будем стучаться в несуществующий адрес на каждую
        // реплику до конца сеанса.
        if (ответ.status === 204 || ответ.status === 404) {
          серверМолчитRef.current = true;
          return false;
        }
        if (!ответ.ok) return false;   // временный сбой — в следующий раз попробуем

        try {
          const blob = await ответ.blob();
          if (!blob || blob.size < 256) return false;
          адрес = URL.createObjectURL(blob);
          const кэш = звукКэшRef.current;
          if (кэш.size >= 20) {
            const давний = кэш.keys().next().value;
            if (давний !== undefined) {
              const старый = кэш.get(давний);
              if (старый) URL.revokeObjectURL(старый);
              кэш.delete(давний);
            }
          }
          кэш.set(ключ, адрес);
        } catch {
          return false;
        }
      }

      if (поколение !== поколениеRef.current) return true;   // отменили, пока ждали

      try {
        if (!audioRef.current) audioRef.current = new Audio();
        const a = audioRef.current;
        a.src = адрес;
        a.onplay = () => {
          if (поколение === поколениеRef.current) setSpeaking(true);
        };
        a.onended = () => {
          if (поколение === поколениеRef.current) setSpeaking(false);
        };
        a.onerror = () => setSpeaking(false);
        await a.play();
        return true;
      } catch {
        // Автопроигрывание запрещено или звук не открылся — вниз по лесенке.
        return false;
      }
    },
    [locale]
  );

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;
      const clean = sanitizeForSpeech(text);
      if (!clean) return;

      поколениеRef.current += 1;
      const поколение = поколениеRef.current;

      // Глушим всё, что звучит сейчас, — иначе два голоса наложатся друг на друга.
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* ignore */
      }
      const a = audioRef.current;
      if (a) {
        try {
          a.pause();
        } catch {
          /* ignore */
        }
      }

      void говоритьСервером(clean, поколение).then((вышло) => {
        if (вышло) return;
        if (поколение !== поколениеRef.current) return;      // отменили, пока ждали
        говоритьБраузером(clean, поколение);
      });
    },
    [говоритьСервером, говоритьБраузером]
  );

  // Уборка при размонтировании.
  useEffect(() => {
    const кэш = звукКэшRef.current;
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* ignore */
      }
      try {
        audioRef.current?.pause();
      } catch {
        /* ignore */
      }
      // Освобождаем память под сохранённые озвучки.
      кэш.forEach((адрес) => URL.revokeObjectURL(адрес));
      кэш.clear();
    };
  }, []);

  return {
    listening,
    speaking,
    supportsSTT,
    supportsTTS,
    interim,
    error,
    startListening,
    stopListening,
    speak,
    cancelSpeak,
    unlockTTS,
  };
}
