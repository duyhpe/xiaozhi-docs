---
id: breadboard-esp32-s3
title: Lắp mạch breadboard ESP32-S3 cơ bản cho XiaoZhi
description: 'Tự lắp ráp thiết bị giao tiếp giọng nói XiaoZhi đầu tiên với cấu hình micro, mạch khuếch đại và màn hình OLED cố định.'
status: review
reviewedAt: '2026-11-15'
sourceArticles:
  - DOC-05
  - DOC-10
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Sơ đồ chân đã được so sánh với mã nguồn bo mạch v2.6.0 và tài liệu linh kiện; việc đấu nối hoàn chỉnh, tải nguồn và các module vật lý khác nhau vẫn cần thử nghiệm thực tế.
translation:
  status: review
  sourceHash: 8c6b70084165aaff4e78c88625964e5010e8ffabb2a3414053c455bb50561512
  reviewedAt: '2026-11-15'
---

# Lắp mạch breadboard ESP32-S3 cơ bản cho XiaoZhi

Trước tiên hãy hoàn thiện một thiết bị Wi-Fi cơ bản với một micro, một loa và một màn hình OLED. Sau đó mới mở rộng thêm màn hình màu, camera hoặc module 4G. Các biến thể mở rộng có thể sử dụng sơ đồ chân và firmware khác biệt.

<a name="finished-overview"></a>

## Xem trước thành phẩm {#finished-overview}

Ảnh đầu tiên minh họa bản dựng cơ bản gồm micro và mạch khuếch đại; ảnh thứ hai bổ sung thêm màn hình OLED. Hãy hoàn thiện cấu hình này trước khi cân nhắc nâng cấp màn hình màu, camera hay 4G. Liên kết đến hướng dẫn đấu nối của các biến thể đó nằm ở cuối trang.

<div class="module-grid">

<figure class="source-figure">

[![Bản dựng cơ bản: ESP32-S3, micro, mạch khuếch đại và loa.](../../public/images/zh/doc-05-image-035.jpg)](../../public/images/zh/doc-05-image-035.jpg)

<figcaption>Bản dựng cơ bản: ESP32-S3, micro, mạch khuếch đại và loa. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Mở rộng OLED: bổ sung màn hình vào bản dựng âm thanh cơ bản.](../../public/images/zh/doc-05-image-037.jpg)](../../public/images/zh/doc-05-image-037.jpg)

<figcaption>Mở rộng OLED: bổ sung màn hình vào bản dựng âm thanh cơ bản. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>


<a name="scope"></a>

## Phần cứng sử dụng trong hướng dẫn này {#scope}

| Thành phần | Lựa chọn |
| --- | --- |
| Bo mạch phát triển | ESP32-S3-DevKitC-1, WROOM-1 N16R8: 16MB Flash và 8MB PSRAM |
| Micro | Module I2S INMP441 |
| Mạch khuếch đại | Module I2S MAX98357A sử dụng mạch kích hoạt (enable) và khuếch đại (gain) mặc định |
| Loa | Một loa thụ động 8Ω, 3W |
| Màn hình | I2C SSD1306, 128×32; loại 128×64 cần dùng đúng biến thể firmware tương ứng |
| Bo mạch firmware | `bread-compact-wifi`; chọn `bread-compact-wifi-128x64` nếu dùng màn hình 128×64 |
| Linh kiện khác | Bảng mạch breadboard, dây cắm ngắn, cáp USB truyền dữ liệu tốt và nguồn USB đủ tải |

Sơ đồ chân tuân theo [cấu hình firmware v2.6.0](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/boards/bread-compact-wifi/config.h), sử dụng kiểu đấu nối I2S tách biệt ngõ vào/ra mặc định. Các dòng chip khác, bản N8R2, biến thể camera, LCD và 4G cần kiểm tra cấu hình riêng; ngoại hình giống nhau không đủ cơ sở để dùng chung bảng chân này.

<a name="materials"></a>


## Danh sách linh kiện: nhận diện từng module {#materials}

Sử dụng các hình ảnh dưới đây để nhận diện linh kiện cho bản dựng này. Hãy kiểm tra ký hiệu in trên mạch, mã linh kiện và chiều hàn chân cắm thay vì dựa vào màu sắc trong ảnh của người bán. Các bước đấu nối tại đây áp dụng cụ thể cho INMP441 và MAX98357A.

