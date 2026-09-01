import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const base: React.CSSProperties = {
  height: 52,
  borderRadius: 999,
  fontSize: 16,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  width: '100%',
};

export function PrimaryButton({ style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        ...base,
        background: 'var(--gold-gradient)',
        color: 'var(--ink)',
        ...style,
      }}
    />
  );
}

export function SecondaryButton({ style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        ...base,
        height: 48,
        background: 'transparent',
        border: '1px solid var(--accent2)',
        color: 'var(--accent2)',
        fontWeight: 600,
        ...style,
      }}
    />
  );
}

export function OutlineButton({ style, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        ...base,
        height: 48,
        background: 'var(--panel-alt)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        fontWeight: 600,
        ...style,
      }}
    />
  );
}
