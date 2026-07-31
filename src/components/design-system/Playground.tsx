// Playground —— neubrutalism grammar 实时调参岛（对齐 neubrutalism.com Interactive Playground）。
//
// 左点阵预览卡（实时 border / shadow / radius / 底色）+ 右控件（滑块 + 底色选择）。
// 默认值对齐 token（3px 框 · 5px 影 · 0 圆角）。拖滑块「感受」grammar：
// 框越粗、影越深、角越直，越 neubrutalism。
//
// 浏览器状态（实时拖动）→ React island（client:load）。
// 外壳走全局 .nb-playground（左 preview 点阵 + 右 controls，对齐参考）；
// 滑块走全局 .range；底色未桥接成 Tailwind 类，用 inline var()。

import { useId, useState } from 'react';

type BgKey = 'paper' | 'accent' | 'coral' | 'sky' | 'mint';

const BG_COLORS: { key: BgKey; label: string; value: string }[] = [
  { key: 'paper', label: '纸', value: 'var(--sx-sys-color-bg-surface)' },
  { key: 'accent', label: '黄', value: 'var(--sx-sys-color-accent)' },
  { key: 'coral', label: '珊瑚', value: 'var(--sx-sys-color-coral)' },
  { key: 'sky', label: '天蓝', value: 'var(--sx-sys-color-sky)' },
  { key: 'mint', label: '薄荷', value: 'var(--sx-sys-color-mint)' },
];

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

function SliderControl({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: SliderProps) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider opacity-70">
        <span>{label}</span>
        <output htmlFor={id} className="tabular-nums">
          {value}px
        </output>
      </span>
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function Playground() {
  const borderId = useId();
  const shadowId = useId();
  const radiusId = useId();
  const [borderW, setBorderW] = useState(3);
  const [shadow, setShadow] = useState(5);
  const [radius, setRadius] = useState(0);
  const [bg, setBg] = useState<BgKey>('paper');

  const bgValue =
    BG_COLORS.find((c) => c.key === bg)?.value ?? BG_COLORS[0].value;

  return (
    <div className="nb-playground">
      {/* 左：点阵预览 */}
      <div className="nb-playground__preview">
        <div
          className="w-full max-w-[14rem] p-5 text-center"
          style={{
            borderWidth: `${borderW}px`,
            borderStyle: 'solid',
            borderColor: 'var(--sx-sys-color-border)',
            boxShadow: `${shadow}px ${shadow}px 0 var(--sx-sys-color-border)`,
            borderRadius: `${radius}px`,
            background: bgValue,
          }}
        >
          <p className="m-0 text-lg font-bold leading-tight">Live Preview</p>
          <p className="mb-0 mt-2 text-sm opacity-80">
            {borderW}px 框 · {shadow}px 影 · {radius}px 角
          </p>
          <button type="button" className="btn btn--primary btn--sm mt-4">
            Click me
          </button>
        </div>
      </div>

      {/* 右：控件 */}
      <div className="nb-playground__controls">
        <SliderControl
          id={borderId}
          label="Border Width"
          value={borderW}
          min={0}
          max={8}
          onChange={setBorderW}
        />
        <SliderControl
          id={shadowId}
          label="Shadow Offset"
          value={shadow}
          min={0}
          max={16}
          onChange={setShadow}
        />
        <SliderControl
          id={radiusId}
          label="Border Radius"
          value={radius}
          min={0}
          max={16}
          onChange={setRadius}
        />
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider opacity-70">
            Background
          </span>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="预览卡底色"
          >
            {BG_COLORS.map((c) => {
              const active = bg === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  aria-label={`底色：${c.label}`}
                  aria-pressed={active}
                  onClick={() => setBg(c.key)}
                  style={{ background: c.value }}
                  className={[
                    'h-8 w-8 border-[3px] border-border transition-transform',
                    active
                      ? '-translate-x-0.5 -translate-y-0.5 shadow-brutal-lg'
                      : '',
                  ].join(' ')}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
