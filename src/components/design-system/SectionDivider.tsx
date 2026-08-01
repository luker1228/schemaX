import type { CSSProperties } from 'react';
type DividerWeight = 'thin' | 'default' | 'thick';
interface Props { weight?: DividerWeight; color?: string; className?: string; class?: string }
const styles = `.sectiondivider{flex:none;width:100%;height:var(--sx-sd-weight);margin:0;border:0;border-radius:var(--sx-sys-radius-sm);background:var(--sx-sd-color)}`;
export default function SectionDivider({ weight = 'default', color = 'var(--sx-sys-color-border)', className, class: classProp }: Props) { const weightToken = { thin: 'var(--sx-sys-border-width)', default: 'var(--sx-sys-border-width-strong)', thick: 'calc(var(--sx-sys-border-width-strong) * 2)' }[weight]; const style = { '--sx-sd-weight': weightToken, '--sx-sd-color': color } as CSSProperties; return <><style dangerouslySetInnerHTML={{ __html: styles }} /><hr className={['sectiondivider', className ?? classProp].filter(Boolean).join(' ')} style={style} /></>; }
