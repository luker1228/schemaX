// Toasts —— neubrutalism 通知触发演示岛（对齐 neubrutalism.com Notification Toasts）。
//
// 点按钮触发 success / error / info / warning 四种 toast；满色底（参考 green/pink/blue/yellow），
// 3s 自动消失，也可点 ✕ 手动关。浏览器状态（队列 + 计时）→ React island（client:load）。
// 视觉走全局 .toast / .toast--* 类（components.css）；触发按钮用 .btn + inline 语义底色。

import { useState } from 'react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: number;
  variant: ToastVariant;
  title: string;
  msg: string;
}

const ICONS: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  warning: '!',
  info: 'i',
};

const TRIGGERS: {
  variant: ToastVariant;
  label: string;
  title: string;
  msg: string;
  bg: string;
}[] = [
  {
    variant: 'success',
    label: 'Success Toast',
    title: '已保存',
    msg: '改动已写入草稿。',
    bg: 'var(--sx-sys-color-pop-green)',
  },
  {
    variant: 'error',
    label: 'Error Toast',
    title: '保存失败',
    msg: '网络中断，请重试。',
    bg: 'var(--sx-sys-color-coral)',
  },
  {
    variant: 'info',
    label: 'Info Toast',
    title: '新版本',
    msg: 'v2.4 已发布，查看更新。',
    bg: 'var(--sx-sys-color-info)',
  },
  {
    variant: 'warning',
    label: 'Warning Toast',
    title: '余额不足',
    msg: '剩余额度低于 10%。',
    bg: 'var(--sx-sys-color-accent)',
  },
];

export default function Toasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [nextId, setNextId] = useState(1);

  function push(trigger: (typeof TRIGGERS)[number]) {
    const id = nextId;
    setNextId((n) => n + 1);
    setToasts((prev) => [
      ...prev,
      { id, variant: trigger.variant, title: trigger.title, msg: trigger.msg },
    ]);
    // 3s 后自动移除本条
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }

  function dismiss(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="nb-stack">
      <div className="nb-row" role="group" aria-label="触发通知">
        {TRIGGERS.map((t) => (
          <button
            key={t.variant}
            type="button"
            className="btn"
            style={{
              background: t.bg,
              color: 'var(--sx-sys-color-text-primary)',
            }}
            onClick={() => push(t)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* toast 区：assertive(error/warning) 用 alert，polite(success/info) 用 status */}
      <div className="nb-stack" role="region" aria-label="通知">
        {toasts.length === 0 ? (
          <p className="toast toast--empty">点击上方按钮触发通知</p>
        ) : null}
        {toasts.map((t) => {
          const assertive = t.variant === 'error' || t.variant === 'warning';
          return (
            <div
              key={t.id}
              className={`toast toast--${t.variant}`}
              role={assertive ? 'alert' : 'status'}
            >
              <span className="toast__icon" aria-hidden="true">
                {ICONS[t.variant]}
              </span>
              <span className="toast__msg">
                <strong>{t.title}</strong>
                {t.msg}
              </span>
              <button
                type="button"
                className="toast__dismiss"
                aria-label="关闭通知"
                onClick={() => dismiss(t.id)}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
