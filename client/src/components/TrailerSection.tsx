import { useRef, useEffect } from "react";
import { useAudio } from "@/contexts/AudioController";

const VIMEO_VIDEO_ID = "1192710961";

export default function TrailerSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  useEffect(() => {
    // Load Vimeo Player.js SDK
    const existingScript = document.getElementById("vimeo-player-sdk");
    const initPlayer = () => {
      if (!(window as any).Vimeo || !iframeRef.current) return;
      const player = new (window as any).Vimeo.Player(iframeRef.current);
      playerRef.current = player;
      player.on("play", () => pauseForVideo());
      player.on("pause", () => resumeAfterVideo());
      player.on("ended", () => resumeAfterVideo());
    };

    if (existingScript) {
      initPlayer();
    } else {
      const script = document.createElement("script");
      script.id = "vimeo-player-sdk";
      script.src = "https://player.vimeo.com/api/player.js";
      script.onload = initPlayer;
      document.head.appendChild(script);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.off("play");
        playerRef.current.off("pause");
        playerRef.current.off("ended");
      }
    };
  }, [pauseForVideo, resumeAfterVideo]);

  return (
    <section
      id="trailer"
      style={{
        background: "#000",
        padding: "5rem 0 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
          fontWeight: 600,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#D4AF37",
        }}
      >
        Official Trailer
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "clamp(1.6rem, 4vw, 3rem)",
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.1,
          letterSpacing: "0.02em",
        }}
      >
        Scandalous: Bloodline Lies
      </div>

      {/* Gold rule */}
      <div
        style={{
          width: "clamp(80px, 20vw, 200px)",
          height: 1,
          background: "linear-gradient(to right, transparent, #D4AF37, transparent)",
        }}
      />

      {/* Vimeo embed */}
      <div
        style={{
          width: "min(90vw, 1100px)",
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.8)",
          border: "1px solid rgba(212,175,55,0.2)",
          background: "#000",
          paddingTop: "56.25%", // 16:9 aspect ratio
        }}
      >
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Bloodline Lies"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.6rem, 1.4vw, 0.68rem)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
        }}
      >
        Based on the novel by&nbsp;
        <span style={{ color: "rgba(212,175,55,0.8)", fontWeight: 700 }}>
          Blake Karrington
        </span>
      </div>
    </section>
  );
}
