import { roles, accentToken } from '../../data/about';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};
const css = "\n  .skills {\n    background: var(--sx-sys-color-bg-page);\n    padding-block: clamp(2.5rem, 5vw, 4rem) clamp(3rem, 5vw, 4.5rem);\n    padding-inline: clamp(1.5rem, 5vw, 4.5rem);\n  }\n\n  .skills__inner {\n    max-width: 80rem;\n    margin-inline: auto;\n    display: flex;\n    flex-direction: column;\n    gap: 2rem;\n  }\n\n  .skills__head {\n    display: flex;\n    align-items: flex-end;\n  }\n\n  .skills__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-display-md);\n    font-weight: 900;\n    line-height: 1.05;\n    letter-spacing: -0.02em;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .skills__cards {\n    display: grid;\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n    gap: 1.25rem;\n  }\n\n  .role-card {\n    display: flex;\n    flex-direction: column;\n    background: var(--sx-sys-color-bg-surface);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: var(--sx-sys-radius-md);\n    box-shadow: var(--sx-sys-shadow-lg);\n    overflow: hidden;\n    transition:\n      transform 160ms ease,\n      box-shadow 160ms ease;\n  }\n\n  .role-card:hover {\n    transform: translate(-2px, -2px);\n    box-shadow: 6px 6px 0 var(--sx-sys-color-border);\n  }\n\n  .role-card__band {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    height: 4rem;\n    padding: 1rem 1.125rem;\n    background: var(--sx-accent, var(--sx-sys-color-accent));\n    border-bottom: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n  }\n\n  .role-card__index {\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-3xl);\n    font-weight: 900;\n    line-height: 1;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .role-card__body {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    padding: 1.125rem 1.125rem 1.25rem;\n  }\n\n  .role-card__eyebrow {\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-sm);\n    font-weight: 800;\n    color: var(--sx-sys-color-text-soft);\n  }\n\n  .role-card__title {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-display), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-2xl);\n    font-weight: 800;\n    line-height: 1.15;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .role-card__desc {\n    margin: 0;\n    font-family: var(--sx-sys-font-family-body), system-ui, sans-serif;\n    font-size: var(--sx-sys-font-size-base);\n    line-height: 1.5;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n  .role-card__tags {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    margin-top: 0.125rem;\n  }\n\n  .role-card__tag {\n    display: inline-flex;\n    align-items: center;\n    padding: 0.3125rem 0.5625rem;\n    background: var(--sx-sys-color-beige);\n    border: var(--sx-sys-border-width) solid var(--sx-sys-color-border);\n    border-radius: 9999px;\n    font-family: var(--sx-sys-font-family-mono), ui-monospace, monospace;\n    font-size: var(--sx-sys-font-size-xs);\n    font-weight: 800;\n    color: var(--sx-sys-color-text-primary);\n  }\n\n   @media (max-width: 64rem) {\n    .skills__cards {\n      grid-template-columns: 1fr;\n    }\n  }\n";
export default function AboutSkills(props: ReactProps) {

  return (
    <><style dangerouslySetInnerHTML={{ __html: css }} />
<section className="skills">
  <div className="skills__inner">
    <div className="skills__head">
      <h2 className="skills__title">角色</h2>
    </div>

    <div className="skills__cards">
      {roles.map((role) => (
        <article className="role-card">
          <div
            className="role-card__band" style={styleValue(`--sx-accent: ${accentToken[role.accent]}`)}
          >
            <span className="role-card__index">{role.index}</span>
          </div>

          <div className="role-card__body">
            <span className="role-card__eyebrow">{role.eyebrow}</span>
            <h3 className="role-card__title">{role.title}</h3>
            <p className="role-card__desc">{role.desc}</p>
            <div className="role-card__tags">
              {role.tags.map((tag) => (
                <span className="role-card__tag">{tag}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
