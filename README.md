# ITJK.com 极客工具箱

这是为 **t.itjk.com** 定制的开发者工具箱部署包，底座使用高人气开源项目 **CorentinTh/it-tools**，构建时固定到上游 commit：

`d505845f918e946ec300af7b36efc107e2f66e9e`

本包不是一个只有十来个功能的简化工具页，而是保留 IT-Tools 的完整成熟工具体系，并在构建时自动应用 ITJK 品牌层。

## 已做的 ITJK 定制

- 默认语言改为简体中文
- 首页加入 ITJK.COM / 极客工具箱品牌 Hero
- 标题、SEO、OpenGraph、PWA 名称改为 ITJK
- 二维码、URL 示例域名改为 t.itjk.com
- 删除首页赞助/社交宣传位与顶部 Buy me a coffee
- 保留搜索、收藏、分类、深色模式、语言切换以及原有工具
- 默认关闭统计追踪
- 新增 ITJK favicon、PWA 图标和分享 Banner
- Footer 明确保留 IT-Tools 上游来源和 GPL-3.0 信息

## 最省事部署：Docker

服务器安装 Docker 后，在本目录执行：

```bash
docker compose up -d --build
```

默认访问：`http://服务器IP:8080`

如果你用宝塔 / 1Panel / Nginx，只需要把域名 `t.itjk.com` 反向代理到 `127.0.0.1:8080`。

## Vercel

把本目录上传到一个 Git 仓库，然后导入 Vercel。仓库里已经包含 `vercel.json`：

- Build Command：`sh scripts/build.sh`
- Output Directory：`dist`

Vercel 构建环境会自动下载固定版本上游源码、应用 ITJK 修改并生成静态站点。

## Cloudflare Pages

创建 Pages 项目并设置：

- Build command：`sh scripts/build.sh`
- Build output directory：`dist`
- Node.js：18 或更高

然后绑定自定义域名 `t.itjk.com`。

## Netlify

直接导入仓库即可，`netlify.toml` 已包含构建命令与 SPA fallback。

## 本地构建

Linux / macOS / WSL：

```bash
sh scripts/build.sh
```

完成后静态文件位于 `dist/`。可使用任意静态 Web Server 部署。

## 为什么构建时下载上游源码？

这样有三个好处：

1. ZIP 很小，不重复打包整个上游仓库；
2. 固定 commit，构建结果可追溯；
3. ITJK 的修改集中在 `overrides/` 与 `scripts/apply-branding.mjs`，以后升级上游更容易。

如果以后想升级上游，只改 `UPSTREAM_SHA` 前，建议先测试 patch 是否仍能匹配。

## 开源许可

IT-Tools 使用 GNU GPL-3.0。本修改版本继续遵循 GPL-3.0。请保留 `LICENSE`、`NOTICE.md`、构建脚本以及上游来源信息。
