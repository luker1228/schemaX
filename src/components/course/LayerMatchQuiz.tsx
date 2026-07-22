// LayerMatchQuiz —— 课程导览「骨架 / 装修 / 神经」连线练习。
// 每题点选 HTML / CSS / JS，判对错并给一句话解释。

import { useMemo, useState } from 'react';

type Layer = 'html' | 'css' | 'js';

interface Question {
  id: string;
  prompt: string;
  answer: Layer;
  why: string;
}

const LAYERS: { id: Layer; label: string; hint: string }[] = [
  { id: 'html', label: 'HTML', hint: '骨架' },
  { id: 'css', label: 'CSS', hint: '装修' },
  { id: 'js', label: 'JS', hint: '神经' },
];

const QUESTIONS: Question[] = [
  {
    id: 'missing',
    prompt: '货架上少了「茶杯」这件商品，要补上去',
    answer: 'html',
    why: '多一件货 = 多一块结构，先改骨架（HTML）。',
  },
  {
    id: 'white-cup',
    prompt: '把茶杯换成白色',
    answer: 'css',
    why: '还是那只茶杯，只改颜色外观 → 装修（CSS）。',
  },
  {
    id: 'cake-count',
    prompt: '增加蛋糕数量（从 1 块变成 3 块）',
    answer: 'js',
    why: '数量是状态在变，界面跟着刷新 → 神经（JS）。',
  },
  {
    id: 'buy-btn',
    prompt: '收银台旁新加一个「购买」按钮',
    answer: 'html',
    why: '页面上多出一个入口，属于结构变化 → HTML。',
  },
  {
    id: 'yellow-wall',
    prompt: '店面墙壁刷成黄色',
    answer: 'css',
    why: '有什么没变，长什么样变了 → CSS。',
  },
  {
    id: 'window-click',
    prompt: '点橱窗弹出不同商品详情',
    answer: 'js',
    why: '点了之后界面才变，是事件 + 状态 → JS。',
  },
];

export default function LayerMatchQuiz() {
  const [picks, setPicks] = useState<Partial<Record<string, Layer>>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = QUESTIONS.every((q) => picks[q.id]);
  const score = useMemo(() => {
    if (!submitted) return 0;
    return QUESTIONS.filter((q) => picks[q.id] === q.answer).length;
  }, [submitted, picks]);

  function pick(questionId: string, layer: Layer) {
    if (submitted) return;
    setPicks((prev) => ({ ...prev, [questionId]: layer }));
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  function handleReset() {
    setPicks({});
    setSubmitted(false);
  }

  return (
    <div className="card card--shadow-md w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="badge badge--accent">练习</span>
            <span className="font-mono text-[0.6875rem] font-bold tracking-wide uppercase">
              QUIZ
            </span>
          </div>
          <h2 className="m-0 font-display text-xl font-bold leading-tight">
            需求连线：该改哪一层？
          </h2>
          <p className="m-0 text-sm opacity-80">
            每条需求点选 HTML（骨架）/ CSS（装修）/ JS（神经）。全选完再交卷。
          </p>
        </header>

        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {QUESTIONS.map((q, i) => {
            const chosen = picks[q.id];
            const correct = submitted && chosen === q.answer;
            const wrong = submitted && chosen && chosen !== q.answer;

            return (
              <li
                key={q.id}
                className={[
                  'border border-border bg-surface p-3',
                  correct ? 'outline outline-2 outline-offset-[-2px]' : '',
                ].join(' ')}
                style={
                  correct
                    ? { outlineColor: 'var(--sx-sys-color-success)' }
                    : wrong
                      ? { outline: '2px solid var(--sx-sys-color-danger)', outlineOffset: '-2px' }
                      : undefined
                }
              >
                <div className="mb-2.5 flex items-start gap-2">
                  <span className="font-mono text-xs font-bold opacity-50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="m-0 flex-1 text-sm font-semibold leading-snug">
                    {q.prompt}
                  </p>
                </div>

                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label={`第 ${i + 1} 题选项`}
                >
                  {LAYERS.map((layer) => {
                    const active = chosen === layer.id;
                    const isAnswer = submitted && layer.id === q.answer;
                    return (
                      <button
                        key={layer.id}
                        type="button"
                        disabled={submitted}
                        aria-pressed={active}
                        onClick={() => pick(q.id, layer.id)}
                        className={[
                          'btn btn--sm',
                          active && !submitted
                            ? 'btn--secondary'
                            : active && correct
                              ? 'btn--secondary'
                              : active && wrong
                                ? 'btn--danger'
                                : isAnswer
                                  ? 'btn--primary'
                                  : 'btn--outline',
                        ].join(' ')}
                      >
                        {layer.label}
                        <span className="opacity-60"> · {layer.hint}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted ? (
                  <p
                    className="m-0 mt-2.5 text-xs leading-relaxed"
                    style={{
                      color: correct
                        ? 'var(--sx-sys-color-success)'
                        : 'var(--sx-sys-color-danger)',
                    }}
                  >
                    {correct ? '✓ ' : '✗ '}
                    {q.why}
                    {!correct ? (
                      <span className="block opacity-90">
                        正确答案：
                        {LAYERS.find((l) => l.id === q.answer)?.label} ·{' '}
                        {LAYERS.find((l) => l.id === q.answer)?.hint}
                      </span>
                    ) : null}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap items-center gap-2">
          {!submitted ? (
            <button
              type="button"
              className="btn btn--primary"
              disabled={!allAnswered}
              onClick={handleSubmit}
            >
              {allAnswered ? '交卷看结果' : `还有 ${QUESTIONS.length - Object.keys(picks).length} 题未选`}
            </button>
          ) : (
            <>
              <span className="badge badge--accent">
                {score} / {QUESTIONS.length} 对
              </span>
              <button type="button" className="btn btn--outline btn--sm" onClick={handleReset}>
                再练一次
              </button>
            </>
          )}
        </div>

        {submitted ? (
          <p className="m-0 border border-border bg-surface px-3 py-2 text-sm leading-relaxed">
            {score === QUESTIONS.length
              ? '全对。写需求时就按「骨架 / 装修 / 神经」拆，AI 才改得准。'
              : '有错很正常——记口诀：有什么→HTML，长什么样→CSS，点了会怎样→JS。'}
          </p>
        ) : null}
      </div>
    </div>
  );
}
