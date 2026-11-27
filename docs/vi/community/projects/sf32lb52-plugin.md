---
id: sf32lb52-plugin
title: Hướng dẫn thực hành và firmware SF32LB52
description: Sử dụng tài liệu hướng dẫn bản hàn cắm chân và firmware được JLC duy trì cho phần cứng SF32 tương ứng.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Các liên kết hướng dẫn, firmware và tài nguyên tải xuống của JLC đã được kiểm tra. Trang web này duy trì các điểm truy cập gốc thay vì lưu trữ bản sao tách biệt của tài liệu thiết kế và hướng dẫn vận hành.
sourceArticles:
  - DOC-30
prev: false
next: false
translation:
  status: review
  sourceHash: d3aab5491926e10cf6345b29bf172806a494fa84cf666df6ae057ec304ef495a
  reviewedAt: '2026-11-15'
---
# Hướng dẫn thực hành và firmware SF32LB52

XiaoZhi chạy trên chip SF32LB52 sử dụng nhánh firmware SF32 riêng biệt. Đối với sơ đồ mạch, bo mạch PCB, kỹ thuật hàn, vỏ máy và mặt nạ của phiên bản hàn linh kiện cắm chân (through-hole), vui lòng truy cập trực tiếp tài liệu hướng dẫn đầy đủ do JLC duy trì. Tài liệu được liên kết có ngôn ngữ gốc là tiếng Trung.

<a name="scope"></a>

## Hướng dẫn thực hành và tệp thiết kế {#scope}

<span id="materials"></span>
<span id="circuit"></span>
<span id="enclosure"></span>

| Mục tiêu | Tài nguyên được duy trì |
| --- | --- |
| Tự lắp ráp phiên bản hàn cắm chân từ đầu | [Hướng dẫn hoàn chỉnh XiaoZhi của JLC](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/) |
| Mạch điện, PCB, hàn linh kiện và vỏ máy | Chọn chương tương ứng và kiểm tra đúng phiên bản phần cứng (revision) của bạn |
| Tệp sơ đồ nguyên lý, PCB và vỏ máy | [Trang tải xuống của JLC](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/download.html) |

<a name="flash"></a>

## Firmware và cách sử dụng {#flash}

<span id="network"></span>
<span id="verify"></span>

- [Hướng dẫn tải và nạp firmware](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/firmware-download.html): sử dụng đúng công cụ, tệp tin và địa chỉ bộ nhớ được chỉ định cho phần cứng này.
- [Mã nguồn và hướng dẫn sử dụng xiaozhi-sf32](https://github.com/78/xiaozhi-sf32): kiểm tra danh sách phần cứng được hỗ trợ và hướng dẫn theo từng phiên bản.
- [Các bản phát hành SF32 (Releases)](https://github.com/78/xiaozhi-sf32/releases): chọn bản dựng (build) khớp với bo mạch của bạn.

Dòng chip SF32 và ESP32 khác nhau về kiến trúc vi xử lý, công cụ lập trình cũng như định dạng firmware. Tuyệt đối không nạp bản dựng trực tuyến của ESP32 hoặc tệp ảnh firmware ESP32 hoàn chỉnh vào thiết bị này. Hãy làm theo hướng dẫn dành cho SF32 và kiểm tra khả năng hỗ trợ cấp mạng (qua Bluetooth PAN) trên điện thoại của bạn.

<a name="hardware"></a>

## Nhận diện phần cứng {#hardware}

<figure class="source-figure">

[![Nguyên mẫu hàn cắm chân và ngoại quan hoàn thiện.](../../../public/images/zh/doc-30-image-001.webp)](../../../public/images/zh/doc-30-image-001.webp)

<figcaption>Nguyên mẫu hàn cắm chân và ngoại quan hoàn thiện.</figcaption>
</figure>

<a name="sources"></a>

## Các bước tiếp theo {#sources}

Nếu bạn muốn làm phiên bản trên bảng cắm thử (breadboard) dùng ESP32, hãy tiếp tục với [hướng dẫn cơ bản cho S3](../../hardware/breadboard-esp32-s3.md). Xem mục [Phần cứng mã nguồn mở](../open-hardware.md) để tham khảo các thiết kế khác từ cộng đồng.
