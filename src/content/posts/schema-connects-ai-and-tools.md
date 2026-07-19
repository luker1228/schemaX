---
title: Schema 如何连接 AI 与工具
description: 理解 Schema 在 Tool Call 中扮演的关键角色，以及它为何是可靠执行的基石。
slug: schema-connects-ai-and-tools
status: published
publishedAt: 2026-07-19
featured: true
topics:
  - schema
  - ai-agent
---

## 从自然语言到工具调用

模型产生的内容具有不确定性，而工具接口需要确定的输入。Schema 正处在生成式能力与确定性系统之间。

```ts
// 模型自由生成的请求
'帮我查询北京天气'

// Schema 约束后的结构化输入
{
  city: '北京',
  unit: 'celsius',
}
```

> Schema 看起来很小，但它处在多个系统的关键连接处：提示词与工具、模型与 API、前端与后端、人类意图与机器执行之间。

### 为什么这件事重要

真正可靠的智能系统，不只是能生成内容，还需要把意图转换成可以理解、验证和执行的结构。

这是底座阶段的占位文章。后续会引入 MDX 组件（Callout、CodeCompare 等）来呈现更丰富的内容形态。
