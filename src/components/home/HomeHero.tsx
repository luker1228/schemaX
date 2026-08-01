import { site } from '../../config/site';
import { profile } from '../../data/profile';
import HeroTerminal from './HeroTerminal.tsx';
import GeoMark from '../design-system/GeoMark';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .hero {\n    padding-block: clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 4vw, 2.5rem);\n  }\n\n  .hero__inner {\n    display: grid;\n    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.95fr);\n    gap: var(--sx-ref-space-12);\n    align-items: start;\n  }\n\n  .hero__copy {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: var(--sx-ref-space-6);\n    position: relative;\n  }\n\n  .hero__meta {\n    display: flex;\n    align-items: center;\n    gap: var(--sx-ref-space-3);\n  }\n\n  /* 手写标签感：略歪的蓝底印章 */\n  .hero__stamp-badge {\n    display: inline-flex;\n    align-items: center;\n    padding: 0.4rem 0.7rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-action-primary);\n    color: var(--sx-sys-color-bg-surface);\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-md);\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    box-shadow: var(--sx-sys-shadow-sm);\n    transform: rotate(var(--sx-sys-rotate-sticker));\n  }\n\n  .hero__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-lg);\n    font-weight: 800;\n    line-height: 0.98;\n    letter-spacing: -0.02em;\n    text-transform: uppercase;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .hero__title-line {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    gap: var(--sx-ref-space-3);\n    flex-wrap: wrap;\n  }\n\n  /* 马克笔印泥：黄底略宽于字身、上下留一丝呼吸，像盖下去的一笔高亮（标题端正不旋） */\n  .hero__title-hl {\n    background: var(--sx-sys-color-accent);\n    padding: 0.04em 0.16em;\n  }\n\n  /* 唯一 authored moment：手绘箭头 draw-in，从右下方斜指向高亮词。\n     wrap 只管旋转定位；内层 SVG 走 clip-path draw-in（在未旋转坐标系生效，\n     不受 transform 干扰）。pointer-events:none 避免遮挡标题选区。 */\n  .hero__arrow-wrap {\n    position: absolute;\n    right: -0.5rem;\n    bottom: -1.55rem;\n    transform: rotate(-132deg);\n    transform-origin: 65% 65%;\n    pointer-events: none;\n  }\n\n  .hero__arrow {\n    width: 4.25rem;\n    height: auto;\n  }\n\n  .hero__lede {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-sm);\n    font-weight: 700;\n    line-height: 1.25;\n    color: var(--sx-sys-color-text-soft);\n    max-width: 28ch;\n  }\n\n  .hero__bio {\n    margin: 0;\n    max-width: 42ch;\n    font-size: var(--sx-sys-font-size-reading);\n    line-height: 1.7;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .hero__command {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 0.7rem 1rem;\n    border: var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-sm);\n    background: var(--sx-sys-color-bg-surface);\n    box-shadow: var(--sx-sys-shadow-sm);\n  }\n\n  .hero__command-label {\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: var(--sx-sys-color-text-muted);\n  }\n\n  .hero__command-code {\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-base);\n    font-weight: 700;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .hero__brace {\n    position: absolute;\n    right: -1.1rem;\n    top: -1.1rem;\n  }\n\n  .hero__cta {\n    display: flex;\n    flex-wrap: wrap;\n    gap: var(--sx-ref-space-4);\n    margin-top: var(--sx-ref-space-2);\n  }\n\n  .hero__stage {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sx-ref-space-3);\n    position: relative;\n  }\n\n  .hero__terminal :global(.term) {\n    /* 边框 / 圆角 / 黄+黑描边硬影走 .term 全局默认（3px 框 · 0 圆角 · comp 8px 双层影），\n       这里只覆盖宽度与终端字体。 */\n    width: 100%;\n    font-family: var(--sx-sys-font-family-terminal), ui-monospace, monospace;\n  }\n\n  .hero__terminal :global(.term__title),\n  .hero__terminal :global(.term__screen),\n  .hero__terminal :global(.term__code) {\n    font-family: var(--sx-sys-font-family-terminal), ui-monospace, monospace;\n  }\n\n  .hero__terminal :global(.term--hero .term__screen) {\n    min-height: 13rem;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.55;\n  }\n\n  .hero__caption {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    color: var(--sx-sys-color-text-muted);\n    transform: rotate(var(--sx-sys-rotate-sticker));\n  }\n\n  .hero__caption-mark {\n    color: var(--sx-sys-color-action-primary);\n    font-weight: 700;\n  }\n\n  @media (max-width: 48rem) {\n    .hero__inner {\n      grid-template-columns: 1fr;\n      gap: var(--sx-ref-space-8);\n    }\n  }\n";
export default function HomeHero(props: ReactProps) {

// 首页 hero 终端轮播内容（规范 §4.1）。纯视觉语言呈现，非真实 JSON 契约。
const heroSlides = [
  {
    title: 'profile.json',
    code: `{
  "name": "${profile.name}",
  "role": "${profile.role}",
  "modes": ${JSON.stringify(profile.modes)},
  "status": "${profile.status}"
}`,
  },
  {
    title: 'site.json',
    code: `{
  "site": "${site.name}",
  "pillars": ["courses", "blog", "projects"],
  "built": "2026"
}`,
  },
  {
    title: 'now.json',
    code: `{
  "now": "shipping design system",
  "mood": "focused",
  "next": "course: schema-first"
}`,
  },
  {
    title: 'about.md',
    code: `我是 Luke——AI Agent 工程师，也在自己的知识系统里当学生。
SchemaX 是我公开的第二大脑：课程、笔记、作品与设计系统共用同一套契约。
你从搜索掉进某篇文章时，看到的是可验证的结构，不是营销页。`,
  },
];
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="hero home-section" aria-labelledby="hero-title">
  <div className="hero__inner home-section__inner">
    <div className="hero__copy">
      <div className="hero__meta">
        <span className="hero__stamp-badge">Schema-Driven</span>
        <GeoMark kind="star" size="sm" className="hero__star" />
      </div>

      <h1 className="hero__title" id="hero-title">
        Structure
        <span className="hero__title-line">
          <span className="hero__title-hl">the Unknown.</span>
          <span className="hero__arrow-wrap" aria-hidden="true">
            <GeoMark
              kind="arrow"
              size="md"
              className="hero__arrow geo-arrow-draw"
            />
          </span>
        </span>
      </h1>

      <p className="hero__lede">用 Schema，为未知建立可执行的结构。</p>

      <div className="hero__command" aria-hidden="true">
        <span className="hero__command-label">path</span>
        <code className="hero__command-code">schema → contract → tool call</code>
      </div>

      <div className="hero__cta">
        <a className="stamp stamp--primary" href="/projects">Explore Projects</a>
        <a className="stamp stamp--ghost" href="/blog">Read the Blog</a>
      </div>
    </div>

    <div className="hero__stage">
      <div className="hero__terminal">
        <HeroTerminal slides={heroSlides} />
      </div>
      <p className="hero__caption">
        <span className="hero__caption-mark">*</span>
        终端里的 JSON 是视觉语言，不是对外 API 契约。
      </p>
    </div>
  </div>
</section>
    </>
  );
}
