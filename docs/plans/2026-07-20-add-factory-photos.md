# Add Factory Photos Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Append `14.png` and `15.png` to the shared factory gallery used by both websites and both locales.

**Architecture:** Keep the existing shared data source in `src/data/factory-images.ts`. Extend its immutable array with two landscape images using the existing `cover` mode; all four site variants consume this array automatically.

**Tech Stack:** TypeScript, React, Next.js, Vitest, pnpm

---

### Task 1: Extend the shared factory image list

**Files:**
- Modify: `src/data/site.test.ts:13`
- Modify: `src/data/factory-images.ts:3`
- Verify: `public/assets/shared/factory/14.png`
- Verify: `public/assets/shared/factory/15.png`

**Step 1: Write the failing test**

Append these expected entries to `SHARED_FACTORY_IMAGES` in `src/data/site.test.ts`:

```ts
{ src: '/assets/shared/factory/14.png', fit: 'cover' },
{ src: '/assets/shared/factory/15.png', fit: 'cover' },
```

The existing test already checks that every site variant gets the exact shared list and that each file exists.

**Step 2: Run the focused test to verify it fails**

Run: `pnpm test src/data/site.test.ts`

Expected: FAIL in `uses the updated shared factory images in both site builds` because the production list still has four images.

**Step 3: Write the minimal implementation**

Append the same two entries to `sharedFactoryImages` in `src/data/factory-images.ts`, after `13.png`.

**Step 4: Run the focused test to verify it passes**

Run: `pnpm test src/data/site.test.ts`

Expected: PASS.

**Step 5: Run full verification**

Run:

```bash
pnpm test
pnpm typecheck
pnpm build:jike
pnpm build:alpha
```

Expected: all commands exit successfully; both exported sites include `14.png` and `15.png`.

**Step 6: Review the final diff**

Run: `git diff -- src/data/site.test.ts src/data/factory-images.ts`

Expected: only the two new entries appear in each file.
