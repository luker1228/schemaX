---
title: 为什么 Agent 需要 Schema
description: 从不确定的生成到确定的执行，理解 Schema 在工具调用中的不可替代性。
slug: ai-agent-intro
status: published
course: ai-agent-engineering
order: 1
durationMinutes: 12
objectives:
  - 区分自由生成与结构化输入
  - 理解 Schema 在工具调用中的位置
lessonType: lesson
---

## 这一节解决什么问题

大语言模型擅长生成自然语言，但真实系统需要可被程序解析、校验与执行的输入。

```json
{
  "tool": "get_weather",
  "input": { "city": "北京", "unit": "celsius" }
}
```

Schema 定义了这个结构的契约：字段、类型与约束。有了它，Agent 才能可靠地把意图转化为执行，而不是把不确定的文本直接塞进接口。

下一节我们会拆解一个完整的 Tool Call 流程，看看 Schema 出现在哪几个关键环节。