<a name="board-identification"></a>

### Bo mạch phát triển ESP32-S3 {#board-identification}

Đọc đầy đủ mã module in trên nắp kim loại chống nhiễu, sau đó xác định bố cục hàng chân cắm. Bo mạch tiêu chuẩn 44 chân và bo mạch GOOUUU 42 chân có [sơ đồ bố trí riêng ở bên dưới](#board-layouts). Số lượng chân cắm khác nhau không đồng nghĩa với việc firmware GPIO khác nhau.

<div class="module-grid">

<figure class="source-figure">

[![Ký hiệu trên module: kiểm tra dòng chữ WROOM-1 và N16R8.](../../public/images/zh/doc-05-image-001.webp)](../../public/images/zh/doc-05-image-001.webp)

<figcaption>Ký hiệu trên module: kiểm tra dòng chữ WROOM-1 và N16R8. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Bo mạch phát triển ESP32-S3-DevKitC-1.](../../public/images/zh/doc-05-image-002.webp)](../../public/images/zh/doc-05-image-002.webp)

<figcaption>Bo mạch phát triển ESP32-S3-DevKitC-1. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<details>
<summary>Nhận diện điểm hàn đèn RGB trên một số phiên bản bo mạch cũ</summary>

<figure class="source-figure">
[![Chi tiết khu vực đèn RGB trên phiên bản bo mạch cũ, chỉ dùng để nhận diện. Không cần hàn nối lại mạch chỉ để làm sáng đèn RGB.](../../public/images/zh/doc-05-image-003.webp)](../../public/images/zh/doc-05-image-003.webp)

<figcaption>Chi tiết khu vực đèn RGB trên phiên bản bo mạch cũ, chỉ dùng để nhận diện. Không cần hàn nối lại mạch chỉ để làm sáng đèn RGB. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

Đèn LED RGB phát sáng không phải là dấu hiệu kiểm tra đấu nối thành công cho mọi mạch. Hướng dẫn này kiểm tra hoạt động thông qua nút bấm, màn hình, ghi âm/phát lại và trò chuyện.

</details>

<a name="microphone-modules"></a>

### Micro kỹ thuật số {#microphone-modules}

<figure class="source-figure">

[![Module INMP441: xác định các chân VDD, GND, WS, SCK, SD và L/R.](../../public/images/zh/doc-05-image-004.webp)](../../public/images/zh/doc-05-image-004.webp)
<figcaption>Module INMP441: xác định các chân VDD, GND, WS, SCK, SD và L/R. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

ZTS6672 và ICS43434 cũng là các module micro phổ biến. Các hình ảnh dưới đây giúp nhận diện chúng; trước khi thay thế, hãy kiểm tra chiều chân cắm, kênh tín hiệu và cấu hình firmware.

<div class="module-grid">

<figure class="source-figure">

[![Module micro ZTS6672.](../../public/images/zh/doc-05-image-005.webp)](../../public/images/zh/doc-05-image-005.webp)

<figcaption>Module micro ZTS6672. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Module micro ICS43434.](../../public/images/zh/doc-05-image-006.webp)](../../public/images/zh/doc-05-image-006.webp)

<figcaption>Module micro ICS43434. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<a name="audio-modules"></a>

### Mạch khuếch đại kỹ thuật số và loa {#audio-modules}

MAX98357A nhận tín hiệu số I2S; đấu hai đầu dây loa vào hai cọc đầu ra của mạch. Ảnh của module HT517 cũng được cung cấp để nhận diện. Nếu dùng module đó, hãy kiểm tra thông số ngõ vào thực tế, nguồn cấp, cơ chế chân kích hoạt và giắc cắm loa thay vì chỉ đổi chỗ theo vị trí chân.

<div class="module-grid">

<figure class="source-figure">

[![Module MAX98357A, hàng chân cắm và cọc đấu loa.](../../public/images/zh/doc-05-image-007.webp)](../../public/images/zh/doc-05-image-007.webp)

