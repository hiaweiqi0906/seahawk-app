import { useMemo, useState } from 'react';
import { Screen } from '../components/Screen';
import { BottomNav } from '../components/BottomNav';
import { SecondaryButton } from '../components/Buttons';
import { FAQS, type FaqItem } from '../data/mockData';

const CATEGORIES: FaqItem['category'][] = ['Warranty', 'Service', 'Points'];

export function Faq() {
  const [category, setCategory] = useState<FaqItem['category']>('Warranty');
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);

  const shown = useMemo(() => FAQS.filter((f) => f.category === category), [category]);

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span className="heading" style={{ fontSize: 34 }}>Help &amp; FAQ</span>

        <div style={{ display: 'flex', gap: 8 }}>
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
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
                {c}
              </button>
            );
          })}
        </div>

        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {shown.map((item, i) => {
            const open = item.id === openId;
            return (
              <div key={item.id}>
                <button
                  onClick={() => setOpenId(open ? null : item.id)}
                  style={{
                    width: '100%',
                    padding: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 12,
                    background: 'var(--panel)',
                    border: 'none',
                    borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>{item.question}</span>
                  <span style={{ color: open ? 'var(--gold)' : 'var(--text-muted)', flex: 'none' }}>{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <div style={{ padding: '0 16px 16px', fontSize: 15, lineHeight: 1.55, color: 'var(--text-muted)', background: 'var(--panel)' }}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--panel)', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span className="heading" style={{ fontSize: 20 }}>Still stuck?</span>
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Support answers within one working day.</span>
          <a href="mailto:support@seahawkfishing.com" style={{ textDecoration: 'none' }}>
            <SecondaryButton type="button">Contact support</SecondaryButton>
          </a>
        </div>
      </div>
      <BottomNav />
    </Screen>
  );
}
