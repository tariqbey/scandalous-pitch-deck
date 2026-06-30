import React, { createContext, useContext, useRef, useState } from "react";

// ── Vercel Blob Storage audio assets ─────────────────────────────────────────
const BLOB = "https://sqmxeuedmlqe0psk.public.blob.vercel-storage.com";
const THEME_URL = `${BLOB}/scandalous/theme-song.mp3`;
const INSTRUMENTAL_URL = "https://res.cloudinary.com/dul3jmac0/video/upload/v1778611977/scandalous/LockedPhoneLine_Instrumental__34c7e225.mp3";

// Character VOs — Zuri voice (ElevenLabs) — served from Vercel Blob
const VO_URLS: Record<string, string> = {
  michael: `${BLOB}/scandalous/voices/micheal.mp3`,
  renee:   `${BLOB}/scandalous/voices/renee.mp3`,
  jada:    `${BLOB}/scandalous/voices/jada.mp3`,
  darius:  `${BLOB}/scandalous/voices/darius.mp3`,
  tonya:   `${BLOB}/scandalous/voices/tonya.mp3`,
  calvin:  `${BLOB}/scandalous/voices/calvin.mp3`,
};

interface AudioContextValue {
  themeStarted: boolean;
  themePlaying: boolean;
  voPlaying: boolean;
  toggleTheme: () => void;
  playVO: (character: string) => void;
  stopVO: () => void;
  // Used by TrailerSection to duck audio when trailer plays
  pauseForVideo: () => void;
  resumeAfterVideo: () => void;
}

const AudioContext = createContext<AudioContextValue>({
  themeStarted: false,
  themePlaying: false,
  voPlaying: false,
  toggleTheme: () => {},
  playVO: () => {},
  stopVO: () => {},
  pauseForVideo: () => {},
  resumeAfterVideo: () => {},
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
  // Separate ref for video (trailer) ducking
  const themeWasPlayingBeforeVideoRef = useRef(false);

  const pauseForVideo = () => {
    themeWasPlayingBeforeVideoRef.current = !!(themeRef.current && !themeRef.current.paused);
    if (themeRef.current && themeWasPlayingBeforeVideoRef.current) {
      themeRef.current.pause();
      setThemePlaying(false);
    }
    // Also stop any active VO
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
  };

  const resumeAfterVideo = () => {
    if (themeRef.current && themeWasPlayingBeforeVideoRef.current) {
      themeRef.current.play().catch(() => {});
      setThemePlaying(true);
    }
  };

  const toggleTheme = () => {
    // First time: create and play
    if (!themeRef.current) {
      const audio = new Audio(THEME_URL);
      audio.loop = true;
      audio.volume = 1;
      themeRef.current = audio;
      // Mark as started immediately so the UI switches to the spinning record
      setThemeStarted(true);
      audio.play()
        .then(() => {
          setThemePlaying(true);
        })
        .catch(() => {
          // Autoplay blocked — still show the record, user can tap again
          setThemePlaying(false);
        });
      return;
    }
    // Already created: toggle pause/play
    if (themeRef.current.paused) {
      themeRef.current.play()
        .then(() => setThemePlaying(true))
        .catch(() => setThemePlaying(false));
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
    <AudioContext.Provider value={{ themeStarted, themePlaying, voPlaying, toggleTheme, playVO, stopVO, pauseForVideo, resumeAfterVideo }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
