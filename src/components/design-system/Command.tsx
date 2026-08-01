import type { ReactNode } from 'react';
export type CommandTheme = 'light' | 'dark';
interface Props { theme?: CommandTheme; title?: string; children?: ReactNode }
export default function Command({ theme = 'light', title = 'bash', children }: Props) { return <figure className={['term', `term--${theme}`].join(' ')}><figcaption className="term__bar"><span className="term__dots" aria-hidden="true"><span className="term__dot term__dot--red" /><span className="term__dot term__dot--yellow" /><span className="term__dot term__dot--green" /></span><span className="term__title">{title}</span></figcaption><div className="term__screen">{children}</div></figure>; }
