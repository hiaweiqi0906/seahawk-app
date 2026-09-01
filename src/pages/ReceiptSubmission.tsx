import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BackHeader } from '../components/BackHeader';
import { PrimaryButton } from '../components/Buttons';
import { DEALERS } from '../data/mockData';
import { useAppState } from '../state/AppState';

export function ReceiptSubmission() {
  const { addActivity } = useAppState();
  const navigate = useNavigate();

  const [photoReady, setPhotoReady] = useState(false);
  const [total, setTotal] = useState('');
  const [date, setDate] = useState('');
  const [dealer, setDealer] = useState(DEALERS[0].name);

  const totalNumber = Number.parseFloat(total) || 0;
  const earned = Math.floor(totalNumber);
  const canSubmit = photoReady && totalNumber > 0;

  function submit() {
    if (!canSubmit) return;
    addActivity(`Receipt · ${dealer}`, earned);
    navigate('/rewards/mine', { replace: true });
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BackHeader title="Submit receipt" fallback="/rewards" />
        <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>
          Photograph the whole receipt — shop name, date and total must be readable. Points land within 2 working days.
        </span>

        <button
          type="button"
          onClick={() => setPhotoReady(true)}
          style={{
            height: 210,
            borderRadius: 12,
            border: `1px ${photoReady ? 'solid var(--green)' : 'dashed var(--border-strong)'}`,
            background: 'var(--panel-alt)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
        >
          {photoReady ? (
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', background: 'var(--green)', color: 'var(--ink)', padding: '4px 8px', borderRadius: 4 }}>
              READABLE ✓
            </span>
          ) : (
            <>
              <span style={{ fontSize: 22, color: 'var(--gold)' }}>+</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>TAP TO PHOTOGRAPH RECEIPT</span>
            </>
          )}
        </button>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Total spent (RM)
            </span>
            <input
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              inputMode="decimal"
              placeholder="0.00"
              style={{ height: 52, borderRadius: 6, border: '1px solid var(--gold)', background: 'var(--panel)', color: 'var(--text)', padding: '0 14px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 16 }}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Date
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ height: 52, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', padding: '0 14px', fontFamily: "'IBM Plex Mono', monospace", fontSize: 15 }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Where you bought it
          </span>
          <select
            value={dealer}
            onChange={(e) => setDealer(e.target.value)}
            style={{ height: 52, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', padding: '0 14px', fontSize: 15 }}
          >
            {DEALERS.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div style={{ borderRadius: 12, background: 'linear-gradient(135deg, rgba(247,212,134,0.14), rgba(229,166,42,0.10))', border: '1px solid var(--border-strong)', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>YOU'LL EARN</span>
            <span className="heading" style={{ fontSize: 30, lineHeight: 1, color: 'var(--gold-hover)' }}>+{earned.toLocaleString()} PTS</span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'right', maxWidth: '14ch' }}>1 pt per RM 1</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton type="button" onClick={submit} disabled={!canSubmit}>
            Submit for review
          </PrimaryButton>
          <span style={{ fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>
            One submission per receipt. Duplicates are rejected.
          </span>
        </div>
      </div>
    </Screen>
  );
}
