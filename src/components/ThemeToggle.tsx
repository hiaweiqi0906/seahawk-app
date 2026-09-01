import { useAppState } from '../state/AppState';

export function ThemeToggle() {
  const { theme, setTheme } = useAppState();

  return (
    <div
      style={{
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: 'var(--panel)',
        padding: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <span className="heading" style={{ fontSize: 19, fontWeight: 600 }}>Appearance</span>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Light or dark theme</span>
      </div>
      <div style={{ display: 'flex', background: 'var(--panel-alt)', border: '1px solid var(--border)', borderRadius: 999, padding: 3, gap: 3, flex: 'none' }}>
        <button
          onClick={() => setTheme('light')}
          aria-pressed={theme === 'light'}
          style={{
            height: 34,
            width: 34,
            borderRadius: 999,
            border: 'none',
            background: theme === 'light' ? 'var(--gold-gradient)' : 'transparent',
            color: theme === 'light' ? 'var(--ink)' : 'var(--text-muted)',
            fontSize: 15,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ☀
        </button>
        <button
          onClick={() => setTheme('dark')}
          aria-pressed={theme === 'dark'}
          style={{
            height: 34,
            width: 34,
            borderRadius: 999,
            border: 'none',
            background: theme === 'dark' ? 'var(--gold-gradient)' : 'transparent',
            color: theme === 'dark' ? 'var(--ink)' : 'var(--text-muted)',
            fontSize: 15,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ☾
        </button>
      </div>
    </div>
  );
}
