---
id: hardware
title: Phần cứng và đấu nối
description: 'Bắt đầu với một cấu hình cơ bản cố định, sau đó tìm hiểu về nguồn điện và giao tiếp âm thanh trước khi mở rộng.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
translation:
  status: review
  sourceHash: cf39f450a21caa3da9efa0167ad8a032f06d90870b10de6ad8948c725c549532
  reviewedAt: '2026-11-15'
---
# Phần cứng và đấu nối

Chọn bộ vi điều khiển, âm thanh và màn hình tương thích, sau đó đấu nối đúng theo sơ đồ của từng bo mạch cụ thể. Bảng sơ đồ chân GPIO theo phiên bản luôn được ưu tiên hơn màu dây hay vị trí cắm trên các ảnh chụp cũ. Luôn ngắt hoàn toàn nguồn điện trước khi kiểm tra các mối nối.

<a name="guides"></a>

## Chọn hướng dẫn {#guides}

| Hướng dẫn | Nội dung |
| --- | --- |
| [Chọn bộ phần cứng đầu tiên](./choosing-hardware.md) | Lựa chọn dựa trên mức độ hỗ trợ firmware, giao tiếp, điện áp và tài liệu kỹ thuật thay vì giá cũ hay tên gọi quảng cáo |
| [Các bo mạch và biến thể được hỗ trợ](./supported-boards.md) | Xác nhận khả năng hỗ trợ thông qua danh mục firmware và tùy chọn biên dịch, không dựa vào việc sản phẩm còn bày bán hay không |
| [Mạch breadboard ESP32-S3 cơ bản](./breadboard-esp32-s3.md) | Lắp ráp thiết bị giao tiếp giọng nói hoàn chỉnh với cấu hình micro, mạch khuếch đại và màn hình OLED cố định |
| [Mạch breadboard ESP32-C3](./breadboard-esp32-c3.md) | Sử dụng đúng module giải mã âm thanh (codec) và sơ đồ chân thay vì dùng chung cấu hình micro số của S3 |
| [Mạch ESP32 cổ điển (Classic)](./breadboard-esp32.md) | Tìm hiểu cách đấu nối, tính năng và các giới hạn firmware trên dòng ESP32 có tài nguyên hạn chế |
| [Màn hình màu ST7789](./displays/st7789.md) | Kiểm tra chuẩn giao tiếp màn hình, sơ đồ chân, độ phân giải và tùy chọn biên dịch |
| [Mạch breadboard 4G](./breadboard-4g.md) | Module ML307R/NT26K, sơ đồ đấu nối 44/42 chân và các bộ mạch hoàn chỉnh |
| [Mạch breadboard Camera S3](./breadboard-camera.md) | Đối chiếu chân kết nối camera, màn hình màu và âm thanh sao cho khớp với firmware |
| [Bo mạch Xmini-C3 và V3](./boards/xmini-c3.md) | Xác định đúng phiên bản phần cứng trước khi chọn firmware, nguồn cấp và các bước vận hành |
| [Module nhận diện giọng nói ngoài (ASR)](./external-wake-module.md) | Lựa chọn nhận diện từ khóa đánh thức tích hợp sẵn hay dùng module ngoài, đồng thời kiểm tra nguồn cấp, chân kích và cấu hình |
| [Nguồn cấp bằng pin và sạc](./battery-power.md) | Thử nghiệm với pin sạc dự phòng USB trước khi quyết định có cần thiết kế mạch quản lý pin riêng hay không |
| [Loa, tai nghe và ngõ ra âm thanh](./audio-output.md) | Phân biệt rõ ngõ ra khuếch đại công suất (amplifier), ngõ ra tai nghe và ngõ ra tín hiệu mức đường truyền (line output) |
| [Những lưu ý khi thiết kế phần cứng](./design-guidelines.md) | Đánh giá tổng thể về nguồn điện, âm học, vỏ hộp và khả năng kiểm thử thay vì chỉ quan tâm đến model vi điều khiển |

<a name="next"></a>

## Đọc tài liệu và phản hồi {#next}

Các hướng dẫn này luôn mở để cộng đồng cùng rà soát. Hãy sử dụng liên kết phản hồi ở cuối mỗi trang và đính kèm thông tin về phiên bản firmware, model bo mạch cùng các bước để tái hiện vấn đề.
