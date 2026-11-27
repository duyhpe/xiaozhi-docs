---
id: development
title: Hướng dẫn phát triển
description: Bắt đầu với một bản dựng có thể tái tạo và thiết lập định danh firmware riêng cho phần cứng tùy chỉnh.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
translation:
  status: review
  sourceHash: 26f1f1ecc6c3dcd85145fc155c130b4cc7c83640ea78c7a5da9159cc0ae2d9f6
  reviewedAt: '2026-11-15'
---
# Hướng dẫn phát triển

Hãy cố định phiên bản firmware và SDK, hoàn tất một bản dựng cơ bản, sau đó mới tùy chỉnh bo mạch, âm thanh hoặc các công cụ. Kho mã nguồn firmware duy trì các quy chuẩn mã nguồn và đầy đủ thông số kỹ thuật theo từng phiên bản.

<a name="guides"></a>

## Chọn hướng dẫn {#guides}

| Hướng dẫn | Nội dung |
| --- | --- |
| [Môi trường biên dịch cục bộ](./build-firmware.md) | Đối chiếu phiên bản ESP-IDF và firmware, liệt kê danh sách bo mạch, biên dịch, nạp code và đọc nhật ký (logs). |
| [Bo mạch và sơ đồ chân tùy chỉnh](./custom-board.md) | Cấp cho mạch đấu dây tùy chỉnh một định danh bo mạch và bản dựng riêng để tránh bị ghi đè nhầm bởi firmware tiêu chuẩn. |
| [Xử lý âm thanh và khử tiếng vọng AEC](./audio-and-aec.md) | Phân biệt xử lý trên thiết bị/máy chủ và tín hiệu âm thanh tham chiếu, sau đó kiểm thử cuộc trò chuyện. |
| [Từ khóa đánh thức (Wake words)](./wake-words.md) | Lựa chọn nhận diện từ khóa cài sẵn, tùy chỉnh hoặc dùng module ngoài phù hợp với dòng chip, bộ nhớ và mô hình. |
| [Điều khiển GPIO bằng MCP](./mcp-gpio.md) | Tái sử dụng LampController, kiểm tra khả năng khám phá công cụ trên thiết bị và mức điện áp ngõ ra. |
| [Âm thanh thông báo và tài nguyên ngôn ngữ](./custom-prompts.md) | Thay thế các tệp âm thanh thông báo thông qua quy trình quản lý ngôn ngữ (locale) và tạo tệp OGG/Opus. |
| [Âm thanh thông báo P3 đời cũ](./archive/p3-prompts.md) | Bảo trì các phiên bản firmware cũ; đây không phải là quy trình xử lý tài nguyên mặc định hiện nay. |

<a name="next"></a>

## Đọc tài liệu và phản hồi {#next}

Các hướng dẫn này luôn mở để cộng đồng cùng rà soát. Hãy báo cáo sự cố thông qua liên kết phản hồi ở cuối mỗi trang, đính kèm thông tin về phiên bản firmware, model bo mạch và các bước để tái hiện vấn đề.
