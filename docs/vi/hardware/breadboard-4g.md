---
id: breadboard-4g
title: 'Mạch breadboard S3 4G: ML307R và NT26K'
description: 'Kiểm tra riêng rẽ cách đấu nối, tín hiệu firmware và nguồn cấp cho module ML307R và NT26K.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Áp dụng cho firmware v2.6.0; nguồn cấp trên đế mạch, phiên bản module chính xác và độ ổn định của thiết bị hoàn chỉnh vẫn cần thử nghiệm thực tế trên phần cứng.
sourceArticles:
  - DOC-05
translation:
  status: review
  sourceHash: fc5ce9aa53964183092ac34906300d11586c977259a80956ecdc4d6a485c228c
  reviewedAt: '2026-11-15'
---
# Mạch breadboard S3 4G: ML307R và NT26K

Hãy hoàn thiện phần âm thanh, màn hình và nút bấm của [mạch S3 cơ bản](./breadboard-esp32-s3.md) trước khi bổ sung kết nối mạng di động. Hai module ML307R và NT26K sử dụng cấu hình bo mạch riêng biệt; cả hai đều không phải là bản dựng Wi-Fi chỉ đổi tên.

<a name="scope"></a>

## Trước khi bắt đầu: module, SIM và nguồn cấp {#scope}

Kiểm tra đầy đủ mã đế mạch (carrier board), phiên bản firmware/lệnh AT, ăng-ten, thẻ SIM và gói dữ liệu di động. Cùng một dòng chip modem không đảm bảo đế mạch có cùng dải điện áp cấp vào, chân kích hoạt hay mức logic UART. Hãy xác nhận tài liệu thông số điện chính thức và quy trình khởi động của đế mạch đó trước khi cấp nguồn.

::: warning Xác nhận nguồn cấp cho module trước tiên
Các hình bố trí vật lý bên dưới chỉ giúp xác định vị trí hàng chân cắm và sắp xếp module. **Việc nối nguồn ML307R vào một điểm hàn LDO lộ thiên và nối NT26K vào đường 3V3 của bo mạch phát triển không phải là hướng dẫn cấp nguồn chung.** Hãy thiết kế nguồn dựa trên dải điện áp ngõ vào, dòng tải đỉnh và yêu cầu khởi động thực tế của đế mạch. Nếu dùng nguồn riêng, hãy nối chung mass (GND) với ESP32; không cấp đồng thời nguồn pin và nguồn ngoài vào các điểm nguồn chưa xác định rõ.
:::

Các hình bố trí bên dưới nối chân VIN của MAX98357A vào nhánh 3V3. Nếu bạn đang dùng nguồn 5V từ cổng USB cho mạch khuếch đại giống như bản dựng S3 cơ bản, hãy giữ nguyên toàn bộ sơ đồ cấp nguồn âm thanh của bản dựng đó. Cách nối chân SD/GAIN phụ thuộc vào thiết lập hoạt động của module khuếch đại thực tế.

<a name="signals"></a>

## Kết nối tín hiệu của firmware {#signals}

<figure class="source-figure wiring-figure">

[![Kết nối UART, tín hiệu bắt tay và mass chung cho ML307R và NT26K.](../../public/images/en/breadboard-4g-signals-v2.6.0.svg)](../../public/images/en/breadboard-4g-signals-v2.6.0.svg)

<figcaption>Sơ đồ kết nối tín hiệu cho firmware v2.6.0; đây không phải sơ đồ bố trí hàng chân vật lý.</figcaption>
</figure>

Chân GPIO11 là chân nhận dữ liệu (RX) của ESP32 và nối vào chân TX của module. Chân GPIO12 là chân truyền dữ liệu (TX) của ESP32 và nối vào chân RX của module. Riêng NT26K sử dụng thêm chân GPIO9 cho tín hiệu MRDY/DTR và GPIO10 cho tín hiệu SRDY/RI. Các chân âm thanh GPIO4/5/6, GPIO7/15/16 và màn hình OLED GPIO41/42 giữ nguyên như bản dựng S3 cơ bản.

