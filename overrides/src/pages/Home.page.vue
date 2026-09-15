<script setup lang="ts">
import { IconDragDrop } from '@tabler/icons-vue';
import { useHead } from '@vueuse/head';
import { computed } from 'vue';
import Draggable from 'vuedraggable';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';

const toolStore = useToolStore();
const { t } = useI18n();
useHead({
  title: 'ITJK 极客工具箱 - 开发者在线工具集合',
  meta: [
    { name: 'description', content: 'ITJK.com 极客工具箱：JSON、编码转换、加密、网络、文本、数据、开发与运维常用在线工具。' },
  ],
});
const favoriteTools = computed(() => toolStore.favoriteTools);
function onUpdateFavoriteTools() { toolStore.updateFavoriteTools(favoriteTools.value); }
</script>

<template>
  <div class="pt-24px md:pt-40px">
    <section class="itjk-hero">
      <div class="eyebrow">ITJK.COM · DEVELOPER TOOLBOX</div>
      <h1>极客工具箱</h1>
      <p>开发 · 编码 · 网络 · 加密 · 数据处理</p>
      <div class="chips">
        <span>无需注册</span><span>浏览器优先</span><span>开源构建</span><span>深浅主题</span>
      </div>
    </section>

    <div class="grid-wrapper">
      <transition name="height">
        <div v-if="toolStore.favoriteTools.length > 0">
          <h3 class="mb-5px mt-25px text-neutral-400 font-500">
            {{ $t('home.categories.favoriteTools') }}
            <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')"><n-icon :component="IconDragDrop" size="18" /></c-tooltip>
          </h3>
          <Draggable :list="favoriteTools" class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4" ghost-class="ghost-favorites-draggable" item-key="name" @end="onUpdateFavoriteTools">
            <template #item="{ element: tool }"><ToolCard :tool="tool" /></template>
          </Draggable>
        </div>
      </transition>

      <div v-if="toolStore.newTools.length > 0">
        <h3 class="mb-5px mt-25px text-neutral-400 font-500">{{ t('home.categories.newestTools') }}</h3>
        <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
        </div>
      </div>

      <h3 class="mb-5px mt-25px text-neutral-400 font-500">{{ $t('home.categories.allTools') }}</h3>
      <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in toolStore.tools" :key="tool.name" :tool="tool" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.itjk-hero { position:relative; overflow:hidden; padding:34px 32px; margin:0 auto 28px; max-width:1180px; border:1px solid rgba(24,160,88,.25); border-radius:18px; background:linear-gradient(135deg,rgba(24,160,88,.12),rgba(20,80,120,.06)); }
.itjk-hero::after { content:'ITJK'; position:absolute; right:24px; top:-18px; font-size:118px; font-weight:900; letter-spacing:-.06em; opacity:.035; pointer-events:none; }
.eyebrow { font-size:12px; font-weight:700; letter-spacing:.17em; color:#18a058; }
h1 { margin:7px 0 4px; font-size:clamp(34px,6vw,58px); line-height:1.05; letter-spacing:-.04em; }
.itjk-hero p { margin:0; opacity:.68; font-size:15px; }
.chips { display:flex; flex-wrap:wrap; gap:8px; margin-top:18px; }
.chips span { border:1px solid rgba(127,127,127,.22); border-radius:999px; padding:5px 10px; font-size:12px; opacity:.76; }
.height-enter-active,.height-leave-active { transition:all .5s ease-in-out; overflow:hidden; max-height:500px; }
.height-enter-from,.height-leave-to { max-height:42px; overflow:hidden; opacity:0; margin-bottom:0; }
.ghost-favorites-draggable { opacity:.4; background-color:#ccc; border:2px dashed #666; box-shadow:0 0 10px rgba(0,0,0,.2); transform:scale(1.1); animation:ghost-favorites-draggable-animation .2s ease-out; }
@keyframes ghost-favorites-draggable-animation { 0% { opacity:0; transform:scale(.9) } 100% { opacity:.4; transform:scale(1) } }
@media (max-width:640px) { .itjk-hero { padding:26px 20px; border-radius:14px; } .itjk-hero::after { font-size:82px; right:8px; } }
</style>
