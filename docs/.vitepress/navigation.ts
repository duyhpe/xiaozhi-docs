export const sections = [
  { slug: 'getting-started', vi: 'Bắt đầu', zh: '快速开始', en: 'Getting started' },
  { slug: 'hardware', vi: 'Phần cứng & đấu nối', zh: '硬件与接线', en: 'Hardware & wiring' },
  { slug: 'firmware', vi: 'Firmware & nạp code', zh: '固件与烧录', en: 'Firmware & flashing' },
  { slug: 'console', vi: 'Hướng dẫn Console', zh: '控制台指南', en: 'Console guide' },
  { slug: 'mcp', vi: 'MCP & tích hợp', zh: 'MCP 与扩展', en: 'MCP & integrations' },
  { slug: 'development', vi: 'Phát triển', zh: '开发指南', en: 'Development' },
  { slug: 'reference', vi: 'Giao thức & tham chiếu', zh: '协议与参考', en: 'Protocols & reference' },
  { slug: 'faq', vi: 'Khắc phục sự cố', zh: '常见问题', en: 'Troubleshooting' },
  { slug: 'community', vi: 'Cộng đồng & đóng góp', zh: '社区与贡献', en: 'Community' }
] as const

const guides: Record<string, { slug: string; vi: string; zh: string; en: string; externalZh?: string }[]> = {
  "getting-started": [
    {
      "slug": "wifi-and-binding",
      "vi": "Cài đặt Wi-Fi & liên kết thiết bị",
      "zh": "配网与绑定设备",
      "en": "Wi-Fi & device binding"
    }
  ],
  "hardware": [
    {
      "slug": "choosing-hardware",
      "vi": "Chọn bộ phần cứng đầu tiên",
      "zh": "如何选择第一套硬件",
      "en": "Choose hardware"
    },
    {
      "slug": "supported-boards",
      "vi": "Các bo mạch được hỗ trợ",
      "zh": "支持的板型与变体",
      "en": "Supported boards"
    },
    {
      "slug": "breadboard-esp32-s3",
      "vi": "Mạch breadboard ESP32-S3 cơ bản",
      "zh": "基础 ESP32-S3 面包板",
      "en": "ESP32-S3 breadboard"
    },
    {
      "slug": "breadboard-esp32-c3",
      "vi": "Mạch breadboard ESP32-C3",
      "zh": "ESP32-C3 面包板",
      "en": "ESP32-C3 breadboard"
    },
    {
      "slug": "breadboard-esp32",
      "vi": "Mạch ESP32 cổ điển (Classic)",
      "zh": "经典 ESP32 面包板",
      "en": "Classic ESP32"
    },
    {
      "slug": "displays/st7789",
      "vi": "Màn hình màu ST7789",
      "zh": "ST7789 彩屏",
      "en": "ST7789 display"
    },
    {
      "slug": "breadboard-4g",
      "vi": "Mạch breadboard 4G: ML307R / NT26K",
      "zh": "4G 面包板：ML307R / NT26K",
      "en": "4G breadboard"
    },
    {
      "slug": "breadboard-camera",
      "vi": "Mạch breadboard Camera S3",
      "zh": "S3 摄像头面包板",
      "en": "Camera breadboard"
    },
    {
      "slug": "boards/xmini-c3",
      "vi": "Bo mạch Xmini-C3 & V3",
      "zh": "Xmini-C3 与 V3",
      "en": "Xmini-C3 & V3"
    },
    {
      "slug": "external-wake-module",
      "vi": "Module nhận diện giọng nói ngoài (ASR)",
      "zh": "外接 ASR 唤醒模块",
      "en": "External ASR module"
    },
    {
      "slug": "battery-power",
      "vi": "Nguồn cấp bằng Pin & sạc",
      "zh": "电池供电与充电",
      "en": "Battery power"
    },
    {
      "slug": "audio-output",
      "vi": "Loa, tai nghe & ngõ ra âm thanh",
      "zh": "扬声器、耳机与音箱",
      "en": "Audio outputs"
    },
    {
      "slug": "design-guidelines",
      "vi": "Hướng dẫn thiết kế phần cứng",
      "zh": "硬件设计要点",
      "en": "Hardware design"
    }
  ],
  "firmware": [
    {
      "slug": "online-builder",
      "vi": "Trình biên dịch & nạp trực tuyến",
      "zh": "在线编译与网页烧录",
      "en": "Online builder"
    },
    {
      "slug": "downloads",
      "vi": "Tải xuống & chọn Firmware",
      "zh": "下载与选择固件",
      "en": "Choose firmware"
    },
    {
      "slug": "flashing",
      "vi": "Nạp & cập nhật Firmware",
      "zh": "烧录与升级",
      "en": "Flash & update"
    },
    {
      "slug": "releases/v2.6.0",
      "vi": "Bản phát hành v2.6.0",
      "zh": "v2.6.0 正式固件",
      "en": "v2.6.0 release"
    },
    {
      "slug": "releases/v1.9.4",
      "vi": "Lưu trữ bản v1.9.4",
      "zh": "v1.9.4 历史固件",
      "en": "v1.9.4 archive"
    }
  ],
  "console": [
    { "slug": "#role-and-voice", "vi": "Cấu hình nhân vật, mô hình & giọng nói", "zh": "配置角色、模型与声音", "en": "Persona, model & voice" },
    { "slug": "#speaker-recognition", "vi": "Nhận diện giọng nói người dùng", "zh": "声纹识别", "en": "Speaker recognition" },
    {
      "slug": "github-verification",
      "vi": "Xác minh GitHub & quyền lợi",
      "zh": "GitHub 认证与权益",
      "en": "GitHub verification"
    },
    {
      "slug": "voice-cloning",
      "vi": "Nhân bản giọng nói (Voice cloning)",
      "zh": "声音复刻",
      "en": "Voice cloning"
    },
    {
      "slug": "knowledge-base",
      "vi": "Cơ sở tri thức (Knowledge base)",
      "zh": "知识库",
      "en": "Knowledge base"
    }
  ],
  "mcp": [
    {
      "slug": "quickstart",
      "vi": "Bắt đầu nhanh với MCP",
      "zh": "MCP 快速开始",
      "en": "MCP quickstart"
    },
    {
      "slug": "connect-existing-servers",
      "vi": "Kết nối máy chủ MCP có sẵn",
      "zh": "连接已有 MCP 服务",
      "en": "Connect MCP servers"
    },
    {
      "slug": "examples/web-search",
      "vi": "Ví dụ tìm kiếm Web",
      "zh": "联网搜索示例",
      "en": "Web search example"
    }
  ],
  "development": [
    {
      "slug": "build-firmware",
      "vi": "Cài đặt môi trường & tự biên dịch",
      "zh": "搭建环境与本地构建",
      "en": "Build firmware"
    },
    {
      "slug": "custom-board",
      "vi": "Sửa chân GPIO & tùy chỉnh bo mạch",
      "zh": "修改引脚与自定义板型",
      "en": "Custom boards"
    },
    {
      "slug": "audio-and-aec",
      "vi": "Xử lý âm thanh & khử tiếng vọng AEC",
      "zh": "音频处理与 AEC",
      "en": "Audio & AEC"
    },
    {
      "slug": "wake-words",
      "vi": "Từ khóa đánh thức & nhận diện",
      "zh": "唤醒词与识别方案",
      "en": "Wake words"
    },
    {
      "slug": "mcp-gpio",
      "vi": "Điều khiển GPIO qua MCP",
      "zh": "用 MCP 控制 GPIO",
      "en": "MCP GPIO tools"
    },
    {
      "slug": "custom-prompts",
      "vi": "Âm thanh thông báo & tài nguyên ngôn ngữ",
      "zh": "提示音与语言资源",
      "en": "Prompt audio"
    },
    {
      "slug": "archive/p3-prompts",
      "vi": "Lưu trữ âm thanh P3",
      "zh": "P3 提示音历史方案",
      "en": "P3 archive"
    }
  ],
  "reference": [
    {
      "slug": "websocket",
      "vi": "Tham chiếu giao thức WebSocket",
      "zh": "WebSocket 版本入口",
      "en": "WebSocket reference"
    },
    {
      "slug": "ota",
      "vi": "Tham chiếu OTA, kích hoạt & cập nhật",
      "zh": "OTA、激活与更新",
      "en": "OTA reference"
    },
    {
      "slug": "display-emotions",
      "vi": "Hiển thị biểu cảm & tâm trạng",
      "zh": "心情与表情显示",
      "en": "Emotion display"
    }
  ],
  "faq": [
    {
      "slug": "account-and-binding",
      "vi": "Đăng nhập, tài khoản & hủy liên kết",
      "zh": "登录、账号与解绑",
      "en": "Accounts & binding"
    },
    {
      "slug": "serial-logs",
      "vi": "Lấy nhật ký cổng Serial (Logs)",
      "zh": "获取串口日志",
      "en": "Serial logs"
    }
  ],
  "community": [
    {
      "slug": "open-hardware",
      "vi": "Dự án phần cứng mã nguồn mở",
      "zh": "开源硬件项目",
      "en": "Open hardware"
    },
    {
      "slug": "projects/sf32lb52-plugin",
      "vi": "Hướng dẫn SF32LB52 ↗",
      "zh": "SF32LB52 教程 ↗",
      "externalZh": "https://easyeda.com",
      "en": "SF32LB52 project"
    },
    {
      "slug": "projects/astronaut-storyteller",
      "vi": "Độ máy kể chuyện phi hành gia",
      "zh": "太空人故事机改造",
      "en": "Storyteller project"
    },
    {
      "slug": "projects/wake-on-lan",
      "vi": "Bật máy tính từ xa qua mạng (Wake-on-LAN)",
      "zh": "网络唤醒电脑",
      "en": "Wake-on-LAN"
    },
    {
      "slug": "mcp-tools",
      "vi": "Công cụ MCP cộng đồng",
      "zh": "社区 MCP 工具",
      "en": "Community MCP tools"
    },
    {
      "slug": "resources",
      "vi": "Âm nhạc, lời bài hát & tài nguyên",
      "zh": "音乐、歌词与资源",
      "en": "Music & resources"
    },
    {
      "slug": "contributing",
      "vi": "Đóng góp cho tài liệu",
      "zh": "参与文档贡献",
      "en": "Contribute"
    }
  ]
}

export function sidebar(locale: 'vi' | 'zh' | 'en') {
  return sections.map(section => ({
    text: section[locale],
    collapsed: true,
    link: `/${locale}/${section.slug}/`,
    ...(guides[section.slug] ? {
      items: guides[section.slug].map(guide => ({
        text: guide[locale], link: locale === 'zh' && guide.externalZh ? guide.externalZh : `/${locale}/${section.slug}/${guide.slug}`
      }))
    } : {})
  }))
}
