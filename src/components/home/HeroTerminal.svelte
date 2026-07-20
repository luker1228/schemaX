<script lang="ts">
  // HeroTerminal —— 首页 hero 的打字机轮播终端。
  //
  // 这是项目的第一个 Svelte island（AGENTS.md §6.3：浏览器状态 → client:* island）。
  // 打字机动画是纯客户端状态，必须用 Svelte；其余展示部分仍是 Astro 静态渲染。
  //
  // 视觉复用 Command.astro 的 DOM 结构与 class（.term / .term__bar / .term__dot / .term__screen），
  // 但不导入 Command.astro —— island 需要自己掌控 screen 节点来驱动逐字动画，
  // 包一层 Astro 组件会让动画绑定的节点脱离 Svelte 的响应式范围。
  // 主题固定 light（暖纸底黑字，与 hero 一致）；标题栏随当前 slide 切换。

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

  let {
    slides,
    typeInterval = 45,
    holdMs = 2200,
    gapMs = 350,
  }: Props = $props();

  // —— 运行时状态 ——
  // 关键：初始 phase='hold' + typed=第一段完整内容。
  // 这样 SSR 输出完整内容（无 FOUC），hydrated 后也不会闪动清空再重打。
  let index = $state(0); // 当前 slide 下标
  let typed = $state(slides[0]?.code ?? ''); // 当前已显示的文本
  let cursorVisible = $state(true); // 光标闪烁
  let phase: 'typing' | 'hold' | 'gap' = $state('hold');

  const current = $derived(slides[index] ?? slides[0]);
  // gap 阶段屏幕清空（正在切换）；typing/hold 阶段显示 typed。
  const displayed = $derived(phase === 'gap' ? '' : typed);

  // —— 动画状态机（仅浏览器执行）——
  $effect(() => {
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
    const holdThenType = () => {
      if (cancelled) return;
      schedule(() => {
        if (cancelled) return;
        // 阶段：gap（清空，给观众一个「切换中」的视觉停顿）
        phase = 'gap';
        typed = '';
        schedule(() => {
          if (cancelled) return;
          // 切到下一段
          index = (index + 1) % slides.length;
          // 阶段：typing（逐字打出）
          phase = 'typing';
          const slide = slides[index];
          let i = 0;
          const typeNext = () => {
            if (cancelled) return;
            if (i >= slide.code.length) {
              // 阶段：hold（打完，停留）
              phase = 'hold';
              schedule(holdThenType, holdMs);
              return;
            }
            typed += slide.code[i];
            i++;
            schedule(typeNext, typeInterval);
          };
          typeNext();
        }, gapMs);
      }, holdMs);
    };

    // 光标独立闪烁（与打字状态机解耦）
    const blink = setInterval(() => {
      if (!cancelled) cursorVisible = !cursorVisible;
    }, 530);

    // 启动循环（首段已显示，等 holdMs 后开始切换）
    holdThenType();

    return () => {
      cancelled = true;
      clearInterval(blink);
      timers.forEach(clearTimeout);
    };
  });
</script>

<figure class="term term--light">
  <figcaption class="term__bar">
    <span class="term__dots" aria-hidden="true">
      <span class="term__dot term__dot--red"></span>
      <span class="term__dot term__dot--yellow"></span>
      <span class="term__dot term__dot--green"></span>
    </span>
    <span class="term__title">{current.title}</span>
  </figcaption>

  <div class="term__screen">
    <pre class="term__code"><code>{displayed}<span
          class="term__cursor"
          class:hidden={!cursorVisible}
          aria-hidden="true">▋</span></code></pre>
  </div>
</figure>

<style>
  /* —— 外观与 Command.astro 完全一致：黄色硬阴影 + 1px 黑边 —— */
  .term {
    margin: 0;
    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);
    box-shadow: var(--sx-comp-term-shadow);
    background: var(--sx-sys-color-bg-surface);
    overflow: hidden;
    max-width: 100%;
  }

  /* 标题栏：暖纸背景 + 红黄绿圆点 + 文件名 */
  .term__bar {
    display: flex;
    align-items: center;
    gap: var(--sx-ref-space-3);
    padding: 0.45rem var(--sx-ref-space-3);
    background: var(--sx-sys-color-bg-page);
    border-bottom: var(--sx-sys-border-width) solid var(--sx-sys-color-border);
  }
  .term__dots {
    display: inline-flex;
    gap: 0.35rem;
  }
  .term__dot {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);
    border-radius: 50%;
  }
  .term__dot--red {
    background: var(--sx-sys-color-danger);
  }
  .term__dot--yellow {
    background: var(--sx-sys-color-accent);
  }
  .term__dot--green {
    background: var(--sx-sys-color-success);
  }
  .term__title {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.78rem;
    font-weight: 700;
    opacity: 0.7;
  }

  /* 屏幕：light 主题（暖纸底黑字）。hero 场景下加大字号 / 行距作主视觉。 */
  .term__screen {
    padding: var(--sx-ref-space-3) var(--sx-ref-space-4);
    background: var(--sx-comp-term-light-screen-bg);
    color: var(--sx-comp-term-light-text);
    min-height: 11rem;
  }
  .term__code {
    margin: 0;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.95rem;
    line-height: 1.7;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    /* hero 内容受控（短 JSON），不会超宽 —— 隐藏滚动条避免空轨道 */
    overflow: hidden;
  }

  /* 光标：与文字同色，hidden 类控制闪烁可见性 */
  .term__cursor {
    display: inline-block;
    margin-left: 1px;
    transform: translateY(1px);
  }
  .term__cursor.hidden {
    visibility: hidden;
  }
</style>
