"use client";

/**
 * Voice I/O for AIfa — Phase 1 (browser-native, zero cost, zero grant spend).
 *
 * Speech-to-text uses the Web Speech API (SpeechRecognition); text-to-speech uses
 * SpeechSynthesis. Both run entirely client-side in the browser, so the only thing
 * that touches the Google grant is the LLM call (/api/aifa-chat), exactly as the
 * text chat already does.
 *
 * Designed to degrade gracefully: if a browser lacks either capability the hook
 * reports it via `supportsSTT` / `supportsTTS`, and the caller falls back to the
 * normal typed flow. Nothing here can break the page — every native call is guarded.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/** Map our app locale (ru/en/es/zh) to a BCP-47 tag the speech engines understand. */
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
 * Strip everything AIfa shouldn't read aloud: emojis/pictographs, Markdown
 * formatting characters (* _ # ` ~ >), link/image syntax and bare URLs — leaving
 * clean spoken text only. Visual text on screen is untouched; this only affects TTS.
 */
function sanitizeForSpeech(input: string): string {
  let s = input || "";
  // Markdown links/images: [label](url) -> label, ![alt](url) -> alt
  s = s.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1");
  // Bare URLs
  s = s.replace(/https?:\/\/\S+/g, "");
  // Emojis, pictographs, variation selectors, zero-width joiners
  try {
    s = s.replace(/\p{Extended_Pictographic}/gu, "");
    s = s.replace(/[️‍⃣]/g, ""); // variation selector, ZWJ, keycap
  } catch {
    // Older engines without Unicode property escapes — strip astral-plane
    // emoji (surrogate pairs) plus the common BMP symbol blocks.
    s = s.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");
    s = s.replace(/[←-➿⬀-⯿️‍⃣]/g, "");
  }
  // Markdown emphasis / headings / quotes / code marks
  s = s.replace(/[*_#`~>|]/g, "");
  // Collapse leftover whitespace
  s = s.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  return s;
}

export interface UseVoiceChat {
  /** True while the mic is actively transcribing. */
  listening: boolean;
  /** True while AIfa's reply is being spoken aloud. */
  speaking: boolean;
  /** Whether this browser can transcribe speech. */
  supportsSTT: boolean;
  /** Whether this browser can speak text. */
  supportsTTS: boolean;
  /** Live partial transcript while listening (for on-screen feedback). */
  interim: string;
  /** Last error code, for on-screen feedback: '' | 'denied' | 'no-mic' | 'unsupported' | 'no-speech' | 'generic'. */
  error: string;
  /** Start listening; `onFinal` fires once with the finished utterance. */
  startListening: (onFinal: (text: string) => void) => void;
  /** Stop listening early (no-op if not listening). */
  stopListening: () => void;
  /** Speak a string aloud in the current locale; resolves when done/cancelled. */
  speak: (text: string) => void;
  /** Immediately stop any ongoing speech. */
  cancelSpeak: () => void;
  /**
   * Unlock TTS within a user gesture. Mobile browsers (Android Chrome) block
   * speechSynthesis.speak() unless it was first invoked from a tap; call this in
   * the mic-button click handler so the later reply can be spoken.
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

  // Detect capabilities once, on the client only.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    setSupportsSTT(!!SR);
    setSupportsTTS(typeof window.speechSynthesis !== "undefined");
  }, []);

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        /* already stopped */
      }
    }
    setListening(false);
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

      // Don't talk over ourselves — stop any speech before opening the mic.
      try {
        window.speechSynthesis?.cancel();
      } catch {
        /* ignore */
      }
      setSpeaking(false);
      setError("");

      const begin = () => {
        // Tear down a previous session if one is lingering.
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
          // Surface the failure so the UI isn't silently dead.
          const code = event?.error;
          if (code === "not-allowed" || code === "service-not-allowed") {
            setError("denied");
          } else if (code === "no-speech") {
            setError("no-speech");
          } else if (code === "audio-capture") {
            setError("no-mic");
          } else if (code === "aborted") {
            // user-initiated stop — not an error worth showing
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

      // Prime the microphone permission explicitly. getUserMedia reliably raises
      // the browser prompt and gives a clear, catchable error on denial — far
      // better than SpeechRecognition's implicit (and silent) permission path.
      const md = (navigator as any)?.mediaDevices;
      if (md?.getUserMedia) {
        md.getUserMedia({ audio: true })
          .then((stream: MediaStream) => {
            // We only needed the permission grant; release the mic immediately.
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
              // getUserMedia unavailable for some reason — try recognition anyway.
              begin();
            }
          });
      } else {
        begin();
      }
    },
    [locale]
  );

  const cancelSpeak = useCallback(() => {
    try {
      window.speechSynthesis?.cancel();
    } catch {
      /* ignore */
    }
    setSpeaking(false);
  }, []);

  // Mobile browsers gate speechSynthesis behind a user gesture. Speaking a tiny
  // utterance during the mic tap "unlocks" the engine so the async reply (which
  // arrives outside the gesture) can be spoken.
  const ttsUnlockedRef = useRef(false);
  const unlockTTS = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.resume();
      if (!ttsUnlockedRef.current) {
        const warmup = new SpeechSynthesisUtterance(" ");
        warmup.volume = 0;
        window.speechSynthesis.speak(warmup);
        ttsUnlockedRef.current = true;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const clean = sanitizeForSpeech(text);
      if (!clean) return;

      try {
        window.speechSynthesis.cancel(); // flush any queued utterance
        window.speechSynthesis.resume(); // mobile may auto-pause between utterances
        const utter = new SpeechSynthesisUtterance(clean);
        const bcp = localeToBcp47(locale);
        utter.lang = bcp;

        // ГОЛОС AIfa — ЖЕНСКИЙ НА ВСЕХ ЧЕТЫРЁХ ЯЗЫКАХ, БЕЗ ИСКЛЮЧЕНИЙ.
        //
        // Раньше здесь стоял шаблон /female|woman|Milena|Google/, и слово
        // «Google» в нём всё ломало: системный голос «Google español» —
        // мужской, но подходил под шаблон первым и выигрывал. На испанском
        // AIfa говорила мужским голосом. Хуже того, при полном промахе брался
        // просто первый голос нужного языка — а он тоже часто мужской.
        //
        // Теперь порядок обратный: сначала имена известных женских голосов по
        // языку, затем общий признак женского, и только потом — любой голос
        // языка, но с явным отсевом заведомо мужских имён. Пол голоса — часть
        // личности, а не деталь настройки: он не должен зависеть от того, какие
        // голоса оказались установлены в системе посетителя.
        const voices = window.speechSynthesis.getVoices?.() || [];
        const base = bcp.split("-")[0];

        // Женские голоса, встречающиеся в системах, по языкам.
        const ЖЕНСКИЕ: Record<string, RegExp> = {
          ru: /Milena|Katya|Yulia|Irina|Alena|Svetlana|Tatyana|Elena/i,
          en: /Samantha|Karen|Moira|Tessa|Fiona|Serena|Victoria|Zira|Ava|Allison|Susan|Joanna|Salli|Kimberly|Amy|Emma/i,
          es: /Mónica|Monica|Paulina|Marisol|Penélope|Penelope|Lupe|Conchita|Helena|Sabina|Esperanza|Laura|Elvira/i,
          zh: /Ting-?Ting|Tingting|Sin-?ji|Mei-?Jia|Meijia|Huihui|Yaoyao|Xiaoxiao|Xiaoyi|Zhiyu|Li-?mu/i,
        };
        // Заведомо мужские — чтобы не попались в последнем, самом широком шаге.
        const МУЖСКИЕ = /male\b|man\b|Google (español|Español|US English|UK English Male)|Jorge|Diego|Juan|Carlos|Enrique|Miguel|Daniel|Alex|Fred|Thomas|Oliver|Aaron|Rishi|Yunyang|Kangkang|Liang|Dmitri|Pavel|Yuri|Maxim/i;

        const поЯзыку = voices.filter((v) => v.lang?.startsWith(base));
        const match =
          // 1. Знакомое женское имя для этого языка.
          поЯзыку.find((v) => ЖЕНСКИЕ[base]?.test(v.name)) ||
          // 2. Голос, прямо помеченный как женский.
          поЯзыку.find((v) => /female|woman|feminine|女/i.test(v.name)) ||
          // 3. Точное совпадение языка и региона, если он не мужской.
          poNotMale(voices.filter((v) => v.lang === bcp)) ||
          // 4. Любой голос языка, кроме заведомо мужских.
          poNotMale(поЯзыку);
        if (match) utter.voice = match;

        function poNotMale(список: SpeechSynthesisVoice[]) {
          return список.find((v) => !МУЖСКИЕ.test(v.name));
        }

        utter.rate = 1.03;
        utter.pitch = 1.08;
        utter.onstart = () => setSpeaking(true);
        utter.onend = () => setSpeaking(false);
        utter.onerror = () => setSpeaking(false);

        window.speechSynthesis.speak(utter);
      } catch {
        setSpeaking(false);
      }
    },
    [locale]
  );

  // Clean up on unmount.
  useEffect(() => {
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
