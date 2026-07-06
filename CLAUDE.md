# CLAUDE.md

本文件为 AI 编码助手提供项目上下文，在对话开始时自动加载。

## 项目概览

一套 Next.js 16 代码库，通过环境变量 `SITE_KEY` 生成两个独立的静态企业官网：

- **积科 (jike)** — 默认站点，端口 3000
- **阿尔法 (alpha)** — 第二站点，端口 3001

技术栈：Next.js 16 + React 19 + TypeScript 6，静态导出 (`output: 'export'`)，无服务端运行时。

## 目录结构

```
app/                  → 页面路由与布局
  styles/             → 全局和分区 CSS（base / header / cards / sections / responsive）
  products/[slug]/    → 产品详情动态路由
src/
  components/         → 可复用 React 组件（PascalCase 命名）
  data/               → 站点配置、产品目录、类型定义、测试
    sites.ts          → 站点选择入口，根据 SITE_KEY 分发
    jike.ts / alpha.ts → 各站点专属数据
    types.ts          → 共享 TypeScript 类型
public/assets/
  jike/               → 积科站点静态资源
  alpha/              → 阿尔法站点静态资源
scripts/              → 构建辅助脚本（save-out.mjs、extract-word-documents.py）
source-materials/     → 原始 Word 文档和图片归档（内容变更的源头）
dist/                 → 构建产物输出（jike/ 和 alpha/）
```

## 常用命令

包管理器为 **pnpm**（版本 11.7.0），所有命令通过 pnpm 执行：

| 命令 | 说明 |
|---|---|
| `pnpm dev:jike` | 启动积科站点本地开发 |
| `pnpm dev:alpha` | 启动阿尔法站点本地开发（端口 3001） |
| `pnpm build:jike` | 构建积科静态站点 → `dist/jike` |
| `pnpm build:alpha` | 构建阿尔法静态站点 → `dist/alpha` |
| `pnpm build:all` | 按顺序构建两个站点 |
| `pnpm extract:word` | 从 Word 源文件重新生成页面数据 |
| `pnpm typecheck` | TypeScript 类型检查（不输出文件） |
| `pnpm test` | 运行 Vitest 测试（单次） |

**交付前必须通过：** `pnpm test && pnpm typecheck`

## 架构要点

- `SITE_KEY` 环境变量控制一切站点差异，有效值仅 `jike` 和 `alpha`，缺失或非法值直接抛错
- `next.config.ts` 根据 `SITE_KEY` 分配不同的 `distDir`（`.next-jike` / `.next-alpha`）
- 图片未经 Next.js 优化（`images.unoptimized: true`），直接引用 `public/assets/` 下的静态文件
- 路由使用 `trailingSlash: true`
- `@/` 路径别名映射到 `./src/`

## 代码风格

- TypeScript 严格模式，React 函数组件
- 导入使用 `@/` 别名（如 `@/data/sites`、`@/components/Hero`）
- 组件文件 PascalCase（`ProductGrid.tsx`），测试文件 `*.test.ts`
- 产品 slug 小写短横线（如 `jk-100`）
- 优先 `const`、只读数组、不可变输入
- 遇到非法输入直接抛错，不静默降级
- 不要添加纯叙述性注释，注释仅用于解释非显而易见的意图或约束

## 测试

- Vitest，Node 环境，配置在 `vitest.config.ts`
- 测试文件与被测代码同目录（如 `src/data/site.test.ts`）
- 修改站点选择、产品路由、slug 生成、Word 提取逻辑时必须同步更新测试

## 提交规范

- 简洁的 conventional commit 格式（如 `fix: correct alpha product slug`）
- PR 说明需标注影响的站点或共享模块
- 视觉变更附截图，内容变更说明是否执行过 `pnpm extract:word`

## 技能触发规则

当用户对话中出现以下关键词时，**必须**先读取并遵循 `.agents/.skills/redesign-skill/SKILL.md` 中的指引，再开始执行任务：

- 重构、重新设计、redesign、refactor
- UI、界面优化、视觉升级、样式调整
- 美化、改版、重做页面、页面优化

该技能提供了完整的设计审计清单和升级技术，适用于排版、配色、布局、交互状态、组件模式等方面的改进。执行时遵循技能中定义的优先级顺序（字体 → 配色 → 交互 → 布局 → 组件 → 状态 → 排版微调），在现有技术栈上渐进改进，不做整体重写。

## 不要提交的内容

- `.next*/`、`node_modules/`、`dist/`、`out/`
- `.env*.local` 或任何包含密钥的文件
- 本地临时服务器输出
