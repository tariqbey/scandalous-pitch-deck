import { useEffect, useRef, useState } from "react";

type EpKey = "ep1" | "ep2" | "ep3";

const EPISODES: { key: EpKey; label: string; title: string }[] = [
  { key: "ep1", label: "Episode 1", title: "THE CALL" },
  { key: "ep2", label: "Episode 2", title: "THE MATH" },
  { key: "ep3", label: "Episode 3", title: "SUNDAY DINNER" },
];

// Script block container style (white page, Courier New — skill spec)
const scriptStyle: React.CSSProperties = {
  background: "#fff",
  padding: "3rem 3.5rem",
  borderRadius: "2px",
  border: "1px solid rgba(0,0,0,0.08)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: "1rem",
  lineHeight: "1.8",
  color: "#111",
  wordBreak: "break-word",
  overflowWrap: "break-word",
  overflowX: "hidden",
};

const titleBlockStyle: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "3rem",
  fontWeight: "bold",
};

function Ep1() {
  return (
    <div style={scriptStyle}>
      <div style={titleBlockStyle}>
        <div>SCANDALOUS: BLOODLINE BETRAYAL</div>
        <div>"THE CALL"</div>
        <div style={{ fontWeight: "normal" }}>written by</div>
        <div>Malik Davis</div>
        <div>Upscale Promotions & Entertainment, Inc.</div>
      </div>

      <span className="sp-action">FADE IN:</span>

      <span className="sp-slug">INT. MARCUS'S HOME OFFICE — NIGHT</span>
      <span className="sp-action">The room is dark except for the glow of triple monitors. MARCUS HAYES (48, tailored, silver-templed) stares at a photo on his phone — his daughter TIANA (23) and her fiancé LEO (24), laughing at a rooftop party.</span>
      <span className="sp-action">Marcus zooms in on Leo's face. Something about the jaw. The eyes.</span>
      <span className="sp-action">His phone buzzes. A text from Tiana:</span>

      <span className="sp-char">TIANA (TEXT)</span>
      <span className="sp-dialog">Dad. Leo wants to meet you properly. Dinner Sunday? He's nervous lol. Be nice.</span>

      <span className="sp-action">Marcus types back a thumbs-up. But he doesn't send it.</span>
      <span className="sp-action">He opens his laptop. Types: "VANESSA COLE — NEWARK NJ"</span>
      <span className="sp-action">The search results load. He stares.</span>

      <span className="sp-trans">CUT TO:</span>

      <span className="sp-slug">INT. MARCUS'S HOME OFFICE — MOMENTS LATER</span>
      <span className="sp-action">A photo fills his screen. VANESSA COLE (46, stunning, unbothered). And beside her — LEO.</span>
      <span className="sp-action">Marcus's face drains of color.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-paren">(barely a whisper)</span>
      <span className="sp-dialog">No. No, no, no...</span>

      <span className="sp-action">He picks up his phone. Dials. It rings once.</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-paren">(answering immediately)</span>
      <span className="sp-dialog">I wondered how long it would take you to call.</span>

      <span className="sp-action">Marcus can't speak.</span>

      <span className="sp-char">VANESSA (V.O.) (CONT'D)</span>
      <span className="sp-dialog">Twenty-three years, Marcus. You've got some nerve.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-dialog">Vanessa — is Leo your son?</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-beat">Beat.</span>
      <span className="sp-dialog">Is Tiana your daughter?</span>

      <span className="sp-action">The silence between them is deafening.</span>

      <span className="sp-trans">SMASH CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 1</span>
    </div>
  );
}

function Ep2() {
  return (
    <div style={scriptStyle}>
      <div style={titleBlockStyle}>
        <div>SCANDALOUS: BLOODLINE BETRAYAL</div>
        <div>"THE MATH"</div>
        <div style={{ fontWeight: "normal" }}>written by</div>
        <div>Malik Davis</div>
        <div>Upscale Promotions & Entertainment, Inc.</div>
      </div>

      <span className="sp-action">FADE IN:</span>

      <span className="sp-slug">INT. MARCUS'S HOME OFFICE — CONTINUOUS</span>
      <span className="sp-action">Marcus sits frozen. The phone still pressed to his ear. The silence between him and VANESSA stretches like a wire about to snap.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-dialog">When. When was Leo born?</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-dialog">March 14th. You do the math.</span>

      <span className="sp-action">Marcus's jaw tightens. He opens his phone calendar. Counts backward. His hand starts to shake.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-paren">(barely audible)</span>
      <span className="sp-dialog">That's... that's nine months after—</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-dialog">After you disappeared. Yes.</span>

      <span className="sp-beat">Beat.</span>

      <span className="sp-char">VANESSA (V.O.) (CONT'D)</span>
      <span className="sp-dialog">I tried to find you, Marcus. For six months. You had already moved on. New city. New woman. New life.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-dialog">You should have told me—</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-paren">(cutting him off, cold)</span>
      <span className="sp-dialog">Told you what? That I was pregnant by a man who ghosted me after six months? No. I raised my son. He doesn't know about you. And he never needed to.</span>

      <span className="sp-beat">Beat.</span>

      <span className="sp-char">VANESSA (V.O.) (CONT'D)</span>
      <span className="sp-dialog">Until now.</span>

      <span className="sp-action">Marcus stands. Paces. His reflection in the dark window — a man unraveling.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-dialog">Vanessa — my daughter is in love with your son.</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-paren">(long pause)</span>
      <span className="sp-dialog">I know.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-dialog">You know?</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-dialog">Leo showed me her picture two months ago. I recognized the Hayes eyes immediately. I've been waiting for you to figure it out.</span>

      <span className="sp-action">Marcus grabs the desk to steady himself.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-dialog">We have to stop this. We have to tell them—</span>

      <span className="sp-char">VANESSA (V.O.)</span>
      <span className="sp-dialog">Tell them what, exactly? That their parents had a secret? That their love story is a nightmare? You think that's a conversation you're ready to have?</span>

      <span className="sp-beat">Beat.</span>

      <span className="sp-char">VANESSA (V.O.) (CONT'D)</span>
      <span className="sp-dialog">Because if you tell them, Marcus — everything comes out. Everything.</span>

      <span className="sp-action">The threat lands like a blade.</span>

      <span className="sp-trans">CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 2</span>
    </div>
  );
}

function Ep3() {
  return (
    <div style={scriptStyle}>
      <div style={titleBlockStyle}>
        <div>SCANDALOUS: BLOODLINE BETRAYAL</div>
        <div>"SUNDAY DINNER"</div>
        <div style={{ fontWeight: "normal" }}>written by</div>
        <div>Malik Davis</div>
        <div>Upscale Promotions & Entertainment, Inc.</div>
      </div>

      <span className="sp-action">FADE IN:</span>

      <span className="sp-slug">INT. HAYES FAMILY HOME — DINING ROOM — EVENING</span>
      <span className="sp-action">A beautifully set table. Crystal. Candles. ELENA HAYES (46, elegant, sharp-eyed) arranges the centerpiece. She hears the front door.</span>

      <span className="sp-char">ELENA</span>
      <span className="sp-paren">(calling out)</span>
      <span className="sp-dialog">They're here! Marcus, they're here!</span>

      <span className="sp-action">TIANA enters, glowing, holding LEO's hand. Leo is handsome, warm, nervous. He carries wine and flowers.</span>

      <span className="sp-char">TIANA</span>
      <span className="sp-dialog">Mom, this is Leo. Leo, this is my mom.</span>

      <span className="sp-char">ELENA</span>
      <span className="sp-paren">(warmly)</span>
      <span className="sp-dialog">We've heard so much about you. Come in, come in.</span>

      <span className="sp-action">Leo smiles. Hands her the flowers. Elena takes them — then her eyes drift past Leo to the hallway.</span>

      <span className="sp-action">MARCUS stands in the doorway. Frozen. His eyes locked on LEO.</span>

      <span className="sp-action">Leo turns. Extends his hand.</span>

      <span className="sp-char">LEO</span>
      <span className="sp-dialog">Mr. Hayes. It's an honor. Tiana talks about you constantly.</span>

      <span className="sp-action">Marcus stares at Leo's face. The jaw. The eyes. His eyes. He sees himself twenty years younger.</span>

      <span className="sp-action">Elena notices Marcus's expression. A flicker of confusion crosses her face.</span>

      <span className="sp-char">ELENA</span>
      <span className="sp-paren">(quietly, to Marcus)</span>
      <span className="sp-dialog">Marcus. Shake his hand.</span>

      <span className="sp-action">A beat that lasts forever.</span>

      <span className="sp-action">Marcus reaches out. Takes Leo's hand. Shakes it. His grip is too tight. Too long.</span>

      <span className="sp-char">MARCUS</span>
      <span className="sp-paren">(voice controlled, barely)</span>
      <span className="sp-dialog">Welcome to the family, Leo.</span>

      <span className="sp-action">The words taste like ash.</span>

      <span className="sp-action">Tiana beams. Elena watches Marcus. Leo smiles, oblivious.</span>

      <span className="sp-action">Under the table, Marcus's phone vibrates. A text from an unknown number:</span>

      <span className="sp-char">UNKNOWN (TEXT)</span>
      <span className="sp-dialog">DNA doesn't lie, Marcus. You have 48 hours to tell them. Or I will.</span>

      <span className="sp-action">Marcus's hand tightens around his phone.</span>

      <span className="sp-trans">SMASH CUT TO BLACK.</span>
      <span className="sp-trans">END OF EPISODE 3</span>
    </div>
  );
}

const SCRIPT_COMPONENTS: Record<EpKey, React.FC> = { ep1: Ep1, ep2: Ep2, ep3: Ep3 };

export default function ScriptsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeEp, setActiveEp] = useState<EpKey>("ep1");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const ActiveScript = SCRIPT_COMPONENTS[activeEp];

  return (
    <section id="scripts" ref={ref} style={{ background: "#050505", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="section-label">Sample Scripts</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "3rem", opacity: visible ? 1 : 0, transition: "opacity 0.7s ease" }}>
          Read the Scripts
        </h2>

        {/* Episode tabs */}
        <div style={{ display: "flex", gap: "0", marginBottom: "2.5rem", borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
          {EPISODES.map((ep) => (
            <button
              key={ep.key}
              onClick={() => setActiveEp(ep.key)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: activeEp === ep.key ? "2px solid #D4AF37" : "2px solid transparent",
                color: activeEp === ep.key ? "#D4AF37" : "rgba(255,255,255,0.4)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                marginBottom: "-1px",
              }}
            >
              {ep.label}: {ep.title}
            </button>
          ))}
        </div>

        {/* Script content */}
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.2s" }}>
          <ActiveScript />
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.5rem" }}>
            Full 60-episode script package available upon request.
          </p>
          <button
            className="gold-btn"
            onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
          >
            Request Full Package
          </button>
        </div>
      </div>
    </section>
  );
}
