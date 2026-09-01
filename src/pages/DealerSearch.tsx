import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { PrimaryButton } from '../components/Buttons';
import { DEALERS, PRODUCTS, productBySlug } from '../data/mockData';

export function DealerSearch() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('product');
  const preselectedProduct = preselected ? productBySlug(preselected) : undefined;

  const [mode, setMode] = useState<'near' | 'postcode'>('near');
  const [postcode, setPostcode] = useState('');
  const [productSlug, setProductSlug] = useState(preselectedProduct?.slug ?? '');
  const [searched, setSearched] = useState(true);

  const dealers = useMemo(() => [...DEALERS].sort((a, b) => a.distanceKm - b.distanceKm), []);

  function handleSearch() {
    if (mode === 'postcode' && !postcode.trim()) return;
    setSearched(true);
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span className="heading" style={{ fontSize: 34 }}>Where to buy</span>

        <div style={{ display: 'flex', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 999, padding: 4, gap: 4 }}>
          <button
            onClick={() => setMode('near')}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 999,
              border: 'none',
              background: mode === 'near' ? 'var(--gold-gradient)' : 'transparent',
              color: mode === 'near' ? 'var(--ink)' : 'var(--text-muted)',
              fontSize: 14,
              fontWeight: mode === 'near' ? 700 : 600,
              cursor: 'pointer',
            }}
          >
            Near me
          </button>
          <button
            onClick={() => setMode('postcode')}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 999,
              border: 'none',
              background: mode === 'postcode' ? 'var(--gold-gradient)' : 'transparent',
              color: mode === 'postcode' ? 'var(--ink)' : 'var(--text-muted)',
              fontSize: 14,
              fontWeight: mode === 'postcode' ? 700 : 600,
              cursor: 'pointer',
            }}
          >
            By postcode
          </button>
        </div>

        {mode === 'near' ? (
          <div style={{ borderRadius: 12, border: '1px solid var(--border-strong)', background: 'rgba(201,161,92,0.07)', padding: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--accent2)' }}>◉</span>
            <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
              Location on — showing dealers within 25 km of Georgetown.
            </span>
          </div>
        ) : (
          <input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter postcode"
            style={{ height: 52, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', padding: '0 14px', fontSize: 15 }}
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Product (optional)
          </span>
          <select
            value={productSlug}
            onChange={(e) => setProductSlug(e.target.value)}
            style={{ height: 52, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--panel)', color: 'var(--text)', padding: '0 14px', fontSize: 15 }}
          >
            <option value="">Any product</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>{p.name}</option>
            ))}
          </select>
        </div>

        <PrimaryButton type="button" onClick={handleSearch}>Search dealers</PrimaryButton>

        {searched && (
          <>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: 4 }}>
              {dealers.length} DEALERS FOUND
            </span>
            {dealers.map((d, i) => (
              <div
                key={d.id}
                style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', padding: 15, display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <span className="heading" style={{ fontSize: 20, fontWeight: 600 }}>{d.name}</span>
                  <span className="mono" style={{ fontSize: 13, color: 'var(--accent2)', whiteSpace: 'nowrap' }}>{d.distanceKm} km</span>
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.45 }}>{d.address}</span>
                {i === 0 && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <a
                      href={`tel:${d.phone.replace(/\s/g, '')}`}
                      style={{
                        flex: 1,
                        height: 42,
                        borderRadius: 999,
                        border: '1px solid var(--accent2)',
                        color: 'var(--accent2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      Call
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        flex: 1,
                        height: 42,
                        borderRadius: 999,
                        border: '1px solid var(--border)',
                        background: 'var(--panel-alt)',
                        color: 'var(--text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      Directions
                    </a>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <BottomNav />
    </Screen>
  );
}
