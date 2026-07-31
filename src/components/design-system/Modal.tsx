// Modal —— neubrutalism 对话框演示岛（对齐 neubrutalism.com Overlay / Dialog）。
//
// 点 trigger 按钮打开；点 ✕ / 点遮罩 / 按 ESC 关闭。打开时锁 body 滚动 +
// focus trap（Tab / Shift-Tab 在面板内循环）+ 关闭后恢复原焦点。
// 浏览器状态（open + 焦点管理）→ React island（client:load）。
// 视觉走全局 .modal__* 类（components.css）：遮罩 + 3px 黑边 + shadow-xl 重硬影。

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ModalProps {
  /** 触发按钮文字 */
  triggerLabel?: string;
  /** 弹窗标题（必填，作为 aria-labelledby） */
  title: string;
  /** 弹窗内容 */
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  triggerLabel = '打开对话框',
  title,
  children,
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // 打开副作用：ESC 监听 + body scroll lock + focus trap + 关闭恢复焦点
  useEffect(() => {
    if (!open) return;

    lastFocus.current = document.activeElement as HTMLElement;
    const panel = panelRef.current;
    if (panel) {
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel).focus();
    }
    document.body.style.overflow = 'hidden';

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (nodes.length === 0) {
        e.preventDefault();
        panelRef.current.focus();
        return;
      }
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement;
      if (e.shiftKey && active === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && active === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocus.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button type="button" className="btn" onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open && (
        <div
          className="modal__overlay"
          role="presentation"
          onClick={(e) => {
            // 仅点遮罩本身（非面板）时关闭
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            ref={panelRef}
            className="modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
          >
            <div className="modal__header">
              <h2 id="modal-title" className="modal__title">
                {title}
              </h2>
              <button
                type="button"
                className="modal__close"
                aria-label="关闭对话框"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal__body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
