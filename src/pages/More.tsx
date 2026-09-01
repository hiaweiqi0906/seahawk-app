import { Link } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAppState } from '../state/AppState';

export function More() {
  const { logout } = useAppState();

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span className="heading" style={{ fontSize: 34 }}>More</span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <MoreLink to="/buy-now" label="Where to buy" subtitle="Find a dealer near you" />
          <MoreLink to="/faq" label="Help & FAQ" subtitle="Warranty, service and points answers" />
          <ThemeToggle />
          <MoreLink to={undefined} label="Profile & settings" subtitle="Coming soon" disabled />
          <MoreLink to={undefined} label="Notifications" subtitle="Coming soon" disabled />
        </div>

        <button
          onClick={logout}
          style={{
            marginTop: 'auto',
            height: 48,
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--panel)',
            color: 'var(--text-muted)',
            fontSize: 14,
            fontWeight: 600,
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Log out
        </button>
      </div>
      <BottomNav />
    </Screen>
  );
}

function MoreLink({
  to,
  label,
  subtitle,
  disabled,
}: {
  to: string | undefined;
  label: string;
  subtitle: string;
  disabled?: boolean;
}) {
  const content = (
    <div
      style={{
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: 'var(--panel)',
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        opacity: disabled ? 0.55 : 1,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span className="heading" style={{ fontSize: 19, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{subtitle}</span>
      </div>
      {!disabled && <span style={{ color: 'var(--accent2)' }}>→</span>}
    </div>
  );

  if (disabled || !to) {
    return <div>{content}</div>;
  }

  return (
    <Link to={to} style={{ color: 'var(--text)' }}>
      {content}
    </Link>
  );
}
