import { Link } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { tierInfo } from '../data/mockData';
import { useAppState } from '../state/AppState';

export function RewardsOverview() {
  const { user, coupons, claimed } = useAppState();
  const { tier, next, progress, pointsToNext } = tierInfo(user.points);
  const activeCoupons = coupons.filter((c) => c.status === 'active').length;
  const activeRewards = activeCoupons + claimed.length;

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="heading" style={{ fontSize: 34 }}>Rewards</span>
          <Link
            to="/rewards/mine"
            style={{
              height: 38,
              borderRadius: 999,
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 14px',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            Activity
          </Link>
        </div>

        <div style={{ borderRadius: 16, background: 'var(--gold-gradient)', padding: 18, display: 'flex', flexDirection: 'column', gap: 14, color: 'var(--ink)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: 'var(--ink)',
                  color: 'var(--gold-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.04em',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                {tier.name.slice(0, 4).toUpperCase()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em' }}>{tier.name.toUpperCase()} MEMBER</span>
                <span style={{ fontSize: 12, opacity: 0.72 }}>Member since {user.memberSince}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span className="heading" style={{ fontSize: 20, lineHeight: 1 }}>{activeRewards}</span>
                <span className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', opacity: 0.72 }}>ACTIVE REWARDS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span className="heading" style={{ fontSize: 20, lineHeight: 1 }}>{activeCoupons}</span>
                <span className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', opacity: 0.72 }}>COUPONS</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span className="heading" style={{ fontSize: 58, lineHeight: 0.9, letterSpacing: '-0.01em' }}>
              {user.points.toLocaleString()}
            </span>
            <span className="heading" style={{ fontWeight: 600, fontSize: 22 }}>PTS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 5, borderRadius: 999, background: 'rgba(26,22,17,0.22)', overflow: 'hidden' }}>
              <div style={{ width: `${Math.round(progress * 100)}%`, height: '100%', background: 'var(--ink)' }} />
            </div>
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: '0.1em', opacity: 0.78 }}>
              <span>{tier.name.toUpperCase()} TIER</span>
              <span>{next ? `${pointsToNext.toLocaleString()} PTS TO ${next.name.toUpperCase()}` : 'TOP TIER'}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
          <span style={{ flex: 'none', border: '1px solid var(--gold)', background: 'rgba(229,166,42,0.10)', color: 'var(--gold)', borderRadius: 999, padding: '9px 13px', fontSize: 13, fontWeight: 600 }}>
            Overview
          </span>
          <Link to="/rewards/mine" style={{ flex: 'none', border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text-muted)', borderRadius: 999, padding: '9px 13px', fontSize: 13 }}>
            My rewards
          </Link>
          <Link to="/rewards/shop" style={{ flex: 'none', border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text-muted)', borderRadius: 999, padding: '9px 13px', fontSize: 13 }}>
            Deals
          </Link>
          <Link to="/rewards/shop" style={{ flex: 'none', border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text-muted)', borderRadius: 999, padding: '9px 13px', fontSize: 13 }}>
            Shop
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="heading" style={{ fontSize: 20 }}>Ways to earn</span>

          <Link to="/rewards/receipt" style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 14, display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)' }}>
            <EarnIcon label="RC" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Submit a receipt</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>1 pt per RM 1 spent</span>
            </div>
            <span style={{ color: 'var(--accent2)' }}>→</span>
          </Link>

          <Link to="/warranty/register" style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 14, display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text)' }}>
            <EarnIcon label="WR" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Register a warranty</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>+250 pts each</span>
            </div>
            <span style={{ color: 'var(--accent2)' }}>→</span>
          </Link>

          <div style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 14, display: 'flex', alignItems: 'center', gap: 12, opacity: 0.7 }}>
            <EarnIcon label="BM" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Beli &amp; Menang 2.0</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Campaign ends 30 Sep</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}

function EarnIcon({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 8,
        background: 'var(--panel-alt)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        color: 'var(--accent2)',
        flex: 'none',
      }}
    >
      {label}
    </div>
  );
}
