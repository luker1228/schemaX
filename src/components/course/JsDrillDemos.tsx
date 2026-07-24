// JsDrillDemos —— 课程「JS 交互四练」真交互演示。
//
// 外壳：DocPlayground（.doc-playground）
// 岛内：.doc-playground__panel = 控件区 + 追踪条（事件 / 状态 / 界面）
// 视觉类全部走 doc.css 的 playground BEM；按钮复用全局 .btn。
// 课里的代码块仍是「原生 JS」；这里把同一闭环做成可点 demo。

import { useId, useState, type ReactNode } from 'react';

type Status = 'pending' | 'done';

function Trace({
  event,
  state,
  ui,
}: {
  event: string;
  state: string;
  ui: string;
}) {
  return (
    <div className="doc-playground__trace" aria-live="polite">
      <div className="doc-playground__trace-row">
        <span className="doc-playground__trace-k">事件</span>
        <span className="doc-playground__trace-v">{event}</span>
      </div>
      <div className="doc-playground__trace-row">
        <span className="doc-playground__trace-k">状态</span>
        <span className="doc-playground__trace-v">{state}</span>
      </div>
      <div className="doc-playground__trace-row">
        <span className="doc-playground__trace-k">界面</span>
        <span className="doc-playground__trace-v">{ui}</span>
      </div>
    </div>
  );
}

/** 舞台内容：面板（控件）+ 教学用运行时追踪 */
function DrillBody({
  children,
  event,
  state,
  ui,
}: {
  children: ReactNode;
  event: string;
  state: string;
  ui: string;
}) {
  return (
    <div className="doc-playground__panel">
      <div className="doc-playground__controls">{children}</div>
      <Trace event={event} state={state} ui={ui} />
    </div>
  );
}

/** 练习 1：点击改状态 */
export function StatusClickDrill() {
  const [status, setStatus] = useState<Status>('pending');
  const [lastEvent, setLastEvent] = useState('尚未点击');

  const label = status === 'pending' ? '待处理' : '已处理';
  const done = status === 'done';

  return (
    <DrillBody
      event={lastEvent}
      state={`status = "${status}"`}
      ui={`状态区显示「${label}」`}
    >
      <div className="doc-playground__readout">
        <span className="doc-playground__kicker">当前状态</span>
        <p
          className={[
            'doc-playground__value',
            done ? 'doc-playground__value--done' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-live="polite"
        >
          {label}
        </p>
      </div>
      <div className="doc-playground__actions doc-playground__actions--split">
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            setStatus('done');
            setLastEvent('点击「更新状态」');
          }}
        >
          更新状态
        </button>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => {
            setStatus('pending');
            setLastEvent('点击「取消」');
          }}
        >
          取消
        </button>
      </div>
    </DrillBody>
  );
}

/** 练习 2：输入实时镜像 */
export function InputMirrorDrill() {
  const inputId = useId();
  const [value, setValue] = useState('');
  const [lastEvent, setLastEvent] = useState('尚未输入');

  const empty = !value.trim();
  const display = empty ? '还没输入' : value;

  return (
    <DrillBody
      event={lastEvent}
      state={`value = "${value}"`}
      ui={`镜像显示「${display}」`}
    >
      <label className="doc-playground__field" htmlFor={inputId}>
        <span className="doc-playground__kicker">输入</span>
        <input
          id={inputId}
          type="text"
          className="doc-playground__input"
          placeholder="输入一句话试试"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setLastEvent(
              e.target.value
                ? `input · 当前 ${e.target.value.length} 字`
                : 'input · 清空',
            );
          }}
        />
      </label>
      <div className="doc-playground__readout">
        <span className="doc-playground__kicker">镜像</span>
        <p
          className={[
            'doc-playground__value',
            empty ? 'doc-playground__value--muted' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-live="polite"
        >
          {display}
        </p>
      </div>
    </DrillBody>
  );
}

/** 练习 3：动态添加列表项 */
export function TaskAddDrill() {
  const inputId = useId();
  const [draft, setDraft] = useState('');
  const [tasks, setTasks] = useState<string[]>(['先跑通页面']);
  const [lastEvent, setLastEvent] = useState('尚未添加');

  function handleAdd() {
    const text = draft.trim();
    if (!text) {
      setLastEvent('点击「添加」· 空输入被忽略');
      return;
    }
    setTasks((prev) => [...prev, text]);
    setDraft('');
    setLastEvent(`点击「添加」· 写入「${text}」`);
  }

  return (
    <DrillBody
      event={lastEvent}
      state={`tasks.length = ${tasks.length}`}
      ui={`列表渲染 ${tasks.length} 项`}
    >
      <div className="doc-playground__row">
        <label className="doc-playground__field" htmlFor={inputId}>
          <span className="sr-only">任务内容</span>
          <input
            id={inputId}
            type="text"
            className="doc-playground__input"
            placeholder="例如：检查接口日志"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd();
              }
            }}
          />
        </label>
        <button
          type="button"
          className="btn btn--primary btn--sm"
          onClick={handleAdd}
        >
          添加
        </button>
      </div>
      <ul className="doc-playground__list" aria-live="polite">
        {tasks.map((t, i) => (
          <li key={`${t}-${i}`} className="doc-playground__item">
            {t}
          </li>
        ))}
      </ul>
    </DrillBody>
  );
}

/** 练习 4：删除 + 空状态（事件委托心智） */
export function TaskDeleteDrill() {
  const [tasks, setTasks] = useState(['补充接口文档', '检查任务日志']);
  const [lastEvent, setLastEvent] = useState('尚未删除');

  function handleDelete(id: number, label: string) {
    setTasks((prev) => prev.filter((_, i) => i !== id));
    setLastEvent(`点击删除 · 「${label}」`);
  }

  const empty = tasks.length === 0;

  return (
    <DrillBody
      event={lastEvent}
      state={`tasks.length = ${tasks.length}`}
      ui={empty ? '显示空状态「暂无任务」' : `渲染 ${tasks.length} 条任务`}
    >
      {/*
        外层 onClick 模拟「事件委托」：父容器统一收 click，
        再判断是不是删除按钮（对应原生 matches('.delete-button')）。
      */}
      <div
        className="doc-playground__list"
        role="list"
        aria-label="任务列表"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const btn = target.closest<HTMLButtonElement>('[data-delete-index]');
          if (!btn) return;
          const index = Number(btn.dataset.deleteIndex);
          const label = btn.dataset.deleteLabel ?? '';
          if (Number.isNaN(index)) return;
          handleDelete(index, label);
        }}
      >
        {empty ? (
          <p className="doc-playground__empty" role="status">
            暂无任务
          </p>
        ) : (
          tasks.map((t, i) => (
            <div key={`${t}-${i}`} role="listitem" className="doc-playground__item">
              <span>{t}</span>
              <button
                type="button"
                className="btn btn--outline btn--sm"
                data-delete-index={i}
                data-delete-label={t}
              >
                删除
              </button>
            </div>
          ))
        )}
      </div>
      {empty ? (
        <div className="doc-playground__actions">
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => {
              setTasks(['补充接口文档', '检查任务日志']);
              setLastEvent('点击「重置示例」');
            }}
          >
            重置示例
          </button>
        </div>
      ) : null}
    </DrillBody>
  );
}
