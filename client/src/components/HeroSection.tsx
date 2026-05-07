import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/contexts/AudioController";

const HERO_VIDEO = "/manus-storage/hf_20260507_064013_eb5bcb13-e538-4b54-8ab3-77be6c0cc054_87c96faa.mp4";
const UPSCALE_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RtaaZtYQelqLcSao.png";
const COVER_ART_VIDEO = "/manus-storage/hf_20260507_063323_bf5dc302-e160-4540-9977-3a05b28bf5a9_57618f2a.mp4";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);
  const { themeStarted, themePlaying, toggleTheme } = useAudio();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const pts = Array.from({ length: 24 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
    }));
    setParticles(pts);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    const play = () => vid.play().catch(() => {});
    play();
    document.addEventListener("touchstart", play, { once: true });
    document.addEventListener("click", play, { once: true });
    return () => {
      document.removeEventListener("touchstart", play);
      document.removeEventListener("click", play);
    };
  }, []);

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="cover"
      style={{
        background: "#000",
        paddingTop: 64, // nav height offset
      }}
    >
      {/* ── 1. HERO VIDEO — full width, 16:9, no cropping ── */}
      <div style={{ position: "relative", width: "100%", lineHeight: 0 }}>
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Subtle bottom fade so video blends into black title block */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "30%",
          background: "linear-gradient(to bottom, transparent, #000)",
          pointerEvents: "none",
        }} />

        {/* Floating gold particles over video */}
        {particles.map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#D4AF37",
            opacity: 0.2,
            animation: `pulse-gold ${2 + p.delay}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            pointerEvents: "none",
          }} />
        ))}
      </div>

      {/* ── 2. TITLE BLOCK — fully visible below the video ── */}
      <div
        style={{
          background: "#000",
          textAlign: "center",
          padding: "3rem 1.25rem 5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.1rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
        }}
      >
        {/* PLAY THEME SONG / spinning record */}
        {!themeStarted ? (
          <button
            onClick={toggleTheme}
            className="gold-btn"
            style={{ fontSize: "0.68rem", padding: "0.6rem 2rem", letterSpacing: "0.2em" }}
          >
            ▶ PLAY THEME SONG
          </button>
        ) : (
          <div
            onClick={toggleTheme}
            title={themePlaying ? "Pause theme" : "Resume theme"}
            style={{ position: "relative", width: 64, height: 64, cursor: "pointer" }}
          >
            <div style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              overflow: "hidden",
              animation: themePlaying ? "spin-album 3s linear infinite" : "none",
              border: "2px solid #D4AF37",
            }}>
              <video
                src={COVER_ART_VIDEO}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 10, height: 10,
              borderRadius: "50%",
              background: "#000",
              border: "1px solid #D4AF37",
            }} />
            <div
              className="record-overlay"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: themePlaying ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = themePlaying ? "0" : "1")}
            >
              <span style={{ color: "#D4AF37", fontSize: "1.1rem", lineHeight: 1 }}>
                {themePlaying ? "⏸" : "▶"}
              </span>
            </div>
          </div>
        )}

        {/* Upscale logo */}
        <img
          src={UPSCALE_LOGO}
          alt="Upscale Promotions & Entertainment, Inc."
          style={{
            width: "clamp(180px, 50vw, 440px)",
            maxWidth: "88vw",
            filter: "brightness(1.1)",
          }}
        />

        {/* Producer name */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(0.9rem, 2.5vw, 1.5rem)",
          letterSpacing: "0.25em",
          color: "#fff",
          textTransform: "uppercase",
        }}>
          DEL RIVERS
        </div>

        {/* Created & Written by */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          marginTop: "-0.4rem",
        }}>
          Created &amp; Written by Del Rivers
        </div>

        {/* Presents */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)",
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "#D4AF37",
        }}>
          Upscale Promotions &amp; Entertainment, Inc. Presents
        </div>

        {/* Gold rule */}
        <div style={{
          width: "clamp(120px, 40vw, 500px)",
          height: 1,
          background: "linear-gradient(to right, transparent, #D4AF37, transparent)",
        }} />

        {/* MAIN TITLE */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(2.2rem, 8vw, 7.5rem)",
          color: "#fff",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: "0 0 60px rgba(212,175,55,0.25)",
          wordBreak: "break-word",
          maxWidth: "95vw",
        }}>
          SCANDALOUS:
        </div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(2.2rem, 8vw, 7.5rem)",
          color: "#D4AF37",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          textShadow: "0 0 60px rgba(212,175,55,0.35)",
          marginTop: "-0.5rem",
          wordBreak: "break-word",
          maxWidth: "95vw",
        }}>
          BLOODLINE LIES
        </div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.55rem, 1.8vw, 0.82rem)",
          fontWeight: 600,
          letterSpacing: "0.38em",
          textTransform: "uppercase",
          color: "#D4AF37",
          marginTop: "0.25rem",
        }}>
          A Vertical Micro-Drama Series
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(0.9rem, 2.2vw, 1.35rem)",
          color: "rgba(255,255,255,0.65)",
          maxWidth: 620,
          lineHeight: 1.7,
          padding: "0 0.5rem",
        }}>
          "He recognized her in a family photo. He said nothing. Then he went to the bathroom and called her."
        </div>

        {/* Genre pills */}
        <div style={{
          display: "flex",
          gap: "0.6rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "0.25rem",
        }}>
          {["Romance & Power", "Secrets & Betrayal", "Vertical Micro-Drama", "60 Episodes"].map((tag) => (
            <span key={tag} style={{
              border: "1px solid #D4AF37",
              color: "#D4AF37",
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.35rem 0.85rem",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "0.75rem",
        }}>
          <button className="gold-btn" onClick={() => handleNav("#logline")}>Read the Pitch</button>
          <button className="gold-btn" onClick={() => handleNav("#scripts")}>Read Scripts</button>
        </div>
      </div>

      <style>{`
        @keyframes spin-album {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
