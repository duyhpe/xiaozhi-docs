<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import community from '../data/community.json'

const { lang, page } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const open = ref(false)
const copied = ref(false)
const copyFailed = ref(false)
const trigger = ref<HTMLButtonElement>()
watch(() => page.value.relativePath, () => { open.value = false })
async function copyGroup() {
  try {
    await navigator.clipboard.writeText(community.qqGroup)
    copied.value = true
    copyFailed.value = false
  } catch { copyFailed.value = true }
}
function close() {
  open.value = false
  trigger.value?.focus()
}
</script>

<template>
  <div class="community-entry" @keydown.esc.prevent="close">
    <a v-if="$page.relativePath.startsWith('vi/')" class="community-trigger" :href="community.zalo" target="_blank" rel="noopener noreferrer">Nhóm Zalo ↗</a>
    <a v-else-if="!zh" class="community-trigger" :href="community.discord" target="_blank" rel="noopener noreferrer">Discord ↗</a>
    <template v-else>
      <button ref="trigger" class="community-trigger" :aria-expanded="open" aria-controls="community-qq" @click="open = !open">QQ 交流群</button>
      <button v-if="open" class="community-backdrop" aria-label="关闭交流群信息" tabindex="-1" @click="close" />
      <div v-if="open" id="community-qq" class="community-panel">
        <strong>加入小智 QQ 交流群</strong>
        <p>在 QQ 中搜索群号，申请加入。</p>
        <div class="community-number"><code>{{ community.qqGroup }}</code><button @click="copyGroup">{{ copied ? '已复制' : '复制群号' }}</button></div>
        <p v-if="copied || copyFailed" role="status">{{ copyFailed ? '请长按或选中群号复制。' : '群号已复制，可以打开 QQ 搜索。' }}</p>
      </div>
    </template>
  </div>
</template>


<style scoped>
.community-entry { position: relative; flex-shrink: 0; margin-left: 12px; font-size: 13px; }
.community-trigger { display: block; padding: 8px 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; font-weight: 600; color: var(--vp-c-brand-1); line-height: 20px; }
.community-trigger:focus-visible, .community-number button:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.community-backdrop { position: fixed; inset: 0; z-index: 99; cursor: default; }
.community-panel { position: absolute; top: 46px; right: 0; z-index: 100; width: 276px; padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); box-shadow: var(--vp-shadow-3); white-space: normal; line-height: 1.7; }
.community-panel p { margin: 8px 0 0; color: var(--vp-c-text-2); }
.community-number { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px; }
.community-number code { font-size: 18px; letter-spacing: 1px; user-select: all; }
.community-number button { padding: 5px 10px; background: var(--vp-c-brand-soft); border-radius: 6px; color: var(--vp-c-brand-1); }
@media (max-width: 767px) { .community-entry { margin-left: 0; } .community-trigger { padding: 5px 8px; font-size: 12px; } }
</style>