<figcaption>Module MAX98357A, hàng chân cắm và cọc đấu loa. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Module khuếch đại HT517 và giắc cắm.](../../public/images/zh/doc-05-image-008.webp)](../../public/images/zh/doc-05-image-008.webp)

<figcaption>Module khuếch đại HT517 và giắc cắm. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<div class="module-grid">

<figure class="source-figure">

[![Loa hộp 8Ω; hướng dẫn này sử dụng loại 8Ω, 3W.](../../public/images/zh/doc-05-image-009.webp)](../../public/images/zh/doc-05-image-009.webp)

<figcaption>Loa hộp 8Ω; hướng dẫn này sử dụng loại 8Ω, 3W. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Ví dụ loa hộp 4Ω; tải của mạch khuếch đại và mức dự phòng công suất cần được kiểm tra riêng.](../../public/images/zh/doc-05-image-010.webp)](../../public/images/zh/doc-05-image-010.webp)

<figcaption>Ví dụ loa hộp 4Ω; tải của mạch khuếch đại và mức dự phòng công suất cần được kiểm tra riêng. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<a name="breadboard-parts"></a>

### Bảng mạch breadboard, dây cắm và nút nhấn {#breadboard-parts}

Ghép hai bảng mạch breadboard 400 lỗ lại với nhau giúp đặt vi điều khiển ở chính giữa và bố trí các module ở hai bên. Rãnh giữa chia tách hai nhóm 5 lỗ tiếp xúc trên mỗi hàng. Khi đã ngắt nguồn, hãy kiểm tra tính thông mạch của thanh nguồn và xem thanh nguồn dọc có bị ngắt quãng ở đoạn giữa hay không.

<div class="module-grid">

<figure class="source-figure">

[![Hai bảng mạch breadboard ghép lại với nhau.](../../public/images/zh/doc-05-image-013.jpg)](../../public/images/zh/doc-05-image-013.jpg)

<figcaption>Hai bảng mạch breadboard ghép lại với nhau. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Sơ đồ tiếp xúc bên trong breadboard: các lỗ nằm cạnh nhau chưa chắc đã nối thông với nhau.](../../public/images/zh/doc-05-image-014.webp)](../../public/images/zh/doc-05-image-014.webp)

<figcaption>Sơ đồ tiếp xúc bên trong breadboard: các lỗ nằm cạnh nhau chưa chắc đã nối thông với nhau. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>
<div class="module-grid">

<figure class="source-figure">

[![Dây nối cứng ngắn dùng trên breadboard.](../../public/images/zh/doc-05-image-011.webp)](../../public/images/zh/doc-05-image-011.webp)

<figcaption>Dây nối cứng ngắn dùng trên breadboard. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Dây cắm Dupont: chọn đầu cắm đực/cái phù hợp với chân bo mạch và module.](../../public/images/zh/doc-05-image-012.webp)](../../public/images/zh/doc-05-image-012.webp)

<figcaption>Dây cắm Dupont: chọn đầu cắm đực/cái phù hợp với chân bo mạch và module. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<figure class="source-figure">

[![Nút nhấn cơ tùy chọn: hai chân cùng một phía có thể đã nối thông sẵn bên trong. Hãy đo thông mạch trước khi lắp.](../../public/images/zh/doc-05-image-020.webp)](../../public/images/zh/doc-05-image-020.webp)

<figcaption>Nút nhấn cơ tùy chọn: hai chân cùng một phía có thể đã nối thông sẵn bên trong. Hãy đo thông mạch trước khi lắp. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="oled-modules"></a>

### Màn hình OLED {#oled-modules}

<div class="module-grid">

<figure class="source-figure">

[![Màn hình OLED 0.91 inch độ phân giải 128×32.](../../public/images/zh/doc-05-image-015.webp)](../../public/images/zh/doc-05-image-015.webp)

<figcaption>Màn hình OLED 0.91 inch độ phân giải 128×32. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Màn hình OLED 0.96 inch độ phân giải 128×64.](../../public/images/zh/doc-05-image-016.webp)](../../public/images/zh/doc-05-image-016.webp)

<figcaption>Màn hình OLED 0.96 inch độ phân giải 128×64. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

