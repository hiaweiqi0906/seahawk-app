import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { BackHeader } from '../components/BackHeader';
import { categoryBySlug, productsByCategory } from '../data/mockData';

export function ProductItems() {
  const { categorySlug = '' } = useParams();
  const category = categoryBySlug(categorySlug);
  const allProducts = useMemo(() => productsByCategory(categorySlug), [categorySlug]);
  const [filter, setFilter] = useState('All');

  const shown = useMemo(() => {
    if (filter === 'All') return allProducts;
    return allProducts.filter((p) => p.subLabel.toLowerCase() === filter.toLowerCase());
  }, [allProducts, filter]);

  if (!category) {
    return (
      <Screen>
        <div style={{ padding: '40px 20px', flex: 1 }}>
          <BackHeader title="Not found" fallback="/products" />
        </div>
        <BottomNav />
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <BackHeader title={category.label} fallback="/products" />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {category.filters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  border: `1px solid ${active ? 'var(--accent2)' : 'var(--border)'}`,
                  color: active ? 'var(--accent2)' : 'var(--text-muted)',
                  background: 'none',
                  borderRadius: 999,
                  padding: '8px 13px',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {shown.length === 0 && (
          <div style={{ borderRadius: 12, border: '1px dashed var(--border-strong)', padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
            No items match this filter yet.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {shown.map((p) => (
            <Link
              key={p.slug}
              to={`/products/${category.slug}/${p.slug}`}
              style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--panel)', overflow: 'hidden', color: 'var(--text)' }}
            >
              <div style={{ height: 100, background: `url('${p.image}') center/contain no-repeat, #F5F1EA` }} />
              <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--accent2)', letterSpacing: '0.1em' }}>{p.subLabel}</span>
                <span className="heading" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.1 }}>{p.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
