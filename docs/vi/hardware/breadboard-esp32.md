---
id: breadboard-esp32
title: Mạch breadboard ESP32 cổ điển (Classic)
description: 'Kiểm tra sơ đồ đấu nối, firmware và các giới hạn tài nguyên của bản dựng sử dụng dòng ESP32 cổ điển.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-13
translation:
  status: review
  sourceHash: 0a3e0e56b358f661201c122dfe0e6ccb01ac94be008fef2dfa043a935a719005
  reviewedAt: '2026-11-15'
---
# Mạch breadboard ESP32 cổ điển (Classic)

Bản dựng này sử dụng dòng chip ESP32 cổ điển thay vì ESP32-S3 hay C3. Một thiết bị 4MB không có PSRAM vẫn hoạt động tốt cho các tác vụ cơ bản, nhưng không thể đảm bảo chạy được mọi tính năng đòi hỏi PSRAM hoặc nhiều tài nguyên bộ nhớ hơn.

<a name="finished-overview"></a>

## Xem trước thành phẩm {#finished-overview}

<figure class="source-figure">

[![Mẫu thử nghiệm ESP32 cổ điển.](../../public/images/zh/doc-13-image-016.webp)](../../public/images/zh/doc-13-image-016.webp)

<figcaption>Mẫu thử nghiệm ESP32 cổ điển.</figcaption>
</figure>

<figure class="source-figure">

[![Ví dụ lắp ráp hoàn chỉnh ESP32 cổ điển.](../../public/images/zh/doc-13-image-017.webp)](../../public/images/zh/doc-13-image-017.webp)

<figcaption>Ví dụ lắp ráp hoàn chỉnh ESP32 cổ điển.</figcaption>
</figure>

<a name="scope"></a>

## 1. Xác định bo mạch mục tiêu {#scope}

Thư mục bo mạch tương ứng trong mã nguồn là `bread-compact-esp32`. Hãy kiểm tra kỹ module ESP32, dung lượng Flash thực tế, micro, mạch khuếch đại và chip điều khiển màn hình. Chọn đúng biến thể độ phân giải 128×64 hoặc 128×32.

<a name="wiring"></a>

## 2. Kiểm tra đấu nối theo mã nguồn hiện hành {#wiring}

<figure class="source-figure wiring-figure">

[![Kết nối âm thanh và màn hình OLED của ESP32 cổ điển.](../../public/images/en/breadboard-esp32-wiring-v2.6.0.svg)](../../public/images/en/breadboard-esp32-wiring-v2.6.0.svg)

<figcaption>Sơ đồ tín hiệu cho firmware v2.6.0; đây không phải sơ đồ vị trí chân vật lý.</figcaption>
</figure>

### Kiểm tra từng kết nối

| Chức năng | Chân GPIO mặc định hiện tại |
| --- | --- |
| Micro WS / SCK / dữ liệu vào | 25 / 26 / 32 |
| Mạch khuếch đại dữ liệu / BCLK / LRCK | 33 / 14 / 27 |
| Màn hình OLED SDA / SCL | **4 / 15** |
| Nút BOOT / ngõ vào ASR ngoài | 0 / 19 |

Đối chiếu các chân GPIO của màn hình OLED với [tệp config.h theo phiên bản](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-esp32/config.h). Xác nhận nguồn cấp, chân chọn kênh L/R và trở kháng tải loa theo đúng tài liệu kỹ thuật của từng module.

<figure class="source-figure">

[![Ký hiệu chân trên màn hình OLED; sử dụng bảng chân firmware trên trang này để đấu nối GPIO.](../../public/images/zh/doc-13-image-002.webp)](../../public/images/zh/doc-13-image-002.webp)

<figcaption>Ký hiệu chân trên màn hình OLED; sử dụng bảng chân firmware trên trang này để đấu nối GPIO.</figcaption>
</figure>

<a name="build"></a>

## 3. Cài đặt và kiểm thử theo từng giai đoạn {#build}

1. Bắt đầu với [trình biên dịch và nạp trực tuyến](../firmware/online-builder.md), chọn chính xác model bo mạch và cấu hình bộ nhớ.
2. Làm theo [hướng dẫn nạp firmware](../firmware/flashing.md), sau đó kiểm tra quá trình khởi động, màn hình và âm thanh thông báo.
3. Hoàn tất [cấu hình Wi-Fi và liên kết thiết bị](../getting-started/wifi-and-binding.md). Thử nghiệm cuộc trò chuyện bằng nút bấm trước tiên.
4. Chỉ bật tính năng nhận diện từ khóa đánh thức khi tài nguyên phần cứng và mô hình hỗ trợ cho phép. Bo mạch không có PSRAM không thể chạy trực tiếp cấu hình vốn yêu cầu bắt buộc phải có PSRAM.

Nếu sử dụng module nhận diện giọng nói ngoài, hãy kiểm tra riêng mức điện áp và tín hiệu kích hoạt tại mục [module nhận diện giọng nói ngoài (ASR)](./external-wake-module.md). Phiên bản 4G và mạch PCB tự thiết kế cũng yêu cầu cấu hình bo mạch riêng biệt. Luôn dùng các bản phát hành có nguồn gốc rõ ràng.

### Cô lập thiết bị ngoại vi khi không thể kết nối để nạp code

Nếu máy tính đã nhận cổng COM nhưng quá trình đồng bộ nạp code liên tục thất bại, hãy rút cáp USB và ngắt mọi nguồn điện, chụp ảnh lại hiện trạng dây cắm, sau đó tạm thời tháo các dây tín hiệu nối với linh kiện ngoại vi. Thử đưa mạch vào [chế độ tải (download mode)](../firmware/flashing.md#download-mode) khi chỉ có duy nhất bo mạch phát triển. Một linh kiện ngoại vi đang giữ mức điện áp trên chân BOOT hoặc các chân cấu hình khởi động (strapping pins) có thể ngăn chip vào chế độ nạp code.

Nếu bo mạch trần kết nối nạp code bình thường nhưng lại lỗi sau khi gắn lại dây, hãy lắp lại từng ngoại vi một và kiểm tra vị trí chân, mức logic và nguồn cấp. Luôn ngắt nguồn trước mỗi lần thay đổi dây cắm. Tình huống này không đòi hỏi phải xóa sạch Flash ngay lập tức, và các thao tác chuyển đổi mạng kép của bo mạch mở rộng bên thứ ba không áp dụng cho bo mạch Wi-Fi trong hướng dẫn này.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Firmware phải báo cáo đúng dòng chip, dung lượng bộ nhớ và biến thể bo mạch. Kiểm tra hoạt động của màn hình, âm thanh, kết nối mạng và cuộc trò chuyện bắt đầu bằng nút bấm. Ghi nhận riêng các tính năng được hỗ trợ và không được hỗ trợ; việc thiết bị chạy ổn định không đồng nghĩa với việc có đầy đủ mọi tính năng như dòng S3 hay P4.

<a name="sources"></a>

## Các bước tiếp theo {#sources}

Sử dụng hình ảnh mẫu thử nghiệm để nhận diện kiểu lắp ráp. Nếu muốn thay đổi sơ đồ chân hoặc linh kiện, hãy xem tiếp mục [tùy chỉnh bo mạch](../development/custom-board.md).
