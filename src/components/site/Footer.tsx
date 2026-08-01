import { site } from '../../config/site';
import { navigation } from '../../data/navigation';

const css = `
  /* 黑底 footer（参考 neubrutalism footer）：logo + tagline + 多列链接 + 暗分割线 + 版权。
     黑底 = border token（= ink #000）；灰阶文字用 color-mix(白+黑) 现场调（系统无现成灰阶）。 */
  .footer {
    background: var(--sx-sys-color-border);
    color: var(--sx-sys-color-bg-surface);
  }
  .footer__inner {
    max-width: 80rem;
    margin-inline: auto;
    padding: clamp(2.5rem, 6vw, 4.5rem) var(--sx-ref-space-6);
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-8);
  }
  .footer__top {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sx-ref-space-8);
    justify-content: space-between;
    align-items: flex-start;
  }
  .footer__brand {
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-3);
    max-width: 30rem;
    flex: 1 1 20rem;
  }
  .footer__logo {
    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;
    font-size: var(--sx-sys-font-display-sm);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1;
    color: var(--sx-sys-color-bg-surface);
  }
  .footer__tagline {
    margin: 0;
    font-size: var(--sx-sys-font-size-base);
    line-height: 1.6;
    color: color-mix(in srgb, var(--sx-sys-color-bg-surface) 65%, var(--sx-sys-color-border));
  }
  .footer__cols {
    display: flex;
    gap: clamp(2rem, 5vw, 4rem);
    flex-wrap: wrap;
  }
  .footer__col {
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-3);
  }
  .footer__col-h {
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--sx-sys-color-accent);
  }
  .footer__col-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sx-ref-space-2);
  }
  .footer__link {
    font-size: var(--sx-sys-font-size-base);
    color: color-mix(in srgb, var(--sx-sys-color-bg-surface) 92%, var(--sx-sys-color-border));
    text-decoration: none;
    transition: color 120ms ease;
  }
  .footer__link:hover {
    color: var(--sx-sys-color-accent);
  }
  .footer__link:focus-visible {
    outline: 3px solid var(--sx-sys-color-sky);
    outline-offset: 3px;
  }
  .footer__divider {
    height: 2px;
    background: color-mix(in srgb, var(--sx-sys-color-bg-surface) 15%, var(--sx-sys-color-border));
  }
  .footer__bottom {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sx-ref-space-4);
    justify-content: space-between;
    align-items: center;
  }
  .footer__copy {
    font-size: var(--sx-sys-font-size-sm);
    color: color-mix(in srgb, var(--sx-sys-color-bg-surface) 65%, var(--sx-sys-color-border));
  }
  .footer__code {
    font-family: var(--sx-sys-font-family-mono-system), ui-monospace, monospace;
    font-size: var(--sx-sys-font-size-xs);
    color: var(--sx-sys-color-accent);
  }
  @media (max-width: 48rem) {
    .footer__top {
      flex-direction: column;
    }
  }
`;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <footer className="footer" data-pagefind-ignore>
        <div className="footer__inner">
          <div className="footer__top">
            <div className="footer__brand">
              <div className="footer__logo">{site.name}</div>
              <p className="footer__tagline">{site.description}</p>
            </div>

            <div className="footer__cols">
              <div className="footer__col">
                <div className="footer__col-h">Explore</div>
                <ul className="footer__col-list">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <a className="footer__link" href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__col">
                <div className="footer__col-h">Connect</div>
                <ul className="footer__col-list">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a className="footer__link" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                    </li>
                  ))}
                  <li key={site.rss.href}>
                    <a className="footer__link" href={site.rss.href}>{site.rss.label}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__divider" aria-hidden="true"></div>

          <div className="footer__bottom">
            <span className="footer__copy">© {year} {site.author.name} · {site.brandTagline}</span>
            <span className="footer__code">Structure before automation · Contract before integration</span>
          </div>
        </div>
      </footer>
    </>
  );
}
