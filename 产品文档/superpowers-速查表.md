# Superpowers 速查表

## 这是什么

Superpowers 是一组面向 Codex 的工作流技能。它不是传统意义上的命令插件，而是一套会在合适场景下被自动触发，或者被你显式点名调用的技能集合。

常见调用方式：

- `use brainstorming`
- `use systematic-debugging`
- `use test-driven-development`
- `use writing-plans`
- `use requesting-code-review`

也可以直接用自然语言触发，例如：

- 先用 brainstorming 帮我把这个需求梳理清楚
- 用 systematic-debugging 排查这个报错
- 用 writing-plans 把这个需求拆成实施计划

## 核心规则

- `using-superpowers` 是总入口技能，理论上会在新会话启动时自动参与技能分发。
- 你可以直接说 `use <技能名>` 来强制进入某个技能流程。
- 不同技能关注的是不同阶段：设计、计划、实现、调试、评审、收尾。
- `dispatching-parallel-agents` 和 `subagent-driven-development` 依赖 `multi_agent = true`。

## 速查表

| 技能名 | 什么时候用 | 最短命令 | 说明 |
| --- | --- | --- | --- |
| `using-superpowers` | 新会话开始、希望先走技能判断流程 | `use using-superpowers` | 通常不必手动调用，主要负责总控和分发规则。 |
| `brainstorming` | 做设计、澄清需求、比较方案时 | `use brainstorming` | 先设计再实现，适合新功能、改动方案、需求梳理。 |
| `writing-plans` | 已有需求或设计稿，需要拆实施计划时 | `use writing-plans` | 适合把需求拆成可执行步骤。 |
| `executing-plans` | 已经有计划，准备按计划推进时 | `use executing-plans` | 用来执行既定计划，并带检查点。 |
| `test-driven-development` | 开发功能或修 bug，想先写测试时 | `use test-driven-development` | 强制先测试后实现。 |
| `systematic-debugging` | 遇到 bug、测试失败、异常行为时 | `use systematic-debugging` | 先定位根因，再决定修法。 |
| `verification-before-completion` | 准备宣称“完成了”之前 | `use verification-before-completion` | 要求先跑验证，再下结论。 |
| `requesting-code-review` | 功能完成后，想做结构化评审时 | `use requesting-code-review` | 适合提交前的自查和评审。 |
| `receiving-code-review` | 收到 review 意见，准备处理前 | `use receiving-code-review` | 先判断意见是否成立，再修改。 |
| `using-git-worktrees` | 开新功能，需要隔离工作区时 | `use using-git-worktrees` | 适合需要独立 worktree 的任务。 |
| `dispatching-parallel-agents` | 有 2 个及以上可并行的独立任务时 | `use dispatching-parallel-agents` | 依赖多代理能力。 |
| `subagent-driven-development` | 想让多个子代理并行实现计划时 | `use subagent-driven-development` | 依赖多代理能力。 |
| `finishing-a-development-branch` | 开发完成，准备集成、提 PR、清理分支时 | `use finishing-a-development-branch` | 用于开发收尾。 |
| `writing-skills` | 自己要写或改 Superpowers 技能时 | `use writing-skills` | 用于维护 `SKILL.md` 等技能内容。 |

## 常用场景

### 1. 新功能从零开始

建议顺序：

1. `use brainstorming`
2. `use writing-plans`
3. `use test-driven-development`
4. `use requesting-code-review`
5. `use verification-before-completion`

### 2. 修一个已有 bug

建议顺序：

1. `use systematic-debugging`
2. `use test-driven-development`
3. `use verification-before-completion`

### 3. 需求已经明确，只想拆任务

直接使用：

```text
use writing-plans
```

### 4. 有多个独立任务要并行推进

直接使用：

```text
use dispatching-parallel-agents
```

前提：Codex 配置里已开启多代理。

## 推荐提示词模板

### 设计需求

```text
use brainstorming
帮我设计一个 [功能名]，目标是 [目标]，约束是 [约束]。
```

### 拆实施计划

```text
use writing-plans
根据这个需求给我拆一个可执行计划：[粘贴需求]
```

### 调试问题

```text
use systematic-debugging
这个问题先不要急着改代码，先帮我系统排查根因：[描述现象]
```

### TDD 开发

```text
use test-driven-development
帮我用 TDD 方式实现这个需求：[粘贴需求]
```

### 收尾验证

```text
use verification-before-completion
在宣称完成前，先把这次改动完整验证一遍。
```

## 多代理开关

以下技能依赖多代理：

- `dispatching-parallel-agents`
- `subagent-driven-development`

如果要启用，在 Codex 配置中加入：

```toml
[features]
multi_agent = true
```

## 更新与排查

更新 superpowers：

```powershell
git -C "$env:USERPROFILE\.codex\superpowers" pull
```

检查技能目录：

```powershell
Get-ChildItem "$env:USERPROFILE\.agents\skills\superpowers"
```

如果技能没出现：

1. 检查 `C:\Users\Administrator\.agents\skills\superpowers` 是否存在。
2. 检查其是否指向 `C:\Users\Administrator\.codex\superpowers\skills`。
3. 重启 Codex，让启动时重新扫描技能目录。