Cả hai loại màn hình đều có thể dùng chân GPIO41/42 cho giao tiếp I2C, nhưng cần nạp firmware khớp với độ phân giải tương ứng. Kiểm tra thứ tự chân và vị trí VCC/GND theo ký hiệu in trên màn hình thực tế của bạn.

Thông tin nhận diện module 4G, nguồn cấp và sơ đồ bố trí các biến thể được tổng hợp tại [hướng dẫn mở rộng ML307R / NT26K](./breadboard-4g.md). Bạn chưa cần đến chúng cho bản dựng Wi-Fi đầu tiên.

<a name="prepare"></a>

## 1. Xác định hàng chân cắm và đường cấp nguồn {#prepare}

Ngắt toàn bộ nguồn điện trước khi đấu nối. Xác định các chân dựa trên số hiệu `GPIO` và ký hiệu nguồn in trên mạch, không dựa vào góc chụp ảnh hay số thứ tự đếm chân. Các thanh nguồn trên breadboard cũng có thể bị ngắt quãng ở giữa.

- Cấp nguồn cho INMP441 và màn hình OLED trong hướng dẫn này từ chân `3V3`, không dùng 5V.
- Cấp nguồn cho module MAX98357A từ chân `5V` trên bo mạch. Điều này chỉ áp dụng cho dòng DevKitC-1 có mạch nguồn khớp với sơ đồ nguyên lý chính thức và chỉ được cấp nguồn qua cổng USB. Hãy kiểm tra sơ đồ nguyên lý trước; không sao chép cách cấp nguồn này sang các bo mạch tương thích chưa được kiểm chứng.
- Nối chung mass tín hiệu của các module vào chân `GND` của bo mạch. Cọc loa âm trên mạch khuếch đại không phải là mass tín hiệu.
- Không lấy nguồn từ các chân lộ thiên của chip ổn áp hoặc cấp thêm một nguồn điện thứ hai trực tiếp vào đường 5V/3V3 của bo mạch.

