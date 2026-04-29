import { useEffect, useRef, useState } from "react";

const BEATS = [
  {
    ep: "Ep 1",
    title: "THE CALL",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN", desc: "Marcus zooms in on Leo's face in a photo. Recognition flickers." },
      { time: "0:05–0:25", label: "INCITING INCIDENT", desc: "He searches Vanessa Cole. Her photo loads. Leo is beside her." },
      { time: "0:25–0:55", label: "CONFRONTATION", desc: "Marcus calls Vanessa. She answers immediately. The exchange is devastating." },
      { time: "0:55–1:25", label: "REVERSAL", desc: "Vanessa turns it back: 'Is Tiana your daughter?'" },
      { time: "1:25–1:30", label: "CLIFFHANGER", desc: "Silence. Smash cut to black. Title card." },
    ],
  },
  {
    ep: "Ep 2",
    title: "THE MATH",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN", desc: "Marcus in his parked car. Knuckles white. Engine off." },
      { time: "0:05–0:30", label: "INTERNAL SPIRAL", desc: "He does the math on his phone. The numbers confirm his fear." },
      { time: "0:30–0:55", label: "TIANA'S TEXT", desc: "Her innocent message arrives. 'Sunday still good?' The irony is brutal." },
      { time: "0:55–1:20", label: "BEDROOM SCENE", desc: "Elena notices something is wrong. Marcus deflects. The lie begins." },
      { time: "1:20–1:30", label: "CLIFFHANGER", desc: "Elena: 'Whatever it is, you can tell me.' Marcus: 'I know.' He says nothing." },
    ],
  },
  {
    ep: "Ep 3",
    title: "SUNDAY DINNER",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN", desc: "Tiana and Elena prep dinner. Warmth. Normalcy. The calm before." },
      { time: "0:05–0:25", label: "ARRIVAL", desc: "Leo arrives with Vanessa. Tiana wasn't expecting her." },
      { time: "0:25–0:55", label: "THE RECOGNITION", desc: "Marcus appears at the end of the hallway. Twenty-three years collapse." },
      { time: "0:55–1:20", label: "THE QUESTION", desc: "Leo, oblivious: 'You two know each other?'" },
      { time: "1:20–1:30", label: "CLIFFHANGER", desc: "Smash cut. Four adults. One secret. One question." },
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
