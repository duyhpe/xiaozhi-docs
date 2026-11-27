---
id: supported-boards
title: Tìm các bo mạch và biến thể được hỗ trợ
description: Xác nhận khả năng hỗ trợ bằng danh mục firmware và tùy chọn biên dịch thay vì dựa vào thông tin rao bán sản phẩm.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-31
translation:
  status: review
  sourceHash: 3c0db3016d18da12650654c6f2531614b48039d2dc578499b64beaf811f4dca1
  reviewedAt: '2026-11-15'
---
# Tìm các bo mạch và biến thể được hỗ trợ

“Sản phẩm đang được bày bán”, “sử dụng chip S3” và “firmware đã chọn có hỗ trợ” là ba khái niệm hoàn toàn khác nhau. Hãy kiểm tra mức độ hỗ trợ thực tế trong kho mã nguồn firmware và danh mục biên dịch hiện hành.

<a name="scope"></a>

## Xác định phần cứng trước tiên {#scope}

Thu thập hình ảnh cả hai mặt của bo mạch, thông số vi điều khiển/Flash/PSRAM, mã chip màn hình và âm thanh, cùng phương thức kết nối mạng như Wi-Fi hay 4G. Các phiên bản (revision) khác nhau trong cùng một dòng bo mạch có thể sử dụng sơ đồ chân khác nhau.

<figure class="source-figure">

[![Các thiết bị hoàn chỉnh thuộc dòng Xmini-C3: vỏ hộp giống nhau không đảm bảo cùng phiên bản mạch PCB hay biến thể firmware.](../../public/images/zh/doc-31-image-003.webp)](../../public/images/zh/doc-31-image-003.webp)

<figcaption>Các thiết bị hoàn chỉnh thuộc dòng Xmini-C3: vỏ hộp giống nhau không đảm bảo cùng phiên bản mạch PCB hay biến thể firmware.</figcaption>
</figure>

<figure class="source-figure">

[![Vỏ thiết bị ESP32-BOX-3.](../../public/images/zh/doc-31-image-004.webp)](../../public/images/zh/doc-31-image-004.webp)

<figcaption>Vỏ thiết bị ESP32-BOX-3.</figcaption>
</figure>

<figure class="source-figure">

[![M5Stack CoreS3. Kiểm tra danh mục firmware để xác nhận phạm vi hỗ trợ.](../../public/images/zh/doc-31-image-012.webp)](../../public/images/zh/doc-31-image-012.webp)

<figcaption>M5Stack CoreS3. Kiểm tra danh mục firmware để xác nhận phạm vi hỗ trợ.</figcaption>
</figure>

<a name="lookup"></a>

## 1. Tra cứu trong danh mục hiện hành {#lookup}

- Khi không cài đặt SDK: mở [trình biên dịch trực tuyến](../firmware/online-builder.md) và tìm kiếm theo dòng chip mục tiêu, tên bo mạch và biến thể.
- Khi có sẵn mã nguồn: trong [môi trường phát triển đúng phiên bản](../development/build-firmware.md), chạy lệnh:

```sh
python scripts/build.py --list-boards
python scripts/build.py --list-boards --json
```

Tên thư mục, loại bo mạch (board type) và tên bản dựng (build name) phục vụ các mục đích khác nhau. Các tệp phát hành cũng có thể đính kèm tiền tố tên nhà sản xuất. Hãy đối chiếu chính xác toàn bộ định danh của mạch, không chỉ dựa vào việc tên tệp có chứa chữ C3 hay S3.

<a name="guides"></a>

## 2. Tìm hướng dẫn tương ứng {#guides}

| Phần cứng | Hướng dẫn |
| --- | --- |
| S3 + micro I2S + màn hình OLED | [Mạch breadboard cơ bản](./breadboard-esp32-s3.md) |
| S3 + màn hình LCD SPI | [Mở rộng màn hình màu](./displays/st7789.md) |
| Cấu hình S3 có camera | [Mạch breadboard Camera](./breadboard-camera.md) |
| C3 + ES8311 | [Mạch breadboard C3](./breadboard-esp32-c3.md) hoặc [dòng Xmini](./boards/xmini-c3.md) |
| ESP32 cổ điển (Classic) | [Mạch breadboard ESP32 cổ điển](./breadboard-esp32.md) |
| SF32LB52 | [Dự án plugin SF32 riêng biệt](../community/projects/sf32lb52-plugin.md); không sử dụng firmware của ESP32 |

Một bo mạch không có trang hướng dẫn riêng tại đây vẫn có thể được hỗ trợ. Hãy kiểm tra trong [thư mục các bo mạch theo phiên bản](https://github.com/78/xiaozhi-esp32/tree/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards) và tệp README của từng bo mạch đó.

<a name="firmware"></a>

## 3. Chọn firmware {#firmware}

Khi đã xác định chính xác biến thể phần cứng, hãy ưu tiên sử dụng tính năng [biên dịch và nạp trực tuyến](../firmware/online-builder.md). Sử dụng mục [tải xuống chính thức](../firmware/downloads.md) nếu cần cài đặt ngoại tuyến (offline) hoặc dùng một phiên bản cố định. Các mạch đã thay đổi sơ đồ chân cần có [định danh bo mạch riêng biệt](../development/custom-board.md), không dùng chung mã nhận diện OTA của bo mạch tiêu chuẩn.

Việc sản phẩm ngừng sản xuất, hết hàng hoặc đường link người bán không còn hoạt động không đồng nghĩa với việc firmware ngừng hỗ trợ. Hãy tự quản lý kênh mua hàng riêng; giá cả và tồn kho phụ thuộc vào trang bán hàng tại thời điểm hiện tại.

::: tip Dấu hiệu kiểm tra thành công
Thiết bị vật lý, danh mục biên dịch, biến thể, dung lượng bộ nhớ và các linh kiện ngoại vi khớp nhau hoàn toàn, không phải chọn bừa một tên firmware trông có vẻ gần giống nhất.
:::

<a name="sources"></a>

## Các bước tiếp theo {#sources}

Ngay cả khi đã nhận diện được thiết bị qua hình ảnh, bạn vẫn cần kiểm tra phiên bản phần cứng (revision) và biến thể biên dịch của nó. Tiếp tục xem [cách chọn phần cứng](./choosing-hardware.md) trước khi mua linh kiện, hoặc [hướng dẫn nạp firmware](../firmware/flashing.md) sau khi đã tìm được bản dựng phù hợp.
