import { useEffect, useRef, useState } from "react";

// ── Beat data derived directly from the six script episodes ──────────────────
const BEATS = [
  {
    ep: "Ep 1",
    title: "MEET DARIUS",
    runtime: "1:00",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Michael opens the front door. Jada stands with Darius. Darius extends his hand: \"Mr. Reed. Good to finally meet you, sir.\"",
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
        time: "0:45–0:55",
        label: "SHIFT",
        desc: "Michael nods, impressed despite himself. Jada: \"See? He's not bad.\" Michael: \"I didn't say he was bad.\" A beat of silence.",
      },
      {
        time: "0:55–1:00",
        label: "CLIFFHANGER",
        desc: "Michael, measured and unreadable: \"I'm still deciding what he is.\" CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 2",
    title: "THE PHOTO",
    runtime: "1:00",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Michael asks about Darius's family. Darius lights up: \"My dad? That's my guy. He's in my life every day.\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Darius pulls out his phone. \"Matter fact, that's him right there. My dad Calvin. And my mom.\" He turns the phone toward Michael.",
      },
      {
        time: "0:20–0:40",
        label: "INCITING INCIDENT",
        desc: "Michael sees Renee in the photo. His face almost breaks. FLASH CUTS: young Renee in a motel room — Michael removing his wedding ring — a pregnancy test — Michael: \"We need a DNA test\" — Renee: \"I'm not blowing up my marriage\" — phone screen: BLOCKED.",
      },
      {
        time: "0:40–0:55",
        label: "MASK",
        desc: "Michael blinks back to the room. He hands the phone back. \"Beautiful family.\" His voice barely holds. Darius: \"Appreciate that. That's everything to me.\"",
      },
      {
        time: "0:55–1:00",
        label: "CLIFFHANGER",
        desc: "Michael looks at Jada's hand resting near Darius's. Under his breath: \"No…\" CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 3",
    title: "THE BATHROOM CALL",
    runtime: "1:00",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Michael stands abruptly. \"Excuse me one second.\" He walks down the hall. Bathroom door closes. His face drops. To himself: \"Fuck.\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Michael pulls out his phone. Scrolls through old contacts. Stops on: RENEE COLE. His thumb hovers. From the living room — muffled laughter. He presses call.",
      },
      {
        time: "0:20–0:40",
        label: "ANSWER",
        desc: "Renee answers. \"Hello? Who is this?\" Michael: \"Renee.\" A beat. Renee: \"Who the hell is this?\" Michael: \"It's Michael.\"",
      },
      {
        time: "0:40–0:55",
        label: "COLD SILENCE",
        desc: "Silence. Renee's voice turns cold. \"Michael Reed?\" Michael: \"Yeah.\"",
      },
      {
        time: "0:55–1:00",
        label: "CLIFFHANGER",
        desc: "Renee: \"Why the fuck are you calling me?\" CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 4",
    title: "TWENTY YEARS",
    runtime: "1:00",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Renee: \"Why the fuck are you calling me?\" Michael: \"Because we need to talk.\" Renee: \"No, we don't. Whatever you got going on, leave me out of it.\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Michael hears Jada laugh in the living room. He looks at the bathroom door. \"You remember the last time I saw you?\" Renee goes quiet.",
      },
      {
        time: "0:20–0:40",
        label: "CONFRONTATION",
        desc: "Michael: \"You told me you were pregnant.\" Renee: \"Don't do this.\" Michael: \"I asked you for a DNA test.\" Renee: \"And I said no.\" Michael: \"Because you didn't want to blow up your marriage.\" Renee: \"And you didn't want to blow up yours. Don't act like I was the only coward.\"",
      },
      {
        time: "0:40–0:55",
        label: "ESCALATION",
        desc: "Michael: \"I know what we did.\" Renee: \"Then why bring it up now?\" From the living room, Darius's voice: \"Yes, ma'am. I respect Jada. Always.\" Michael closes his eyes.",
      },
      {
        time: "0:55–1:00",
        label: "CLIFFHANGER",
        desc: "Michael: \"Because your past is sitting in my living room.\" Renee freezes. CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 5",
    title: "YOUR SON",
    runtime: "1:00",
    beats: [
      {
        time: "0:00–0:05",
        label: "COLD OPEN",
        desc: "Renee: \"What the hell does that mean?\" Michael: \"My daughter brought a boy home tonight.\" Renee: \"What boy?\"",
      },
      {
        time: "0:05–0:20",
        label: "HOOK",
        desc: "Michael: \"A boy she's been dating almost a year. Respectful. Cool kid. Talking about his dad Calvin.\" Renee's face shifts. \"What did you say?\"",
      },
      {
        time: "0:20–0:40",
        label: "THE REVEAL",
        desc: "Michael: \"He pulled out his phone. Showed me a picture of his family.\" Beat. \"His dad Calvin.\" Beat. \"His mother.\" Renee stops breathing. \"What's his name?\" Michael: \"Darius.\"",
      },
      {
        time: "0:40–0:55",
        label: "IMPACT",
        desc: "Renee, whispered: \"Oh my God.\" Michael: \"Yeah.\" Michael's voice cracks into anger.",
      },
      {
        time: "0:55–1:00",
        label: "CLIFFHANGER",
        desc: "Michael: \"So now I need to know if that's my son before my daughter ends up with her brother.\" Renee covers her mouth. CUT TO BLACK.",
      },
    ],
  },
  {
    ep: "Ep 6",
    title: "THROW HIM OFF",
    runtime: "1:00",
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
        time: "0:40–0:55",
        label: "LIE",
        desc: "Renee: \"It's this fundraiser mess. I'm irritated.\" Calvin backs off. Renee turns away and whispers into the phone: \"Do not call me again tonight.\" Michael: \"We're not done.\" She hangs up.",
      },
      {
        time: "0:55–1:00",
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
          padding: "2.5rem",
          opacity: visible ? (animating ? 0 : 1) : 0,
          transform: animating ? "translateY(10px)" : "translateY(0)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
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

          {/* Beat rows */}
          {ep.beats.map((beat, i) => (
            <div
              key={beat.label}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 160px 1fr",
                gap: "1rem",
                paddingBottom: "1.4rem",
                marginBottom: "1.4rem",
                borderBottom: i < ep.beats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                alignItems: "start",
              }}
            >
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
                paddingTop: 3,
                whiteSpace: "nowrap",
              }}>
                {beat.time}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: LABEL_COLORS[beat.label] ?? "#D4AF37",
                textTransform: "uppercase",
                paddingTop: 3,
              }}>
                {beat.label}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.75,
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
