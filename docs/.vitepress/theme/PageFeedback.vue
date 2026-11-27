<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page, lang, site, frontmatter } = useData()
const vi = computed(() => lang.value.startsWith('vi'))
const zh = computed(() => lang.value.startsWith('zh'))
const repoUrl = computed(() => site.value.themeConfig.socialLinks?.find(link => link.icon === 'github')?.link || 'https://github.com')
const licenseUrl = computed(() => `${repoUrl.value}/blob/main/LICENSE-DOCS`)
const url = computed(() => {
  const params = new URLSearchParams({
    template: 'documentation.yml',
    title: `[Docs] ${page.value.title}`,
    page: `https://github.io{page.value.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '.html')}`
  })
  return `${repoUrl.value}/issues/new?${params}`
})
</script>

<template>
  <div id="page-feedback" class="page-feedback">
    <strong>{{ vi && frontmatter.status === 'review' ? 'Giúp rà soát hướng dẫn Tiếng Việt này' : vi ? 'Giúp cải thiện tài liệu này' : zh && frontmatter.status === 'review' ? '帮助校对这篇中文教程' : zh ? '让文档更好用' : 'Help improve this guide' }}</strong>
    <p>{{ vi ? 'Vui lòng cung cấp dòng phần cứng, phiên bản firmware, bước bạn đã thực hiện và kết quả thực tế.' : zh ? '请带上硬件型号、固件版本、卡住的步骤和实际结果。接线问题可附能看清丝印的照片。' : 'Include your hardware, firmware version, the step you tried, and what happened.' }}</p>
    <a :href="url" target="_blank" rel="noopener noreferrer">{{ vi ? 'Báo cáo lỗi tài liệu ↗' : zh ? '反馈文档问题 ↗' : 'Report a documentation issue ↗' }}</a>
    <p v-if="frontmatter.status !== 'draft'" class="license-note">
      {{ vi ? 'Nội dung gốc:' : zh ? '原创文字采用' : 'Original text:' }} <a :href="licenseUrl" rel="license">CC BY 4.0</a>.
      {{ vi ? 'Tài nguyên, mã nguồn và tệp tải xuống của bên thứ ba giữ nguyên điều khoản bản quyền riêng.' : zh ? '第三方素材、代码和附件按各自许可。' : 'Third-party materials, code, and downloads retain their own terms.' }}
    </p>
  </div>
</template>
