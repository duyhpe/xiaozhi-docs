---
id: external-wake-module
title: Module nhận diện từ khóa đánh thức ngoài (ASR)
description: Lựa chọn nhận diện từ khóa đánh thức tích hợp sẵn hay dùng module ngoài, đồng thời kiểm tra nguồn cấp, chân kích hoạt và cấu hình.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-13
  - DOC-21
translation:
  status: review
  sourceHash: 9384a1665e2d8a34d7dd0f51332a2c44f5e534b63f9e732a4f500e0a9ec5c09b
  reviewedAt: '2026-11-15'
---
# Module nhận diện từ khóa đánh thức ngoài (ASR)

Các chip ESP32-S3, C3 và một số dòng chip được hỗ trợ khác đều có thể nhận diện từ khóa đánh thức trực tiếp trên bo mạch mà không cần gắn thêm phần cứng nhận diện giọng nói ngoài. Chỉ nên sử dụng module ASR ngoài khi chip điều khiển bị hạn chế tài nguyên hoặc thiết kế phần cứng cụ thể yêu cầu tách riêng bộ nhận diện.

<a name="scope"></a>

## 1. Xác định xem có cần dùng module ngoài hay không {#scope}

- **Dùng mô hình tích hợp sẵn trên chip:** ưu tiên dùng cho ESP32-S3 hoặc bo mạch C3 tương thích, kiểm tra lựa chọn mô hình tại mục [từ khóa đánh thức](../development/wake-words.md).
- **Dùng module ASR ngoài:** phù hợp với dòng ESP32 cổ điển (Classic) bị giới hạn tài nguyên hoặc các thiết kế cần giải phóng CPU/bộ nhớ khỏi tác vụ nhận diện từ khóa đánh thức.

<a name="wiring"></a>

## 2. Kiểm tra thông số điện và giao tiếp của module {#wiring}

Kiểm tra riêng tài liệu kỹ thuật của module ASR thực tế (ví dụ: CI1302, VC-02, SU-03T hoặc các module giao tiếp UART/GPIO khác):

- **Nguồn cấp và mức logic:** xác nhận dải điện áp cấp vào (3.3V hay 5V), dòng tải đỉnh và mức logic của chân tín hiệu ra phải tương thích với chân GPIO của ESP32 (mức 3.3V). Không nối trực tiếp chân tín hiệu 5V vào chân GPIO của ESP32.
- **Loại tín hiệu kích hoạt:** xác nhận module xuất ra xung mức cao (high pulse), xung mức thấp (low pulse) hay bản tin dữ liệu qua cổng UART.
- **Chân GPIO trên bo mạch:** đối chiếu chân nhận tín hiệu với cấu hình `ASR_BUTTON_GPIO` (ví dụ: `GPIO19` trên bo mạch `bread-compact-esp32`) hoặc cấu hình UART của bo mạch mục tiêu.
- **Cách ly đường âm thanh:** nếu module ASR và ESP32 dùng chung một micro, phải kiểm tra sơ đồ chia tín hiệu hoặc mức điện áp phân cực (bias); không nối chập hai ngõ vào micro vào cùng một đầu ra analog.

<a name="build"></a>

## 3. Cấu hình firmware và kiểm thử {#build}

1. Bật hoặc ánh xạ đúng chân ngõ vào ASR ngoài trong cấu hình bo mạch tương ứng (xem hướng dẫn tại mục [tùy chỉnh bo mạch](../development/custom-board.md)).
2. Khi đã ngắt nguồn điện, đấu nối nguồn cấp, đường mass chung (`GND`) và đường tín hiệu kích hoạt.
3. Cấp nguồn và kiểm tra xem khi gọi từ khóa đánh thức thì module ASR có xuất ra đúng tín hiệu kích hoạt hay không trước khi kiểm tra luồng trò chuyện.
4. Kiểm tra hiện tượng kích hoạt nhầm (false triggers) khi loa của thiết bị đang phát âm thanh ở mức âm lượng cao.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Việc gọi từ khóa đánh thức kích hoạt được phiên trò chuyện ổn định mà không làm treo hay khởi động lại thiết bị, đồng thời loa phát âm thanh không tự kích hoạt nhầm lại module ASR.

<a name="next"></a>

## Các bước tiếp theo {#next}

Nếu bo mạch của bạn có thể chạy trực tiếp mô hình nhận diện từ khóa đánh thức tích hợp sẵn, hãy xem mục [từ khóa đánh thức](../development/wake-words.md). Nếu cần thêm chân nhận tín hiệu kích hoạt trên một bo mạch mới, hãy xem tiếp mục [tùy chỉnh bo mạch](../development/custom-board.md).
