---
id: breadboard-esp32-c3
title: Mạch breadboard C3 với âm thanh ES8311
description: Xác định module giải mã âm thanh (Codec) và sơ đồ chân trước khi lắp ráp bộ âm thanh C3.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-12
translation:
  status: review
  sourceHash: d8246944edc45266132d984249c7a60fa2d9437297ba5fa20bde0456988fc1dc
  reviewedAt: '2026-11-15'
---
# Mạch breadboard C3 với âm thanh ES8311

Bản dựng này sử dụng bo mạch C3-N16-SF kết hợp với module âm thanh ES8311/NS4150, dựa trên nền tảng Xmini-C3. Đây không phải là hướng dẫn đấu nối chung cho mọi bo mạch C3 dùng micro INMP441 và mạch khuếch đại MAX98357A.

<a name="scope"></a>

## Chuẩn bị {#scope}

Kiểm tra dòng chip mục tiêu, dung lượng Flash, sơ đồ nguyên lý của module Codec, chân kích hoạt công suất (PA enable) và màn hình. Module ES8311 bắt buộc phải tích hợp sẵn mạch micro analog và mạch khuếch đại công suất cần thiết. Kiểm tra xem ký hiệu chân DI/DO trên module được đặt theo góc nhìn của chip Codec hay của vi điều khiển.

<a name="parts"></a>

## Nhận diện linh kiện {#parts}

<figure class="source-figure">

[![Module vi điều khiển C3.](../../public/images/zh/doc-12-image-001.webp)](../../public/images/zh/doc-12-image-001.webp)

<figcaption>Module vi điều khiển C3.</figcaption>
</figure>

<figure class="source-figure">

[![Module âm thanh ES8311 và NS4150; kiểm tra chính xác phiên bản và ký hiệu in trên mạch.](../../public/images/zh/doc-12-image-002.webp)](../../public/images/zh/doc-12-image-002.webp)

<figcaption>Module âm thanh ES8311 và NS4150; kiểm tra chính xác phiên bản và ký hiệu in trên mạch.</figcaption>
</figure>

<figure class="source-figure">

[![Module màn hình OLED.](../../public/images/zh/doc-12-image-009.webp)](../../public/images/zh/doc-12-image-009.webp)

<figcaption>Module màn hình OLED.</figcaption>
</figure>

Module âm thanh này tích hợp cả hai chip ES8311 và NS4150B. Không áp dụng sơ đồ đấu dây tách rời INMP441/MAX98357A của bản dựng S3. Vi điều khiển, chip Codec và màn hình OLED được minh họa ở trên; các linh kiện còn lại nằm ngay bên dưới.

<div class="module-grid">

<figure class="source-figure">

[![Loa hộp dành cho bản dựng C3.](../../public/images/zh/doc-12-image-003.webp)](../../public/images/zh/doc-12-image-003.webp)

<figcaption>Loa hộp dành cho bản dựng C3. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Loa thay thế; đảm bảo trở kháng và giắc cắm khớp với mạch khuếch đại.](../../public/images/zh/doc-05-image-010.webp)](../../public/images/zh/doc-05-image-010.webp)

<figcaption>Loa thay thế; đảm bảo trở kháng và giắc cắm khớp với mạch khuếch đại. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<div class="module-grid">

<figure class="source-figure">

[![Dây nối cứng ngắn cho breadboard C3.](../../public/images/zh/doc-05-image-011.webp)](../../public/images/zh/doc-05-image-011.webp)

<figcaption>Dây nối cứng ngắn cho breadboard C3. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Dây cắm Dupont nối giữa các module C3.](../../public/images/zh/doc-05-image-012.webp)](../../public/images/zh/doc-05-image-012.webp)

<figcaption>Dây cắm Dupont nối giữa các module C3. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<div class="module-grid">

<figure class="source-figure">

[![Các bảng mạch breadboard ghép lại cho bản dựng C3.](../../public/images/zh/doc-05-image-013.jpg)](../../public/images/zh/doc-05-image-013.jpg)

<figcaption>Các bảng mạch breadboard ghép lại cho bản dựng C3. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Sơ đồ kết nối bên trong breadboard.](../../public/images/zh/doc-05-image-014.webp)](../../public/images/zh/doc-05-image-014.webp)

<figcaption>Sơ đồ kết nối bên trong breadboard. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<figure class="source-figure">

[![Nút nhấn cơ tùy chọn; kiểm tra xem cặp chân nào ở mỗi bên đã được nối thông sẵn bên trong.](../../public/images/zh/doc-05-image-020.webp)](../../public/images/zh/doc-05-image-020.webp)

