import type { ReactNode } from 'react';

const css = `
  .btn--press-on-interaction:hover,
  .btn--press-on-interaction:active,
  .btn--press-on-interaction:focus-visible {
    transform: translate(3px, 3px) !important;
    box-shadow: none !important;
  }
`;

export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  className?: string;
  class?: string;
  children?: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  target,
  rel,
  className,
  class: classProp,
  children,
}: Props) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size !== 'md' ? `btn--${size}` : '',
    className ?? classProp,
  ]
    .filter(Boolean)
    .join(' ');
  if (href) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <a
          className={classes}
          href={disabled ? undefined : href}
          aria-disabled={disabled || undefined}
          target={target}
          rel={rel}
        >
          {children}
        </a>
      </>
    );
  }
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <button className={classes} type={type} disabled={disabled}>
        {children}
      </button>
    </>
  );
}
