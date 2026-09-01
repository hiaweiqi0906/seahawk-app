import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { LEADERBOARD, YOU_LEADERBOARD } from '../data/mockData';

type Metric = 'Heaviest' | 'Longest' | 'Most';
const METRICS: Metric[] = ['Heaviest', 'Longest', 'Most'];

function metricValue(entry: (typeof LEADERBOARD)[number], metric: Metric) {
  if (metric === 'Heaviest') return { value: entry.heaviestKg, label: `${entry.heaviestKg.toFixed(2)} kg` };
  if (metric === 'Longest') return { value: entry.longestCm, label: `${entry.longestCm.toFixed(1)} cm` };
  return { value: entry.catchCount, label: `${entry.catchCount} catches` };
}

export function Leaderboard() {
  const navigate = useNavigate();
  const [metric, setMetric] = useState<Metric>('Heaviest');

  const ranked = useMemo(() => {
    return [...LEADERBOARD]
      .sort((a, b) => metricValue(b, metric).value - metricValue(a, metric).value)
      .map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [metric]);

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/catch')}
            aria-label="Back to catches"
            style={{ background: 'none', border: 'none', fontSize: 20, color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            ←
          </button>
          <span className="heading" style={{ fontSize: 34 }}>Leaderboard</span>
        </div>

        <div style={{ display: 'flex', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 999, padding: 4, gap: 4 }}>
          {METRICS.map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 999,
                border: 'none',
                background: metric === m ? 'var(--gold-gradient)' : 'transparent',
                color: metric === m ? 'var(--ink)' : 'var(--text-muted)',
                fontSize: 14,
                fontWeight: metric === m ? 700 : 600,
                cursor: 'pointer',
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
          AUG 2026 · BARRAMUNDI · MALAYSIA
        </span>

        {ranked.map((entry) =>
          entry.rank === 1 ? (
            <div
              key={entry.name}
              style={{
                borderRadius: 12,
                border: '1px solid var(--border-strong)',
                background: 'linear-gradient(150deg, rgba(229,166,42,0.16), #221E19)',
                padding: 16,
                display: 'flex',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <span className="heading" style={{ fontSize: 30, color: 'var(--gold)', width: 34 }}>1</span>
              <div style={{ width: 48, height: 48, borderRadius: 999, background: 'repeating-linear-gradient(135deg, #2B2620 0 8px, #332D25 8px 16px)', flex: 'none' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{entry.name}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{entry.location}</span>
              </div>
              <span className="mono" style={{ fontSize: 17, color: 'var(--gold)' }}>{metricValue(entry, metric).label}</span>
            </div>
          ) : (
            <div key={entry.name} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
              <span className="heading" style={{ fontSize: 22, color: 'var(--text-muted)', width: 34 }}>{entry.rank}</span>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--panel-alt)', flex: 'none' }} />
              <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{entry.name}</span>
              <span className="mono" style={{ fontSize: 15, color: 'var(--accent2)' }}>{metricValue(entry, metric).label}</span>
            </div>
          ),
        )}

        <div style={{ marginTop: 'auto', borderRadius: 12, border: '1px solid var(--gold)', background: 'rgba(229,166,42,0.08)', padding: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
          <span className="heading" style={{ fontSize: 22, color: 'var(--gold)', width: 34 }}>{YOU_LEADERBOARD.rank}</span>
          <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--panel-alt)', flex: 'none' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>You</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{YOU_LEADERBOARD.toTop10Kg} kg to top 10</span>
          </div>
          <span className="mono" style={{ fontSize: 15, color: 'var(--gold)' }}>{YOU_LEADERBOARD.heaviestKg.toFixed(2)} kg</span>
        </div>
      </div>
    </Screen>
  );
}
