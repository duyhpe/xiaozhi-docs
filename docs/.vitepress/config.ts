import { defineConfig, type HeadConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { repositoryUrl, branch, hostname } from '../../site.config.mjs'
import { sidebar, sections } from './navigation'
import imageDimensions from './data/image-dimensions.json'
import { rootLanguageRedirectScript } from './theme/language-preference.mjs'
import { publicImageUrl } from '../../scripts/public-images.mjs'
import { isIndexable, readDiscoveryPages, pagePath, markdownPath, language, textLicense, licenseNotice, writeDiscoveryFiles } from '../../scripts/discovery.mjs'

const localImageDimensions: Record<string, { width: number; height: number }> = imageDimensions
const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url))
const discoveryPages = readDiscoveryPages(fileURLToPath(new URL('../', import.meta.url)))

//export default defineConfig({
//  title: '小智文档',
//  lang: 'zh-CN',
//  description: '小智 AI 使用与开发文档 · XiaoZhi AI documentation',
  // The custom domain serves the site at /, rather than /xiaozhi-docs/.
  //base: '/',
//  base: '/xiaozhi-docs/',
export default defineConfig({
  title: 'Tài liệu XiaoZhi AI',
  lang: 'vi-VN',
  description: 'Tài liệu hướng dẫn sử dụng và phát triển XiaoZhi AI · XiaoZhi AI documentation',
  base: '/xiaozhi-docs/',

  // Keep .html URLs: they work on GitHub Pages without rewrite rules.
  cleanUrls: false,
  lastUpdated: true,
  sitemap: {
    hostname,
    transformItems(items) {
      const allowed = new Set(['/', ...[...discoveryPages.values()].filter(page => isIndexable(page.data)).map(page => pagePath(page.path))])
      return items.filter(item => allowed.has('/' + item.url.replace(/^\//, ''))).map(item => {
        const url = '/' + item.url.replace(/^\//, '')
        const suffix = url === '/' ? '' : url.replace(/^\/(zh|en)\//, '')
        const links = ['zh', 'en'].map(locale => ({ lang: locale === 'zh' ? 'zh-Hans' : 'en', url: `${locale}/${suffix}` }))
          .filter(link => allowed.has('/' + link.url))
        const fallback = url === '/' || /^\/(zh|en)\/$/.test(url) ? '/' : allowed.has('/en/' + suffix) ? '/en/' + suffix : url
        return { ...item, links: [...links, { lang: 'x-default', url: fallback }] }
      })
    }
  },
  buildEnd: writeDiscoveryFiles,
  markdown: {
    image: { lazyLoading: true },
    config(md) {
      // GitHub uses named anchors; VitePress already gives the following heading this ID.
      md.core.ruler.push('github-anchor-mirrors', state => {
        const rendered = []
        for (let index = 0; index < state.tokens.length; index++) {
          const tokens = state.tokens
          const mirror = /^<a name="([^"]+)"><\/a>$/.exec(tokens[index + 1]?.content || '')
          if (tokens[index].type === 'paragraph_open' && tokens[index + 1]?.type === 'inline' && mirror &&
              tokens[index + 2]?.type === 'paragraph_close' && tokens[index + 3]?.type === 'heading_open' &&
              tokens[index + 3].attrGet('id') === mirror[1]) {
            index += 2
          } else rendered.push(tokens[index])
        }
        state.tokens = rendered
      })
      const renderLink = md.renderer.rules.link_open!
      md.renderer.rules.link_open = (tokens, index, options, env, self) => {
        const token = tokens[index]
        token.attrSet('href', publicImageUrl(token.attrGet('href'), env.realPath || env.path, publicDirectory))
        return renderLink(tokens, index, options, env, self)
      }
      const renderImage = md.renderer.rules.image!
      md.renderer.rules.image = (tokens, index, options, env, self) => {
        const token = tokens[index]
        const src = publicImageUrl(token.attrGet('src'), env.realPath || env.path, publicDirectory)
        token.attrSet('src', src)
        const dimensions = localImageDimensions[src?.split(/[?#]/)[0] || '']
        if (dimensions) {
          // Reserve the full figure before lazy loading, so chapter links do not jump above the diagram.
          token.attrSet('width', String(dimensions.width))
          token.attrSet('height', String(dimensions.height))
        }
        return renderImage(tokens, index, options, env, self)
      }
    }
  },
  transformHead({ pageData }) {
    if (pageData.isNotFound) return [['meta', { name: 'robots', content: 'noindex, follow' }]]
    const source = pageData.relativePath
    const path = pagePath(source)
    const canonical = hostname + (pageData.frontmatter.redirectTo?.split('#')[0] || path)
    const localized = /^(zh|en)\//.test(source)
    const eligible = localized && isIndexable(pageData.frontmatter)
    const title = pageData.frontmatter.title || pageData.title
    const description = pageData.frontmatter.description || pageData.description
    const tags: HeadConfig[] = [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:type', content: source.endsWith('/index.md') || !localized ? 'website' : 'article' }],
      ['meta', { property: 'og:site_name', content: 'XiaoZhi AI documentation' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
    //if (source === 'index.md') {
    //  tags.push(['script', {}, rootLanguageRedirectScript('/')])
    //}
    if (source === 'index.md') {
      tags.push(['script', {}, rootLanguageRedirectScript('/xiaozhi-docs/')])
    }

    if (eligible || source === 'index.md') {
      for (const locale of ['zh', 'en']) {
        const counterpart = source === 'index.md' ? `${locale}/index.md` : source.replace(/^(zh|en)\//, `${locale}/`)
        if (isIndexable(discoveryPages.get(counterpart)?.data || {})) {
          tags.push(['link', { rel: 'alternate', hreflang: language(counterpart), href: hostname + pagePath(counterpart) }])
        }
      }
      const englishSource = source.replace(/^(zh|en)\//, 'en/')
      const fallback = source === 'index.md' || /^(zh|en)\/index\.md$/.test(source)
        ? '/' : isIndexable(discoveryPages.get(englishSource)?.data || {}) ? pagePath(englishSource) : path
      tags.push(['link', { rel: 'alternate', hreflang: 'x-default', href: hostname + fallback }])
    }
    if (eligible) {
      tags.push(['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }])
      tags.push(['link', { rel: 'alternate', type: 'text/markdown', href: hostname + markdownPath(source), title: 'Markdown' }])
      tags.push(['link', { rel: 'describedby', type: 'text/plain', href: `${hostname}/${source.slice(0, 2)}/llms.txt` }])
      const locale = source.startsWith('zh/') ? 'zh' : 'en'
      const section = sections.find(section => section.slug === source.split('/')[1])
      const collection = source.endsWith('/index.md')
      const document: Record<string, unknown> = {
        '@type': collection ? 'CollectionPage' : 'TechArticle',
        '@id': canonical + '#document',
        url: canonical,
        name: title,
        ...(collection ? {} : { headline: title }),
        description,
        inLanguage: language(source),
        isPartOf: { '@id': `${hostname}/#website` },
        license: textLicense,
        usageInfo: licenseNotice,
        copyrightNotice: 'Original documentation text: CC BY 4.0. Third-party media, code, firmware, and downloads retain their own terms.'
      }
      if (pageData.lastUpdated) document.dateModified = new Date(pageData.lastUpdated).toISOString()
      if (section) document[collection ? 'about' : 'articleSection'] = collection ? { '@type': 'Thing', name: section[locale] } : section[locale]
      const breadcrumb = [
        { name: locale === 'zh' ? '小智文档' : 'XiaoZhi Docs', item: `${hostname}/${locale}/` },
        ...(section ? [{ name: section[locale], item: `${hostname}/${locale}/${section.slug}/` }] : []),
        ...(!collection ? [{ name: title, item: canonical }] : [])
      ]
      const graph = {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'WebSite', '@id': `${hostname}/#website`, url: `${hostname}/`, name: 'XiaoZhi AI documentation', inLanguage: ['zh-Hans', 'en'] },
          document,
          { '@type': 'BreadcrumbList', itemListElement: breadcrumb.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) }
        ]
      }
      tags.push(['script', { type: 'application/ld+json' }, JSON.stringify(graph).replace(/</g, '\\u003c')])
    }
    return tags
  },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0d9488' }]
  ],
  locales: {
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi',
      title: 'Tài liệu XiaoZhi',
      description: 'Từ cuộc trò chuyện đầu tiên đến tự chế tạo thiết bị AI của riêng bạn.',
      themeConfig: {
        nav: [
          { text: 'Bắt đầu', link: '/vi/getting-started/' },
          { text: 'Phát triển', link: '/vi/development/' },
          { text: 'Khắc phục sự cố', link: '/vi/faq/' },
          { text: 'Bảng điều khiển', link: 'https://xiaozhi.me' }
        ],
        sidebar: sidebar('vi'),
        outline: { label: 'Trên trang này', level: [2, 3] },
        editLink: { pattern: `${repositoryUrl}/edit/${branch}/docs/:path`, text: 'Chỉnh sửa trang này trên GitHub' },
        lastUpdated: { text: 'Cập nhật lần cuối', formatOptions: { dateStyle: 'medium' } },
        docFooter: { prev: 'Trang trước', next: 'Trang tiếp' },
        darkModeSwitchLabel: 'Giao diện',
        lightModeSwitchTitle: 'Chuyển sang chế độ sáng',
        darkModeSwitchTitle: 'Chuyển sang chế độ tối',
        sidebarMenuLabel: 'Danh mục',
        returnToTopLabel: 'Lên đầu trang',
        langMenuLabel: 'Đổi ngôn ngữ',
        skipToContentLabel: 'Chuyển đến nội dung chính',
        footer: { message: 'Được duy trì bởi cộng đồng XiaoZhi', copyright: `Nội dung gốc: <a href="${licenseNotice}">CC BY 4.0</a> · Tài nguyên bên thứ ba giữ nguyên bản quyền riêng` }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-Hans',
      title: '小智文档',
      description: '从第一次对话到开发自己的 AI 设备。',
      themeConfig: {
        nav: [
          { text: '开始使用', link: '/zh/getting-started/' },
          { text: '开发指南', link: '/zh/development/' },
          { text: '常见问题', link: '/zh/faq/' },
          { text: '控制台', link: 'https://xiaozhi.me/console/' }
        ],
        sidebar: sidebar('zh'),
        outline: { label: '本页内容', level: [2, 3] },
        editLink: { pattern: `${repositoryUrl}/edit/${branch}/docs/:path`, text: '在 GitHub 编辑此页' },
        lastUpdated: { text: '最后更新', formatOptions: { dateStyle: 'medium' } },
        docFooter: { prev: '上一篇', next: '下一篇' },
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '目录',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '切换语言',
        skipToContentLabel: '跳转到正文',
        footer: { message: '由小智社区共同维护', copyright: `原创文字 <a href="${licenseNotice}">CC BY 4.0</a> · 第三方素材按各自许可` }
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'XiaoZhi Docs',
      description: 'From your first conversation to building your own AI device.',
      themeConfig: {
        nav: [
          { text: 'Get started', link: '/en/getting-started/' },
          { text: 'Development', link: '/en/development/' },
          { text: 'Troubleshooting', link: '/en/faq/' },
          { text: 'Console', link: 'https://xiaozhi.me/console/' }
        ],
        sidebar: sidebar('en'),
        outline: { label: 'On this page', level: [2, 3] },
        editLink: { pattern: `${repositoryUrl}/edit/${branch}/docs/:path`, text: 'Edit this page on GitHub' },
        footer: { message: 'Maintained by the XiaoZhi community', copyright: `Original text: <a href="${licenseNotice}">CC BY 4.0</a> · Third-party materials retain their own terms` }
      }
    }
  },
    themeConfig: {
    logo: { src: '/logo.svg', alt: 'XiaoZhi' },
    socialLinks: [{ icon: 'github', link: repositoryUrl }],
    search: {
      provider: 'local',
      options: {
        async _render(src, env, md) {
          const html = md.render(src, env)
          return env.frontmatter?.status === 'draft' || env.frontmatter?.search === false ? '' : html
        },
        // Word segmentation is needed for Chinese queries in VitePress 1.x.
        miniSearch: {
          options: {
            tokenize(text) {
              return Array.from(new Intl.Segmenter('zh', { granularity: 'word' }).segment(text))
                .filter(segment => segment.isWordLike)
                .map(segment => segment.segment)
            }
          }
        },
        locales: {
          vi: {
            translations: {
              button: { buttonText: 'Tìm kiếm tài liệu', buttonAriaLabel: 'Tìm kiếm tài liệu' },
              modal: {
                noResultsText: 'Không tìm thấy kết quả phù hợp',
                resetButtonTitle: 'Xóa tìm kiếm',
                backButtonTitle: 'Đóng tìm kiếm',
                displayDetails: 'Hiển thị chi tiết',
                footer: { selectText: 'Chọn', navigateText: 'Di chuyển', closeText: 'Đóng' }
              }
            }
          },
          zh: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
              modal: {
                noResultsText: '没有找到相关内容',
                resetButtonTitle: '清空搜索',
                backButtonTitle: '关闭搜索',
                displayDetails: '显示详细内容',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        }
      }
    }
  },

  transformPageData(page) {
    if (page.relativePath.startsWith('en/')) {
      const sourcePath = fileURLToPath(new URL(`../zh/${page.relativePath.slice(3)}`, import.meta.url))
      const hash = createHash('sha256').update(readFileSync(sourcePath)).digest('hex')
      page.frontmatter.translationStale = page.frontmatter.translation?.sourceHash !== hash
    }
    if (page.frontmatter.status === 'draft') {
      page.frontmatter.search = false
      page.frontmatter.head ??= []
      page.frontmatter.head.push(['meta', { name: 'robots', content: 'noindex, follow' }])
    }
  }
})
