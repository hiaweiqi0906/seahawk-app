import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { CATEGORIES } from '../data/mockData';

export function ProductCategories() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function onSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && query.trim()) {
      const match = CATEGORIES.find((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));
      navigate(`/products/${match ? match.slug : CATEGORIES[0].slug}`);
    }
  }

  const [first, second, third, fourth, ...rest] = CATEGORIES;

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span className="heading" style={{ fontSize: 34 }}>Products</span>
        <div
          style={{
            height: 46,
            borderRadius: 999,
            border: '1px solid var(--border)',
            background: 'var(--panel)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 16px',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onSearchKeyDown}
            placeholder="Search rods, reels, lures…"
            style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 15, width: '100%' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[first, second, third, fourth].map((c) => (
            <CategoryTile key={c.slug} slug={c.slug} label={c.label} count={c.count} image={c.image} />
          ))}
          <div style={{ display: 'flex', gap: 10 }}>
            {rest.map((c) => (
              <CategoryTile key={c.slug} slug={c.slug} label={c.label} image={c.image} compact />
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}

function CategoryTile({
  slug,
  label,
  count,
  image,
  compact,
}: {
  slug: string;
  label: string;
  count?: number;
  image: string;
  compact?: boolean;
}) {
  return (
    <Link
      to={`/products/${slug}`}
      style={{
        flex: compact ? 1 : undefined,
        height: 96,
        borderRadius: 12,
        border: '1px solid var(--border)',
        background: `url('${image}') center/contain no-repeat, #F5F1EA`,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: compact ? 'flex-start' : 'space-between',
        padding: 14,
        color: 'var(--text)',
      }}
    >
      <span className="heading" style={{ fontSize: compact ? 22 : 26, lineHeight: 1 }}>{label}</span>
      {!compact && count !== undefined && (
        <span className="mono" style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{count} →</span>
      )}
    </Link>
  );
}