Xem [sơ đồ nguyên lý chính thức](https://dl.espressif.com/dl/schematics/SCH_ESP32-S3-DevKitC-1_V1.1_20220413.pdf) để kiểm tra các điểm nguồn. Khả năng cấp dòng của cổng USB, chất lượng cáp và tải loa đều ảnh hưởng đến độ ổn định. Hãy bắt đầu thử nghiệm ở mức âm lượng nhỏ.

<a name="wiring-overview"></a>

## Sơ đồ tổng thể: đấu nối hoàn chỉnh cấu hình cơ bản {#wiring-overview}

Sơ đồ này tổng hợp toàn bộ kết nối của micro, mạch khuếch đại, loa và màn hình OLED. Sử dụng các bảng bên dưới để kiểm tra từng sợi dây. **Chân VIN của mạch khuếch đại dùng điểm nguồn USB 5V đã kiểm chứng trên mạch; micro và OLED dùng nguồn 3V3.**

<figure class="source-figure wiring-figure">

[![S3 cơ bản: sơ đồ kết nối âm thanh, nguồn và OLED hoàn chỉnh.](../../public/images/en/breadboard-s3-wiring-v2.6.0.svg)](../../public/images/en/breadboard-s3-wiring-v2.6.0.svg)

<figcaption>Sơ đồ tín hiệu âm thanh, nguồn và OLED của S3 cơ bản cho firmware v2.6.0; đây không phải sơ đồ vị trí chân vật lý.</figcaption>
</figure>

<a name="board-layouts"></a>

### Bố cục vật lý loại 44 chân và 42 chân {#board-layouts}

Sử dụng các hình bố trí breadboard này để tìm vị trí chân cắm và sắp xếp module. Đối chiếu từng chân GPIO được ghi nhãn với bo mạch thực tế.

::: warning Lưu ý về các dây nối tùy chọn hiển thị trong hình bố trí
Các ảnh bố trí bên dưới hiển thị chân VIN của mạch khuếch đại nối vào nhánh **3V3**. Cấu hình cố định của hướng dẫn này sử dụng điểm nguồn **5V** đã kiểm chứng; hãy xử lý các chân SD/MODE và GAIN theo đúng thiết lập hoạt động của module thực tế. Các ảnh này cũng vẽ kèm nhánh mở rộng ML307R tùy chọn và **lấy nguồn từ một điểm hàn trên chip LDO**. Đối với bản dựng Wi-Fi cơ bản, hãy bỏ qua toàn bộ nhánh 4G và không lấy nguồn từ điểm hàn LDO đó.
:::

<a name="layout-44"></a>

#### Bo mạch tiêu chuẩn Espressif · 44 chân {#layout-44}

<figure class="source-figure wiring-figure">

[![Bố cục bo mạch tiêu chuẩn 44 chân, chú thích bởi Surfer. Bỏ qua nhánh 4G/LDO đối với bản Wi-Fi và dùng nguồn 5V cho mạch khuếch đại theo hướng dẫn này.](../../public/images/zh/doc-05-image-021.jpg)](../../public/images/zh/doc-05-image-021.jpg)

<figcaption>Bố cục bo mạch tiêu chuẩn 44 chân, chú thích bởi Surfer. Bỏ qua nhánh 4G/LDO đối với bản Wi-Fi và dùng nguồn 5V cho mạch khuếch đại theo hướng dẫn này. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="layout-42"></a>

#### Bo mạch GOOUUU · 42 chân {#layout-42}

<figure class="source-figure wiring-figure">

[![Bố cục bo mạch GOOUUU 42 chân, chú thích bởi Surfer. Vị trí các chân nguồn có khác biệt; bỏ qua nhánh 4G/LDO đối với bản Wi-Fi và cấp nguồn khuếch đại theo hướng dẫn này.](../../public/images/zh/doc-05-image-026.jpg)](../../public/images/zh/doc-05-image-026.jpg)

<figcaption>Bố cục bo mạch GOOUUU 42 chân, chú thích bởi Surfer. Vị trí các chân nguồn có khác biệt; bỏ qua nhánh 4G/LDO đối với bản Wi-Fi và cấp nguồn khuếch đại theo hướng dẫn này. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

Cả hai bố cục đều sử dụng GPIO4/5/6 cho micro, GPIO7/15/16 cho mạch khuếch đại và GPIO41/42 cho màn hình OLED. Sau khi xác nhận chip, dung lượng bộ nhớ và các module đều khớp, hãy dùng chung bản dựng `bread-compact-wifi`. Vị trí trái/phải trên bo mạch không phải là số thứ tự chân GPIO.

<a name="microphone"></a>

## 2. Đấu nối micro {#microphone}

| Chân INMP441 | Kết nối trên ESP32-S3 | Chức năng |
| --- | --- | --- |
| VDD / VCC | 3V3 | Nguồn cấp cho micro |
| GND | GND | Mass tín hiệu |
| WS | GPIO4 | Xung nhịp chọn từ dữ liệu vào (word-select) |
| SCK | GPIO5 | Xung nhịp bit dữ liệu vào (bit clock) |
| SD | GPIO6 | Dữ liệu từ micro truyền vào vi điều khiển |
| L/R | GND | Chọn kênh trái (left channel) cho cấu hình ngõ vào này |

Ký hiệu giống nhau không có nghĩa là cùng chiều truyền: chân `SD` của micro là ngõ ra, được nối vào ngõ vào `DIN` của firmware. Để biết thêm về nguồn cấp và cách chọn kênh của INMP441, hãy xem [tài liệu kỹ thuật TDK](https://product.tdk.com/system/files/dam/doc/product/sw_piezo/mic/mems-mic/data_sheet/inmp441.pdf).

<a name="reversed-microphone"></a>

### Trường hợp chân cắm của micro được hàn ở mặt ngược lại {#reversed-microphone}

“Hàn ngược” ở đây nghĩa là chiều hàn vật lý của hàng chân cắm nằm ở mặt đối diện, **không phải đảo ngược hai chân nguồn VDD và GND**. Hãy xác định mặt nào đang hướng lên trên và đấu nối theo đúng tên tín hiệu in trên mạch. Hai kiểu bố trí bo mạch được minh họa riêng bên dưới.

<figure class="source-figure wiring-figure">

[![Bo mạch 44 chân với micro hàn ngược mặt; thứ tự tín hiệu WS/SCK/SD vẫn giữ nguyên.](../../public/images/zh/doc-05-image-022.jpg)](../../public/images/zh/doc-05-image-022.jpg)

<figcaption>Bo mạch 44 chân với micro hàn ngược mặt; thứ tự tín hiệu WS/SCK/SD vẫn giữ nguyên. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure wiring-figure">

[![Bo mạch 42 chân với micro hàn ngược mặt. Không đoán vị trí chân nguồn bằng cách nhìn đối xứng bên ngoài.](../../public/images/zh/doc-05-image-027.jpg)](../../public/images/zh/doc-05-image-027.jpg)

<figcaption>Bo mạch 42 chân với micro hàn ngược mặt. Không đoán vị trí chân nguồn bằng cách nhìn đối xứng bên ngoài. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="amplifier"></a>

## 3. Đấu nối mạch khuếch đại và loa {#amplifier}

| Chân module MAX98357A | Kết nối trên ESP32-S3 / tải |
| --- | --- |
| VIN / VDD | Điểm nguồn 5V trên bo mạch đã nêu ở trên |
| GND | GND |
| DIN | GPIO7 |
| BCLK | GPIO15 |
| LRC / LRCLK | GPIO16 |
| SPK+ / OUTP | Một đầu dây loa |
| SPK− / OUTN | Đầu dây loa còn lại |

Xử lý các chân `SD/MODE` và `GAIN` theo đúng thiết lập hoạt động mặc định của nhà sản xuất module. Nếu là module trần cần thêm điện trở hoặc tín hiệu kích hoạt, hãy hoàn thiện phần mạch đó trước; không mặc định để trống chân sẽ hoạt động. MAX98357B không thể thay thế trực tiếp cho bản A. Không cắm tai nghe vào cọc ra loa; xem chi tiết tại [ngõ ra âm thanh](./audio-output.md).

<a name="audio-direct"></a>

### Đấu nối trực tiếp giữa micro và mạch khuếch đại {#audio-direct}

Khi không dùng breadboard, hình minh họa này giúp xác định các kết nối giữa hai module âm thanh. Thứ tự tín hiệu khớp với bảng âm thanh ở trên. Hãy điều chỉnh nhánh nguồn 3V3 của mạch khuếch đại và các chân SD/GAIN trong hình cho phù hợp với sơ đồ nguồn đã chọn của hướng dẫn này và yêu cầu vận hành của module thực tế.

<figure class="source-figure wiring-figure">

[![Đấu nối trực tiếp micro và MAX98357A. Điều chỉnh nhánh nguồn 3V3 của mạch khuếch đại và các chân SD/GAIN như giải thích trong bài.](../../public/images/zh/doc-05-image-028.jpg)](../../public/images/zh/doc-05-image-028.jpg)

<figcaption>Đấu nối trực tiếp micro và MAX98357A. Điều chỉnh nhánh nguồn 3V3 của mạch khuếch đại và các chân SD/GAIN như giải thích trong bài. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="display"></a>


## 4. Đấu nối màn hình OLED {#display}

| Chân OLED | Kết nối trên ESP32-S3 |
| --- | --- |
| VCC | 3V3, sử dụng module hỗ trợ mức điện áp này |
| GND | GND |
| SDA | GPIO41 |
| SCL | GPIO42 |

<figure class="source-figure wiring-figure">

[![Bốn đường kết nối giữa ESP32-S3 và màn hình OLED SSD1306.](../../public/images/en/breadboard-s3-oled-v2.6.0.svg)](../../public/images/en/breadboard-s3-oled-v2.6.0.svg)

<figcaption>Các kết nối VCC, GND, SDA và SCL của màn hình OLED. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

Bo mạch này sử dụng địa chỉ I2C `0x3C`. Hai loại màn hình 128×32 và 128×64 yêu cầu hai biến thể firmware khác nhau. Màn hình SH1106, màn hình SPI hoặc các màn hình có địa chỉ khác không thể hoạt động tương đương chỉ bằng cách đổi dây cắm.

<a name="buttons"></a>

## Nút nhấn ngoài tùy chọn {#buttons}

Sử dụng nút BOOT có sẵn trên bo mạch cho lần kiểm tra trò chuyện đầu tiên. Các nút nhấn ngoài nối lần lượt GPIO0, GPIO40 và GPIO39 xuống GND để thực hiện chức năng BOOT, tăng âm lượng và giảm âm lượng cho phiên bản này. Với nút nhấn 4 chân, hãy kiểm tra xem cặp chân nào đã nối thông sẵn bên trong và không cắm cả hai phía đóng/mở của công tắc vào cùng một hàng lỗ nối thông trên breadboard.

Chức năng của các nút bấm được quy định trong [mã nguồn triển khai bo mạch hiện tại](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-wifi/compact_wifi_board.cc), không dựa vào nhãn “reset Wi-Fi” trong các hình ảnh cũ.

<a name="underside"></a>

## Sau khi đấu dây: kiểm tra bên dưới các module {#underside}

Các đoạn dây nối ngắn có thể bị che khuất bên dưới mạch khuếch đại và micro. Hãy chụp ảnh và kiểm tra kỹ các đường nguồn, GND và tín hiệu trước khi cắm các module lên trên, bao gồm cả các cầu nối bắc qua thanh nguồn bị ngắt quãng ở giữa.

<figure class="source-figure">

[![Bản dựng cơ bản khi tháo các module ra, để lộ các đoạn dây nối ngắn bên dưới.](../../public/images/zh/doc-05-image-036.jpg)](../../public/images/zh/doc-05-image-036.jpg)

<figcaption>Bản dựng cơ bản khi tháo các module ra, để lộ các đoạn dây nối ngắn bên dưới. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="start"></a>

## 5. Kiểm tra, nạp firmware và cấu hình mạng {#start}

1. Khi đã ngắt nguồn, kiểm tra lại từng dây nguồn và dây tín hiệu. Đảm bảo không bị chập thanh nguồn, không có cọc loa nào chạm mass và không cắm lệch chân.
2. Sử dụng [trình biên dịch trực tuyến](../firmware/online-builder.md) với đúng bo mạch và biến thể màn hình nêu trên, hoặc tải bản dựng tương ứng tại mục [tải xuống](../firmware/downloads.md).
3. Làm theo [hướng dẫn nạp firmware](../firmware/flashing.md). Khởi động lại thiết bị và kiểm tra hiển thị màn hình cùng âm thanh khởi động. Chân đèn RGB khác nhau giữa các phiên bản DevKit, nên màu đèn LED không phải là tiêu chí đánh giá thành công.
4. Làm theo [hướng dẫn cấu hình mạng và liên kết](../getting-started/wifi-and-binding.md) để kết nối Wi-Fi và nhập mã thiết bị.
5. Bắt đầu một cuộc trò chuyện bằng nút BOOT trước khi thử nghiệm từ khóa đánh thức được hỗ trợ bởi firmware đã chọn.

<a name="assembly-results"></a>

## Lắp ráp và hình ảnh thành phẩm {#assembly-results}

Các bức ảnh dưới đây minh họa cách bố trí tổng thể, mối hàn/dây cắm Dupont và thành phẩm hoàn chỉnh có màn hình OLED. Hãy dùng chúng để hình dung kiểu dáng hoàn thiện. Tuân thủ sơ đồ cấp nguồn ở trên cho mạch khuếch đại và 4G; màu sắc dây cắm không thay thế cho ký hiệu tên tín hiệu.

<div class="module-grid">

<figure class="source-figure">

[![Cách bố trí và vị trí tương đối các module trên bo mạch tiêu chuẩn.](../../public/images/zh/doc-05-image-023.jpg)](../../public/images/zh/doc-05-image-023.jpg)

<figcaption>Cách bố trí và vị trí tương đối các module trên bo mạch tiêu chuẩn. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Đấu dây và sắp xếp module trên bo mạch tiêu chuẩn.](../../public/images/zh/doc-05-image-024.jpg)](../../public/images/zh/doc-05-image-024.jpg)

