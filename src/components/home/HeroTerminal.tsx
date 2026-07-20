// HeroTerminal —— 首页 hero 的打字机轮播终端。
//
// 这是项目的第一个 React island（规范：浏览器状态 → React client:* island）。
// 打字机动画是纯客户端状态，必须用 React；其余展示部分仍是 Astro 静态渲染。
//
// 视觉复用 Command 的 DOM 结构与全局 .term 类（见 src/styles/components.css）。
// React 没有 scoped style，.term 系列统一在全局维护，本组件不自带样式。
// 主题固定 light（暖纸底黑字，与 hero 一致）；标题栏随当前 slide 切换。
//
// SSR 友好：初始 phase='hold' + typed=第一段完整内容，首屏即有完整内容（无 FOUC），
// hydrate 后从「等 holdMs」开始切换，不会闪动清空再重打。

import { useEffect, useState } from 'react';

interface Slide {
  title: string;
  code: string;
}

interface Props {
  slides: Slide[];
  /** 单字符打字间隔（ms） */
  typeInterval?: number;
  /** 打完后停留时长（ms） */
  holdMs?: number;
  /** 清空后、开始下一段之间的停顿（ms） */
  gapMs?: number;
}

export default function HeroTerminal({
  slides,
  typeInterval = 45,
  holdMs = 2200,
  gapMs = 350,
}: Props) {
  // —— 运行时状态 ——
  const [index, setIndex] = useState(0); // 当前 slide 下标（驱动标题栏）
  const [typed, setTyped] = useState(slides[0]?.code ?? ''); // 当前已显示文本
  const [cursorVisible, setCursorVisible] = useState(true); // 光标闪烁
  const [phase, setPhase] = useState<'typing' | 'hold' | 'gap'>('hold');

  const current = slides[index] ?? slides[0];
  // gap 阶段屏幕清空（正在切换）；typing/hold 阶段显示 typed。
  const displayed = phase === 'gap' ? '' : typed;

  // —— 动画状态机（仅浏览器执行）——
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (slides.length === 0) return;

    // 尊重用户「减少动态」偏好：静态显示，不打字、不切换。
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timers.push(id);
      return id;
    };

    // 状态机循环：hold（停留显示完整）→ gap（清空）→ typing（逐字打下一段）→ hold ...
    // 首次进入时 phase 已是 hold、typed 已是第一段完整内容，所以直接从「等待 holdMs」开始。
    let idx = 0; // 局部追踪，避免闭包 stale
    const holdThenType = () => {
      if (cancelled) return;
      schedule(() => {
        if (cancelled) return;
        // 阶段：gap（清空，给观众一个「切换中」的视觉停顿）
        setPhase('gap');
        setTyped('');
        idx = (idx + 1) % slides.length;
        setIndex(idx);
        schedule(() => {
          if (cancelled) return;
          // 切到下一段，阶段：typing（逐字打出）
          setPhase('typing');
          const slide = slides[idx];
          let i = 0;
          const typeNext = () => {
            if (cancelled) return;
            if (i >= slide.code.length) {
              // 阶段：hold（打完，停留）
              setPhase('hold');
              schedule(holdThenType, holdMs);
              return;
            }
            setTyped(slide.code.slice(0, i + 1));
            i++;
            schedule(typeNext, typeInterval);
          };
          typeNext();
        }, gapMs);
      }, holdMs);
    };

    // 光标独立闪烁（与打字状态机解耦）
    const blink = window.setInterval(() => {
      if (!cancelled) setCursorVisible((v) => !v);
    }, 530);

    // 启动循环（首段已显示，等 holdMs 后开始切换）
    holdThenType();

    return () => {
      cancelled = true;
      window.clearInterval(blink);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [slides, typeInterval, holdMs, gapMs]);

  return (
    <figure className="term term--light term--hero">
      <figcaption className="term__bar">
        <span className="term__dots" aria-hidden="true">
          <span className="term__dot term__dot--red" />
          <span className="term__dot term__dot--yellow" />
          <span className="term__dot term__dot--green" />
        </span>
        <span className="term__title">{current.title}</span>
      </figcaption>

      <div className="term__screen">
        <pre className="term__code">
          <code>
            {displayed}
            <span
              className={`term__cursor${cursorVisible ? '' : ' hidden'}`}
              aria-hidden="true"
            >
              ▋
            </span>
          </code>
        </pre>
      </div>
    </figure>
  );
}
