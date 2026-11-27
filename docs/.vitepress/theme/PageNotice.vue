<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { frontmatter, lang, page } = useData()
const vi = computed(() => lang.value.startsWith('vi'))
const zh = computed(() => lang.value.startsWith('zh'))
const original = computed(() => withBase(`/zh/${page.value.relativePath.slice(3).replace(/index\.md$/, '').replace(/\.md$/, '.html')}`))
</script>

<template>
  <aside v-if="!frontmatter.redirectTo && frontmatter.status === 'draft'" class="page-notice" role="note">
    <strong>
      {{ frontmatter.translation?.status === 'pending'
        ? (vi ? 'Chưa có bản dịch Tiếng Việt' : 'English translation pending')
        : vi ? 'Đang biên soạn nội dung' : zh ? '内容重构中' : 'Guide in preparation' }}
    </strong>
    <p v-if="frontmatter.translation?.status === 'pending'">
      <template v-if="vi">Hướng dẫn này chưa được dịch sang Tiếng Việt. <a :href="original" lang="zh-Hans">Xem bản gốc tiếng Trung ↗</a></template>
      <template v-else>This guide has not been translated yet. <a :href="original" lang="zh-Hans">Read the Chinese guide ↗</a></template>
    </p>
    <p v-else>{{ vi
      ? 'Trang này mô tả phạm vi nội dung dự kiến. Hướng dẫn chi tiết sẽ được xuất bản sau khi kiểm chứng.'
      : zh
        ? '此页目前说明整理范围，完整操作步骤将在核验后发布。'
        : 'This page describes the planned scope. Verified instructions will be published after review.' }}</p>
  </aside>
  <aside v-else-if="frontmatter.status === 'review'" class="page-notice page-notice-review" role="note">
    <div class="page-notice-heading">
      <strong>{{ vi ? 'Cộng đồng rà soát' : zh ? '社区校对中' : 'Community review' }}</strong>
      <span v-if="frontmatter.reviewedAt">{{ frontmatter.reviewedAt }}</span>
    </div>
    <p>{{ vi
      ? 'Hãy giúp kiểm tra hướng dẫn, hình minh họa, khác biệt phần cứng và câu chữ. Xem hướng dẫn về các phiên bản áp dụng và giới hạn xác minh.'
      : zh
        ? '欢迎反馈操作步骤、配图、硬件差异和翻译问题。具体适用版本与验证范围见正文。'
        : 'Help check instructions, illustrations, hardware differences, and wording. See the guide for applicable versions and verification limits.' }}</p>
    <a class="review-feedback-link" href="#page-feedback">{{ vi ? 'Đề xuất chỉnh sửa ↓' : zh ? '反馈此页问题 ↓' : 'Suggest a correction ↓' }}</a>
  </aside>
  <aside v-if="frontmatter.translationStale && !frontmatter.redirectTo" class="page-notice" role="note">
    <strong>{{ vi ? 'Bản dịch cần được rà soát lại' : 'Translation needs review' }}</strong>
    <p v-if="vi">Tài liệu gốc tiếng Trung đã có cập nhật mới kể từ lần rà soát trước. <a :href="original">Xem phiên bản tiếng Trung</a>.</p>
    <p v-else>The Chinese source has changed since this translation was reviewed. <a :href="original">Read the Chinese version</a>.</p>
  </aside>
</template>
