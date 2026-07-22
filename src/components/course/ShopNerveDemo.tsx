// ShopNerveDemo —— 课程「JS · 神经」交互示意。
//
// 浏览器状态：选中商品 + 口袋件数。必须用 React island（client:*）。
// 视觉复用全局 .card / .btn / .badge + Tailwind 布局类。
// 教学目标：点橱窗（事件）→ 改 selected（状态）→ 详情区重渲染。

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  blurb: string;
  emoji: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'coffee',
    name: '手冲咖啡',
    price: 28,
    blurb: '深烘单品，适合下午慢慢喝。',
    emoji: '☕',
  },
  {
    id: 'toast',
    name: '全麦吐司',
    price: 12,
    blurb: '现烤切片，可加黄油。',
    emoji: '🍞',
  },
  {
    id: 'fruit',
    name: '季节水果',
    price: 18,
    blurb: '当季鲜切，冷藏上架。',
    emoji: '🍎',
  },
];

export default function ShopNerveDemo() {
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const [cartCount, setCartCount] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [lastEvent, setLastEvent] = useState('点击「手冲咖啡」');

  const selected =
    PRODUCTS.find((p) => p.id === selectedId) ?? PRODUCTS[0];

  function handleSelect(product: Product) {
    setSelectedId(product.id);
    setJustAdded(false);
    setLastEvent(`点击「${product.name}」`);
  }

  function handleBuy() {
    setCartCount((n) => n + 1);
    setJustAdded(true);
    setLastEvent(`点击「购买 · ${selected.name}」`);
  }

  return (
    <div className="shop-nerve card card--shadow-lg mx-auto w-full max-w-md bg-primary">
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="badge">点橱窗试试</span>
            <span className="font-mono text-[0.6875rem] font-bold tracking-wide uppercase">
              LIVE
            </span>
          </div>
          <h2 className="m-0 font-display text-[1.625rem] leading-none font-bold tracking-tight">
            邻里小卖部
          </h2>
          <p className="m-0 text-sm font-medium">
            点下面任意橱窗 → 看状态与详情怎么变
          </p>
        </header>

        {/* 橱窗：大点击面，选中态黑底，未选中白底描边 */}
        <div
          className="grid grid-cols-3 gap-2"
          role="group"
          aria-label="橱窗商品"
        >
          {PRODUCTS.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleSelect(p)}
                className={[
                  'flex min-h-[5.5rem] flex-col items-center justify-center gap-1 border border-border px-1 py-2 text-center transition-none',
                  'cursor-pointer font-inherit',
                  active
                    ? 'bg-ink text-surface shadow-brutal-sm'
                    : 'bg-surface text-ink hover:translate-x-0.5 hover:translate-y-0.5',
                ].join(' ')}
              >
                <span className="text-2xl leading-none" aria-hidden="true">
                  {p.emoji}
                </span>
                <span className="text-xs font-bold leading-tight">{p.name}</span>
                <span className="font-mono text-[0.6875rem] font-bold tabular-nums">
                  ¥{p.price}
                </span>
              </button>
            );
          })}
        </div>

        {/* 详情：随 selected 重渲染 */}
        <div
          className="border border-border bg-surface p-3.5"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              {selected.emoji}
            </span>
            <span className="font-semibold">{selected.name}</span>
            <span className="ml-auto font-mono text-sm font-bold tabular-nums">
              ¥{selected.price}
            </span>
          </div>
          <p className="m-0 mb-3 text-sm opacity-80">{selected.blurb}</p>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            style={{ width: '100%' }}
            onClick={handleBuy}
          >
            购买 · {selected.name}
          </button>
          {justAdded ? (
            <p className="m-0 mt-2 text-sm font-semibold" role="status">
              已放入口袋（共 {cartCount} 件）
            </p>
          ) : null}
        </div>

        {/* 状态条：把「神经三步」钉在界面上 */}
        <div
          className="border border-border bg-surface px-3 py-2 font-mono text-[0.75rem] leading-relaxed"
          aria-live="polite"
        >
          <div>
            <span className="opacity-60">事件</span>
            {' · '}
            {lastEvent}
          </div>
          <div>
            <span className="opacity-60">状态</span>
            {' · '}
            selected = &quot;{selected.id}&quot;
            {cartCount > 0 ? ` · cart = ${cartCount}` : ''}
          </div>
          <div>
            <span className="opacity-60">界面</span>
            {' · '}
            {justAdded
              ? `口袋已更新（${cartCount} 件）`
              : `详情显示「${selected.name}」`}
          </div>
        </div>
      </div>
    </div>
  );
}
