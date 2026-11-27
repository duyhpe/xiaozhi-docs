---
id: breadboard-camera
title: Mạch breadboard Camera ESP32-S3
description: 'Đối chiếu chân camera, màn hình màu, âm thanh và firmware như một bản dựng đồng bộ hoàn chỉnh.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-07
translation:
  status: review
  sourceHash: 7ef83bda1dd98468642460ca93dd840a81009ebffce384b8881ac7e0f1f7faf9
  reviewedAt: '2026-11-15'
---
# Mạch breadboard Camera ESP32-S3

Hướng dẫn này trình bày cấu hình `bread-compact-wifi-s3cam`, một biến thể kết hợp đồng thời camera, màn hình SPI và âm thanh. Việc gắn thêm camera vào mạch đấu dây S3 OLED/LCD thông thường sẽ không tự biến nó thành bản dựng này.

<a name="finished-overview"></a>

## Xem trước thành phẩm {#finished-overview}

<figure class="source-figure">

[![Ví dụ lắp ráp hoàn chỉnh mạch breadboard Camera.](../../public/images/zh/doc-07-image-004.webp)](../../public/images/zh/doc-07-image-004.webp)

<figcaption>Ví dụ lắp ráp hoàn chỉnh mạch breadboard Camera.</figcaption>
</figure>

<figure class="source-figure">

[![Một góc nhìn khác của mẫu thử nghiệm; sử dụng bảng sơ đồ chân theo phiên bản trên trang này để đấu nối tín hiệu.](../../public/images/zh/doc-07-image-005.webp)](../../public/images/zh/doc-07-image-005.webp)

<figcaption>Một góc nhìn khác của mẫu thử nghiệm; sử dụng bảng sơ đồ chân theo phiên bản trên trang này để đấu nối tín hiệu.</figcaption>
</figure>

<a name="scope"></a>

## Chuẩn bị {#scope}

Kiểm tra dung lượng bộ nhớ của S3, mã cảm biến camera cùng sơ đồ chân, chip điều khiển màn hình và độ phân giải, micro và mạch khuếch đại. Ví dụ này sử dụng bo mạch N16R8 CAM và cảm biến OV3660. Các cảm biến OV2640, OV5640 hoặc loại khác đều cần kiểm tra riêng trình điều khiển, thứ tự chân và khả năng chụp ảnh. Chỉ riêng chân cắm giống nhau không đảm bảo khả năng tương thích.

<figure class="source-figure">

[![Module camera và cáp dẹt kết nối.](../../public/images/zh/doc-07-image-001.webp)](../../public/images/zh/doc-07-image-001.webp)

<figcaption>Module camera và cáp dẹt kết nối.</figcaption>
</figure>

<figure class="source-figure">

[![Module màn hình LCD.](../../public/images/zh/doc-06-image-001.webp)](../../public/images/zh/doc-06-image-001.webp)

<figcaption>Module màn hình LCD.</figcaption>
</figure>

<figure class="source-figure">

[![Ký hiệu giao tiếp trên màn hình LCD.](../../public/images/zh/doc-06-image-002.webp)](../../public/images/zh/doc-06-image-002.webp)

<figcaption>Ký hiệu giao tiếp trên màn hình LCD.</figcaption>
</figure>

<a name="wiring"></a>

## 1. Kiểm tra bảng sơ đồ tín hiệu {#wiring}

