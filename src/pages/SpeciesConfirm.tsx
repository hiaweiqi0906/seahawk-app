import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { PrimaryButton } from '../components/Buttons';
import { SPECIES_CANDIDATES } from '../data/mockData';
import { useAppState } from '../state/AppState';

export function SpeciesConfirm() {
  const { addCatch } = useAppState();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(SPECIES_CANDIDATES[0]);
  const [showAll, setShowAll] = useState(false);

  function confirm() {
    addCatch({
      species: selected.name,
      lengthCm: 63.0,
      weightKg: 2.84,
      estimated: true,
      date: 'Just now',
      location: 'Current location',
    });
    navigate('/catch', { replace: true });
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            height: 300,
            flex: 'none',
            background: 'var(--panel-alt)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            style={{
              position: 'absolute',
              top: 18,
              left: 18,
              width: 34,
              height: 34,
              borderRadius: 999,
              background: 'rgba(26,22,17,0.6)',
              border: 'none',
              color: 'var(--text)',
              fontSize: 18,
              cursor: 'pointer',
            }}
          >
            ←
          </button>
          <div style={{ border: '2px solid var(--gold)', borderRadius: 8, width: 250, height: 120, display: 'flex', alignItems: 'flex-start' }}>
            <span className="mono" style={{ fontSize: 10, background: 'var(--gold-gradient)', color: 'var(--ink)', padding: '3px 6px', letterSpacing: '0.08em' }}>
              DETECTED
            </span>
          </div>
        </div>

        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
              SPECIES · {selected.confidence}% CONFIDENCE
            </span>
            <span className="heading" style={{ fontSize: 34 }}>{selected.name}</span>
            {selected.latin && <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{selected.latin}</span>}
          </div>

          <div style={{ borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--panel)', padding: 16, display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>LENGTH</span>
              <span className="mono" style={{ fontSize: 26, color: 'var(--accent2)' }}>63.0 cm</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                WEIGHT <span style={{ color: 'var(--gold)' }}>EST.</span>
              </span>
              <span className="mono" style={{ fontSize: 26, color: 'var(--accent2)' }}>2.84 kg</span>
            </div>
          </div>

          <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Length measured against the lure in frame; weight estimated from length for this species. Both are estimates.
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Not this one?
            </span>
            {SPECIES_CANDIDATES.filter((c) => c.name !== selected.name).map((c) => (
              <button
                key={c.name}
                onClick={() => setSelected(c)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 48,
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  background: 'var(--panel)',
                  padding: '0 14px',
                  color: 'var(--text)',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 15 }}>{c.name}</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.confidence}%</span>
              </button>
            ))}
            <button
              onClick={() => setShowAll(true)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 48,
                borderRadius: 8,
                border: '1px dashed var(--border-strong)',
                background: 'none',
                fontSize: 14,
                color: 'var(--accent2)',
                cursor: 'pointer',
              }}
            >
              {showAll ? 'Showing all species' : 'Search all species'}
            </button>
          </div>
        </div>

        <div style={{ padding: '14px 20px 24px', borderTop: '1px solid var(--border)', background: 'var(--nav-bg)' }}>
          <PrimaryButton type="button" onClick={confirm}>Confirm &amp; log · +120 pts</PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}
