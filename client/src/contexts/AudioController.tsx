import React, { createContext, useContext, useRef, useState } from "react";

// ── CDN audio assets ──────────────────────────────────────────────────────────
const THEME_URL = "/manus-storage/LockedPhoneLine_a801c987.mp3";
const INSTRUMENTAL_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/TableFor2(Instrumental).mp3";

// Character VOs — Hobbs voice (ElevenLabs), generated 2026-05-07
const VO_URLS: Record<string, string> = {
  michael: "/manus-storage/michael_8c8849f4.mp3",
  renee:   "/manus-storage/renee_8608a1a5.mp3",
  jada:    "/manus-storage/jada_2f3e75d0.mp3",
  darius:  "/manus-storage/darius_f2f14d92.mp3",
  tonya:   "/manus-storage/tonya_12301b47.mp3",
  calvin:  "/manus-storage/calvin_30e2c0e5.mp3",
};

interface AudioContextValue {
  themeStarted: boolean;
  themePlaying: boolean;
  toggleTheme: () => void;
  playVO: (character: string) => void;
  stopVO: () => void;
}

const AudioContext = createContext<AudioContextValue>({
  themeStarted: false,
  themePlaying: false,
  toggleTheme: () => {},
  playVO: () => {},
  stopVO: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const themeRef = useRef<HTMLAudioElement | null>(null);
  const instrumentalRef = useRef<HTMLAudioElement | null>(null);
  const voRef = useRef<HTMLAudioElement | null>(null);
  const [themeStarted, setThemeStarted] = useState(false);
  const [themePlaying, setThemePlaying] = useState(false);

  const toggleTheme = () => {
    // First time: create and play
    if (!themeRef.current) {
      const audio = new Audio(THEME_URL);
      audio.loop = true;
      audio.volume = 1;
      themeRef.current = audio;
      audio.play().catch(() => {});
      setThemeStarted(true);
      setThemePlaying(true);
      return;
    }

    // Already created: toggle pause/play
    if (themeRef.current.paused) {
      themeRef.current.play().catch(() => {});
      setThemePlaying(true);
    } else {
      themeRef.current.pause();
      setThemePlaying(false);
    }
  };

  const playVO = (character: string) => {
    const url = VO_URLS[character.toLowerCase()];
    if (!url) return;

    // Fade theme to 0 (keep it running in background, just silent)
    if (themeRef.current) themeRef.current.volume = 0;

    // Start instrumental bed at 18%
    if (!instrumentalRef.current) {
      instrumentalRef.current = new Audio(INSTRUMENTAL_URL);
      instrumentalRef.current.loop = true;
    }
    instrumentalRef.current.volume = 0.18;
    instrumentalRef.current.play().catch(() => {});

    // Stop any existing VO
    if (voRef.current) {
      voRef.current.pause();
      voRef.current.currentTime = 0;
    }

    // Play new VO
    const vo = new Audio(url);
    voRef.current = vo;
    vo.play().catch(() => {});

    // On VO end: restore theme volume if it was playing, stop instrumental
    vo.onended = () => {
      if (themeRef.current && themePlaying) themeRef.current.volume = 1;
      if (instrumentalRef.current) {
        instrumentalRef.current.pause();
        instrumentalRef.current.currentTime = 0;
      }
    };
  };

  const stopVO = () => {
    if (voRef.current) {
      voRef.current.pause();
      voRef.current.currentTime = 0;
    }
    if (instrumentalRef.current) {
      instrumentalRef.current.pause();
      instrumentalRef.current.currentTime = 0;
    }
    if (themeRef.current && themePlaying) themeRef.current.volume = 1;
  };

  return (
    <AudioContext.Provider value={{ themeStarted, themePlaying, toggleTheme, playVO, stopVO }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
