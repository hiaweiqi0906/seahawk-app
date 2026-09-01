import { Link } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { PRODUCTS, tierInfo } from '../data/mockData';
import { useAppState } from '../state/AppState';

const NEW_ARRIVALS = PRODUCTS.filter((p) =>
  ['desert-storm-103hsl', 'air-storm-4'].includes(p.slug),
);

export function Home() {
  const { user } = useAppState();
  const { tier } = tierInfo(user.points);

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="eyebrow">{user.greeting.toUpperCase()}</span>
            <span className="heading" style={{ fontSize: 28 }}>{user.name}</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--gold)' }}>
              {user.points.toLocaleString()} PTS · {tier.name.toUpperCase()}
            </span>
          </div>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="mono" style={{ fontSize: 20, color: 'var(--accent2)' }}>31°</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Penang</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tide ↑ 06:40</span>
          </div>
        </div>

        <div
          style={{
            height: 150,
            borderRadius: 14,
            background:
              "url('https://seahawkfishing.com/wp-content/uploads/2024/10/Musha_Reel_Web_Banner_1920x1080.jpg') center/cover no-repeat, #221E19",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 999, background: 'rgba(229,166,42,0.9)' }} />
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-secondary)' }}>
            CAMPAIGN VIDEO
          </span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Link
            to="/catch/capture"
            style={{
              flex: 1,
              height: 54,
              borderRadius: 999,
              background: 'var(--gold-gradient)',
              color: 'var(--ink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Scan catch
          </Link>
          <Link
            to="/warranty/register"
            style={{
              flex: 1,
              height: 54,
              borderRadius: 999,
              border: '1px solid var(--accent2)',
              color: 'var(--accent2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            Register
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="heading" style={{ fontSize: 20 }}>New arrivals</span>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', minWidth: 0, touchAction: 'pan-x' }}>
            {NEW_ARRIVALS.map((p) => (
              <Link
                key={p.slug}
                to={`/products/${p.category}/${p.slug}`}
                style={{
                  width: 132,
                  flex: 'none',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'var(--panel)',
                  overflow: 'hidden',
                  color: 'var(--text)',
                }}
              >
                <div style={{ height: 86, background: `url('${p.image}') center/contain no-repeat, #F5F1EA` }} />
                <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--accent2)', letterSpacing: '0.1em' }}>
                    {p.subLabel}
                  </span>
                  <span className="heading" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.1 }}>
                    {p.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <Link
            to="/buy-now"
            style={{
              height: 66,
              borderRadius: 10,
              background: 'var(--panel-alt)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 9,
              color: 'var(--text)',
            }}
          >
            <span className="heading" style={{ fontSize: 16, fontWeight: 600 }}>Where to buy</span>
          </Link>
          <a
            href="https://shopee.com.my"
            target="_blank"
            rel="noreferrer"
            style={{
              height: 66,
              borderRadius: 10,
              background: 'var(--panel-alt)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 9,
              color: 'var(--text)',
            }}
          >
            <span className="heading" style={{ fontSize: 16, fontWeight: 600 }}>E-seller</span>
          </a>
          <Link
            to="/warranty/book-service"
            style={{
              height: 66,
              borderRadius: 10,
              background: 'var(--panel-alt)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 9,
              color: 'var(--text)',
            }}
          >
            <span className="heading" style={{ fontSize: 16, fontWeight: 600 }}>Book service</span>
          </Link>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
