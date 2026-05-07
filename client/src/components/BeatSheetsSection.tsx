import { useEffect, useRef, useState } from "react";

const BEATS = [
  {
    ep: "Ep 1",
    title: "MEET DARIUS",
    runtime: "1:00",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN",  desc: "Michael opens the door. Jada stands with Darius. Michael studies the boy — something about him is unsettlingly familiar." },
      { time: "0:05–0:20", label: "HOOK",        desc: "Darius is respectful, confident, well-spoken. Michael tests him with pointed questions about his background and intentions." },
      { time: "0:20–0:45", label: "CONFLICT",    desc: "Michael asks why he's just now meeting him after almost a year of Jada dating this man. Tension rises." },
      { time: "0:45–0:55", label: "TWIST",       desc: "Darius says his dad raised him not to play with another man's daughter. Michael is unexpectedly impressed — and disturbed." },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Michael, alone: 'I'm still deciding what he is.' Smash cut to black." },
    ],
  },
  {
    ep: "Ep 2",
    title: "THE PHOTO",
    runtime: "1:00",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN",         desc: "Michael, still unsettled, asks Darius about his family over dinner. Darius lights up talking about his dad Calvin." },
      { time: "0:05–0:20", label: "HOOK",               desc: "Darius pulls out his phone. 'That's him right there. My dad Calvin. And my mom.' He hands the phone to Michael." },
      { time: "0:20–0:40", label: "INCITING INCIDENT",  desc: "Michael sees Renee in the photo. His face almost breaks. FLASH CUTS: the motel room, the pregnancy scare, the blocked number." },
      { time: "0:40–0:55", label: "REVERSAL",           desc: "Michael hands the phone back. 'Beautiful family.' His voice barely holds. He excuses himself from the table." },
      { time: "0:55–1:00", label: "CLIFFHANGER",        desc: "Michael looks at Jada's hand resting near Darius's. Under his breath: 'No…' Smash cut to black." },
    ],
  },
  {
    ep: "Ep 3",
    title: "THE CALL",
    runtime: "1:00",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN",  desc: "Michael sits in his car in the dark, staring at an old contact in his phone: RENEE — DO NOT ANSWER." },
      { time: "0:05–0:20", label: "HOOK",        desc: "He dials. It rings. Renee answers, surprised and wary. 'Michael? Why are you calling me?'" },
      { time: "0:20–0:40", label: "CONFLICT",    desc: "Michael tries to ask about her son without revealing why. Renee deflects. The conversation turns cold and guarded." },
      { time: "0:40–0:55", label: "ESCALATION",  desc: "Michael finally says the name: 'Darius.' A long silence. Renee's breathing changes. 'How do you know that name?'" },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Michael: 'Because he's in my house. With my daughter.' The line goes dead. Smash cut to black." },
    ],
  },
  {
    ep: "Ep 4",
    title: "THE CONFRONTATION",
    runtime: "1:00",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN",  desc: "Renee shows up at Michael's house unannounced. Michael steps outside, closing the door behind him." },
      { time: "0:05–0:20", label: "HOOK",        desc: "Renee insists it's a coincidence. Michael doesn't believe her. 'You knew. You had to know.'" },
      { time: "0:20–0:40", label: "CONFLICT",    desc: "Renee breaks down — she never told Calvin the truth. She never told anyone. She buried it for 22 years." },
      { time: "0:40–0:55", label: "TWIST",       desc: "Michael reveals Jada and Darius are talking about getting engaged. Renee's face goes white." },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Renee: 'We have to stop this.' Michael: 'How? Without destroying all of them?' Smash cut to black." },
    ],
  },
  {
    ep: "Ep 5",
    title: "YOUR SON",
    runtime: "1:00",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN",  desc: "Michael calls his wife Sandra. She can hear something is wrong. 'What happened? Talk to me.'" },
      { time: "0:05–0:20", label: "HOOK",        desc: "Michael describes the boy: respectful, talks about his dad Calvin, has a mother named Renee. Sandra goes quiet." },
      { time: "0:20–0:40", label: "CONFLICT",    desc: "Michael reveals the boy's name: Darius. Sandra stops breathing. 'Michael… when?' The affair surfaces for the first time." },
      { time: "0:40–0:55", label: "TWIST",       desc: "Michael's voice cracks into raw fear. 'I need to know if that's my son before my daughter ends up with her brother.'" },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Sandra covers her mouth. Silence. Then: 'Get a DNA test. Tonight.' Smash cut to black." },
    ],
  },
  {
    ep: "Ep 6",
    title: "THE RESULTS",
    runtime: "1:00",
    beats: [
      { time: "0:00–0:05", label: "COLD OPEN",  desc: "Michael sits at the kitchen table. An envelope in front of him. Jada and Darius are laughing in the next room." },
      { time: "0:05–0:20", label: "HOOK",        desc: "Michael opens the envelope. His eyes scan the page. The camera holds on his face — unreadable." },
      { time: "0:20–0:40", label: "CONFLICT",    desc: "Jada walks in. 'Daddy, what's wrong?' Michael folds the paper. 'Sit down, baby. I need to tell you something.'" },
      { time: "0:40–0:55", label: "DEVASTATION", desc: "Jada's world collapses. Darius, summoned in, stares at the paper. No one speaks. The room holds its breath." },
      { time: "0:55–1:00", label: "CLIFFHANGER", desc: "Darius looks at Michael. 'So what do we do now?' Michael has no answer. Smash cut to black. SEASON 1 END." },
    ],
  },
];

export default function BeatSheetsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
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
    setPrevActive(active);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 220);
  };

  const ep = BEATS[active];

  const LABEL_COLORS: Record<string, string> = {
    "COLD OPEN":         "#D4AF37",
    "HOOK":              "#e05c8a",
    "CONFLICT":          "#4ecdc4",
    "INCITING INCIDENT": "#f4a261",
    "REVERSAL":          "#a29bfe",
    "ESCALATION":        "#f4a261",
    "TWIST":             "#a29bfe",
    "DEVASTATION":       "#8B0000",
    "CLIFFHANGER":       "#D4AF37",
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
            Six episodes. Six precision-engineered structures. Hook in 5 seconds. Cliffhanger at 60. Every beat earns the next.
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
              onMouseEnter={e => {
                if (active !== i) (e.currentTarget as HTMLButtonElement).style.borderColor = "#D4AF37";
              }}
              onMouseLeave={e => {
                if (active !== i) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.4)";
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
                {ep.ep} of 6
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
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
              }}>
                {beat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Episode progress dots */}
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
