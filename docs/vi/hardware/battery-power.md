---
id: battery-power
title: Nguồn cấp bằng pin và sạc
description: Thử nghiệm với pin sạc dự phòng USB trước khi quyết định có cần thiết kế mạch quản lý pin riêng hay không.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-05
  - DOC-11
translation:
  status: review
  sourceHash: 7e8a9c4b2d1f0e3a5c6b8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a
  reviewedAt: '2026-11-15'
---
# Nguồn cấp bằng pin và sạc

Nếu bạn muốn sử dụng thiết bị di động mà không cắm dây nguồn cố định, hãy bắt đầu thử nghiệm với **pin sạc dự phòng USB** thông thường trước khi thiết kế mạch sạc hoặc mạch tăng áp từ pin Lithium-ion (Li-ion / LiPo) 3.7V.

<a name="power-bank"></a>

## 1. Thử nghiệm bằng pin sạc dự phòng USB {#power-bank}

- **Ưu điểm:** pin sạc dự phòng đã tích hợp sẵn mạch bảo vệ quá dòng/quá áp, mạch sạc và bộ chuyển đổi ổn áp lên 5V, giúp cấp nguồn trực tiếp qua cổng USB của bo mạch phát triển mà không cần hàn thêm linh kiện.
- **Lưu ý về chế độ tự ngắt (Auto-shutoff):** nhiều loại pin sạc dự phòng sẽ tự động ngắt đầu ra 5V sau vài chục giây nếu dòng tiêu thụ của thiết bị ở trạng thái chờ quá thấp. Hãy kiểm tra hoạt động thực tế của thiết bị trong cả trạng thái chờ (idle) lẫn lúc phát loa ở mức âm lượng cao.

<a name="li-ion"></a>

## 2. Sử dụng pin Lithium-ion / LiPo 3.7V {#li-ion}

Bảo vệ pin, mạch sạc, mạch tăng áp (boost) lên 5V và cơ chế chuyển nguồn tự động khi vừa cắm sạc vừa dùng (power-path) là những chức năng phần cứng tách biệt:

- **Không cắm pin 3.7V trực tiếp vào chân 5V hoặc 3V3:** điện áp pin Lithium thay đổi từ khoảng 4.2V (khi đầy) xuống dưới 3.2V (khi cạn). Cắm trực tiếp vào chân 3V3 có thể làm hỏng chip ESP32, còn cắm vào chân 5V sẽ không đủ điện áp để mạch khuếch đại và màn hình hoạt động ổn định.
- **Bắt buộc có mạch bảo vệ (BMS / Protection board):** chỉ sử dụng cell pin có tích hợp sẵn mạch bảo vệ chống ngắn mạch, sạc quá áp và xả cạn sâu.
- **Kiểm tra dòng tải đỉnh:** khi Wi-Fi hoặc modem 4G truyền dữ liệu đồng thời với lúc loa phát âm thanh lớn, dòng tải đỉnh có thể tăng vọt gây sụt áp tức thời và làm bo mạch tự khởi động lại. Hãy kiểm tra khả năng cấp dòng của IC sạc/tăng áp và dùng dây dẫn nguồn đủ ngắn, tiết diện phù hợp.
- **Vừa sạc vừa dùng:** nếu bo mạch phát triển không có sẵn mạch quản lý đường nguồn (power-path), việc vừa cắm cáp sạc USB vừa cấp nguồn cho tải lớn có thể làm IC sạc hiểu nhầm trạng thái đầy pin hoặc gây quá nhiệt.

<a name="adc-monitoring"></a>

## 3. Đo điện áp pin và hiển thị phần trăm {#adc-monitoring}

- Chỉ bật tính năng hiển thị mức pin trên giao diện nếu bo mạch của bạn thực sự có mạch cầu phân áp nối vào chân ADC của vi điều khiển và đã được khai báo trong cấu hình bo mạch tương ứng (xem mục [tùy chỉnh bo mạch](../development/custom-board.md)).
- Không nối trực tiếp cực dương pin 4.2V vào chân GPIO/ADC của ESP32 khi chưa qua cầu phân áp vì mức điện áp tối đa cho phép của chân GPIO là 3.3V.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Thiết bị khởi động ổn định từ nguồn pin, không tự khởi động lại khi phát loa ở mức âm lượng dự kiến và không bị nóng bất thường ở khu vực IC nguồn hoặc pin trong quá trình sạc và xả liên tục.

<a name="next"></a>

## Các bước tiếp theo {#next}

Xem hướng dẫn về [ngõ ra âm thanh](./audio-output.md) để kiểm tra tải của loa và tai nghe, hoặc đọc [những lưu ý khi thiết kế phần cứng](./design-guidelines.md) nếu bạn đang chuẩn bị thiết kế mạch PCB tích hợp pin.
