import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';

export function Capture() {
  const navigate = useNavigate();

  return (
    <Screen>
      <div
        style={{
          flex: 1,
          background: 'var(--panel-alt)',
          display: 'flex',
          flexDirection: 'column',
          padding: '44px 20px 24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/home')}
            aria-label="Close"
            style={{ background: 'none', border: 'none', fontSize: 20, color: 'var(--text)', cursor: 'pointer' }}
          >
            ✕
          </button>
          <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text)' }}>
            CAPTURE CATCH
          </span>
          <span style={{ fontSize: 16, color: 'var(--text)' }}>⚡</span>
        </div>

        <div style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
          <div style={{ width: '100%', height: 200, border: '2px solid rgba(229,166,42,0.9)', borderRadius: 10 }} />
          <div style={{ background: 'rgba(26,22,17,0.85)', border: '1px solid var(--border-strong)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="heading" style={{ fontSize: 20 }}>Lay the fish flat</span>
            <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              Put a lure, ruler or bank card beside it — we need a size reference to measure length.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 10,
              background: 'rgba(26,22,17,0.7)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span className="mono" style={{ fontSize: 10, color: 'var(--text-secondary)' }}>LIB</span>
          </div>
          <button
            onClick={() => navigate('/catch/confirm')}
            aria-label="Capture"
            style={{
              width: 78,
              height: 78,
              borderRadius: 999,
              background: 'var(--gold)',
              border: '5px solid rgba(26,22,17,0.6)',
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 10,
              background: 'rgba(26,22,17,0.7)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 18, color: 'var(--text-secondary)' }}>⟳</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}
