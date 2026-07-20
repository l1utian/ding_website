# 证书自动续期一键部署设计

## 目标

新增一个与现有部署脚本风格一致的本地 Bash 脚本，把项目根目录的
`cert-apply-server-linux-x64.tar.gz` 部署到生产服务器，并使用 root crontab
每周检查证书是否需要续期。

## 部署流程

1. 本地检查压缩包、`bash`、`ssh` 和 `scp`。
2. 上传压缩包和仓库内独立的远程安装辅助脚本。
3. 远程确认以 root 运行、CPU 为 x86_64、Nginx 和 crontab 可用。
4. 在临时目录解压并校验启动脚本、内置 Node 和核心代码。
5. 旧 `/opt/cert-apply` 改名为带时间戳的备份，再安装新版本。
6. 已有部署保留 `config.json` 和 ACME 账户密钥；首次部署在远程终端交互生成配置。
7. 安装 `/opt/cert-apply/run-renew.sh`，让续期成功后先执行 `nginx -t`，
   通过后才 reload Nginx。
8. 立即执行一次非强制检查。当前证书有效期充足时不会重新申请。
9. 以带标记的区块写入 root crontab，每周一凌晨 3 点运行，日志追加到
   `/var/log/cert-apply.log`。重复部署会替换该区块，不会产生重复任务。

## 安全与失败处理

- DNSPod 密钥只在服务器终端录入，并保存在权限为 `600` 的 `config.json`。
- 不通过命令行参数、项目文件或本地临时文件传递 DNSPod 密钥。
- 部署前保留旧程序目录和 root crontab 备份。
- 不使用 `--force`，避免对现有新证书重复签发。
- 不自动安装缺失的软件；缺少 Nginx、crontab 或必要命令时明确失败。
- 证书程序、`nginx -t`、Nginx reload 或 HTTPS 验证任一步失败，脚本返回失败。

## 验证

- Vitest 检查脚本存在、Bash 语法、上传路径、备份、权限、cron 幂等标记、
  每周计划、日志、Nginx 校验以及未使用 `--force`。
- 交付前运行 `pnpm test`、`pnpm typecheck` 和 `bash -n`。
