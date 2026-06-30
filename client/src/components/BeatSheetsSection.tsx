import { useEffect, useRef, useState } from "react";

// ── Beat data derived directly from the six script episodes ──────────────────
const BEATS = [
  {
    ep: "Ep 1",
    title: "MEET DARIUS",
    runtime: "1:30",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Michael opens the front door. Jada stands with Darius. Darius extends his hand: \"Mr. Lawson. Good to finally meet you, sir.\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Michael asks why he's just now meeting him after almost a year. Darius answers directly: \"Because I told Jada I didn't want to meet you until I knew I was serious.\"",
      },
      {
        time: "0:20–0:45",
        label: "TEST",
        desc: "Michael presses: \"You always this respectful, or is this just first-meeting behavior?\" Darius: \"My dad raised me not to play with another man's daughter.\"",
      },
      {
        time: "1:00–1:20",
        label: "SHIFT",
        desc: "Michael nods, impressed despite himself. Jada: \"See? He's not bad.\" Michael: \"I didn't say he was bad.\" A beat of silence.",
      },
      {
        time: "1:20–1:30",
        label: "CLIFFHANGER",
        desc: "Michael, measured and unreadable: \"I'm still deciding what he is.\" CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 2",
    title: "THE CALL SHE NEVER EXPECTED",
    runtime: "1:30",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Renee answers the phone. Michael whispers from the bathroom: \"Renee.\" She freezes.",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Renee: \"Why the fuck are you calling me after twenty years?\" Michael: \"Because we need to talk.\" Renee: \"I got a husband. You got a wife. Take it to God.\"",
      },
      {
        time: "0:20–0:40",
        label: "MUTUAL GUILT",
        desc: "Michael: \"You told me you were pregnant.\" Renee: \"And you disappeared behind your marriage just like I disappeared behind mine. Don't call me acting like I buried this alone.\"",
      },
      {
        time: "1:00–1:20",
        label: "SHIFT",
        desc: "Michael takes the hit. He looks toward the bathroom door where Jada is laughing with Darius outside.",
      },
      {
        time: "1:20–1:30",
        label: "CLIFFHANGER",
        desc: "Michael: \"I'm calling because it just walked into my house.\" CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 3",
    title: "YOUR SON, MY DAUGHTER",
    runtime: "1:30",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Renee: \"What walked into your house?\" Michael: \"Your son.\" Renee's face changes. \"Darius?\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Michael: \"Because my daughter brought him.\" Beat. \"As her boyfriend.\" Renee almost drops the phone. \"No.\"",
      },
      {
        time: "0:20–0:40",
        label: "CONFRONTATION",
        desc: "Michael: \"Almost a year, Renee.\" Renee: \"Darius has a father.\" Michael: \"Then say Calvin is his father.\" Renee: \"Calvin raised him.\" Michael: \"That's not what I asked.\"",
      },
      {
        time: "1:00–1:20",
        label: "COUNTER-THREAT",
        desc: "Renee snaps: \"Careful, Michael. You keep pushing, your wife finds out why you care so damn much.\"",
      },
      {
        time: "1:20–1:30",
        label: "CLIFFHANGER",
        desc: "Michael goes silent. Because she is right. CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 4",
    title: "YOU WERE MARRIED TOO",
    runtime: "1:30",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Michael: \"Don't threaten me.\" Renee: \"I'm not threatening you. I'm reminding you.\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Michael: \"Our kids might be—\" Renee: \"Don't say it.\" Michael hardens. \"You refused the DNA test.\" Renee: \"Because I had a husband.\"",
      },
      {
        time: "0:20–0:40",
        label: "EQUAL GUILT",
        desc: "Renee: \"You had a wife. You had a daughter coming. You had a whole life you didn't want blown up either. You wanted answers without consequences.\"",
      },
      {
        time: "1:00–1:20",
        label: "WOUND",
        desc: "Renee: \"Now you want the truth, but you still don't want Tonya to know why.\" Michael cannot deny it. From the hallway: Jada: \"Dad? You okay in there?\"",
      },
      {
        time: "1:20–1:30",
        label: "CLIFFHANGER",
        desc: "Renee: \"Go answer your daughter, Michael.\" CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 5",
    title: "KEEP BOTH SPOUSES OUT",
    runtime: "1:30",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Michael whispers: \"We need a DNA test.\" Renee looks toward her hallway. \"No.\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Renee: \"Not unless we know how to keep Calvin and Tonya out of it.\" Michael: \"This is about our kids.\" Renee: \"And our marriages.\"",
      },
      {
        time: "0:20–0:40",
        label: "ACCUSATION",
        desc: "Michael: \"You care more about Calvin than Darius?\" Renee snaps: \"Don't you dare. Everything I did was to keep my son's life whole.\"",
      },
      {
        time: "1:00–1:20",
        label: "REVERSAL",
        desc: "Michael: \"Whole? Or fake?\" That wounds her. Renee: \"Ask yourself that before Tonya asks why you're hiding in the bathroom calling me.\"",
      },
      {
        time: "1:20–1:30",
        label: "CLIFFHANGER",
        desc: "Michael hears Jada knock. Renee hears Calvin approaching. Both freeze. They whisper at the same time: \"I gotta go.\" CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 6",
    title: "THROW HIM OFF",
    runtime: "1:30",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Renee: \"Don't you ever say my son and your daughter like that again.\" Michael: \"Then tell me he ain't mine.\" Silence. That silence says too much.",
      },
      {
        time: "0:05–0:20",
        label: "INTERRUPTION",
        desc: "Calvin enters the kitchen. \"Babe?\" Renee jumps. \"Who you talking to?\" Renee covers the phone: \"Nobody. Just school stuff.\"",
      },
      {
        time: "0:20–0:40",
        label: "COVER",
        desc: "Calvin: \"School stuff got you pale?\" Michael's voice through the phone: \"Is that Calvin?\" Renee, whispering: \"Shut up.\" Calvin: \"Why you whispering?\" Renee deflects: \"Because you walked in asking questions while I'm on the phone.\"",
      },
      {
        time: "1:00–1:20",
        label: "LIE",
        desc: "Renee: \"It's this fundraiser mess. I'm irritated.\" Calvin backs off. Renee turns away and whispers into the phone: \"Do not call me again tonight.\" Michael: \"We're not done.\" She hangs up.",
      },
      {
        time: "1:20–1:30",
        label: "CLIFFHANGER",
        desc: "Calvin watches her. \"Fundraiser got you shaking?\" Renee forces a smile. CUT TO BLACK.",
      },
    ],
  },
];

