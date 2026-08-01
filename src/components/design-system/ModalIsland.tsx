import type { ReactNode } from 'react';
import Modal from './Modal';
export default function ModalIsland({ children }: { children?: ReactNode }) { return <Modal title="确认操作" triggerLabel="打开对话框">{children ?? <><p>neubrutalism 对话框：3px 黑边 + shadow-xl 重硬影 + 恒 0 圆角。</p><p>点遮罩、点 ✕ 或按 ESC 关闭；Tab 在面板内循环，不会跑出去。</p></>}</Modal>; }
