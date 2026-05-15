import { useEffect, useRef, useState } from "react";

export default function TrailerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trailer"
      ref={ref}
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

        {/* Vimeo embed — 16:9 responsive */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.97)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
            position: "relative",
            paddingBottom: "56.25%", // 16:9
            height: 0,
            overflow: "hidden",
            border: "1px solid rgba(212,175,55,0.3)",
            boxShadow: "0 0 80px rgba(212,175,55,0.12), 0 40px 80px rgba(0,0,0,0.8)",
            background: "#0a0a0a",
          }}
        >
          <iframe
            src="https://player.vimeo.com/video/1192710961?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
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
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(0.65rem, 1.5vw, 0.72rem)",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Presented by&nbsp;
            <span style={{ color: "rgba(212,175,55,0.8)", fontWeight: 700 }}>Blake Cavendish</span>
          </div>
        </div>
      </div>
    </section>
  );
}
