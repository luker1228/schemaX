import { site } from '../../config/site';
import { navigation } from '../../data/navigation';
import Button from '../design-system/Button';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  /* —— sticky header：横跨视口全宽（不与页面内容同宽）。\n     半透明背景 + backdrop blur。视觉参数全部走 --sx-comp-header-* 组件令牌。 —— */\n  .site-header {\n    position: sticky;\n    top: 0;\n    z-index: 30;\n    padding-block: var(--sx-comp-header-padding-block);\n    padding-inline: var(--sx-comp-header-padding-inline);\n    background: color-mix(\n      in srgb,\n      var(--sx-sys-color-bg-page) 94%,\n      transparent\n    );\n    backdrop-filter: blur(8px);\n    border-bottom: 4px solid var(--sx-sys-color-border);\n  }\n\n  /* —— 布局：左 primary（brand + nav）占满 / 右 actions。\n     不套 .sx-container —— header 独立于内容宽度，brand 与 actions 分布两端。 —— */\n  .site-header__inner {\n    display: grid;\n    align-items: center;\n    gap: var(--sx-comp-header-gap);\n    grid-template-columns: minmax(0, 1fr) auto;\n  }\n\n  .header-primary {\n    display: flex;\n    align-items: center;\n    gap: clamp(1rem, 3vw, 3rem);\n    min-width: 0;\n  }\n\n  /* —— Brand：logo + 双行文字 —— */\n  .brand {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.9rem;\n    min-width: 0;\n    text-decoration: none;\n  }\n  .brand:hover {\n    color: inherit;\n  }\n\n  /* logo 容器：真实 mark（黑底暖纸反白）。mark 用 currentColor，跟随 --sx-comp-header-logo-fg。 */\n  .brand-logo {\n    box-sizing: border-box;\n    width: var(--sx-comp-header-logo-size);\n    height: var(--sx-comp-header-logo-size);\n    flex: 0 0 var(--sx-comp-header-logo-size);\n    padding: 0.5rem;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    background: var(--sx-comp-header-logo-bg);\n    color: var(--sx-comp-header-logo-fg);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    box-shadow: var(--sx-sys-shadow-sm);\n    transition:\n      transform 180ms ease,\n      box-shadow 120ms ease;\n  }\n  .brand:hover .brand-logo,\n  .brand:focus-visible .brand-logo {\n    transform: rotate(4deg);\n    box-shadow: var(--sx-sys-shadow-md);\n  }\n\n  .brand-text {\n    display: grid;\n    gap: 0.15rem;\n  }\n  .brand-name {\n    display: inline-flex;\n    align-items: center;\n    flex: 0 0 auto;\n    font-size: var(--sx-sys-font-display-sm);\n    font-weight: 400;\n    letter-spacing: 0.04em;\n    line-height: 0.95;\n    white-space: nowrap;\n  }\n  .brand-tagline {\n    color: var(--sx-sys-color-text-soft, var(--sx-sys-color-text-primary));\n    opacity: 0.7;\n    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n    font-weight: 600;\n    font-size: var(--sx-sys-font-size-md);\n    /* 中文副标题：字距收窄，避免中文字间出现不自然空隙 */\n    letter-spacing: 0.02em;\n    line-height: normal;\n  }\n\n  /* —— Nav 样式见 src/styles/components.css 的全局 .nav 类 —— */\n\n  /* —— Header actions 容器：仅控制 flex 排列。\n       按钮本体复用全局 Button 组件（.btn 类），不再维护私有 .header-action 样式。 —— */\n  .header-actions {\n    display: flex;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 0.65rem;\n  }\n\n  /* —— 移动端：单列，header-primary 改纵向 —— */\n   @media (max-width: 48rem) {\n    .site-header__inner {\n      grid-template-columns: 1fr;\n    }\n    .header-primary {\n      align-items: flex-start;\n      flex-direction: column;\n      gap: 1rem;\n    }\n    .nav {\n      justify-content: flex-start;\n    }\n    .header-actions {\n      justify-content: flex-start;\n    }\n  }\n";
export default function Header(props: ReactProps) {

const pathname = props.pathname ?? '/';
const isActive = (href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);
  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<header className="site-header" data-pagefind-ignore>
  <div className="site-header__inner">
    <div className="header-primary">
      <a className="brand" href="/" aria-label={`${site.name} home`}>
        <span className="brand-logo" aria-hidden="true">
          <svg
            className="brand-logo__mark"
            viewBox="0 0 144 144"
            fill="currentColor"
            width="100%"
            height="100%"
          >
            <path
              d="M52 26H44C39.5817 26 36 29.5817 36 34V51.6914L58 72L36 92.3076V110C36 114.418 39.5817 118 44 118H52V136H34C25.1634 136 18 128.837 18 120V90C18 85.5817 14.4183 82 10 82H3V62H10C14.4183 62 18 58.4183 18 54V24C18 15.1634 25.1634 8 34 8H52V26ZM110 8C118.837 8 126 15.1634 126 24V54C126 58.4183 129.582 62 134 62H141V82H134C129.582 82 126 85.5817 126 90V120C126 128.837 118.837 136 110 136H92V118H100C104.418 118 108 114.418 108 110V92.3076L86 72L108 51.6914V34C108 29.5817 104.418 26 100 26H92V8H110Z"
            ></path>
          </svg>
        </span>
        <span className="brand-text">
          <span className="brand-name">{site.name}</span>
          <span className="brand-tagline">{site.brandTagline}</span>
        </span>
      </a>

      <nav className="nav" aria-label="Primary">
        {
          navigation.map((item) => (
            <a
              className="nav__link"
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))
        }
      </nav>
    </div>

    <div className="header-actions" aria-label="固定入口">
      <Button variant="outline" size="sm" href={site.rss.href}>
        {site.rss.label}
      </Button>
      <Button
        variant="primary"
        size="sm"
        href={site.social[0]?.href}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </Button>
    </div>
  </div>
</header>
    </>
  );
}
