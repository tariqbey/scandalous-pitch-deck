import { useState, useEffect, useRef } from "react";

const SCRIPTS = [
  {
    ep: "Episode 1",
    title: "THE CALL",
    pages: `INT. MARCUS'S HOME OFFICE — NIGHT

The room is dark except for the glow of triple monitors. MARCUS HAYES (48, tailored, silver-templed) stares at a photo on his phone — his daughter TIANA (23) and her fiancé LEO (24), laughing at a rooftop party.

Marcus zooms in on Leo's face. Something about the jaw. The eyes.

His phone buzzes. A text from Tiana:

    TIANA (TEXT)
    Dad. Leo wants to meet you
    properly. Dinner Sunday?
    He's nervous lol. Be nice 🙏

Marcus types back a thumbs-up. But he doesn't send it.

He opens his laptop. Types: "VANESSA COLE — NEWARK NJ"

The search results load. He stares.

                                        CUT TO:

INT. MARCUS'S HOME OFFICE — MOMENTS LATER

A photo fills his screen. VANESSA COLE (46, stunning, unbothered). And beside her — LEO.

Marcus's face drains of color.

    MARCUS
    (barely a whisper)
    No. No, no, no...

He picks up his phone. Dials. It rings once.

    VANESSA (V.O.)
    (answering immediately)
    I wondered how long it would
    take you to call.

Marcus can't speak.

    VANESSA (V.O.) (CONT'D)
    Twenty-three years, Marcus.
    You've got some nerve.

    MARCUS
    Vanessa — is Leo your son?

    VANESSA (V.O.)
    (beat)
    Is Tiana your daughter?

The silence between them is deafening.

                                        SMASH CUT TO BLACK.

TITLE CARD: SCANDALOUS: BLOODLINE BETRAYAL`,
  },
  {
    ep: "Episode 2",
    title: "THE MATH",
    pages: `INT. MARCUS'S CAR — NIGHT

Marcus sits in his parked car outside his own house. Engine off. Knuckles white on the steering wheel.

He opens his phone's calculator. Types in a year. Subtracts. Stares at the number.

    MARCUS
    (to himself)
    Twenty-three years.

He pulls up his calendar. Scrolls back. Stops on a date circled in red: the Jersey Shore conference. The Marriott. Room 412.

He closes the app. Opens his texts. Finds TIANA.

    TIANA (TEXT)
    Dad?? You okay? You went
    quiet. Sunday still good?

Marcus stares at the message for a long time.

INT. MARCUS'S BEDROOM — LATER

His wife ELENA (46, elegant, perceptive) is reading in bed. She looks up as Marcus enters.

    ELENA
    You were in the car for
    forty minutes.

    MARCUS
    Work call.

    ELENA
    (studying him)
    You look like you've seen
    a ghost.

    MARCUS
    (forcing a smile)
    Just tired.

He gets into bed. Stares at the ceiling.

    ELENA
    (not looking up from her book)
    Marcus. Whatever it is...
    you can tell me.

    MARCUS
    (long pause)
    I know.

He says nothing else.

                                        FADE TO BLACK.`,
  },
  {
    ep: "Episode 3",
    title: "SUNDAY DINNER",
    pages: `INT. HAYES FAMILY DINING ROOM — EVENING

The table is set for six. Candles. Good china. ELENA moves through the kitchen with practiced grace. TIANA buzzes around her.

    TIANA
    Mom. Is the salmon okay?
    Leo's allergic to shellfish
    but I don't know about fish—

    ELENA
    Tiana. Breathe.

    TIANA
    I just want it to be perfect.

    ELENA
    It will be.

The DOORBELL rings. Tiana freezes. Then bolts for the door.

INT. HAYES FAMILY FOYER — CONTINUOUS

Tiana opens the door. LEO stands there — handsome, nervous, holding flowers. Behind him: VANESSA.

Tiana's smile falters for just a second. She wasn't expecting Leo's mother.

    TIANA
    Oh — Mrs. Cole! We didn't
    know you were coming—

    VANESSA
    (warm, controlled)
    Leo insisted. I hope that's
    okay. I brought wine.

She holds up a bottle. Her eyes move past Tiana.

Marcus appears at the end of the hallway.

Their eyes meet.

Twenty-three years collapse into three seconds.

    VANESSA
    (barely audible)
    Marcus.

    MARCUS
    (barely audible)
    Vanessa.

Leo looks between them, confused.

    LEO
    You two know each other?

                                        SMASH CUT TO BLACK.`,
  },
];

export default function ScriptsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="scripts" ref={ref} style={{ background: "#000", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Sample Scripts</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          Read the Pages
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem" }}>
          Three sample episodes from the series. Full 60-episode script package available upon request.
        </p>

        {/* Episode tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {SCRIPTS.map((s, i) => (
            <button
              key={s.ep}
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
              {s.ep}: {s.title}
            </button>
          ))}
        </div>

        {/* Script display */}
        <div style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.15)",
          padding: "3rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}>
          {/* Script header */}
          <div style={{ textAlign: "center", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", color: "#D4AF37", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              SCANDALOUS: BLOODLINE BETRAYAL
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>
              {SCRIPTS[active].ep.toUpperCase()} — "{SCRIPTS[active].title}"
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: "0.25rem" }}>
              Written by Malik Davis | Upscale Promotions & Entertainment, Inc.
            </div>
          </div>

          {/* Script body */}
          <pre style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
            color: "rgba(255,255,255,0.85)",
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            margin: 0,
            maxHeight: 600,
            overflowY: "auto",
          }}>
            {SCRIPTS[active].pages}
          </pre>
        </div>

        {/* Request full package CTA */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>
            Full 60-episode script package, beat sheets, and production bible available upon request.
          </p>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            <button className="gold-btn">Request Full Package</button>
          </a>
        </div>
      </div>
    </section>
  );
}