<figcaption>Đấu dây và sắp xếp module trên bo mạch tiêu chuẩn. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<div class="module-grid">

<figure class="source-figure">

[![Vị trí sắp xếp module trên bo mạch GOOUUU.](../../public/images/zh/doc-05-image-029.webp)](../../public/images/zh/doc-05-image-029.webp)

<figcaption>Vị trí sắp xếp module trên bo mạch GOOUUU. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<figure class="source-figure">

[![Một góc nhìn khác của bộ mạch sử dụng bo mạch GOOUUU.](../../public/images/zh/doc-05-image-030.webp)](../../public/images/zh/doc-05-image-030.webp)

<figcaption>Một góc nhìn khác của bộ mạch sử dụng bo mạch GOOUUU. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

</div>

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

::: tip Dấu hiệu thành công
Màn hình OLED hiển thị rõ nét, âm thanh báo khởi động phát ra bình thường, thiết bị kết nối mạng và xuất hiện trên trang Console của bạn. Nhấn nút bắt đầu cuộc trò chuyện, micro thu được giọng nói của bạn và thiết bị phát câu trả lời mà không bị khởi động lại.
:::

<a name="troubleshooting"></a>

## Khắc phục sự cố {#troubleshooting}

| Hiện tượng | Điểm cần kiểm tra trước tiên |
| --- | --- |
| Màn hình OLED tối đen hoặc hiển thị lỗi một phần | Model màn hình, địa chỉ I2C, chân SDA/SCL, nguồn cấp và biến thể độ phân giải 128×32/64 |
| Nghe thấy tiếng thông báo nhưng thiết bị không nghe thấy bạn | Các chân SD/WS/SCK của INMP441, chân chọn kênh L/R, lỗ thu âm micro và nguồn cấp vào |
| Nhận diện được giọng nói nhưng không nghe thấy câu trả lời | Các chân DIN/BCLK/LRC của mạch khuếch đại, chân kích hoạt (enable), cọc đấu loa và mức âm lượng |
| Thiết bị tự khởi động lại khi đang phát âm thanh | Nguồn/cáp USB, trở kháng tải loa và chập mạch; hãy giảm mức âm lượng xuống trước |

