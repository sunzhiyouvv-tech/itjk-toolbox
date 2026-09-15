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
- 新增 ITJK SVG favicon / PWA 图标
- Footer 明确保留 IT-Tools 上游来源和 GPL-3.0 信息

## Vercel

把本目录导入 Vercel。仓库里已经包含 `vercel.json`：

- Build Command：`sh scripts/build.sh`
- Output Directory：`dist`

Vercel 构建环境会自动下载固定版本上游源码、应用 ITJK 修改并生成静态站点。

生产域名：`t.itjk.com`

## 本地构建

Linux / macOS / WSL：

```bash
sh scripts/build.sh
```

完成后静态文件位于 `dist/`。

## 为什么构建时下载上游源码？

这样有三个好处：

1. 仓库很小，不重复提交整个上游项目；
2. 固定 commit，构建结果可追溯；
3. ITJK 的修改集中在 `overrides/` 与 `scripts/apply-branding.mjs`，以后升级上游更容易。

## 开源许可

IT-Tools 使用 GNU GPL-3.0。本修改版本继续遵循 GPL-3.0。请保留 `NOTICE.md`、构建脚本以及上游来源信息。
