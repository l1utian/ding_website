# 双官网静态部署说明

本项目用一套 Next.js 代码生成两个静态官网。

- 积科官网：`jike.tech.gd.cn`
- 阿尔法官网：`alpha.tech.gd.cn`
- 服务器 IP：`106.55.178.107`
- 服务器系统：Ubuntu
- SSH 端口：`22`
- SSH 用户：`ubuntu`

不要把服务器密码、私钥、云账号令牌写进文档或源码。

## 1. 部署结论

现在只保留两个部署脚本：

```bash
bash scripts/deploy-test.sh
bash scripts/deploy-production.sh
```

备案前用测试部署：

```text
http://106.55.178.107:8080  积科测试站
http://106.55.178.107:8081  阿尔法测试站
```

备案成功并解析域名后，用生产部署：

```text
http://jike.tech.gd.cn
http://alpha.tech.gd.cn
```

两个脚本都会先问你是不是首次部署，默认不是。

- 默认不是首次：只替换静态文件，不改 Nginx。
- 选择首次：会写对应 Nginx 配置，检查配置并 reload Nginx。

静态文件不会备份。每次部署都会用新构建产物替换服务器上的旧静态目录。

## 2. 本地构建

安装依赖：

```bash
pnpm install
```

构建两个网站：

```bash
pnpm build:all
```

构建产物：

```text
dist/jike   积科官网静态文件
dist/alpha  阿尔法官网静态文件
```

本地预览：

```bash
python -m http.server 4173 -d dist/jike
python -m http.server 4174 -d dist/alpha
```

访问：

```text
http://localhost:4173
http://localhost:4174
```

## 3. 服务器目录

部署目录固定为：

```text
/var/www/ding_website/jike
/var/www/ding_website/alpha
```

Nginx 根据不同阶段读取这两个目录。

## 4. 连接服务器

脚本默认使用：

```text
SERVER_HOST=106.55.178.107
SSH_USER=ubuntu
SSH_PORT=22
```

如果本机已经配置 SSH key，脚本会直接登录。

如果没有配置 SSH key，`ssh` 和 `scp` 会提示输入服务器密码。

如果本机装了 `sshpass`，也可以用环境变量传密码，避免多次输入：

```bash
SSH_PASSWORD='你的服务器密码' bash scripts/deploy-test.sh
```

PowerShell 里可以这样写：

```powershell
$env:SSH_PASSWORD='你的服务器密码'
bash scripts/deploy-test.sh
```

## 5. 备案前：部署测试环境

执行：

```bash
bash scripts/deploy-test.sh
```

脚本会询问：

```text
是否首次部署测试环境？首次会写入 8080/8081 Nginx 配置，默认 no [y/N]:
```

第一次部署测试环境时，输入 `y`。

首次部署会做这些事：

- 本地安装依赖并构建两个站点。
- 上传静态文件到服务器。
- 替换 `/var/www/ding_website/jike` 和 `/var/www/ding_website/alpha`。
- 如服务器没有 Nginx，会安装 Nginx。
- 写入 `/etc/nginx/conf.d/ding_website_test.conf`。
- 让积科监听 `8080`。
- 让阿尔法监听 `8081`。
- 执行 `nginx -t`。
- reload Nginx。

后续再次部署测试环境时，直接回车即可。脚本只会替换静态文件，不会改 Nginx。

测试访问：

```text
http://106.55.178.107:8080
http://106.55.178.107:8081
```

如果打不开，优先检查云服务器安全组是否放行 TCP `8080` 和 `8081`。

## 6. 备案后：部署生产环境

备案成功，并且 DNS 已经解析到服务器后：

```text
jike.tech.gd.cn   A  106.55.178.107
alpha.tech.gd.cn  A  106.55.178.107
```

执行：

```bash
bash scripts/deploy-production.sh
```

脚本会询问：

```text
是否首次部署生产环境？首次会写入正式域名 Nginx 配置，默认 no [y/N]:
```

第一次切到正式域名时，输入 `y`。

首次生产部署会做这些事：

- 本地安装依赖并构建两个站点。
- 上传静态文件到服务器。
- 替换 `/var/www/ding_website/jike` 和 `/var/www/ding_website/alpha`。
- 如服务器没有 Nginx，会安装 Nginx。
- 如果测试配置还存在，会把 `/etc/nginx/conf.d/ding_website_test.conf` 改名备份。
- 写入 `/etc/nginx/conf.d/ding_website.conf`。
- 让 `jike.tech.gd.cn` 监听 `80`。
- 让 `alpha.tech.gd.cn` 监听 `80`。
- 执行 `nginx -t`。
- reload Nginx。

后续再次部署生产环境时，直接回车即可。脚本只会替换静态文件，不会改 Nginx。

正式访问：

```text
http://jike.tech.gd.cn
http://alpha.tech.gd.cn
```

正式上线后，如果不再需要测试端口，可以在云安全组关闭 `8080` 和 `8081`，只保留 `80` 和 `443`。

## 7. HTTPS

### 使用本地测试证书

先在腾讯云安全组放行入站 TCP `443`，并把以下文件放在本地项目目录：

```text
certs/tech.gd.cn.crt
certs/tech.gd.cn.key
```

然后使用 Git Bash 执行：

```bash
bash scripts/enable-test-https.sh
```

脚本会检查并上传证书、校验证书与私钥、备份 Nginx 配置、启用 HTTPS、将 HTTP `301` 跳转到 HTTPS，并验证两个网站。配置或 reload 失败时会恢复修改前的 Nginx 配置并返回失败。

测试证书不受浏览器信任，浏览器显示安全警告属于预期结果。脚本不会启用 HSTS。

启用 HTTPS 后，后续继续运行 `bash scripts/deploy-production.sh` 时，首次部署问题必须直接回车或输入 `n`。输入 `y` 会让现有生产部署脚本重新生成纯 HTTP 配置。

如使用不同服务器或 SSH 参数：

```bash
SERVER_HOST='服务器地址' SSH_USER='用户名' SSH_PORT='端口' bash scripts/enable-test-https.sh
```

正式域名可以访问后，再配置 HTTPS：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d jike.tech.gd.cn -d alpha.tech.gd.cn
sudo certbot renew --dry-run
```

之后访问：

```text
https://jike.tech.gd.cn
https://alpha.tech.gd.cn
```

配置 HTTPS 后，后续继续使用：

```bash
bash scripts/deploy-production.sh
```

后续部署默认只换静态文件，不会改 HTTPS 或 Nginx。

## 8. 内容更新

普通内容更新：

```bash
bash scripts/deploy-test.sh
```

或正式环境：

```bash
bash scripts/deploy-production.sh
```

如果修改的是 Word 原始资料，先运行：

```bash
pnpm extract:word
```

然后再按当前阶段选择测试部署或生产部署。

## 9. 常用排查命令

在服务器上检查 Nginx：

```bash
sudo nginx -t
sudo systemctl status nginx
sudo systemctl reload nginx
```

查看日志：

```bash
sudo tail -n 100 /var/log/nginx/access.log
sudo tail -n 100 /var/log/nginx/error.log
```

检查测试站：

```bash
curl -I http://127.0.0.1:8080
curl -I http://127.0.0.1:8081
```

检查正式站：

```bash
curl -I http://jike.tech.gd.cn
curl -I http://alpha.tech.gd.cn
```
