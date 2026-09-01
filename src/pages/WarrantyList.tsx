import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { PrimaryButton, OutlineButton } from '../components/Buttons';
import { useAppState } from '../state/AppState';

export function WarrantyList() {
  const { warranties } = useAppState();
  const [filter, setFilter] = useState<'ACTIVE' | 'EXPIRED'>('ACTIVE');

  const activeCount = warranties.filter((w) => w.status === 'ACTIVE').length;
  const expiredCount = warranties.filter((w) => w.status === 'EXPIRED').length;

  const shown = useMemo(() => warranties.filter((w) => w.status === filter), [warranties, filter]);

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span className="heading" style={{ fontSize: 34 }}>My warranty</span>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setFilter('ACTIVE')}
            style={{
              border: `1px solid ${filter === 'ACTIVE' ? 'var(--accent2)' : 'var(--border)'}`,
              color: filter === 'ACTIVE' ? 'var(--accent2)' : 'var(--text-muted)',
              background: 'none',
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 14,
              fontWeight: filter === 'ACTIVE' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            Active · {activeCount}
          </button>
          <button
            onClick={() => setFilter('EXPIRED')}
            style={{
              border: `1px solid ${filter === 'EXPIRED' ? 'var(--accent2)' : 'var(--border)'}`,
              color: filter === 'EXPIRED' ? 'var(--accent2)' : 'var(--text-muted)',
              background: 'none',
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 14,
              fontWeight: filter === 'EXPIRED' ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            Expired · {expiredCount}
          </button>
        </div>

        {shown.length === 0 && (
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>No {filter.toLowerCase()} warranties yet.</span>
        )}

        {shown.map((w, i) =>
          i === 0 && filter === 'ACTIVE' ? (
            <div
              key={w.id}
              style={{
                borderRadius: 12,
                border: '1px solid var(--border-strong)',
                background: 'linear-gradient(150deg, #2B2620, #221E19)',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span className="heading" style={{ fontSize: 21, fontWeight: 600 }}>{w.productName}</span>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{w.productType}</span>
                </div>
                <StatusPill status={w.status} />
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                <Field label="CARD NO." value={w.cardNo} />
                <Field label="EXPIRES" value={w.expiresDate} />
              </div>
            </div>
          ) : (
            <div
              key={w.id}
              style={{
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: 'var(--panel)',
                padding: 16,
                display: 'flex',
                justifyContent: 'space-between',
                gap: 10,
                opacity: w.status === 'EXPIRED' ? 0.65 : 1,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span className="heading" style={{ fontSize: 21, fontWeight: 600 }}>{w.productName}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {w.productType} · exp. {w.expiresDate}
                </span>
              </div>
              <StatusPill status={w.status} />
            </div>
          ),
        )}

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16 }}>
          <Link to="/warranty/register" style={{ textDecoration: 'none' }}>
            <PrimaryButton type="button">Register a warranty</PrimaryButton>
          </Link>
          <Link to="/warranty/book-service" style={{ textDecoration: 'none' }}>
            <OutlineButton type="button">Book a service</OutlineButton>
          </Link>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
        {label}
      </span>
      <span className="mono" style={{ fontSize: 14 }}>{value}</span>
    </div>
  );
}

function StatusPill({ status }: { status: 'ACTIVE' | 'EXPIRED' }) {
  const color = status === 'ACTIVE' ? 'var(--green)' : 'var(--red)';
  return (
    <span
      className="mono"
      style={{
        fontSize: 10,
        letterSpacing: '0.08em',
        color,
        border: `1px solid ${color}`,
        borderRadius: 999,
        padding: '5px 9px',
        height: 24,
        flex: 'none',
      }}
    >
      {status}
    </span>
  );
}