<figcaption>Nút nhấn cơ tùy chọn; kiểm tra xem cặp chân nào ở mỗi bên đã được nối thông sẵn bên trong. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="wiring"></a>
## 1. Kiểm tra sơ đồ chân của firmware {#wiring}

Cấu hình `xmini/c3` trên phiên bản v2.6.0 sử dụng các chân GPIO sau. Phần cứng mới lắp ráp phải khớp thực tế với bảng này; nếu không, hãy tạo một [bo mạch tùy chỉnh](../development/custom-board.md).

| Chức năng | GPIO |
| --- | --- |
| ES8311 I2C SDA / SCL | 3 / 4 |
| I2S MCLK / BCLK / WS | 10 / 8 / 6 |
| Dữ liệu ADC từ Codec truyền vào DIN của vi điều khiển | 7 |
| Dữ liệu DOUT từ vi điều khiển truyền ra DAC của Codec | 5 |
| Chân kích hoạt khuếch đại (PA enable) | 11 |
| Nút BOOT | 9 |

Màn hình và chip Codec có thể dùng chung bus I2C. Hãy kiểm tra riêng rẽ đường bus, mức điện áp và địa chỉ thiết bị. Sử dụng dây cắm ngắn và đường nối mass chung (GND) chắc chắn. Tên chân GPIO trùng khớp không thay thế cho việc kiểm tra yêu cầu nguồn cấp của từng module.

<a name="wiring-diagram"></a>

### Sơ đồ đấu nối tổng thể và chiều đặt module {#wiring-diagram}

<figure class="source-figure wiring-figure">

[![Kết nối tín hiệu Codec C3, chân kích hoạt PA và màn hình OLED.](../../public/images/en/breadboard-c3-signals-v2.6.0.svg)](../../public/images/en/breadboard-c3-signals-v2.6.0.svg)

<figcaption>Sơ đồ tín hiệu cho firmware v2.6.0; đây không phải sơ đồ vị trí chân vật lý.</figcaption>
</figure>

Hình bố trí vật lý bên dưới có ghi nhãn cả **3V3 và VCC/5VIN trên module âm thanh. Đây là hai chân cấp nguồn tách biệt**. Hãy dùng sơ đồ nguyên lý của module cụ thể để phân biệt nguồn cấp cho chip Codec và nguồn cấp cho mạch khuếch đại công suất; không nối chập hai chân này với nhau và không cắm nhầm lẫn. Hiểu đúng chiều tín hiệu DI/DO theo quy ước của module này: ngõ ra ADC của Codec nối vào GPIO7 của ESP32, và GPIO5 của ESP32 nối vào ngõ vào DAC của Codec.

<figure class="source-figure wiring-figure">

[![Bố cục vật lý của C3-N16-SF, ES8311/NS4150B và OLED. Đọc kỹ ghi chú về chiều tín hiệu và hai chân nguồn tách biệt ở trên.](../../public/images/zh/doc-12-image-011.webp)](../../public/images/zh/doc-12-image-011.webp)

<figcaption>Bố cục vật lý của C3-N16-SF, ES8311/NS4150B và OLED. Đọc kỹ ghi chú về chiều tín hiệu và hai chân nguồn tách biệt ở trên. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="build"></a>

## 2. Cài đặt và sử dụng firmware {#build}

1. Nếu lắp ráp lại y hệt phần cứng hiện có, hãy chọn đúng bản dựng `xmini/c3`. Phiên bản V3 và bản 4G sử dụng cấu hình khác.
2. Tải phiên bản tương ứng từ [trình biên dịch trực tuyến](../firmware/online-builder.md) hoặc mục [tải xuống chính thức](../firmware/downloads.md), sau đó làm theo [hướng dẫn nạp firmware](../firmware/flashing.md).
3. Kiểm tra âm thanh khởi động, màn hình và các nút bấm trước khi [kết nối mạng và liên kết thiết bị](../getting-started/wifi-and-binding.md).
4. Kiểm tra chức năng ghi âm và phát lại trước khi bật mô hình từ khóa đánh thức tương thích với dòng chip này.

Chip C3 hỗ trợ các cấu hình WakeNet dung lượng nhẹ tương thích, và dự án cũng có các bo mạch C3 4G. Việc chạy mô hình vẫn phụ thuộc vào tài nguyên phần cứng khả dụng, bao gồm việc chip không có PSRAM. Xem chi tiết tại [từ khóa đánh thức](../development/wake-words.md).

<a name="assembly-results"></a>