<a name="ml307"></a>

## ML307R: hai kiểu bố trí bo mạch điều khiển {#ml307}

Đế mạch của ML307R có sự khác biệt tùy theo nhà cung cấp. Sử dụng các hình ảnh dưới đây để nhận diện model và các chân giao tiếp. Hãy kiểm tra tài liệu điện tử hiện hành, ăng-ten, thẻ SIM và firmware AT khi chọn mua; giá bán và gói cước hiển thị trong ảnh không phải là hướng dẫn mua hàng.

<div class="module-grid">

<figure class="source-figure">

[![Một loại đế mạch ML307R và thông tin sản phẩm.](../../public/images/zh/doc-05-image-017.webp)](../../public/images/zh/doc-05-image-017.webp)

<figcaption>Một loại đế mạch ML307R và thông tin sản phẩm. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Một loại đế mạch ML307R dạng mini khác.](../../public/images/zh/doc-05-image-018.webp)](../../public/images/zh/doc-05-image-018.webp)

<figcaption>Một loại đế mạch ML307R dạng mini khác. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<a name="ml307-44"></a>

### Bo mạch tiêu chuẩn Espressif: 44 chân {#ml307-44}

<figure class="source-figure wiring-figure">

[![ML307R lắp cùng bo mạch điều khiển 44 chân. Áp dụng thứ tự chân tín hiệu nhưng không sao chép nhánh lấy nguồn LDO cũ.](../../public/images/zh/doc-05-image-021.jpg)](../../public/images/zh/doc-05-image-021.jpg)

<figcaption>ML307R lắp cùng bo mạch điều khiển 44 chân. Áp dụng thứ tự chân tín hiệu nhưng không sao chép nhánh lấy nguồn LDO cũ. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="ml307-42"></a>

### Bo mạch GOOUUU: 42 chân {#ml307-42}

<figure class="source-figure wiring-figure">

[![ML307R lắp cùng bo mạch điều khiển 42 chân. Vị trí hàng chân cắm có khác biệt; UART vẫn sử dụng GPIO11/12.](../../public/images/zh/doc-05-image-026.jpg)](../../public/images/zh/doc-05-image-026.jpg)

<figcaption>ML307R lắp cùng bo mạch điều khiển 42 chân. Vị trí hàng chân cắm có khác biệt; UART vẫn sử dụng GPIO11/12. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="ml307-results"></a>

### Thành phẩm hoàn chỉnh và phần dây đi ngầm {#ml307-results}

<div class="module-grid">

<figure class="source-figure">

[![Bản mở rộng ML307R đã lắp ráp hoàn chỉnh.](../../public/images/zh/doc-05-image-038.jpg)](../../public/images/zh/doc-05-image-038.jpg)

<figcaption>Bản mở rộng ML307R đã lắp ráp hoàn chỉnh. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Hệ thống dây nối ML307R khi tháo rời các module ngoại vi sang bên cạnh.](../../public/images/zh/doc-05-image-039.jpg)](../../public/images/zh/doc-05-image-039.jpg)

<figcaption>Hệ thống dây nối ML307R khi tháo rời các module ngoại vi sang bên cạnh. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<details>
<summary>Nhận diện điểm hàn LDO; đây không phải là bước đấu nguồn</summary>

<figure class="source-figure">

[![Ảnh cận cảnh điểm hàn trên chip LDO. Hướng dẫn này không khuyến nghị lấy nguồn từ mối hàn đó.](../../public/images/zh/doc-05-image-025.webp)](../../public/images/zh/doc-05-image-025.webp)

<figcaption>Ảnh cận cảnh điểm hàn trên chip LDO. Hướng dẫn này không khuyến nghị lấy nguồn từ mối hàn đó. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</details>

<a name="nt26"></a>

## NT26K: hai kiểu bố trí bo mạch điều khiển {#nt26}

