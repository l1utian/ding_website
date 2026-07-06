# 双官网静态部署说明

本项目用同一套 Next.js 代码生成两个静态官网。

## 本地开发

安装依赖：

```bash
pnpm install
```

预览积科科技：

```bash
pnpm dev:jike
```

预览阿尔法新材料：

```bash
pnpm dev:alpha
```

## 打包

一次性打包两个网站：

```bash
pnpm build:all
```

打包后产物：

```text
dist/jike   深圳市积科科技有限公司官网
dist/alpha  阿尔法（深圳）环保新材料有限公司官网
```

## 本地静态预览

积科科技：

```bash
python -m http.server 4173 -d dist/jike
```

阿尔法新材料：

```bash
python -m http.server 4174 -d dist/alpha
```

访问：

```text
http://localhost:4173
http://localhost:4174
```

## 域名部署

正式域名还没确定，下面用占位域名举例。

```text
jike.example.com   -> 上传或绑定 dist/jike
alpha.example.com  -> 上传或绑定 dist/alpha
```

如果用宝塔、Nginx、OSS、COS、静态网站托管平台，都按同一个原则处理：每个域名绑定自己的静态目录。

## Nginx 示例

```nginx
server {
    listen 80;
    server_name jike.example.com;
    root /var/www/jike;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

server {
    listen 80;
    server_name alpha.example.com;
    root /var/www/alpha;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

把 `dist/jike` 里的文件上传到 `/var/www/jike`，把 `dist/alpha` 里的文件上传到 `/var/www/alpha`。

## 内容维护

- 原始资料归档在 `source-materials/`。
- 网站展示内容在 `src/data/`。
- 图片资源在 `public/assets/`。
- 修改 `source-materials/` 里的 Word 文件后，先运行 `pnpm extract:word` 同步页面内容。
- 修改内容后重新运行 `pnpm build:all`，再上传新的 `dist` 产物。
