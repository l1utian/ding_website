# Test HTTPS Setup Script Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add one Bash script that safely installs the local wildcard test certificate, configures HTTP-to-HTTPS redirects for both sites, and verifies the result.

**Architecture:** The local script follows the SSH/SCP helpers already used by `deploy-production.sh`, uploads fixed certificate files plus a generated remote script, and runs the remote script with sudo. The remote script validates prerequisites and certificate identity, backs up Nginx, applies the configuration, rolls back on validation or reload failure, and exits nonzero on every failure.

**Tech Stack:** Bash, SSH/SCP, OpenSSL, Nginx, systemd, curl, Vitest

---

### Task 1: Define the script contract with a failing test

**Files:**
- Create: `scripts/enable-test-https.test.ts`
- Create: `scripts/enable-test-https.sh`

**Step 1: Write the failing test**

Create a Vitest test that checks:

- `scripts/enable-test-https.sh` exists.
- `bash -n scripts/enable-test-https.sh` succeeds.
- The script references both local certificate files and both domains.
- The generated Nginx configuration returns `301` to HTTPS, listens on `443 ssl`, and uses the expected certificate paths.
- The script runs certificate/key validation, creates a timestamped backup, tests Nginx, reloads Nginx, verifies with `curl -k`, and contains explicit rollback logic.

**Step 2: Run the test to verify it fails**

Run: `pnpm test scripts/enable-test-https.test.ts`

Expected: FAIL because `scripts/enable-test-https.sh` does not exist.

**Step 3: Implement the local and remote workflow**

Create `scripts/enable-test-https.sh` with:

- The existing `SERVER_HOST`, `SSH_USER`, `SSH_PORT`, and optional `SSH_PASSWORD` conventions.
- Local command and certificate-file checks.
- SCP uploads to fixed `/tmp/ding_website_test_https_*` paths.
- Remote root/prerequisite/site/config checks.
- OpenSSL expiry, wildcard SAN, and public-key match checks.
- Certificate installation under `/etc/nginx/ssl/tech.gd.cn` with key mode `600`.
- One port-80 redirect server and two port-443 content servers.
- Timestamped backup, `nginx -t`, reload, rollback on either failure, and HTTPS verification.

**Step 4: Run the focused test to verify it passes**

Run: `pnpm test scripts/enable-test-https.test.ts`

Expected: PASS.

### Task 2: Protect local certificate material

**Files:**
- Modify: `.gitignore`

**Step 1: Add the certificate directory ignore rule**

Append `/certs/` so the private key cannot be staged accidentally.

**Step 2: Verify Git ignores the key**

Run: `git check-ignore -v certs/tech.gd.cn.key`

Expected: output points to the `/certs/` rule in `.gitignore`.

### Task 3: Document execution and verify the repository

**Files:**
- Modify: `DEPLOYMENT.md`

**Step 1: Document the one-time command and operational boundary**

Document `bash scripts/enable-test-https.sh`, TCP 443 as a prerequisite, the expected staging-certificate warning, and the rule to answer `n` on later production deployments.

**Step 2: Run fresh verification**

Run:

```bash
bash -n scripts/enable-test-https.sh
pnpm test
pnpm typecheck
git diff --check
git diff -- scripts/deploy-production.sh
```

Expected: syntax succeeds, all tests and type checking pass, the diff has no whitespace errors, and `deploy-production.sh` has no diff.
