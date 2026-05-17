import { useRef, useEffect } from "react";
import { useAudio } from "@/contexts/AudioController";

const TRAILER_URL =
  "https://assets.cdn.filesafe.space/BKkGmIfa4p8vcMaH7JTj/media/6a09056ddbe569a25d8995e3.mp4";

export default function TrailerSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => pauseForVideo();
    const onPause = () => resumeAfterVideo();
    const onEnded = () => resumeAfterVideo();

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
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

      {/* Video player */}
      <div
        style={{
          width: "min(90vw, 1100px)",
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(212,175,55,0.15), 0 20px 60px rgba(0,0,0,0.8)",
          border: "1px solid rgba(212,175,55,0.2)",
          background: "#000",
        }}
      >
        <video
          ref={videoRef}
          src={TRAILER_URL}
          controls
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            display: "block",
            aspectRatio: "16/9",
            background: "#000",
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
