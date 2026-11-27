---
id: firmware
title: Firmware và nạp code
description: 'Chọn đúng firmware tương thích, biên dịch trực tuyến và cài đặt hoặc cập nhật cho thiết bị của bạn.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
translation:
  status: review
  sourceHash: 775ddc324cf11e20e1b5d976b1807c171d9defad58f4e25b6d4ab70c165eb8e4
  reviewedAt: '2026-11-15'
---
# Firmware và nạp code

Xác định chính xác dòng chip, biến thể bo mạch và loại tệp ảnh firmware (image type) trước khi cài đặt hoặc cập nhật. Các bản phát hành cũ được lưu trữ riêng. Với hầu hết thiết bị, bao gồm cả mạch breadboard, hãy bắt đầu với tính năng [biên dịch và nạp trực tuyến](https://xiaozhi.me/console/firmware-builder). Đối với các thiết bị không có cổng nạp USB lộ sẵn, hãy làm theo hướng dẫn riêng của từng bo mạch trước tiên.

<a name="guides"></a>

## Chọn hướng dẫn {#guides}

| Hướng dẫn | Nội dung |
| --- | --- |
| [Biên dịch trực tuyến và nạp qua trình duyệt](./online-builder.md) | Biên dịch cho bo mạch của bạn và nạp trực tiếp qua trình duyệt mà không cần cài đặt ESP-IDF. |
| [Chọn và tải xuống firmware](./downloads.md) | Đối chiếu chip, bo mạch và biến thể, phân biệt rõ cài đặt mới với bảo trì các phiên bản đời cũ. |
| [Nạp và cập nhật firmware](./flashing.md) | Phân biệt các loại tệp ảnh firmware, nạp qua trình duyệt hoặc ngoại tuyến và kiểm tra khởi động. |
| [Bản phát hành v2.6.0](./releases/v2.6.0.md) | Tìm gói firmware cho mạch breadboard, JLC S3 và các biến thể khác. |
| [Bản lưu trữ v1.9.4](./releases/v1.9.4.md) | Đối chiếu sản phẩm và dòng chip khi bảo trì các thiết bị đời v1. |

<a name="next"></a>

## Đọc tài liệu và phản hồi {#next}

Các hướng dẫn này luôn mở để cộng đồng cùng rà soát. Hãy báo cáo sự cố thông qua liên kết phản hồi ở cuối trang kèm theo phiên bản firmware, model bo mạch và các bước để tái hiện vấn đề.
