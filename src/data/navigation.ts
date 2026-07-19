// 顶部导航项（规范 §4.1：SchemaX / Courses / Blog / Projects / System）。
export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: '课程', href: '/courses' },
  { label: '博客', href: '/blog' },
  { label: '作品', href: '/projects' },
  { label: '设计系统', href: '/design-system' },
];