<a name="variants"></a>

## Các biến thể breadboard khác {#variants}

| Biến thể | Sơ đồ đấu nối và hình ảnh | Khác biệt về firmware |
| --- | --- | --- |
| Cấu hình cơ bản tương tự với OLED 128×64 | Sơ đồ OLED và bố cục 44/42 chân ngay trên trang này | `bread-compact-wifi-128x64` |
| Màn hình màu SPI | [Sơ đồ đấu nối màn hình 44/42 chân và hình thành phẩm](./displays/st7789.md#wiring-diagrams) | `bread-compact-wifi-lcd`; đồng thời kiểm tra cài đặt màn hình |
| Camera + màn hình màu | [Sơ đồ đấu nối và phần cứng camera](./breadboard-camera.md#wiring) | `bread-compact-wifi-s3cam`; các chân GPIO âm thanh cũng khác biệt |
| ML307R 4G | [Bố cục 44/42 chân và bản dựng ML307R](./breadboard-4g.md#ml307) | `bread-compact-ml307` |
| NT26K 4G | [Bố cục 44/42 chân và bản dựng NT26K](./breadboard-4g.md#nt26) | `bread-compact-nt26`; có thêm hai đường tín hiệu bắt tay |
| ESP32-C3 + chip codec | [Đấu nối C3, bản dựng OLED và màn hình màu](./breadboard-esp32-c3.md) | `xmini/c3`, không dùng chung kiểu đấu micro/khuếch đại của S3 |
| ESP32 cổ điển | [Hướng dẫn ESP32 cổ điển](./breadboard-esp32.md) | `bread-compact-esp32` |

Cấu hình song công (Duplex) dùng chung đường xung nhịp. Trang này sử dụng cấu hình đơn công (Simplex) mặc định của mã nguồn. Để dùng chế độ Duplex, trước tiên hãy tự tạo bản dựng riêng cho cấu hình tương ứng và kiểm tra lại xung nhịp; không tự ý nối chập các đường tín hiệu trên firmware mặc định.

<a name="next"></a>

## Các bước tiếp theo {#next}

Xem hướng dẫn [nguồn cấp bằng pin](./battery-power.md) để sử dụng thiết bị di động. Trước khi thay đổi sơ đồ chân hoặc gắn thêm ngoại vi, hãy đọc [hỗ trợ bo mạch tùy chỉnh](../development/custom-board.md) và thiết lập định danh firmware riêng.
