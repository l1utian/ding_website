# 仓库贡献指南

## 项目结构与模块划分

这个仓库用一套 Next.js 代码生成两个静态企业官网。页面路由在 `app/`，全局和分区样式在 `app/styles/`。可复用 React 组件放在 `src/components/`。公司资料、产品目录、从 Word 提取出的页面内容放在 `src/data/`。上线用静态资源在 `public/assets/`，按站点 key 分为 `jike` 和 `alpha`。原始 Word 文档和图片归档在 `source-materials/`。构建产物输出到 `dist/jike` 和 `dist/alpha`。

## 构建、测试与本地开发命令

所有 Node 相关任务都使用 `pnpm`，项目声明的版本是 `pnpm@11.7.0`。

- `pnpm dev:jike`：以 `SITE_KEY=jike` 启动积科站点本地开发。
- `pnpm dev:alpha`：以 `SITE_KEY=alpha` 在 `3001` 端口启动阿尔法站点。
- `pnpm build:jike`：导出积科静态站点，并保存到 `dist/jike`。
- `pnpm build:alpha`：导出阿尔法静态站点，并保存到 `dist/alpha`。
- `pnpm build:all`：按顺序构建两个站点。
- `pnpm extract:word`：从 Word 源文件重新生成页面数据。
- `pnpm typecheck`：只做 TypeScript 类型检查，不输出文件。
- `pnpm test`：运行一次 Vitest 测试。

## 代码风格与命名约定

使用 TypeScript 和 React 函数组件，从 `src/` 导入代码时使用 `@/` 别名。数据处理函数要小而明确；遇到非法站点 key 应直接抛错，不要静默降级。优先使用 `const`、只读数组和不可变输入。组件文件用 PascalCase，例如 `ProductGrid.tsx`；测试文件用 `*.test.ts`。产品 slug 保持小写短横线格式，例如 `jk-100`。

## 测试规范

Vitest 在 `vitest.config.ts` 中配置为 Node 环境。测试尽量和被测代码放在同一目录，例如 `src/data/site.test.ts`。修改站点选择、产品路由、slug 生成、Word 提取文本行为时，要同步新增或更新测试。交付前运行 `pnpm test` 和 `pnpm typecheck`。

## 提交与 Pull Request 规范

现有提交信息偏短，有时使用 `feat:` 这类 conventional prefix。新提交也保持简洁、动作明确，例如 `fix: correct alpha product slug`。Pull Request 需要说明影响的是哪个站点或哪个共享模块，列出已运行命令；如果改了视觉布局、图片或 CSS，要附截图。内容更新类改动要说明是否运行过 `pnpm extract:word`。

## 安全与配置提示

`SITE_KEY` 必须显式设置，有效值只有 `jike` 和 `alpha`。不要提交 `.next*`、`node_modules/` 或本地临时服务器输出。`source-materials/` 是原始业务内容的来源，改内容时优先从这里维护。