export default function BeatSheetsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleTabClick = (i: number) => {
    if (i === active || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 220);
  };

  const ep = BEATS[active];

  const LABEL_COLORS: Record<string, string> = {
    "COLD OPEN":        "#D4AF37",
    "HOOK":             "#e05c8a",
    "TEST":             "#4ecdc4",
    "SHIFT":            "#a29bfe",
    "CLIFFHANGER":      "#D4AF37",
    "INCITING INCIDENT":"#f4a261",
    "MASK":             "#a29bfe",
    "ANSWER":           "#4ecdc4",
    "COLD SILENCE":     "#a0a0a0",
    "CONFRONTATION":    "#8B0000",
    "ESCALATION":       "#f4a261",
    "THE REVEAL":       "#e05c8a",
    "IMPACT":           "#8B0000",
    "INTERRUPTION":     "#f4a261",
    "COVER":            "#4ecdc4",
    "LIE":              "#a29bfe",
    "MUTUAL GUILT":     "#8B0000",
    "COUNTER-THREAT":   "#e05c8a",
    "EQUAL GUILT":      "#8B0000",
    "WOUND":            "#a29bfe",
    "ACCUSATION":       "#f4a261",
    "REVERSAL":         "#e05c8a",
  };

  return (
    <section id="beat-sheets" ref={ref} className="resp-section" style={{ background: "#050505" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div className="section-label">Episode Structure</div>
          <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
          <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
            Beat Sheets
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.55)", marginBottom: "2.5rem", maxWidth: 680, lineHeight: 1.8 }}>
            Six episodes. Six precision-engineered structures. Hook in 5 seconds. Cliffhanger at 60. Every beat pulled directly from the script.
          </p>
        </div>

        {/* Episode tabs */}
        <div style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}>
          {BEATS.map((b, i) => (
            <button
              key={b.ep}
              onClick={() => handleTabClick(i)}
              style={{
                background: active === i ? "#D4AF37" : "transparent",
                border: `1px solid ${active === i ? "#D4AF37" : "rgba(212,175,55,0.4)"}`,
                color: active === i ? "#000" : "#D4AF37",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.55rem 1.25rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
              }}
            >
              {b.ep}: {b.title}
            </button>
          ))}
        </div>

        {/* Beat card */}
        <div style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.18)",
          padding: "clamp(1rem, 4vw, 2.5rem)",
          opacity: visible ? (animating ? 0 : 1) : 0,
          transform: animating ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          boxSizing: "border-box" as const,
          width: "100%",
          overflowX: "hidden",
        }}>
          {/* Card header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#D4AF37",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}>
                {ep.ep} of 6 — SCANDALOUS: BLOODLINE LIES
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 3vw, 1.7rem)", fontWeight: 700, color: "#fff" }}>
                {ep.title}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
                RUNTIME: {ep.runtime}<br />
                FORMAT: 9:16 VERTICAL<br />
                SEASON 1
              </div>
            </div>
          </div>

          {/* Timeline bar */}
          <div style={{ position: "relative", height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, marginBottom: "2.5rem" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%", width: "100%",
              background: "linear-gradient(90deg, #D4AF37, #8B0000)",
              borderRadius: 3,
            }} />
            {ep.beats.map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                top: -5,
                left: `${(i / (ep.beats.length - 1)) * 100}%`,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#D4AF37",
                border: "2px solid #0A0A0A",
                transform: "translateX(-50%)",
                boxShadow: "0 0 10px rgba(212,175,55,0.7)",
              }} />
            ))}
          </div>

          {/* Beat rows — stacked layout (mobile-first) */}
          {ep.beats.map((beat, i) => (
            <div
              key={beat.label + i}
              style={{
                paddingBottom: "1.4rem",
                marginBottom: "1.4rem",
                borderBottom: i < ep.beats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              {/* Meta row: time + label pill side by side */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
                flexWrap: "wrap",
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.3)",
                  whiteSpace: "nowrap",
                }}>
                  {beat.time}
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: LABEL_COLORS[beat.label] ?? "#D4AF37",
                  textTransform: "uppercase",
                  background: `${LABEL_COLORS[beat.label] ?? "#D4AF37"}18`,
                  border: `1px solid ${LABEL_COLORS[beat.label] ?? "#D4AF37"}44`,
                  padding: "0.2rem 0.6rem",
                  borderRadius: 2,
                }}>
                  {beat.label}
                </span>
              </div>
              {/* Description — full width, wraps naturally */}
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(0.88rem, 2.5vw, 0.95rem)",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.8,
                wordBreak: "break-word" as const,
              }}>
                {beat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div style={{
          display: "flex",
          gap: "0.6rem",
          marginTop: "1.5rem",
          justifyContent: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.4s",
        }}>
          {BEATS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleTabClick(i)}
              style={{
                width: active === i ? 28 : 10,
                height: 10,
                borderRadius: 5,
                background: active === i ? "#D4AF37" : "rgba(212,175,55,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
