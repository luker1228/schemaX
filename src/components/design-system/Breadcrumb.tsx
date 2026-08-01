import Crumb, { type CrumbItem } from './Crumb';

export type BreadcrumbItem = CrumbItem;
interface Props { items: BreadcrumbItem[]; ariaLabel?: string }

/* Breadcrumb 是公开组件名，视觉与站点真实使用的 Crumb 保持单一实现。 */
export default function Breadcrumb({ items, ariaLabel = 'Breadcrumb' }: Props) {
  return <Crumb items={items} ariaLabel={ariaLabel} />;
}