Các chân tín hiệu dưới đây được trích từ [cấu hình bo mạch theo phiên bản](https://github.com). Đồng thời hãy đối chiếu nguồn cấp, chiều cắm cáp dẹt và chân kích hoạt ngoại vi theo tài liệu của module thực tế.

| Module | Tín hiệu → GPIO |
| --- | --- |
| Micro | WS→1, SCK→2, dữ liệu vào→42 |
| Mạch khuếch đại | DIN→39, BCLK→40, LRC→41 |
| Màn hình LCD | CLK→19, MOSI→20, DC→47, RST→21, CS→45, đèn nền→38 |
| Camera D0–D7 | 11, 9, 8, 10, 12, 18, 17, 16 |
| Điều khiển Camera | XCLK→15, PCLK→13, VSYNC→6, HREF→7, SIOC→5, SIOD→4 |

Màn hình LCD sử dụng hai chân GPIO19/20. Đặc biệt lưu ý kiểm tra sơ đồ mạch nếu bo mạch dùng cổng USB gốc (native USB) của chip; không tự ý đấu lại hai đường dữ liệu này. Ngắt nguồn điện và rà soát từng chân tín hiệu. Không áp dụng sơ đồ dây âm thanh GPIO4/5/6 của bản breadboard thông thường vào đây.

<a name="wiring-diagram"></a>

### Sơ đồ tín hiệu bo mạch Camera {#wiring-diagram}

Nếu cáp dẹt của camera đã được đấu sẵn trên đế mạch CAM, bạn không cần tháo ra để nối bằng dây rời. Trước tiên hãy kiểm tra xem các chân trên đế mạch có khớp với cấu hình firmware này không. Sơ đồ dưới đây tổng hợp các chân âm thanh, màn hình LCD và cảm biến để tiện đối chiếu với ảnh lắp ráp thực tế.

<figure class="source-figure wiring-figure">

[![Sơ đồ chân âm thanh, màn hình và camera trên bo mạch S3 Camera.](../../public/images/en/breadboard-camera-signals-v2.6.0.svg)](../../public/images/en/breadboard-camera-signals-v2.6.0.svg)

<figcaption>Khớp với cấu hình bo mạch camera v2.6.0. Nhấp vào ảnh để xem kích thước đầy đủ. Kiểm tra nguồn cấp của module và mạch đi dây sẵn trên bo CAM theo tài liệu phần cứng cụ thể.</figcaption>
</figure>

<a name="build"></a>

## 2. Biên dịch và kiểm thử từng chức năng {#build}

1. Trong [trình biên dịch trực tuyến](../firmware/online-builder.md), chọn chính xác bo mạch camera, biến thể và thông số màn hình. Cấu hình mặc định hiện tại trong thư mục là màn hình ST7789 độ phân giải 240×320.
2. Thiết lập chế độ lật/soi gương hình ảnh cho khớp với hướng lắp đặt vật lý của camera. Nếu bo mạch không có tùy chọn này, không chọn sang tên bo mạch khác chỉ để bật tính năng lật ảnh.
3. Làm theo [hướng dẫn nạp firmware](../firmware/flashing.md), sau đó kiểm tra hiển thị màn hình và âm thanh trước tiên.
4. [Kết nối mạng và liên kết thiết bị](../getting-started/wifi-and-binding.md), đồng thời kiểm tra chức năng trò chuyện bình thường.
5. Sử dụng tính năng nhận diện hình ảnh được dịch vụ hiện tại hỗ trợ để kiểm tra góc quay, độ phơi sáng, độ nét và kết quả phản hồi thực tế.

Biên dịch thành công không đồng nghĩa với việc camera đã hoạt động. Nếu gặp lỗi `camera init`, hãy kiểm tra nhật ký (logs), loại cảm biến và nguồn cấp. Nếu ảnh thu được bị đen toàn bộ, hãy kiểm tra cáp dẹt và nắp ống kính thay vì thử nạp hàng loạt tệp firmware không rõ nguồn gốc.

<a name="materials"></a>

## Video hướng dẫn đấu nối và tài liệu {#materials}

Video dưới đây minh họa cách đấu nối bộ phần cứng này. Nếu dùng cảm biến khác, hãy kiểm tra riêng trình điều khiển và cáp dẹt của nó. Tải firmware tương thích tại mục [chọn firmware](../firmware/downloads.md).

<SourceMaterials article="DOC-07" />

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Nội dung và chiều hiển thị của hình ảnh phải chính xác. Âm thanh, màn hình, kết nối Wi-Fi và tính năng nhận diện hình ảnh phải hoạt động đồng bộ, không xảy ra hiện tượng sập nguồn khởi động lại hay xung đột chân cắm trong quá trình thử nghiệm liên tục. Khi báo cáo sự cố, hãy gửi kèm mã camera, phiên bản bo mạch, phiên bản mã nguồn và nhật ký đã ẩn thông tin nhạy cảm.
