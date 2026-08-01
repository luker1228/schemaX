import type { CSSProperties, ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  href?: string;
  iconBg?: string;
  shadowColor?: string;
  className?: string;
  class?: string;
  children?: ReactNode;
}

export default function FeatureCard({
  title,
  description,
  href,
  iconBg = 'var(--sx-sys-color-accent)',
  shadowColor = 'var(--sx-sys-color-border)',
  className,
  class: classProp,
  children,
}: Props) {
  const classNames = ['featurecard', className ?? classProp].filter(Boolean).join(' ');
  const style = {
    '--sx-sys-shadow-color': shadowColor,
    '--sx-fc-icon-bg': iconBg,
  } as CSSProperties;
  const content = (
    <>
      <span className="featurecard__icon">{children}</span>
      <span className="featurecard__label">{title}</span>
      <span className="featurecard__desc">{description}</span>
    </>
  );

  return href ? (
    <a className={classNames} href={href} style={style}>
      {content}
    </a>
  ) : (
    <div className={classNames} style={style}>
      {content}
    </div>
  );
}
