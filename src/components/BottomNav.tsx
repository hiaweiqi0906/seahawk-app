import { Link, useLocation } from 'react-router-dom';

const TABS = [
  { to: '/home', label: 'Home', match: (path: string) => path === '/home' },
  { to: '/warranty', label: 'Warranty', match: (path: string) => path.startsWith('/warranty') },
  { to: '/rewards', label: 'Rewards', match: (path: string) => path.startsWith('/rewards') },
  { to: '/products', label: 'Products', match: (path: string) => path.startsWith('/products') },
  {
    to: '/more',
    label: 'More',
    match: (path: string) => path === '/more' || path.startsWith('/buy-now') || path.startsWith('/faq'),
  },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      style={{
        display: 'flex',
        borderTop: '1px solid var(--border)',
        background: 'var(--nav-bg)',
        padding: '11px 6px calc(env(safe-area-inset-bottom, 0px) + 12px)',
        flex: 'none',
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.match(location.pathname);
        return (
          <Link
            key={tab.to}
            to={tab.to}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: isActive ? 'var(--gold)' : 'var(--border-strong)',
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
