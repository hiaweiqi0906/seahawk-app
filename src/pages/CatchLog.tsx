import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/Buttons';
import { useAppState } from '../state/AppState';

export function CatchLog() {
  const { catches } = useAppState();
  const navigate = useNavigate();

  const speciesCount = useMemo(() => new Set(catches.map((c) => c.species)).size, [catches]);
  const best = useMemo(() => Math.max(0, ...catches.map((c) => c.weightKg)), [catches]);

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/home')}
            aria-label="Back to home"
            style={{ background: 'none', border: 'none', fontSize: 20, color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            ←
          </button>
          <span className="heading" style={{ fontSize: 34 }}>My catches</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Stat label="LOGGED" value={String(catches.length)} />
          <Stat label="SPECIES" value={String(speciesCount)} />
          <Stat label="BEST" value={`${best.toFixed(1)} kg`} highlight />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {catches.map((c) => (
            <div key={c.id} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: 8, background: 'repeating-linear-gradient(135deg, #2B2620 0 8px, #332D25 8px 16px)', flex: 'none' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                <span className="heading" style={{ fontSize: 20, fontWeight: 600 }}>{c.species}</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--accent2)' }}>
                  {c.lengthCm.toFixed(1)} cm · {c.weightKg.toFixed(2)} kg{c.estimated ? ' EST.' : ''}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.date} · {c.location}</span>
              </div>
            </div>
          ))}
        </div>

        <Link to="/leaderboard" style={{ fontSize: 14, color: 'var(--accent2)', textAlign: 'center' }}>
          View leaderboard →
        </Link>

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <Link to="/catch/capture" style={{ textDecoration: 'none' }}>
            <PrimaryButton type="button">Scan a new catch</PrimaryButton>
          </Link>
        </div>
      </div>
    </Screen>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 12,
        border: `1px solid ${highlight ? 'var(--border-strong)' : 'var(--border)'}`,
        background: highlight ? 'var(--panel-alt)' : 'var(--panel)',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{label}</span>
      <span className="mono" style={{ fontSize: 22, color: highlight ? 'var(--gold)' : 'var(--text)' }}>{value}</span>
    </div>
  );
}
