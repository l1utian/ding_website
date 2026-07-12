# Alpha Products Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 F-37 和苯甲酸锌接入阿尔法产品列表及静态详情页。

**Architecture:** Word 文件保存在 `source-materials`，提取脚本将正文生成到只读 TypeScript 数据中；`alpha.ts` 维护产品卡片元数据并引用生成的详情文档。现有动态产品路由会根据 slug 自动生成两个新静态页面。

**Tech Stack:** Next.js 16、React 19、TypeScript 6、Python 标准库、Vitest

---

### Task 1: 锁定新产品行为

**Files:**
- Modify: `src/data/site.test.ts`

**Step 1: Write the failing tests**

将阿尔法产品数量期望改为 9，并断言 `f-37`、`zinc-benzoate` 存在且 Word 详情包含关键原文。

**Step 2: Run test to verify it fails**

Run: `pnpm test src/data/site.test.ts`

Expected: FAIL，因为两个产品尚未加入目录。

### Task 2: 接入 Word 内容

**Files:**
- Create: `source-materials/alpha/产品列表/F-37 高效复合离型润滑脱模助剂TDS.docx`
- Create: `source-materials/alpha/产品列表/苯甲酸锌说明书.docx`
- Modify: `scripts/extract-word-documents.py`
- Generate: `src/data/generated-documents.ts`

**Step 1: Copy source documents**

将用户提供的两份 Word 复制到正式资料目录。

**Step 2: Register document sources**

新增 `alphaF37` 和 `alphaZincBenzoate` 两个明确映射，找不到文件时让提取命令直接失败。

**Step 3: Regenerate document data**

Run: `pnpm extract:word`

Expected: 生成数据包含两个新文档键及完整段落、表格。

### Task 3: 新增产品卡片数据

**Files:**
- Modify: `src/data/alpha.ts`

**Step 1: Add F-37**

使用 slug `f-37`，补充摘要、核心特点、理化指标、适用领域和包装信息，并引用 `wordDocuments.alphaF37`。

**Step 2: Add zinc benzoate**

使用 slug `zinc-benzoate`，补充摘要、核心特点、质量指标、主要用途和包装信息，并引用 `wordDocuments.alphaZincBenzoate`。

**Step 3: Run focused test**

Run: `pnpm test src/data/site.test.ts`

Expected: PASS

### Task 4: 完整验证

**Files:**
- Verify: `dist/alpha`

**Step 1: Run all checks**

Run: `pnpm test`

Run: `pnpm typecheck`

Run: `pnpm build:alpha`

Expected: 所有命令成功，构建输出包含 `/products/f-37/` 和 `/products/zinc-benzoate/`。

**Step 2: Commit**

用户明确要求提交时，再提交本次 Word、代码、测试和计划文件。
