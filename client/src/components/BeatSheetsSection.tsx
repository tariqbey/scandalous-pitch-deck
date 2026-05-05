import { useEffect, useRef, useState } from "react";

const BEATS = [
  {
    ep: "Ep 1",
    title: "MEET DARIUS",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN", desc: "Michael opens the door. Jada stands with Darius. Michael studies the boy." },
      { time: "0:05–0:20", label: "HOOK", desc: "Darius is respectful, confident. Michael tests him with pointed questions." },
      { time: "0:20–0:45", label: "CONFLICT", desc: "Michael asks why he's just now meeting him after almost a year." },
      { time: "0:45–0:55", label: "TWIST", desc: "Darius says his dad raised him not to play with another man's daughter. Michael is impressed." },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Michael: 'I'm still deciding what he is.' Smash cut to black." },
    ],
  },
  {
    ep: "Ep 2",
    title: "THE PHOTO",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN", desc: "Michael asks about Darius's family. Darius lights up talking about his dad Calvin." },
      { time: "0:05–0:20", label: "HOOK", desc: "Darius pulls out his phone. 'That's him right there. My dad Calvin. And my mom.'" },
      { time: "0:20–0:40", label: "INCITING INCIDENT", desc: "Michael sees Renee in the photo. His face almost breaks. FLASH CUTS: the motel, the pregnancy, the blocked number." },
      { time: "0:40–0:55", label: "REVERSAL", desc: "Michael hands the phone back. 'Beautiful family.' His voice barely holds." },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Michael looks at Jada's hand near Darius's. Under his breath: 'No…'" },
    ],
  },
  {
    ep: "Ep 5",
    title: "YOUR SON",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN", desc: "Renee demands to know what Michael means by 'your past is in my living room.'" },
      { time: "0:05–0:20", label: "HOOK", desc: "Michael describes the boy: respectful, talks about his dad Calvin. Renee's face shifts." },
      { time: "0:20–0:40", label: "CONFLICT", desc: "Michael reveals the boy's name: Darius. Renee stops breathing." },
      { time: "0:40–0:55", label: "TWIST", desc: "Michael's voice cracks into anger. 'I need to know if that's my son before my daughter ends up with her brother.'" },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Renee covers her mouth. Silence. Smash cut to black." },
    ],
  },
];

export default function BeatSheetsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const ep = BEATS[active];

  return (
    <section id="beat-sheets" ref={ref} style={{ background: "#050505", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Episode Structure</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          Beat Sheets
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem" }}>
          Every 90-second episode follows a precision-engineered structure. Hook in 5 seconds. Cliffhanger at 90.
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {BEATS.map((b, i) => (
            <button
              key={b.ep}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? "#D4AF37" : "transparent",
                border: "1px solid #D4AF37",
                color: active === i ? "#000" : "#D4AF37",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.5rem 1.5rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {b.ep}: {b.title}
            </button>
          ))}
        </div>

        {/* Beat timeline */}
        <div style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.15)",
          padding: "2.5rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div className="section-label">{ep.ep}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>{ep.title}</div>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textAlign: "right" }}>
              RUNTIME: 1:30<br />FORMAT: 9:16 VERTICAL
            </div>
          </div>

          {/* Timeline bar */}
          <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, marginBottom: "2.5rem" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%", background: "linear-gradient(90deg, #D4AF37, #8B0000)", borderRadius: 3 }} />
            {ep.beats.map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                top: -4,
                left: `${(i / (ep.beats.length - 1)) * 100}%`,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#D4AF37",
                border: "2px solid #000",
                transform: "translateX(-50%)",
                boxShadow: "0 0 8px rgba(212,175,55,0.6)",
              }} />
            ))}
          </div>

          {/* Beat rows */}
          {ep.beats.map((beat, i) => (
            <div key={beat.label} style={{
              display: "grid",
              gridTemplateColumns: "100px 140px 1fr",
              gap: "1.5rem",
              alignItems: "flex-start",
              paddingBottom: "1.25rem",
              marginBottom: "1.25rem",
              borderBottom: i < ep.beats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", paddingTop: 2 }}>{beat.time}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "#D4AF37", textTransform: "uppercase", paddingTop: 2 }}>{beat.label}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{beat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
