import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { PrimaryButton, SecondaryButton, OutlineButton } from '../components/Buttons';
import { productBySlug } from '../data/mockData';

const GALLERY_COUNT = 3;

export function ProductDetail() {
  const { productSlug = '' } = useParams();
  const navigate = useNavigate();
  const product = productBySlug(productSlug);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [variant, setVariant] = useState(product?.variants[0] ?? '');

  if (!product) {
    return (
      <Screen>
        <div style={{ padding: 40, flex: 1 }}>Product not found.</div>
        <BottomNav />
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            height: 290,
            flex: 'none',
            background: `url('${product.image}') center/contain no-repeat, #F5F1EA`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 18,
            position: 'relative',
          }}
        >
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              background: 'rgba(26,22,17,0.6)',
              border: 'none',
              color: 'var(--text)',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ←
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-secondary)' }}>
              GALLERY {galleryIndex + 1} / {GALLERY_COUNT}
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: GALLERY_COUNT }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Image ${i + 1}`}
                  style={{
                    width: 18,
                    height: 3,
                    border: 'none',
                    padding: 0,
                    background: i === galleryIndex ? 'var(--gold)' : 'rgba(245,241,234,0.3)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--accent2)' }}>
              {product.categoryLabel.toUpperCase()}
            </span>
            <span className="heading" style={{ fontSize: 30 }}>{product.name}</span>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--text-secondary)' }}>{product.description}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Features
            </span>
            {product.features.map((f) => (
              <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--gold)', marginTop: 8, flex: 'none' }} />
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{f}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {product.variants.map((v) => {
              const active = v === variant;
              return (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className="mono"
                  style={{
                    border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
                    color: active ? 'var(--gold)' : 'var(--text-muted)',
                    borderRadius: 999,
                    padding: '7px 13px',
                    fontSize: 12,
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {product.specs.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: i < product.specs.length - 1 ? '1px solid var(--border)' : 'none',
                  paddingBottom: 7,
                }}
              >
                <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{s.label}</span>
                <span className="mono" style={{ fontSize: 14 }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '14px 20px 24px', borderTop: '1px solid var(--border)', background: 'var(--nav-bg)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="https://shopee.com.my" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <PrimaryButton type="button">Buy from e-seller</PrimaryButton>
          </a>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to={`/buy-now?product=${product.slug}`} style={{ flex: 1, textDecoration: 'none' }}>
              <SecondaryButton type="button">Find dealer</SecondaryButton>
            </Link>
            <a href="https://shopee.com.my" target="_blank" rel="noreferrer" style={{ flex: 1, textDecoration: 'none' }}>
              <OutlineButton type="button">Shopee</OutlineButton>
            </a>
          </div>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
