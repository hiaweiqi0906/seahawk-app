import { useState } from 'react';
import { Screen } from '../components/Screen';
import { BackHeader } from '../components/BackHeader';
import { useAppState } from '../state/AppState';

type Tab = 'coupons' | 'claimed' | 'used';

export function MyRewards() {
  const { coupons, claimed, activity } = useAppState();
  const [tab, setTab] = useState<Tab>('coupons');

  const activeCoupons = coupons.filter((c) => c.status === 'active');
  const usedCoupons = coupons.filter((c) => c.status === 'used');

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BackHeader title="My rewards" fallback="/rewards" />

        <div style={{ display: 'flex', gap: 8 }}>
          <TabPill label={`Coupons · ${activeCoupons.length}`} active={tab === 'coupons'} onClick={() => setTab('coupons')} />
          <TabPill label={`Claimed · ${claimed.length}`} active={tab === 'claimed'} onClick={() => setTab('claimed')} />
          <TabPill label="Used" active={tab === 'used'} onClick={() => setTab('used')} />
        </div>

        {tab === 'coupons' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activeCoupons.length === 0 && <EmptyState text="No active coupons." />}
            {activeCoupons.map((c) =>
              c.type === 'voucher' ? (
                <div key={c.id} style={{ borderRadius: 12, background: 'var(--gold-gradient)', color: 'var(--ink)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em' }}>VOUCHER</span>
                      <span className="heading" style={{ fontSize: 28, lineHeight: 1 }}>{c.title}</span>
                      <span style={{ fontSize: 13, opacity: 0.75 }}>{c.subtitle}</span>
                    </div>
                    <span className="mono" style={{ fontSize: 10, background: 'var(--ink)', color: 'var(--gold-hover)', padding: '5px 9px', borderRadius: 999 }}>
                      EXP {c.expires.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ borderTop: '1px dashed rgba(26,22,17,0.35)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="mono" style={{ fontSize: 15, letterSpacing: '0.08em' }}>{c.code}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>Show at dealer →</span>
                  </div>
                </div>
              ) : (
                <div key={c.id} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--accent2)' }}>FREE SERVICE</span>
                    <span className="heading" style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.1 }}>{c.title}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.subtitle}</span>
                  </div>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '5px 9px', borderRadius: 999 }}>
                    EXP {c.expires.toUpperCase()}
                  </span>
                </div>
              ),
            )}
          </div>
        )}

        {tab === 'claimed' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {claimed.length === 0 && <EmptyState text="Nothing redeemed yet." />}
            {claimed.map((item) => (
              <div key={item.id} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 8, background: `url('${item.image}') center/contain no-repeat, #F5F1EA`, flex: 'none' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span className="heading" style={{ fontSize: 18, fontWeight: 600 }}>{item.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'used' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {usedCoupons.length === 0 && <EmptyState text="No used coupons yet." />}
            {usedCoupons.map((c) => (
              <div key={c.id} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 16, opacity: 0.6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span className="heading" style={{ fontSize: 19, fontWeight: 600 }}>{c.title}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.subtitle}</span>
              </div>
            ))}
          </div>
        )}

        <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: 4 }}>
          ACTIVITY LOG
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {activity.map((a, i) => (
            <div
              key={a.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '13px 0',
                borderBottom: i < activity.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 15 }}>{a.label}</span>
                <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>{a.date}</span>
              </div>
              <span className="mono" style={{ fontSize: 14, color: a.amount >= 0 ? 'var(--green)' : 'var(--red)' }}>
                {a.amount >= 0 ? '+' : '−'}{Math.abs(a.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function TabPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
        background: active ? 'rgba(229,166,42,0.10)' : 'none',
        color: active ? 'var(--gold)' : 'var(--text-muted)',
        borderRadius: 999,
        padding: '8px 13px',
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div style={{ borderRadius: 12, border: '1px dashed var(--border-strong)', padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
      {text}
    </div>
  );
}
