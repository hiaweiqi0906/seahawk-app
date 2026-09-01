import { useNavigate } from 'react-router-dom';

export function BackHeader({ title, fallback }: { title: string; fallback?: string }) {
  const navigate = useNavigate();

  function goBack() {
    if (fallback && window.history.state?.idx === 0) {
      navigate(fallback);
    } else {
      navigate(-1);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button
        onClick={goBack}
        aria-label="Back"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          fontSize: 20,
          color: 'var(--text-muted)',
          cursor: 'pointer',
          lineHeight: 1,
        }}
      >
        ←
      </button>
      <span
        className="heading"
        style={{ fontSize: 30, fontWeight: 700 }}
      >
        {title}
      </span>
    </div>
  );
}
