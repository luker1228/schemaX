// ContrastChecker —— neubrutalism 对比度检查器演示岛（对齐 neubrutalism.com Contrast Checker）。
//
// 双 hex 输入 → 实时算 WCAG 对比度比值 + AA / AAA（normal / large）pass/fail + 实时预览。
// 浏览器状态（输入 + 计算结果）→ React island（client:load）。
// 视觉走全局 .badge / .cc__* 类（components.css）；输入框 inline 走 token。

import { useMemo, useState, type CSSProperties } from 'react';

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function channelLin(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function luminance(rgb: [number, number, number]): number {
  return (
    0.2126 * channelLin(rgb[0]) +
    0.7152 * channelLin(rgb[1]) +
    0.0722 * channelLin(rgb[2])
  );
}
function contrastRatio(fg: string, bg: string): number | null {
  const a = hexToRgb(fg);
  const b = hexToRgb(bg);
  if (!a || !b) return null;
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const inputStyle: CSSProperties = {
  width: '7rem',
  padding: '0.4rem 0.6rem',
  border: 'var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border)',
  borderRadius: 'var(--sx-sys-radius-control)',
  background: 'var(--sx-sys-color-bg-surface)',
  fontFamily: 'var(--sx-sys-font-family-mono)',
  fontSize: 'var(--sx-sys-font-size-sm)',
  color: 'var(--sx-sys-color-text-primary)',
  boxShadow: 'var(--sx-sys-shadow-sm)',
};

export default function ContrastChecker() {
  const [fg, setFg] = useState('#000000');
  const [bg, setBg] = useState('#ffffff');

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const r = ratio ?? 0;
  const pass = (threshold: number) => ratio !== null && r >= threshold;

  const checks = [
    { label: 'AA', sub: 'normal', ok: pass(4.5) },
    { label: 'AAA', sub: 'normal', ok: pass(7) },
    { label: 'AA', sub: 'large', ok: pass(3) },
    { label: 'AAA', sub: 'large', ok: pass(4.5) },
  ];

  return (
    <div className="nb-stack cc">
      <div className="nb-row cc__inputs">
        <label className="cc__field">
          <span className="cc__cap">前景</span>
          <span className="cc__swatch" style={{ background: fg }} aria-hidden="true" />
          <input
            style={inputStyle}
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            aria-label="前景色 hex"
            spellCheck={false}
          />
        </label>
        <label className="cc__field">
          <span className="cc__cap">背景</span>
          <span className="cc__swatch" style={{ background: bg }} aria-hidden="true" />
          <input
            style={inputStyle}
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            aria-label="背景色 hex"
            spellCheck={false}
          />
        </label>
      </div>

      <div className="cc__result">
        <span className="cc__ratio">
          {ratio === null ? '—' : `${r.toFixed(2)} : 1`}
        </span>
        <div className="nb-row cc__badges">
          {checks.map((c) => (
            <span
              key={`${c.label}-${c.sub}`}
              className={`badge ${c.ok ? 'badge--success' : 'badge--danger'}`}
            >
              {c.label} {c.ok ? '✓' : '✕'} <span className="cc__sub">{c.sub}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="cc__preview" style={{ background: bg, color: fg }}>
        The quick brown fox jumps over the lazy dog. 0123456789
      </div>
    </div>
  );
}
