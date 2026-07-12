# Portrait Factory Images Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让两张竖版工厂图片在固定横向画廊中完整清晰显示，同时保持横图现有效果。

**Architecture:** 共享工厂图片从字符串数组升级为带 `src` 和 `fit` 的只读数据，由两个站点共同引用。画廊根据 `fit` 渲染横图铺满模式或竖图完整模式，CSS 负责竖图背景填充和稳定布局。

**Tech Stack:** Next.js 16、React 19、TypeScript 6、CSS、Vitest

---

### Task 1: 锁定图片展示元数据

**Files:**
- Modify: `src/data/site.test.ts`

**Step 1: Write the failing test**

将期望图片更新为 `{ src, fit }`，断言两站共用 5 张图片，`12.png` 和 `13.png` 使用 `contain`，其他图片使用 `cover`。

**Step 2: Run test to verify it fails**

Run: `pnpm test src/data/site.test.ts`

Expected: FAIL，因为当前数据仍是字符串数组。

### Task 2: 建立共享图片数据

**Files:**
- Create: `src/data/factory-images.ts`
- Modify: `src/data/types.ts`
- Modify: `src/data/jike.ts`
- Modify: `src/data/alpha.ts`

**Step 1: Add the data contract**

新增只读 `FactoryImage` 类型，字段为 `src` 和 `fit: 'cover' | 'contain'`。

**Step 2: Add shared metadata**

创建唯一共享数组，横图标记为 `cover`，两张竖图标记为 `contain`。

**Step 3: Reuse the shared array**

积科和阿尔法直接引用共享数组，删除两份重复路径列表。

**Step 4: Run focused test**

Run: `pnpm test src/data/site.test.ts`

Expected: PASS

### Task 3: 调整画廊渲染

**Files:**
- Modify: `src/components/FactoryGallery.tsx`
- Modify: `app/styles/cards.css`

**Step 1: Render by fit mode**

横图保持单层主图；竖图增加装饰背景层，并为主图和缩略图添加对应模式类名。

**Step 2: Style portrait slides**

竖图主图使用 `contain`，背景层使用弱化的 `cover`，关闭竖图放大动画并提高画廊控件层级。

**Step 3: Verify React and behavior**

Run: `pnpm exec react-doctor . --verbose`

Run: `pnpm test`

Run: `pnpm typecheck`

Expected: 所有检查通过。

### Task 4: 构建与视觉验证

**Files:**
- Verify: `dist/jike`
- Verify: `dist/alpha`

**Step 1: Build both sites**

Run: `pnpm build:all`

Expected: 两个站点构建成功。

**Step 2: Check desktop and mobile**

启动阿尔法站点，将画廊切换到第 3、4 张，检查桌面和手机截图。

Expected: 两张竖图完整显示，前景清晰，横图效果不变，箭头、计数器和缩略图不重叠。

**Step 3: Commit**

用户明确要求提交时，再提交本次代码、测试和计划文件。
