import React, { createContext, useContext, useRef, useState } from "react";

// ── CDN audio assets ──────────────────────────────────────────────────────────
const THEME_URL = "/manus-storage/BackThen_b2dc6a88.mp3";
const INSTRUMENTAL_URL = "/manus-storage/LockedPhoneLine(Instrumental)_34c7e225.mp3";

// Character VOs — Zuri voice (ElevenLabs) — New Yorker, calm, female, middle-aged
const VO_URLS: Record<string, string> = {
  michael: "/manus-storage/michael_zuri_ef0f2efb.mp3",
  renee:   "/manus-storage/renee_zuri_d37dfe34.mp3",
  jada:    "/manus-storage/jada_zuri_f299bea9.mp3",
  darius:  "/manus-storage/darius_zuri_dd150cf6.mp3",
  tonya:   "/manus-storage/tonya_zuri_4b13504e.mp3",
  calvin:  "/manus-storage/calvin_zuri_a205919d.mp3",
};

interface AudioContextValue {
  themeStarted: boolean;
  themePlaying: boolean;
  voPlaying: boolean;
  toggleTheme: () => void;
  playVO: (character: string) => void;
  stopVO: () => void;
}

const AudioContext = createContext<AudioContextValue>({
  themeStarted: false,
  themePlaying: false,
  voPlaying: false,
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
  const [voPlaying, setVoPlaying] = useState(false);

  // Use a ref to track whether theme was playing before VO started
  // so the onended closure always sees the latest value
  const themeWasPlayingRef = useRef(false);

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

    // Record whether theme is currently playing (use ref so closure captures it reliably)
    themeWasPlayingRef.current = !!(themeRef.current && !themeRef.current.paused);

    // Pause theme song
    if (themeRef.current && themeWasPlayingRef.current) {
      themeRef.current.pause();
      setThemePlaying(false);
    }

    // Stop any existing VO first
    if (voRef.current) {
      voRef.current.onended = null; // remove old listener
      voRef.current.pause();
      voRef.current.currentTime = 0;
    }

    // Start instrumental bed at 20% volume, looping
    if (!instrumentalRef.current) {
      instrumentalRef.current = new Audio(INSTRUMENTAL_URL);
      instrumentalRef.current.loop = true;
    }
    instrumentalRef.current.currentTime = 0;
    instrumentalRef.current.volume = 0.18;
    instrumentalRef.current.play().catch(() => {});

    // Play the VO on top
    const vo = new Audio(url);
    voRef.current = vo;
    vo.volume = 1;
    setVoPlaying(true);

    vo.play().catch(() => {
      // If VO fails to play, restore theme
      if (instrumentalRef.current) {
        instrumentalRef.current.pause();
        instrumentalRef.current.currentTime = 0;
      }
      if (themeRef.current && themeWasPlayingRef.current) {
        themeRef.current.play().catch(() => {});
        setThemePlaying(true);
      }
      setVoPlaying(false);
    });

    // On VO end: stop instrumental, resume theme if it was playing before
    vo.onended = () => {
      setVoPlaying(false);
      if (instrumentalRef.current) {
        instrumentalRef.current.pause();
        instrumentalRef.current.currentTime = 0;
      }
      // Always resume theme after VO ends if it was playing before
      if (themeRef.current && themeWasPlayingRef.current) {
        themeRef.current.play().catch(() => {});
        setThemePlaying(true);
      }
    };
  };

  const stopVO = () => {
    if (voRef.current) {
      voRef.current.onended = null;
      voRef.current.pause();
      voRef.current.currentTime = 0;
      setVoPlaying(false);
    }
    if (instrumentalRef.current) {
      instrumentalRef.current.pause();
      instrumentalRef.current.currentTime = 0;
    }
    // Resume theme if it was playing before the VO started
    if (themeRef.current && themeWasPlayingRef.current) {
      themeRef.current.play().catch(() => {});
      setThemePlaying(true);
    }
  };

  return (
    <AudioContext.Provider value={{ themeStarted, themePlaying, voPlaying, toggleTheme, playVO, stopVO }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
