import { useEffect, useRef, useState } from "react";

const CHECKLIST = [
  {
    category: "Submission Package",
    color: "#D4AF37",
    items: [
      { label: "Series title and logline", met: true },
      { label: "Episode count and runtime", met: true },
      { label: "Format specification (9:16 vertical)", met: true },
      { label: "Production company and rights holder", met: true },
      { label: "Contact information for legal representation", met: true },
    ],
  },
  {
    category: "Story & Format Evaluation",
    color: "#4ecdc4",
    items: [
      { label: "Serialized narrative structure", met: true },
      { label: "60-second episode format", met: true },
      { label: "Cliffhanger / hook at episode end", met: true },
      { label: "Mobile-first visual language", met: true },
    ],
  },
  {
    category: "Audience & Genre Evaluation",
    color: "#e05c8a",
    items: [
      { label: "Target demographic defined", met: true },
      { label: "Genre clearly established", met: true },
      { label: "Comparable titles provided", met: true },
      { label: "Social media audience demonstrated", met: true },
    ],
  },
  {
    category: "Production Viability Evaluation",
    color: "#D4AF37",
    items: [
      { label: "Scripts provided (minimum 2 episodes)", met: true },
      { label: "Beat sheets provided", met: true },
      { label: "Cast attached or proposed", met: true },
      { label: "Legal representation confirmed", met: true },
    ],
  },
];

const LEGAL_NOTES = [
  {
    category: "Story Origin",
    status: "CLEAR",
    color: "#4ecdc4",
    note: "Adapted from real, publicly documented events shared voluntarily on social media by Lonnie Maurice Hill. All character names, locations, and identifying details have been changed. This is a fictional drama inspired by real events — no real persons are depicted.",
  },
  {
    category: "Content",
    status: "COMPLIANT",
    color: "#D4AF37",
    note: "No incestuous acts depicted. The relationship ends before biological connection is confirmed. Story is about the horror of discovery. Designed to comply with TikTok, YouTube, Instagram, and Facebook community standards. Targets TV-14 / MA-L rating.",
  },
  {
    category: "IP & Rights",
    status: "OWNED",
    color: "#D4AF37",
    note: "All 60 episodes written by Malik Davis. Full copyright held by Upscale Promotions & Entertainment, Inc. All characters are original fictional creations. SCANDALOUS: BLOODLINE BETRAYAL is an original title.",
  },
];

export default function ComplianceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const totalItems = CHECKLIST.reduce((acc, c) => acc + c.items.length, 0);
  const metItems = CHECKLIST.reduce((acc, c) => acc + c.items.filter(i => i.met).length, 0);

  return (
    <section id="compliance" ref={ref} style={{ background: "#050505", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">Due Diligence</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          Compliance & Rights
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "3rem" }}>
          Hartbeat Vertical submission requirements and IP compliance, fully documented.
        </p>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          background: "rgba(212,175,55,0.08)",
          border: "1px solid rgba(212,175,55,0.4)",
          padding: "0.75rem 1.5rem",
          marginBottom: "3rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#D4AF37", boxShadow: "0 0 8px #D4AF37" }} />
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase" }}>
            {metItems} of {totalItems} Hartbeat Vertical Requirements Met
          </div>
        </div>

        {/* Checklist grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2px",
          background: "rgba(212,175,55,0.08)",
          marginBottom: "4rem",
        }}>
          {CHECKLIST.map((section, si) => (
            <div key={section.category} style={{
              background: "#060606",
              padding: "2rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.7s ease ${si * 0.1}s, transform 0.7s ease ${si * 0.1}s`,
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: section.color,
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: `1px solid ${section.color}25`,
              }}>
                {section.category}
              </div>
              {section.items.map((item, ii) => (
                <div key={item.label} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  marginBottom: ii < section.items.length - 1 ? "0.75rem" : 0,
                }}>
                  {/* Checkmark */}
                  <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: item.met ? section.color : "transparent",
                    border: `1px solid ${section.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    {item.met && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: item.met ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legal notes */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "2.5rem" }}>
          {LEGAL_NOTES.map((note, i) => (
            <div key={note.category} style={{
              background: "#060606",
              padding: "1.5rem 2rem",
              display: "grid",
              gridTemplateColumns: "120px 80px 1fr",
              gap: "1.5rem",
              alignItems: "flex-start",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.7s ease ${0.4 + i * 0.1}s`,
            }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                {note.category}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: note.color,
                background: `${note.color}15`,
                border: `1px solid ${note.color}40`,
                padding: "0.2rem 0.5rem",
                textTransform: "uppercase",
                textAlign: "center",
                alignSelf: "flex-start",
              }}>
                {note.status}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {note.note}
              </div>
            </div>
          ))}
        </div>

        {/* Legal disclaimer */}
        <div style={{
          padding: "1.5rem 2rem",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "rgba(255,255,255,0.45)" }}>Legal Disclaimer:</strong> SCANDALOUS: BLOODLINE BETRAYAL is a work of fiction. All characters, events, and locations depicted are fictional. Any resemblance to real persons, living or dead, is coincidental. The series is inspired by publicly documented social media content. Full legal review recommended prior to production. All rights reserved © 2026 Upscale Promotions & Entertainment, Inc. Legal representation: The Law Office of Omara S. Harris, Esq, LLC · musicandfilmlaw@omaraharris.com · 404-409-7354
          </p>
        </div>
      </div>
    </section>
  );
}
