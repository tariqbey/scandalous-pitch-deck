import { useEffect, useRef, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
} from "recharts";

// ── Virality data from research ──────────────────────────────────────────────
const PLATFORM_DATA = [
  { platform: "TikTok", views: 3200, color: "#D4AF37" },
  { platform: "YouTube", views: 1800, color: "#8B0000" },
  { platform: "Facebook", views: 950, color: "#4ecdc4" },
  { platform: "Instagram", views: 620, color: "#e05c8a" },
  { platform: "X / Twitter", views: 430, color: "#a0a0a0" },
];

const DEMO_DATA = [
  { name: "18–24", value: 28, color: "#D4AF37" },
  { name: "25–34", value: 34, color: "#8B0000" },
  { name: "35–44", value: 22, color: "#4ecdc4" },
  { name: "45–54", value: 11, color: "#e05c8a" },
  { name: "55+", value: 5, color: "#a0a0a0" },
];

const GROWTH_DATA = [
  { day: "Day 1", views: 180 },
  { day: "Day 2", views: 420 },
  { day: "Day 3", views: 890 },
  { day: "Day 4", views: 1400 },
  { day: "Day 5", views: 2100 },
  { day: "Day 6", views: 2900 },
  { day: "Day 7", views: 3800 },
  { day: "Day 8", views: 5200 },
  { day: "Day 9", views: 6100 },
  { day: "Day 10", views: 7000 },
];

const STATS = [
  { value: "7M+", label: "Total Cross-Platform Views", sub: "Documented across TikTok, YouTube, Facebook, Instagram, X" },
  { value: "3.2M+", label: "TikTok Views", sub: "@lonniemauricehill flagship videos" },
  { value: "1M+", label: "YouTube Views", sub: "Shorts + reaction content" },
  { value: "950K+", label: "Facebook Engagement", sub: "Views + shares on original posts" },
  { value: "62%", label: "Female Audience", sub: "Primary demographic 25–44" },
  { value: "7 Days", label: "To Viral Status", sub: "Organic, zero paid promotion" },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#111", border: "1px solid rgba(212,175,55,0.3)", padding: "0.75rem 1rem" }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#D4AF37", marginBottom: "0.25rem" }}>{label}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#fff" }}>
          {payload[0].value.toLocaleString()}K views
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="analytics" ref={ref} className="resp-section" style={{ background: "#000" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Social Proof</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1rem" }} />
        <h2 className="display-heading" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", marginBottom: "0.75rem" }}>
          The Audience Already Exists
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", maxWidth: 700, lineHeight: 1.8, marginBottom: "3rem" }}>
          Before a single episode is produced, the source story has generated over <strong style={{ color: "#D4AF37" }}>7 million documented views</strong> across platforms — with zero paid promotion. This is not a pitch for an audience. This is a pitch to serve one that already exists.
        </p>

        {/* Source attribution */}
        <div style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.2)",
          padding: "1.25rem 2rem",
          marginBottom: "3rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "#D4AF37", textTransform: "uppercase" }}>
            Source Story
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
            @lonniemauricehill — "My daughter's fiancé is my biological son" — TikTok, YouTube, Facebook, Instagram
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginLeft: "auto" }}>
            Data collected April 2026 · Organic reach only
          </div>
        </div>

        {/* Big stat counters */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1px",
          background: "rgba(212,175,55,0.1)",
          marginBottom: "4rem",
        }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{
              background: "#060606",
              padding: "2rem 1.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, color: "#D4AF37", marginBottom: "0.5rem" }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

          {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {/* Platform bar chart */}
          <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.1)", padding: "2rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Views by Platform (000s)</div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={PLATFORM_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="platform" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="views" radius={[2, 2, 0, 0]}>
                  {PLATFORM_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Demographic pie chart */}
          <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.1)", padding: "2rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Audience Age Demographics</div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={DEMO_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" strokeWidth={0}>
                    {DEMO_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1 }}>
                {DEMO_DATA.map((d) => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.6)" }}>{d.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: d.color, marginLeft: "auto", fontWeight: 600 }}>{d.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Growth line chart */}
          <div style={{ background: "#0A0A0A", border: "1px solid rgba(212,175,55,0.1)", padding: "2rem" }}>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>Cumulative Views — First 10 Days (000s)</div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={GROWTH_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid rgba(212,175,55,0.3)", fontFamily: "'Inter', sans-serif", fontSize: "0.75rem" }} />
                <Line type="monotone" dataKey="views" stroke="#D4AF37" strokeWidth={2} dot={{ fill: "#D4AF37", r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender split */}
        <div style={{
          background: "#0A0A0A",
          border: "1px solid rgba(212,175,55,0.1)",
          padding: "2rem",
          marginBottom: "3rem",
        }}>
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>Gender Split</div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#e05c8a" }}>Female</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#e05c8a", fontWeight: 700 }}>62%</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: visible ? "62%" : "0%", background: "#e05c8a", borderRadius: 4, transition: "width 1.5s ease 0.5s" }} />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#4ecdc4" }}>Male</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "#4ecdc4", fontWeight: 700 }}>38%</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: visible ? "38%" : "0%", background: "#4ecdc4", borderRadius: 4, transition: "width 1.5s ease 0.7s" }} />
              </div>
            </div>
          </div>
        </div>

        {/* The Soap Opera Parallel */}
        <div style={{
          padding: "2.5rem",
          border: "1px solid rgba(212,175,55,0.2)",
          background: "rgba(212,175,55,0.03)",
        }}>
          <div className="section-label" style={{ marginBottom: "1rem" }}>The Historical Parallel</div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff", marginBottom: "1rem" }}>
            Procter & Gamble Invented Soap Operas to Sell Soap.<br />
            <span style={{ color: "#D4AF37" }}>Vertical Micro-Drama Is the New Soap Opera.</span>
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, maxWidth: 800 }}>
            In the 1930s, P&G funded serialized radio dramas to build daily audience habits and sell products. The format worked because it was emotional, addictive, and built into daily routines. Today, vertical micro-drama on TikTok, YouTube Shorts, and Instagram Reels occupies the same psychological space — but with 100x the distribution reach and zero gatekeeping. SCANDALOUS is engineered for exactly this moment.
          </p>
        </div>
      </div>
    </section>
  );
}
