import DocSide from './DocSide';
import type { DocSideGroup } from './DocSide';
import { componentsRegistry } from '../../data/components-registry';
import type { ReactNode, CSSProperties } from 'react';

interface ReactProps { [key: string]: any; children?: ReactNode }
const styleValue = (value: string | CSSProperties | undefined): CSSProperties | undefined => {
  if (!value || typeof value !== 'string') return value as CSSProperties | undefined;
  return Object.fromEntries(value.split(';').filter(Boolean).map((part) => { const [key, val] = part.split(':'); return [key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), val?.trim() ?? '']; }));
};

export default function DocSidebar(props: ReactProps) {
// 设计系统文档页左侧边栏 —— 数据装配层。
// 视觉与交互由通用组件 DocSide 承担；本文件只负责：
//   1. 「概览」组 = 设计系统真实页面路由
//   2. 「组件」组 = componentsRegistry 全量（live 可点，planned 灰显）
//   3. 按 current prop 高亮当前组件项

interface Props {
  /** 当前组件 PascalCase name（用于高亮「组件」组对应项） */
  current: string;
}
const { current } = props;
const currentKey = current.toLowerCase();

const BASE = '/design-system/components';
const detailHref = (name: string) => `${BASE}/${name.toLowerCase()}`;

const groups: DocSideGroup[] = [
  {
    title: '概览',
    ariaLabel: '设计系统区域',
    items: [
      { label: '设计系统总览', href: '/design-system' },
      { label: 'Foundations', href: '/design-system/foundations' },
      { label: 'Tokens', href: '/design-system/tokens' },
      { label: 'Content', href: '/design-system/content' },
      { label: 'Components', href: BASE },
    ],
  },
  {
    title: '组件',
    ariaLabel: '组件目录',
    items: componentsRegistry.map((c) => ({
      label: c.name,
      href: c.status === 'live' ? detailHref(c.name) : undefined,
      planned: c.status === 'planned',
      current: c.name.toLowerCase() === currentKey,
    })),
  },
];
  return (
    <>
<DocSide groups={groups} label="文档目录" />
    </>
  );
}
