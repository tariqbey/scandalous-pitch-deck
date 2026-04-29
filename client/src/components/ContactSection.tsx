import { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto with summary to both addresses
    const subject = encodeURIComponent(`SCANDALOUS Pitch Inquiry — ${form.name} / ${form.company}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(
      `mailto:malik.upscaleproductions@gmail.com,realjetsonlife@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} style={{
      background: "#000",
      padding: "8rem 1.5rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        height: 700,
        background: "radial-gradient(ellipse at center, rgba(212,175,55,0.05), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ marginBottom: "1rem" }}>Ready to Move</div>
          <h2 className="display-heading" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", marginBottom: "1.5rem" }}>
            Let's Make<br />This Series.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
            The audience exists. The scripts are written. The story is proven. All that's missing is the right platform partner.
          </p>
          <div className="gold-rule" style={{ maxWidth: 200, margin: "2rem auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem" }}>
          {/* Contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <div className="section-label" style={{ marginBottom: "0.5rem" }}>Producer</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff" }}>Malik Davis</div>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: "0.5rem" }}>Production Company</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#D4AF37" }}>Upscale Promotions & Entertainment, Inc.</div>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: "0.5rem" }}>Business Inquiries</div>
              <a href="mailto:malik.upscaleproductions@gmail.com" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "block", marginBottom: "0.25rem" }}>
                malik.upscaleproductions@gmail.com
              </a>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: "0.5rem" }}>Legal Representation</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                The Law Office of Omara S. Harris, Esq, LLC<br />
                <a href="mailto:musicandfilmlaw@omaraharris.com" style={{ color: "#D4AF37", textDecoration: "none" }}>musicandfilmlaw@omaraharris.com</a><br />
                404-409-7354
              </div>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: "0.5rem" }}>Available Upon Request</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                Full 60-episode script package<br />
                Beat sheets (Episodes 1–60)<br />
                Production bible<br />
                Budget breakdown (3 tiers)<br />
                Cast proposals
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <div>
            {submitted ? (
              <div style={{
                background: "#0A0A0A",
                border: "1px solid rgba(212,175,55,0.3)",
                padding: "3rem",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#D4AF37", marginBottom: "1rem" }}>
                  Message Sent
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
                  Thank you for your interest in SCANDALOUS: BLOODLINE BETRAYAL. We'll be in touch shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "Full name" },
                  { key: "company", label: "Company / Platform", type: "text", placeholder: "Network or streaming platform" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                      {field.label}
                    </div>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      required
                      style={{
                        width: "100%",
                        background: "#0A0A0A",
                        border: "1px solid rgba(212,175,55,0.2)",
                        color: "#fff",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.85rem",
                        padding: "0.75rem 1rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    Message
                  </div>
                  <textarea
                    placeholder="Tell us about your interest in the series..."
                    value={form.message}
                    onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={4}
                    required
                    style={{
                      width: "100%",
                      background: "#0A0A0A",
                      border: "1px solid rgba(212,175,55,0.2)",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      padding: "0.75rem 1rem",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button type="submit" className="gold-btn" style={{ marginTop: "0.5rem", width: "100%", padding: "1rem" }}>
                  Request Full Package
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
