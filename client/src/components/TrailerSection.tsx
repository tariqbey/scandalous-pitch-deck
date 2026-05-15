import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/contexts/AudioController";

export default function TrailerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  // Fade-in on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Load Vimeo Player.js SDK and wire play/pause/ended events for theme mute
  useEffect(() => {
    const initPlayer = () => {
      if (!iframeRef.current || !(window as any).Vimeo) return;
      if (playerRef.current) return; // already initialized
      const player = new (window as any).Vimeo.Player(iframeRef.current);
      playerRef.current = player;
      player.on("play", () => { pauseForVideo(); });
      player.on("pause", () => { resumeAfterVideo(); });
      player.on("ended", () => { resumeAfterVideo(); });
    };

    const existingScript = document.getElementById("vimeo-player-js");
    if (existingScript && (window as any).Vimeo) {
      initPlayer();
    } else if (!existingScript) {
      const script = document.createElement("script");
      script.id = "vimeo-player-js";
      script.src = "https://player.vimeo.com/api/player.js";
      script.async = true;
      script.onload = initPlayer;
      document.head.appendChild(script);
    } else {
      // Script tag exists but SDK not ready yet — poll briefly
      const poll = setInterval(() => {
        if ((window as any).Vimeo) { clearInterval(poll); initPlayer(); }
      }, 100);
      return () => clearInterval(poll);
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.off("play");
          playerRef.current.off("pause");
          playerRef.current.off("ended");
        } catch {}
      }
    };
  }, [pauseForVideo, resumeAfterVideo]);

  return (
    <section
      id="trailer"
      ref={sectionRef}
      style={{
        background: "#000",
        padding: "5rem 1.5rem 6rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            marginBottom: "2.5rem",
          }}
        >
          <div className="section-label">Official Trailer</div>
          <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1.25rem" }} />
          <h2
            className="display-heading"
            style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", marginBottom: "0.75rem" }}
          >
            Bloodline Lies
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            A Vertical Micro-Drama Series · Upscale Promotions &amp; Entertainment, Inc.
          </p>
        </div>

        {/* Vimeo embed — exact Vimeo-recommended responsive wrapper */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.97)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            padding: "56.25% 0 0 0",
            position: "relative",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "0 0 80px rgba(212,175,55,0.12), 0 40px 80px rgba(0,0,0,0.8)",
            background: "#0a0a0a",
          }}
        >
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1192710961?badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder={0}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            title="Bloodline Lies — Official Trailer"
          />
        </div>

        {/* Caption */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.9s ease 0.4s",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.65rem, 1.5vw, 0.72rem)",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Based on the novel by&nbsp;
            <span style={{ color: "rgba(212,175,55,0.8)", fontWeight: 700 }}>Blake Karrington</span>
          </div>

        </div>
      </div>
    </section>
  );
}