## Hình ảnh thành phẩm và biến thể màn hình {#assembly-results}

<a name="oled-result"></a>

### Bản dựng màn hình OLED cơ bản {#oled-result}

<div class="module-grid">

<figure class="source-figure">

[![Thành phẩm bản dựng C3 và màn hình OLED.](../../public/images/zh/doc-12-image-012.jpg)](../../public/images/zh/doc-12-image-012.jpg)

<figcaption>Thành phẩm bản dựng C3 và màn hình OLED. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Cách đi dây ở mặt còn lại của bản dựng C3 và màn hình OLED.](../../public/images/zh/doc-12-image-013.webp)](../../public/images/zh/doc-12-image-013.webp)

<figcaption>Cách đi dây ở mặt còn lại của bản dựng C3 và màn hình OLED. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<a name="lcd-example"></a>

### Khả năng tương thích màn hình màu {#lcd-example}

Bản dựng `xmini/c3` phiên bản v2.6.0 sử dụng ở đây dùng màn hình OLED giao tiếp I2C và không hỗ trợ gắn trực tiếp màn hình màu giao tiếp SPI. Biến thể dùng màn hình màu đòi hỏi trình điều khiển màn hình, chân GPIO SPI, mã nguồn bo mạch và cấu hình biên dịch được kiểm chứng riêng. Bạn có thể tham khảo [mã nguồn bo mạch Surfer-C3-1.14TFT](https://github.com/78/xiaozhi-esp32/tree/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/surfer-c3-1.14tft) trong kho firmware; sơ đồ đấu nối của mạch đó khác với hướng dẫn này và không thể áp dụng trực tiếp.

### Xử lý lỗi khởi tạo ES8311

Khi gặp các thông báo lỗi như `Fail to write to dev 30`, `I2C read/write error` hoặc `ES8311 ... Open fail`, hãy lưu lại thông báo lỗi đầu tiên và kiểm tra theo trình tự sau:

1. Ngắt nguồn điện và kiểm tra hai dây SDA/SCL, nguồn cấp cho chip Codec, đường mass chung GND và các đầu cắm lỏng lẻo. Không nhầm lẫn giữa bus điều khiển I2C với các đường tín hiệu âm thanh I2S.
2. Rút ngắn chiều dài dây cắm I2C trên breadboard, đặt module Codec lại gần vi điều khiển hơn và đưa ra xa các nguồn gây nhiễu. Không di chuyển hoặc rút/cắm module khi đang cấp điện.
3. Nếu màn hình OLED đang dùng chung bus I2C này, hãy ngắt nguồn rồi tháo màn hình ra, sau đó khởi động lại để kiểm tra xem ngoại vi kia hay dây nối của nó có phải là nguyên nhân gây lỗi không.
4. Nếu vẫn lỗi, hãy chạy quét địa chỉ I2C trong môi trường gỡ lỗi bo mạch để kiểm tra địa chỉ thực tế, điện trở kéo lên (pull-up) và trình điều khiển. Không tự đoán một địa chỉ thập lục phân (hex) khác từ con số thập phân `30` trong nhật ký, cũng không áp dụng sơ đồ dây GPIO0/1 của bản V3 cho bo mạch này.

Ghi lại nhật ký khởi động sau mỗi lần thay đổi một yếu tố. Các cách chỉnh menu tạm thời dành cho thư viện cũ không áp dụng cho mọi bản phát hành mới; hãy sử dụng đúng phiên bản firmware được cố định trong hướng dẫn này cho việc giao tiếp và tích hợp Codec.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Chip Codec và mạch khuếch đại chỉ định phải ghi âm và phát âm thanh rõ ràng, màn hình hiển thị tốt và nút bấm kích hoạt được cuộc trò chuyện thành công. Không xảy ra lỗi I2C, tiếng rè liên tục hay tự khởi động lại. Khi gặp sự cố I2C, hãy kiểm tra đường SDA/SCL, điện trở kéo lên, nguồn cấp và địa chỉ thiết bị trước khi nghi ngờ firmware bị hỏng.

<a name="materials"></a>

## Firmware và các bước tiếp theo {#materials}

Hãy sử dụng bản dựng chính thức tương thích thay vì các tệp `.bin` gỡ lỗi không rõ nguồn gốc. Thư mục [xmini/c3 trong kho firmware](https://github.com/78/xiaozhi-esp32/tree/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/xmini/c3) quản lý cấu hình của bo mạch này. Nếu sử dụng bo mạch đã lắp ráp sẵn, hãy xem hướng dẫn về [dòng bo mạch Xmini](./boards/xmini-c3.md).
