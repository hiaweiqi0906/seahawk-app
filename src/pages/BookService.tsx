import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BackHeader } from '../components/BackHeader';
import { PrimaryButton } from '../components/Buttons';
import { SERVICE_CENTRES } from '../data/mockData';
import { useAppState } from '../state/AppState';

const SERVICE_TYPES = ['Reel service & lubrication', 'Parts replacement', 'Warranty claim'];

function nextDays(n: number) {
  const days: { label: string; date: number; iso: string }[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      label: d.toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase(),
      date: d.getDate(),
      iso: d.toISOString().slice(0, 10),
    });
  }
  return days;
}

export function BookService() {
  const { warranties } = useAppState();
  const navigate = useNavigate();
  const activeWarranty = warranties.find((w) => w.status === 'ACTIVE');
  const days = useMemo(() => nextDays(4), []);

  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0]);
  const [centre, setCentre] = useState(SERVICE_CENTRES[0]);
  const [dateIso, setDateIso] = useState(days[0].iso);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <Screen>
        <div style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <BackHeader title="Booking requested" fallback="/warranty" />
          <div style={{ borderRadius: 12, border: '1px solid var(--green)', background: 'rgba(87,199,126,0.08)', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span className="heading" style={{ fontSize: 20, color: 'var(--green)' }}>Request sent</span>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {serviceType} at {centre} on {new Date(dateIso).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}. We'll confirm by email.
            </span>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <PrimaryButton type="button" onClick={() => navigate('/warranty')}>Back to warranty</PrimaryButton>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BackHeader title="Book a service" fallback="/warranty" />

        {activeWarranty && (
          <div style={{ borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--panel)', padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                background:
                  "url('https://seahawkfishing.com/wp-content/uploads/2026/04/Seahawk-Nano-Spin-09-300x300.jpg') center/contain no-repeat, #F5F1EA",
                flex: 'none',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span className="heading" style={{ fontSize: 20, fontWeight: 600 }}>{activeWarranty.productName}</span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--accent2)' }}>
                WARRANTY {activeWarranty.cardNo} · ACTIVE
              </span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Service type
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SERVICE_TYPES.map((type) => {
              const active = type === serviceType;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setServiceType(type)}
                  style={{
                    height: 52,
                    borderRadius: 6,
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
                    background: active ? 'rgba(229,166,42,0.08)' : 'var(--panel)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '0 14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      border: active ? '5px solid var(--gold)' : '1px solid var(--border-strong)',
                      flex: 'none',
                    }}
                  />
                  <span style={{ fontSize: 15, color: active ? 'var(--text)' : 'var(--text-secondary)' }}>{type}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Service centre
          </span>
          <select
            value={centre}
            onChange={(e) => setCentre(e.target.value)}
            style={{
              height: 52,
              borderRadius: 6,
              border: '1px solid var(--border)',
              background: 'var(--panel)',
              color: 'var(--text)',
              padding: '0 14px',
              fontSize: 15,
            }}
          >
            {SERVICE_CENTRES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Preferred date
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {days.map((d) => {
              const active = d.iso === dateIso;
              return (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() => setDateIso(d.iso)}
                  style={{
                    flex: 1,
                    height: 62,
                    borderRadius: 8,
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
                    background: active ? 'rgba(229,166,42,0.08)' : 'var(--panel)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.label}</span>
                  <span className="mono" style={{ fontSize: 18, color: active ? 'var(--text)' : 'var(--text-secondary)' }}>{d.date}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <PrimaryButton type="button" onClick={() => setConfirmed(true)}>Request booking</PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
