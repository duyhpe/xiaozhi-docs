<template>
  <div class="community-entry" @keydown.esc.prevent="close">
    <a v-if="vi" class="community-trigger" :href="community.zalo" target="_blank" rel="noopener noreferrer">Nhóm Zalo ↗</a>
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

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import community from '../data/community.json'

const { lang, page } = useData()
const vi = computed(() => lang.value.startsWith('vi'))
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
