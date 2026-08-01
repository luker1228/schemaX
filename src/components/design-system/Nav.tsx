export interface NavItem { label: string; href: string; active?: boolean; disabled?: boolean }
interface Props { items: NavItem[]; ariaLabel?: string }
export default function Nav({ items, ariaLabel = 'Primary' }: Props) { return <nav className="nav" aria-label={ariaLabel}>{items.map((item) => <a className="nav__link" href={item.disabled ? undefined : item.href} aria-current={item.active ? 'page' : undefined} aria-disabled={item.disabled ? 'true' : undefined} key={item.label}>{item.label}</a>)}</nav>; }
