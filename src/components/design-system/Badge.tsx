import type { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'accent' | 'action' | 'danger' | 'success';

interface Props { variant?: BadgeVariant; children?: ReactNode; className?: string; class?: string }

export default function Badge({ variant = 'default', children, className, class: classProp }: Props) {
  const classes = ['badge', variant !== 'default' ? `badge--${variant}` : '', className ?? classProp].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}