<figure class="source-figure">

[![Sơ đồ chân đế mạch NT26K. Đối chiếu các chân tín hiệu và ngõ cấp nguồn theo đúng phiên bản mạch thực tế.](../../public/images/zh/doc-05-image-019.webp)](../../public/images/zh/doc-05-image-019.webp)

<figcaption>Sơ đồ chân đế mạch NT26K. Đối chiếu các chân tín hiệu và ngõ cấp nguồn theo đúng phiên bản mạch thực tế. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="nt26-44"></a>

### Bo mạch tiêu chuẩn Espressif: 44 chân {#nt26-44}

<figure class="source-figure wiring-figure">

[![NT26K lắp cùng bo mạch điều khiển 44 chân. Kiểm tra các chân GPIO9/10/11/12 theo cấu hình và đánh giá riêng đường nguồn 3V3 hiển thị trong ảnh.](../../public/images/zh/doc-05-image-031.webp)](../../public/images/zh/doc-05-image-031.webp)

<figcaption>NT26K lắp cùng bo mạch điều khiển 44 chân. Kiểm tra các chân GPIO9/10/11/12 theo cấu hình và đánh giá riêng đường nguồn 3V3 hiển thị trong ảnh. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Mẫu thử nghiệm NT26K dùng bo mạch điều khiển tiêu chuẩn.](../../public/images/zh/doc-05-image-032.webp)](../../public/images/zh/doc-05-image-032.webp)

<figcaption>Mẫu thử nghiệm NT26K dùng bo mạch điều khiển tiêu chuẩn. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="nt26-42"></a>

### Bo mạch GOOUUU: 42 chân {#nt26-42}

<figure class="source-figure wiring-figure">

[![NT26K lắp cùng bo mạch điều khiển 42 chân. Kiểu nối UART hai dây giống ML307R chưa phải là kết nối đầy đủ cho NT26K.](../../public/images/zh/doc-05-image-033.webp)](../../public/images/zh/doc-05-image-033.webp)

<figcaption>NT26K lắp cùng bo mạch điều khiển 42 chân. Kiểu nối UART hai dây giống ML307R chưa phải là kết nối đầy đủ cho NT26K. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Mẫu thử nghiệm NT26K dùng bo mạch điều khiển GOOUUU.](../../public/images/zh/doc-05-image-034.webp)](../../public/images/zh/doc-05-image-034.webp)

<figcaption>Mẫu thử nghiệm NT26K dùng bo mạch điều khiển GOOUUU. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="build"></a>

## Chọn firmware và kiểm thử theo từng giai đoạn {#build}

| Module | Bo mạch firmware | Các tùy chọn biên dịch trên v2.6.0 |
| --- | --- | --- |
| ML307R | `bread-compact-ml307` | Màn hình 128×32; hoặc chọn `bread-compact-ml307-128x64` |
| NT26K | `bread-compact-nt26` | Mặc định màn hình SSD1306 128×32 |

Tham khảo thêm [cấu hình ML307](https://github.com), [các biến thể biên dịch ML307](https://github.com), [cấu hình NT26](https://github.com) và [các biến thể biên dịch NT26](https://github.com).

1. Khi đã ngắt nguồn, kiểm tra chiều truyền nhận của UART, các đường tín hiệu bắt tay (handshake) của NT26K, đường mass chung GND và đường cấp nguồn đã xác nhận.
2. Biên dịch firmware cho đúng bo mạch modem tương ứng và làm theo [hướng dẫn nạp firmware](../firmware/flashing.md). Việc chỉ nối thêm vài sợi dây vào bản dựng Wi-Fi cơ bản sẽ không thể hoạt động.
3. Theo dõi [nhật ký cổng Serial (logs)](../faq/serial-logs.md). Phân biệt rõ các trạng thái: modem không phản hồi, đăng ký SIM/mạng di động, kết nối dữ liệu 4G và kết nối OTA/trò chuyện.
