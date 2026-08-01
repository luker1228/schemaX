import type { ReactNode } from 'react';
interface Props { label?: string; lang?: string; code?: string; children?: ReactNode }
export default function Preview({ label = '渲染结果', lang, code, children }: Props) { const isCode = typeof code === 'string'; return <figure className="doc-code"><figcaption className="doc-code__bar"><span className="doc-code__file">{label}</span>{lang ? <span className="doc-code__lang">{lang}</span> : null}</figcaption>{isCode ? <pre className="doc-code__body"><code>{code}</code></pre> : <div className="doc-code__stage">{children}</div>}</figure>; }
