import type { ReactNode, CSSProperties } from 'react';

export type CardRadius = 'none' | 'rounded';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';

interface Props {
  radius?: CardRadius; bordered?: boolean; shadow?: CardShadow; shadowColor?: string;
  href?: string; target?: '_blank' | '_self' | '_parent' | '_top'; rel?: string;
  interactive?: boolean; className?: string; class?: string; children?: ReactNode;
}

export default function Card({ radius = 'none', bordered = true, shadow = 'sm', shadowColor, href, target, rel, interactive, className, class: classProp, children }: Props) {
  const classes = ['card', radius === 'rounded' ? 'card--rounded' : '', !bordered ? 'card--borderless' : '', shadow !== 'sm' ? `card--shadow-${shadow}` : '', (interactive ?? Boolean(href)) ? 'card--interactive' : '', className ?? classProp].filter(Boolean).join(' ');
  const style = shadowColor ? ({ '--sx-card-shadow-color': shadowColor } as CSSProperties) : undefined;
  if (href) return <a className={classes} href={href} target={target} rel={rel} style={style}>{children}</a>;
  return <div className={classes} style={style}>{children}</div>;
}
