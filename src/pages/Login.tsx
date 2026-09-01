import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/Buttons';
import { useAppState } from '../state/AppState';

export function Login() {
  const { login, user } = useAppState();
  const navigate = useNavigate();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.');
      return;
    }
    setError('');
    login();
    navigate('/home', { replace: true });
  }

  return (
    <Screen>
      <div
        style={{
          height: 300,
          flex: 'none',
          background:
            "url('https://seahawkfishing.com/wp-content/uploads/2025/10/RandukWildHunt_Web_Banner_1920x1080.jpg') center/cover no-repeat, #221E19",
        }}
      />
      <form
        onSubmit={handleSubmit}
        style={{
          padding: '28px 20px calc(env(safe-area-inset-bottom, 0px) + 28px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          flex: 1,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="heading" style={{ fontSize: 38 }}>
            Welcome back
          </span>
          <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>
            Sign in to your Seahawk member account.
          </span>
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Email or phone
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="you@example.com"
            style={{
              height: 52,
              borderRadius: 6,
              border: '1px solid var(--border-strong)',
              background: 'var(--panel)',
              color: 'var(--text)',
              padding: '0 14px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 15,
            }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Password
          </span>
          <div
            style={{
              height: 52,
              borderRadius: 6,
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 14px',
            }}
          >
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              style={{
                border: 'none',
                background: 'none',
                color: 'var(--text)',
                fontSize: 16,
                letterSpacing: showPassword ? 'normal' : '0.2em',
                width: '100%',
                outline: 'none',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent2)',
                fontSize: 13,
                cursor: 'pointer',
                flex: 'none',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>

        {error && <span style={{ fontSize: 13, color: 'var(--red)' }}>{error}</span>}

        <a href="#" style={{ fontSize: 14, color: 'var(--accent2)' }} onClick={(e) => e.preventDefault()}>
          Forgot password?
        </a>

        <PrimaryButton type="submit">Log in</PrimaryButton>

        <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: 14, color: 'var(--text-muted)' }}>
          New here?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); login(); navigate('/home', { replace: true }); }}>
            Create an account
          </a>
        </div>
      </form>
    </Screen>
  );
}
