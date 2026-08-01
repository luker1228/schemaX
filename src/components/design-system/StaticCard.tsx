import type { CSSProperties, ReactNode } from 'react';

interface Props {
  title: ReactNode;
  description?: ReactNode;
  tag?: ReactNode;
  fill?: string;
  className?: string;
  class?: string;
}

const styles = `.staticcard{display:flex;flex-direction:column;padding:var(--sx-ref-space-4);border:var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);border-radius:var(--sx-sys-radius-sm);background:var(--sx-sys-color-bg-surface)}.staticcard--muted{background:var(--sx-sys-color-bg-page)}.staticcard__title{margin:0 0 var(--sx-ref-space-2);font-size:var(--sx-sys-font-size-base);font-weight:700;line-height:1.3}.staticcard__title a{color:inherit;text-decoration:underline;text-underline-offset:0.15em}.staticcard__desc{margin:0;font-size:var(--sx-sys-font-size-sm);line-height:1.6;color:var(--sx-sys-color-text-primary)}.staticcard__tag{display:inline-flex;align-items:center;align-self:flex-start;margin-top:var(--sx-ref-space-3);padding:0.45rem 0.75rem;border:var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);border-radius:var(--sx-sys-radius-control);background:var(--sx-sc-fill);box-shadow:var(--sx-sys-shadow-sm);font-family:var(--sx-sys-font-family-mono-system);font-size:var(--sx-sys-font-size-md);font-weight:700;letter-spacing:0.04em;text-transform:uppercase}.staticcard__caution{display:inline-block;margin-inline-start:0.35rem;padding:0.15rem 0.35rem;border:var(--sx-sys-border-width-strong) solid var(--sx-sys-color-border);background:var(--sx-sys-color-accent);font-family:var(--sx-sys-font-family-mono-system);font-size:var(--sx-sys-font-size-xs);font-weight:700;letter-spacing:0.04em;text-transform:uppercase;vertical-align:middle}`;

export default function StaticCard({ title, description, tag = title, fill = 'var(--sx-sys-color-accent)', className, class: classProp }: Props) {
  const classes = ['staticcard', className ?? classProp].filter(Boolean).join(' ');
  const style = { '--sx-sc-fill': fill } as CSSProperties;

  return <><style dangerouslySetInnerHTML={{ __html: styles }} /><div className={classes} style={style}><h3 className="staticcard__title">{title}</h3><p className="staticcard__desc">{description}</p><span className="staticcard__tag">{tag}</span></div></>;
}
