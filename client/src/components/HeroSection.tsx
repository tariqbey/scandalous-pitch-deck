import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/contexts/AudioController";

const HERO_VIDEO = "https://res.cloudinary.com/dul3jmac0/video/upload/f_auto,q_auto,vc_auto/v1778611991/scandalous/hf_20260509_002525_ed651b71-f061-4023-b1b3-00d945c05824_99cc38ff.mp4";
const UPSCALE_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RtaaZtYQelqLcSao.png";
const COVER_ART_VIDEO = "https://res.cloudinary.com/dul3jmac0/video/upload/f_auto,q_auto,vc_auto/v1778611988/scandalous/hf_20260508_233458_cf2db3a7-084f-486d-b5b4-05cdae8ad0a9_895b083f.mp4";

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
          preload="auto"
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
            display: "block",
          }}
        />

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
            style={{ fontSize: "1rem", padding: "1rem 3rem", letterSpacing: "0.22em", fontWeight: 700 }}
          >
            ▶ PLAY THEME SONG
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
            <div
              onClick={toggleTheme}
              title={themePlaying ? "Pause theme" : "Resume theme"}
              style={{ position: "relative", width: 160, height: 160, cursor: "pointer" }}
            >
              <div style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                overflow: "hidden",
                animation: themePlaying ? "spin-album 3s linear infinite" : "none",
                border: "3px solid #D4AF37",
                boxShadow: "0 0 32px rgba(212,175,55,0.35)",
              }}>
                <video
                  src={COVER_ART_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 22, height: 22,
                borderRadius: "50%",
                background: "#000",
                border: "2px solid #D4AF37",
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
                <span style={{ color: "#D4AF37", fontSize: "2.2rem", lineHeight: 1 }}>
                  {themePlaying ? "⏸" : "▶"}
                </span>
              </div>
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(212,175,55,0.7)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              {themePlaying ? "Now Playing — Tap to Pause" : "Tap to Resume"}
            </div>
          </div>
        )}

        {/* Upscale logo — larger */}
        <img
          src={UPSCALE_LOGO}
          alt="Upscale Promotions & Entertainment, Inc."
          style={{
            width: "clamp(260px, 65vw, 620px)",
            maxWidth: "92vw",
            filter: "brightness(1.15)",
          }}
        />

        {/* Presented by Executive Producer Malik Davis — STANDOUT TREATMENT */}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.2rem",
          marginTop: "0.5rem",
          padding: "1rem 3rem",
          border: "1px solid rgba(212,175,55,0.5)",
          background: "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0) 50%, rgba(212,175,55,0.06) 100%)",
          boxShadow: "0 0 50px rgba(212,175,55,0.15), inset 0 0 40px rgba(212,175,55,0.05)",
        }}>
          {/* Corner accent marks */}
          <div style={{ position:"absolute", top:-1, left:-1, width:16, height:16, borderTop:"3px solid #D4AF37", borderLeft:"3px solid #D4AF37" }} />
          <div style={{ position:"absolute", top:-1, right:-1, width:16, height:16, borderTop:"3px solid #D4AF37", borderRight:"3px solid #D4AF37" }} />
          <div style={{ position:"absolute", bottom:-1, left:-1, width:16, height:16, borderBottom:"3px solid #D4AF37", borderLeft:"3px solid #D4AF37" }} />
          <div style={{ position:"absolute", bottom:-1, right:-1, width:16, height:16, borderBottom:"3px solid #D4AF37", borderRight:"3px solid #D4AF37" }} />
          {/* Label line */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(0.5rem, 1.2vw, 0.65rem)",
            fontWeight: 700,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.75)",
          }}>Presented by Executive Producer</div>
          {/* Name — large, white, glowing */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#fff",
            lineHeight: 1.1,
            textShadow: "0 0 60px rgba(212,175,55,0.7), 0 0 120px rgba(212,175,55,0.3), 0 2px 30px rgba(212,175,55,0.4)",
          }}>Malik Davis</div>
        </div>

        {/* Written and Created by Del Rivers */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(0.85rem, 2.5vw, 1.2rem)",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.75)",
          marginTop: "0.1rem",
        }}>
          Written &amp; Created by Del Rivers
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
          "He saw her face in the family photo on the boy's phone.  Smiled. Said nothing.  Excused himself.  Locked the bathroom door.  And dialed the number he hadn't called in twenty years."
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
