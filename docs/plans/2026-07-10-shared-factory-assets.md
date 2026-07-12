# Shared Factory Assets Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 让积科和阿尔法共用用户更新后的工厂图片，并统一阿尔法的新 slogan。

**Architecture:** 将共享图片放在 `public/assets/shared/factory/`，两份站点数据引用同一组公开路径。Next.js 静态导出会将共享资源写入每份独立产物。

**Tech Stack:** Next.js 16、React 19、TypeScript 6、Vitest

---

### Task 1: 锁定站点内容要求

**Files:**
- Modify: `src/data/site.test.ts`

**Step 1: Write the failing test**

新增测试，断言两个站点都引用 5 张共享图片、图片文件存在，并断言阿尔法的新 slogan 与介绍文案一致。

**Step 2: Run test to verify it fails**

Run: `pnpm test src/data/site.test.ts`

Expected: FAIL，因为站点仍引用旧的分站 JPG 路径和旧 slogan。

### Task 2: 更新资源和站点数据

**Files:**
- Move: `public/assets/jike/factory/*` to `public/assets/shared/factory/*`
- Modify: `src/data/jike.ts`
- Modify: `src/data/alpha.ts`

**Step 1: Move the adjusted images**

将 4 张 PNG 和 1 张 JPG 移入共享目录，不复制重复文件。

**Step 2: Write minimal implementation**

将两站 `factoryImages` 更新为共享路径；将阿尔法 slogan 和介绍中的经营理念更新为“卓越品质”。

**Step 3: Run test to verify it passes**

Run: `pnpm test src/data/site.test.ts`

Expected: PASS

### Task 3: 完整验证

**Files:**
- Verify: `dist/jike`
- Verify: `dist/alpha`

**Step 1: Run all checks**

Run: `pnpm test`

Run: `pnpm typecheck`

Run: `pnpm build:all`

Expected: 所有命令成功，两份产物均包含 `assets/shared/factory/` 下的 5 张图片。

**Step 2: Commit**

用户明确要求提交时，再提交本次代码、图片和文档改动。
