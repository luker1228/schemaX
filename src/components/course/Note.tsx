import type { ReactNode } from 'react';

interface Props { tag: string; children?: ReactNode }

export default function Note({ tag, children }: Props) {
  return <div className="doc-note"><div className="doc-note__head"><span className="doc-note__tag">{tag}</span></div><div className="doc-note__body">{children}</div></div>;
}
