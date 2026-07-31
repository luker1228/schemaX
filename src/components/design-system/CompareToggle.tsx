// CompareToggle —— Standard SaaS ↔ Neubrutalist 同内容切换演示岛（对齐 neubrutalism.com Comparison Toggle）。
//
// 一组 toggle 切换同一张卡片的两套外观：Standard（圆角 + 软影 + 细边）vs
// Neubrutalist（3px 黑边 + 硬影 + 0 圆角）。只改边框 / 圆角 / 阴影三属性。
// 浏览器状态（mode）→ React island。
// Standard 模式故意用裸 hex / 软影（反面教材，展示「非我们」的常规 SaaS 配色）；
// 它们在 tsx inline style 里，不被 Stylelint 校验，不会污染 token 系统。

import { useState, type CSSProperties } from 'react';

type Mode = 'standard' | 'neubrutalist';

const STD_CARD: CSSProperties = {
  borderRadius: '12px',
  border: '1px solid #d4d4d8',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  background: '#ffffff',
  padding: '1.5rem',
  maxWidth: '20rem',
};
const STD_BTN: CSSProperties = {
  borderRadius: '8px',
  border: '1px solid #3b82f6',
  background: '#3b82f6',
  color: '#ffffff',
  padding: '0.5rem 1.25rem',
  fontSize: '0.9rem',
  cursor: 'pointer',
};
const NB_CARD: CSSProperties = {
  border: 'var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border)',
  borderRadius: 'var(--sx-sys-radius-control)',
  boxShadow: 'var(--sx-sys-shadow-md)',
  background: 'var(--sx-sys-color-bg-surface)',
  padding: '1.5rem',
  maxWidth: '20rem',
};

export default function CompareToggle() {
  const [mode, setMode] = useState<Mode>('neubrutalist');
  const isNb = mode === 'neubrutalist';

  return (
    <div className="nb-stack" style={{ gap: 'var(--sx-ref-space-4)' }}>
      <div className="nb-row" role="group" aria-label="风格切换">
        <button
          type="button"
          className={`btn ${mode === 'standard' ? 'btn--primary' : 'btn--outline'}`}
          aria-pressed={mode === 'standard'}
          onClick={() => setMode('standard')}
        >
          Standard SaaS
        </button>
        <button
          type="button"
          className={`btn ${mode === 'neubrutalist' ? 'btn--primary' : 'btn--outline'}`}
          aria-pressed={mode === 'neubrutalist'}
          onClick={() => setMode('neubrutalist')}
        >
          Neubrutalist
        </button>
      </div>

      <div style={isNb ? NB_CARD : STD_CARD}>
        <span
          style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            color: isNb ? 'var(--sx-sys-color-text-soft)' : '#9ca3af',
            fontFamily: isNb ? 'var(--sx-sys-font-family-mono)' : 'inherit',
          }}
        >
          {isNb ? 'border IS ornament' : 'soft & subtle'}
        </span>
        <h3
          style={{
            margin: '0 0 0.5rem',
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: isNb ? 'var(--sx-sys-font-family-display)' : 'inherit',
            color: isNb ? 'var(--sx-sys-color-text-primary)' : '#111827',
          }}
        >
          同一段内容
        </h3>
        <p
          style={{
            margin: '0 0 1rem',
            fontSize: '0.95rem',
            lineHeight: 1.5,
            color: isNb ? 'var(--sx-sys-color-text-soft)' : '#4b5563',
          }}
        >
          切换 toggle，看同一张卡片只改边框 / 圆角 / 阴影三件事，气质如何反转。
        </p>
        {isNb ? (
          <button type="button" className="btn btn--primary">
            Action
          </button>
        ) : (
          <button type="button" style={STD_BTN}>
            Action
          </button>
        )}
      </div>
    </div>
  );
}
