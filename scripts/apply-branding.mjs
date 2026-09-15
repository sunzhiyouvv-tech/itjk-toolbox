import fs from 'node:fs';
import path from 'node:path';

const appRoot = path.resolve(process.argv[2] || '.');
const overridesRoot = path.resolve(process.argv[3] || './overrides');

function file(rel) { return path.join(appRoot, rel); }
function read(rel) { return fs.readFileSync(file(rel), 'utf8'); }
function write(rel, value) { fs.writeFileSync(file(rel), value, 'utf8'); }
function mustReplace(rel, find, replacement) {
  const current = read(rel);
  const next = current.replace(find, replacement);
  if (next === current) throw new Error(`[ITJK] Patch did not match: ${rel}`);
  write(rel, next);
}
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

copyDir(overridesRoot, appRoot);

// Default language: Simplified Chinese.
mustReplace('src/plugins/i18n.plugin.ts', "locale: 'en',", "locale: 'zh',");

// PWA metadata.
mustReplace('vite.config.ts', "name: 'IT Tools',", "name: 'ITJK 极客工具箱',");
mustReplace('vite.config.ts', "description: 'Aggregated set of useful tools for developers.',", "description: 'ITJK.com 极客工具箱：开发、编码、网络、加密、数据处理等实用工具。',");
mustReplace('vite.config.ts', "lang: 'fr-FR',", "lang: 'zh-CN',");

// Keep the repository text-only and use the ITJK SVG as the PWA icon.
let vite = read('vite.config.ts');
vite = vite.replace(/icons: \[\s\S]*?\n        \],/, `icons: [
          {
            src: '/itjk-icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            purpose: 'any maskable',
          },
        ],`);
write('vite.config.ts', vite);

let zh = read('locales/zh.yml');
zh = zh.replace("subtitle: '助力开发人员和 IT 工作者'", "subtitle: '极客工具箱 · 开发者效率工具'");
zh = zh.replace("about: '关于 IT-Tools'", "about: '关于 ITJK'");
zh = zh.replace(/about:\n  content: >\n[\s\S]*?\n404:/, `about:\n  content: >\n    # 关于 ITJK\n\n    **ITJK.com 极客工具箱**是一组面向开发者、运维工程师和 IT 从业者的在线工具。核心工具尽量在浏览器本地运行，不要求注册账号，也不依赖业务后台。\n\n    本站基于开源项目 [IT-Tools](https://github.com/CorentinTh/it-tools) 修改构建。原项目由 Corentin Thomasset 和社区贡献者维护，并以 GNU GPL-3.0 许可证发布。\n\n    ## 隐私与使用\n\n    本站默认关闭统计追踪。多数转换、格式化、生成与解析操作在浏览器中完成。\n\n    ## 开源许可\n\n    本修改版本继续遵循 GNU GPL-3.0。上游源码与许可证信息可在 [IT-Tools GitHub 仓库](https://github.com/CorentinTh/it-tools) 查看。\n\n404:`);
write('locales/zh.yml', zh);

let en = read('locales/en.yml');
en = en.replace("subtitle: 'Handy tools for developers'", "subtitle: 'Developer toolbox · Fast, private, useful'");
en = en.replace("about: 'About  IT-Tools'", "about: 'About ITJK'");
en = en.replace(/about:\n  content: >\n[\s\S]*?\n404:/, `about:\n  content: >\n    # About ITJK\n\n    **ITJK.com** is a practical toolbox for developers, system engineers and people working in IT. Most tools run directly in your browser with no account and no application backend.\n\n    This site is a customized build based on the open-source [IT-Tools](https://github.com/CorentinTh/it-tools) project by Corentin Thomasset and its contributors.\n\n    ## Privacy\n\n    Analytics are disabled by default in this build.\n\n    ## Open source\n\n    This modified version remains distributed under GNU GPL-3.0.\n\n404:`);
write('locales/en.yml', en);

for (const rel of [
  'src/tools/url-parser/url-parser.vue',
  'src/tools/qr-code-generator/qr-code-generator.vue',
  'src/ui/c-markdown/c-markdown.demo.vue',
]) {
  if (fs.existsSync(file(rel))) {
    const current = read(rel);
    write(rel, current.replaceAll('https://it-tools.tech', 'https://t.itjk.com').replaceAll('it-tools.tech', 't.itjk.com'));
  }
}

if (fs.existsSync(file('src/modules/command-palette/command-palette.store.ts'))) {
  let cp = read('src/modules/command-palette/command-palette.store.ts');
  cp = cp.replace("name: 'Github repository'", "name: 'IT-Tools upstream source'");
  cp = cp.replace("description: 'View the source code of it-tools on Github.'", "description: 'View the upstream open-source project used by ITJK.'");
  write('src/modules/command-palette/command-palette.store.ts', cp);
}

console.log('[ITJK] Branding patch applied successfully.');
