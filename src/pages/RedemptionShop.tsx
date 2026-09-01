import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BackHeader } from '../components/BackHeader';
import { REWARDS_CATALOG, REWARD_CATEGORIES } from '../data/mockData';
import { useAppState } from '../state/AppState';

export function RedemptionShop() {
  const { user, redeemReward } = useAppState();
  const navigate = useNavigate();
  const [category, setCategory] = useState('Reel');
  const [redeemed, setRedeemed] = useState<string | null>(null);

  const items = useMemo(
    () => REWARDS_CATALOG.filter((i) => i.category === category),
    [category],
  );

  function handleRedeem(item: (typeof REWARDS_CATALOG)[number]) {
    const ok = redeemReward(item);
    if (ok) {
      setRedeemed(item.name);
      setTimeout(() => navigate('/rewards/mine'), 900);
    }
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <BackHeader title="Redemption shop" fallback="/rewards" />
          <span className="mono" style={{ fontSize: 13, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
            {user.points.toLocaleString()}
          </span>
        </div>
        <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>
          Spend points on Seahawk gear or instant vouchers.
        </span>

        <div style={{ display: 'flex', gap: 7, overflowX: 'auto', minWidth: 0, touchAction: 'pan-x' }}>
          {REWARD_CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                style={{
                  flex: 'none',
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
                {c}
              </button>
            );
          })}
        </div>

        {redeemed && (
          <div style={{ borderRadius: 12, border: '1px solid var(--green)', background: 'rgba(87,199,126,0.08)', padding: 14, fontSize: 14, color: 'var(--green)' }}>
            Redeemed {redeemed} — check My rewards.
          </div>
        )}

        {items.length === 0 && (
          <div style={{ borderRadius: 12, border: '1px dashed var(--border-strong)', padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
            No rewards in this category yet.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {items.map((item) => {
            const affordable = user.points >= item.cost;
            const shortfall = item.cost - user.points;
            return (
              <div key={item.slug} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 108, background: `url('${item.image}') center/contain no-repeat, #F5F1EA` }} />
                <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: affordable ? 'var(--accent2)' : 'var(--text-faint)' }}>
                    {item.cost.toLocaleString()} PTS
                  </span>
                  <span className="heading" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.1, flex: 1, color: affordable ? 'var(--text)' : 'var(--text-muted)' }}>
                    {item.name}
                  </span>
                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={!affordable}
                    style={{
                      height: 40,
                      borderRadius: 999,
                      border: 'none',
                      background: affordable ? 'var(--gold-gradient)' : 'var(--panel-alt)',
                      color: affordable ? 'var(--ink)' : 'var(--text-faint)',
                      fontSize: 13,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      cursor: affordable ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {affordable ? 'Redeem' : `${shortfall.toLocaleString()} short`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Screen>
  );
}
