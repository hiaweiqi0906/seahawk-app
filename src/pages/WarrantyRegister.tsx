import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../components/Screen';
import { BackHeader } from '../components/BackHeader';
import { PrimaryButton } from '../components/Buttons';
import { PRODUCTS, SERVICE_CENTRES } from '../data/mockData';
import { useAppState } from '../state/AppState';

const TOTAL_STEPS = 3;

function formatDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function WarrantyRegister() {
  const { addWarranty } = useAppState();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [productSlug, setProductSlug] = useState(PRODUCTS[1].slug);
  const [cardNo, setCardNo] = useState('');
  const [purchasedDate, setPurchasedDate] = useState('');
  const [dealer, setDealer] = useState(SERVICE_CENTRES[0]);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const product = PRODUCTS.find((p) => p.slug === productSlug)!;

  function next() {
    if (step === 1 && !cardNo) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
    else submit();
  }

  function submit() {
    const purchased = purchasedDate ? new Date(purchasedDate) : new Date();
    const expires = new Date(purchased);
    expires.setFullYear(expires.getFullYear() + 2);
    addWarranty({
      productName: product.name,
      productType: product.categoryLabel.split(' / ')[1] ?? product.categoryLabel,
      cardNo: cardNo || '0000-00000',
      purchasedDate: formatDate(purchased),
      expiresDate: formatDate(expires),
    });
    navigate('/warranty', { replace: true });
  }

  return (
    <Screen>
      <div className="screen-scroll" style={{ padding: '40px 20px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BackHeader title="Register warranty" fallback="/warranty" />

        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {Array.from({ length: TOTAL_STEPS }, (_, i) => (
            <div
              key={i}
              style={{ flex: 1, height: 3, background: i < step ? 'var(--gold)' : 'var(--border)' }}
            />
          ))}
          <span className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>
            {step}/{TOTAL_STEPS}
          </span>
        </div>

        {step === 1 && (
          <>
            <Field label="Product">
              <select value={productSlug} onChange={(e) => setProductSlug(e.target.value)} style={selectStyle}>
                {PRODUCTS.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Warranty card no.">
              <input
                value={cardNo}
                onChange={(e) => setCardNo(e.target.value)}
                placeholder="e.g. 4471-08822"
                style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace", borderColor: 'var(--gold)' }}
              />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ display: 'flex', gap: 12 }}>
              <Field label="Purchased" style={{ flex: 1 }}>
                <input
                  type="date"
                  value={purchasedDate}
                  onChange={(e) => setPurchasedDate(e.target.value)}
                  style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }}
                />
              </Field>
              <Field label="Dealer" style={{ flex: 1 }}>
                <select value={dealer} onChange={(e) => setDealer(e.target.value)} style={selectStyle}>
                  {SERVICE_CENTRES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <Field label="Receipt" style={{ flex: 1 }}>
                <button
                  type="button"
                  onClick={() => setReceiptUploaded(true)}
                  style={{
                    height: 104,
                    borderRadius: 6,
                    border: `1px solid ${receiptUploaded ? 'var(--green)' : 'var(--border-strong)'}`,
                    background: receiptUploaded
                      ? 'var(--panel)'
                      : 'repeating-linear-gradient(135deg, #2B2620 0 8px, #332D25 8px 16px)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: 8,
                    color: 'var(--green)',
                    cursor: 'pointer',
                    width: '100%',
                  }}
                >
                  <span className="mono" style={{ fontSize: 10 }}>{receiptUploaded ? 'UPLOADED ✓' : 'TAP TO ADD'}</span>
                </button>
              </Field>
              <Field label="Card photo" style={{ flex: 1 }}>
                <button
                  type="button"
                  onClick={() => setPhotoUploaded(true)}
                  style={{
                    height: 104,
                    borderRadius: 6,
                    border: `1px ${photoUploaded ? 'solid var(--green)' : 'dashed var(--border-strong)'}`,
                    background: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    width: '100%',
                    color: photoUploaded ? 'var(--green)' : 'var(--gold)',
                  }}
                >
                  <span style={{ fontSize: 22 }}>{photoUploaded ? '✓' : '+'}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    {photoUploaded ? 'ADDED' : 'ADD PHOTO'}
                  </span>
                </button>
              </Field>
            </div>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-muted)' }}>
              Register within 30 days of purchase. We'll email confirmation once approved — usually within 2 working days.
            </span>
          </>
        )}

        {step === 3 && (
          <div style={{ borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--panel)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="heading" style={{ fontSize: 21 }}>{product.name}</span>
            <Row label="Card no." value={cardNo || '—'} />
            <Row label="Purchased" value={purchasedDate || '—'} />
            <Row label="Dealer" value={dealer} />
            <Row label="Receipt" value={receiptUploaded ? 'Uploaded' : 'Not added'} />
            <Row label="Card photo" value={photoUploaded ? 'Added' : 'Not added'} />
          </div>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
          <PrimaryButton type="button" onClick={next} disabled={step === 1 && !cardNo}>
            {step < TOTAL_STEPS ? 'Continue' : 'Submit registration'}
          </PrimaryButton>
        </div>
      </div>
    </Screen>
  );
}

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, ...style }}>
      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
      <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: 14 }}>{value}</span>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  height: 52,
  borderRadius: 6,
  border: '1px solid var(--border)',
  background: 'var(--panel)',
  color: 'var(--text)',
  padding: '0 14px',
  fontSize: 15,
  width: '100%',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: 'none',
};
