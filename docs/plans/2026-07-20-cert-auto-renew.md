# Certificate Auto-Renew Deployment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add one local command that safely installs the bundled certificate renewal tool and an idempotent weekly root crontab entry on the production server.

**Architecture:** Follow the existing local-controller/remote-script pattern. The local script validates and uploads artifacts; a separate remote helper performs a staged install, preserves secrets, creates a validation wrapper, runs one check, and updates only its marked crontab block.

**Tech Stack:** Bash, OpenSSH/SCP, cron, Nginx, bundled Node.js, Vitest.

---

### Task 1: Define the deployment contract in tests

**Files:**
- Create: `scripts/deploy-cert-auto-renew.test.ts`

1. Add tests for file existence and Bash syntax.
2. Add tests for local archive validation and existing SSH helper conventions.
3. Add tests for staged installation, backup, secret permissions and config preservation.
4. Add tests for the renewal wrapper, weekly cron schedule, logs and idempotent markers.
5. Add a regression assertion that the deployment does not use `--force`.
6. Run `pnpm test scripts/deploy-cert-auto-renew.test.ts` and confirm it fails because the script is missing.

### Task 2: Implement the one-click deployment script

**Files:**
- Create: `scripts/deploy-cert-auto-renew.sh`
- Create: `scripts/deploy-cert-auto-renew-remote.sh`

1. Add local constants, logging, command checks, SSH password support and cleanup.
2. Add and upload a strict remote Bash helper.
3. Validate the remote architecture, dependencies and archive contents.
4. Stage the package, preserve existing configuration and back up the old install.
5. Interactively create a mode-600 JSON config using the bundled Node runtime.
6. Clear the package's direct post-renew hook and install a wrapper that validates Nginx before reload.
7. Run one non-forced check, update the marked root crontab block and verify HTTPS.
8. Run the focused test and `bash -n` until both pass.

### Task 3: Document and verify the command

**Files:**
- Modify: `DEPLOYMENT.md`

1. Document `bash scripts/deploy-cert-auto-renew.sh`, its prompts, schedule and log path.
2. Document environment-variable overrides and the rule that the package must stay outside Git.
3. Run `pnpm test` and confirm all tests pass.
4. Run `pnpm typecheck` and confirm TypeScript succeeds.
5. Run `git diff --check` and inspect the final diff for unrelated changes.
