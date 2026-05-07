/*
 * PasswordGate.tsx — Cinematic vault-door passcode gate for SCANDALOUS: BLOODLINE LIES
 * Codes: 2077 (Owner), 1972 (Malik Davis), 4021 (Jeff Clanagan / Hartbeat), 5555 (James)
 * Layout: vault wheel centered top, keypad stacked directly below
 */
import { useEffect, useRef, useState } from 'react';
import { trpc } from '@/lib/trpc';

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
const VALID_CODES   = new Set(['2077', '1972', '4021', '5555']);
const PROJECT_TITLE = 'SCANDALOUS';
const SUBTITLE      = 'BLOODLINE LIES';
const STUDIO_NAME   = 'UPSCALE PROMOTIONS & ENTERTAINMENT, INC.';
const FOOTER_LABEL  = 'CONFIDENTIAL · AUTHORIZED ACCESS ONLY';
const GOLD          = '#D4AF37';
const GOLD_BRIGHT   = '#FFD700';
const CRIMSON       = '#C41E3A';
// ─────────────────────────────────────────────────────────────────────────────

const KEYS = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['','0','⌫'],
];

interface Props { onUnlock: () => void; }

export default function PasswordGate({ onUnlock }: Props) {
  const [input, setInput]   = useState('');
  const [shake, setShake]   = useState(false);
  const [phase, setPhase]   = useState<'idle' | 'correct' | 'spinning' | 'opening' | 'done'>('idle');
  const logAccess = trpc.vault.logAccess.useMutation();
  const [vaultRotation, setVaultRotation] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);
  const [boltRetracted, setBoltRetracted] = useState(false);
  const [particles, setParticles] = useState<{id:number;angle:number;speed:number;size:number;color:string}[]>([]);
  const rotationRef = useRef(0);
  const animRef = useRef<number | null>(null);

  const burstParticles = () => {
    const colors = [GOLD, GOLD_BRIGHT, '#FFF8DC', CRIMSON, '#fff'];
    setParticles(Array.from({length:80},(_,i)=>({
      id:i, angle:(360/80)*i,
      speed:2+Math.random()*4,
      size:3+Math.random()*7,
      color:colors[Math.floor(Math.random()*colors.length)],
    })));
  };

  const handleKey = (key: string) => {
    if (phase !== 'idle') return;
    if (key === '⌫') { setInput(p=>p.slice(0,-1)); return; }
    if (input.length >= 4) return;
    const next = input + key;
    setInput(next);
    if (next.length === 4) {
      if (VALID_CODES.has(next)) {
        logAccess.mutate({ code: next });
        setPhase('correct');
        burstParticles();
        setTimeout(() => {
          setPhase('spinning');
          let rot = 0;
          const spin = () => {
            rot += 8;
            rotationRef.current = rot;
            setVaultRotation(rot);
            if (rot < 720) {
              animRef.current = requestAnimationFrame(spin);
            } else {
              setBoltRetracted(true);
              setTimeout(() => {
                setPhase('opening');
                setDoorOpen(true);
                setTimeout(() => {
                  setPhase('done');
                  onUnlock();
                }, 1400);
              }, 600);
            }
          };
          animRef.current = requestAnimationFrame(spin);
        }, 400);
      } else {
        setShake(true);
        setTimeout(() => { setShake(false); setInput(''); }, 600);
      }
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleKey(e.key);
      else if (e.key === 'Backspace') handleKey('⌫');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [input, phase]);

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  const isCorrect = phase === 'correct' || phase === 'spinning' || phase === 'opening';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      overflowY: 'auto', overflowX: 'hidden',
      paddingTop: 'max(2rem, env(safe-area-inset-top))',
      paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
      opacity: phase === 'done' ? 0 : 1,
      transition: phase === 'opening' ? 'opacity 1.4s ease 0.8s' : 'none',
    }}>

      {/* ── Background ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 30%, ${GOLD}18 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, ${CRIMSON}0a 0%, transparent 40%),
          linear-gradient(180deg, #0a0a0a 0%, #000 100%)
        `,
      }}/>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.07,
        backgroundImage: `
          linear-gradient(${GOLD} 1px, transparent 1px),
          linear-gradient(90deg, ${GOLD} 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}/>

      {/* ── Top header ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.25rem', zIndex: 4, width: '100%',
        opacity: doorOpen ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 'clamp(0.45rem, 1vw, 0.6rem)',
          letterSpacing: '0.4em', textTransform: 'uppercase',
          color: `${GOLD}88`,
        }}>{STUDIO_NAME}</div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 900, letterSpacing: '0.12em',
          color: '#fff', textTransform: 'uppercase',
          textShadow: isCorrect ? `0 0 40px ${GOLD}99` : 'none',
          transition: 'text-shadow 0.4s ease',
        }}>{PROJECT_TITLE}</div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(0.7rem, 2vw, 1rem)',
          fontWeight: 400, letterSpacing: '0.3em',
          color: GOLD, textTransform: 'uppercase',
          fontStyle: 'italic',
        }}>{SUBTITLE}</div>
      </div>

      {/* ── Main column: vault wheel + keypad stacked ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '2rem', zIndex: 3,
        opacity: doorOpen ? 0 : 1,
        transition: 'opacity 0.4s ease',
        marginTop: '1rem',
        width: '100%',
        maxWidth: 480,
        padding: '0 1rem',
        boxSizing: 'border-box' as const,
      }}>

        {/* Vault wheel */}
        <div style={{
          position: 'relative',
          width: 'min(320px, 55vw)',
          height: 'min(320px, 55vw)',
          transformOrigin: 'left center',
          transition: doorOpen ? 'transform 1.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
          ...(doorOpen ? {
            transform: 'perspective(800px) rotateY(-110deg)',
          } : {}),
        }}>
          {/* Vault door outer ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `conic-gradient(from 0deg, #1a1a1a, #2a2a2a, #1a1a1a, #333, #1a1a1a)`,
            border: `4px solid ${GOLD}66`,
            boxShadow: `
              0 0 60px ${GOLD}33,
              inset 0 0 40px rgba(0,0,0,0.8),
              0 0 0 8px #111,
              0 0 0 12px ${GOLD}22
            `,
          }}>
            {/* Vault spokes / wheel */}
            <div style={{
              position: 'absolute', inset: '8%', borderRadius: '50%',
              background: `conic-gradient(from 0deg, #111, #222, #111, #1a1a1a, #111)`,
              border: `3px solid ${GOLD}44`,
              transform: `rotate(${vaultRotation}deg)`,
            }}>
              {/* Center hub */}
              <div style={{
                position: 'absolute', inset: '35%', borderRadius: '50%',
                background: `radial-gradient(circle, ${GOLD}cc, ${GOLD}66, #1a1a1a)`,
                boxShadow: `0 0 30px ${GOLD}88, inset 0 0 15px rgba(0,0,0,0.5)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="40%" height="40%" viewBox="0 0 60 60" fill="none">
                  <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle"
                    fontFamily="Georgia, serif" fontSize="28" fontWeight="bold"
                    fill="#000">UP</text>
                </svg>
              </div>
              {/* Spokes */}
              {[0,45,90,135,180,225,270,315].map(angle => (
                <div key={angle} style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: '50%', height: '3px',
                  background: `linear-gradient(90deg, ${GOLD}88, transparent)`,
                  transformOrigin: 'left center',
                  transform: `rotate(${angle}deg)`,
                  marginTop: '-1.5px',
                }}/>
              ))}
              {/* Bolt holes */}
              {[0,45,90,135,180,225,270,315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const r = 42;
                const cx = 50 + r * Math.cos(rad);
                const cy = 50 + r * Math.sin(rad);
                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: `${cx}%`, top: `${cy}%`,
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, #333, #111)`,
                    border: `1px solid ${GOLD}44`,
                    transform: 'translate(-50%,-50%)',
                    boxShadow: `inset 0 0 4px rgba(0,0,0,0.8)`,
                  }}/>
                );
              })}
            </div>

            {/* Retractable bolts */}
            {[
              {top:'50%', left:'auto', right:'-14px', bottom:'auto', transform:'translateY(-50%)', isH:true},
              {top:'50%', left:'-14px', right:'auto', bottom:'auto', transform:'translateY(-50%)', isH:true},
              {top:'auto', bottom:'-14px', left:'50%', right:'auto', transform:'translateX(-50%)', isH:false},
              {top:'-14px', bottom:'auto', left:'50%', right:'auto', transform:'translateX(-50%)', isH:false},
            ].map((bolt, i) => (
              <div key={i} style={{
                position: 'absolute',
                top: bolt.top, left: bolt.left, right: bolt.right, bottom: bolt.bottom,
                transform: bolt.transform,
                width: bolt.isH ? (boltRetracted ? '0px' : '28px') : '14px',
                height: bolt.isH ? '14px' : (boltRetracted ? '0px' : '28px'),
                background: `linear-gradient(${bolt.isH ? '90deg' : '180deg'}, ${GOLD}, ${GOLD}88)`,
                borderRadius: '3px',
                boxShadow: `0 0 8px ${GOLD}66`,
                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                overflow: 'hidden',
              }}/>
            ))}

            {/* Inner ring glow */}
            <div style={{
              position: 'absolute', inset: '4%', borderRadius: '50%',
              border: `2px solid ${GOLD}${isCorrect ? 'cc' : '22'}`,
              boxShadow: isCorrect ? `0 0 30px ${GOLD}88, inset 0 0 20px ${GOLD}22` : 'none',
              transition: 'all 0.5s ease',
              pointerEvents: 'none',
            }}/>
          </div>

          {/* Door frame shadow */}
          <div style={{
            position: 'absolute', top: 0, left: '-4px', bottom: 0, width: '8px',
            background: `linear-gradient(90deg, ${GOLD}44, transparent)`,
            borderRadius: '4px 0 0 4px',
          }}/>
        </div>

        {/* ── Keypad (directly below vault wheel) ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.75rem',
        }}>
          {/* Label */}
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: GOLD,
          }}>ENTER PASSCODE</div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 'clamp(0.5rem, 0.9vw, 0.65rem)',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}>4-DIGIT ACCESS CODE</div>

          {/* PIN dots */}
          <div style={{
            display: 'flex', gap: '0.75rem', margin: '0.25rem 0',
            animation: shake ? 'pg-shake 0.5s ease' : 'none',
          }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                width: 18, height: 18, borderRadius: '50%',
                background: i < input.length || isCorrect ? GOLD : 'transparent',
                border: `2px solid ${i < input.length || isCorrect ? GOLD : 'rgba(255,255,255,0.25)'}`,
                boxShadow: i < input.length || isCorrect ? `0 0 14px ${GOLD}cc` : 'none',
                transition: 'all 0.2s ease',
              }}/>
            ))}
          </div>

          {/* Status */}
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 'clamp(0.5rem, 1vw, 0.65rem)',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: isCorrect ? GOLD : shake ? CRIMSON : 'rgba(255,255,255,0.2)',
            height: '1em', transition: 'color 0.3s ease',
          }}>
            {isCorrect ? '✦ ACCESS GRANTED ✦' : shake ? 'INVALID CODE' : input.length === 0 ? 'ENTER CODE' : '\u00A0'}
          </div>

          {/* Keypad grid */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 64px)',
            gridTemplateRows: 'repeat(4, 64px)',
            gap: '0.5rem',
            opacity: isCorrect ? 0.3 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: phase !== 'idle' ? 'none' : 'auto',
          }}>
            {KEYS.flat().map((key, idx) => (
              <button key={idx} onClick={() => key && handleKey(key)} disabled={!key}
                style={{
                  width: 64, height: 64,
                  borderRadius: 6,
                  border: key ? `1px solid ${GOLD}33` : 'none',
                  background: key ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: '#fff',
                  fontSize: key === '⌫' ? '1.3rem' : '1.6rem',
                  fontFamily: key === '⌫' ? 'Inter, sans-serif' : "'Playfair Display', Georgia, serif",
                  fontWeight: 700, cursor: key ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  lineHeight: 1,
                  transition: 'all 0.15s ease',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)', outline: 'none',
                  padding: 0, margin: 0, boxSizing: 'border-box',
                }}
                onMouseEnter={e => {
                  if (!key) return;
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.background = `${GOLD}1f`;
                  b.style.borderColor = `${GOLD}80`;
                  b.style.boxShadow = `0 0 16px ${GOLD}33`;
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement;
                  b.style.background = 'rgba(255,255,255,0.03)';
                  b.style.borderColor = `${GOLD}33`;
                  b.style.boxShadow = 'none';
                }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.9)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
              >{key}</button>
            ))}
          </div>

          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 'clamp(0.4rem, 0.8vw, 0.55rem)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)', textAlign: 'center',
            marginTop: '0.25rem',
          }}>SECURE · PRIVATE · CONFIDENTIAL</div>
        </div>
      </div>

      {/* ── Bottom footer ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.4rem', zIndex: 4, width: '100%',
        marginTop: '1.5rem',
        opacity: doorOpen ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{
          width: '60%', height: '1px',
          background: `linear-gradient(90deg, transparent, ${GOLD}44, transparent)`,
        }}/>
        <div style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 'clamp(0.4rem, 0.8vw, 0.55rem)',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.15)',
        }}>{FOOTER_LABEL}</div>
      </div>

      {/* ── Particles ── */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: '50%', top: '40%',
          width: p.size, height: p.size, borderRadius: '50%',
          background: p.color,
          animation: `pg-particle-${p.id} 1.2s ease-out forwards`,
          pointerEvents: 'none', zIndex: 10,
        }}/>
      ))}

      {/* ── Vault opening flash ── */}
      {doorOpen && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 8,
          background: 'radial-gradient(ellipse at center, #fff8 0%, transparent 60%)',
          animation: 'vaultFlash 0.6s ease-out forwards',
          pointerEvents: 'none',
        }}/>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;600&display=swap');
        @keyframes pg-shake {
          0%,100%{transform:translateX(0)} 15%{transform:translateX(-10px)}
          30%{transform:translateX(10px)} 45%{transform:translateX(-8px)}
          60%{transform:translateX(8px)} 75%{transform:translateX(-4px)} 90%{transform:translateX(4px)}
        }
        @keyframes vaultFlash {
          0%{opacity:1} 100%{opacity:0}
        }
        ${particles.map(p=>`
          @keyframes pg-particle-${p.id} {
            0%{transform:translate(-50%,-50%) scale(1);opacity:1}
            100%{transform:translate(calc(-50% + ${Math.cos((p.angle*Math.PI)/180)*p.speed*160}px),calc(-50% + ${Math.sin((p.angle*Math.PI)/180)*p.speed*160}px)) scale(0);opacity:0}
          }
        `).join('')}
      `}</style>
    </div>
  );
}
