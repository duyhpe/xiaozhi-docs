---
id: custom-board
title: Bo mạch tùy chỉnh và cấu hình sơ đồ chân
description: Cấp cho mạch đấu dây tùy chỉnh một định danh bo mạch và bản dựng riêng biệt.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Quy trình đã được đối chiếu với hướng dẫn bo mạch tùy chỉnh của kho mã nguồn firmware; tệp cấu hình chỉ mang tính minh họa cấu trúc, một bo mạch mới vẫn cần được biên dịch và kiểm thử thực tế trên phần cứng.
translation:
  status: review
  sourceHash: 8e752fdfc94a59fa5cde5e0b63f558e36e3d578b3ba746ee08f78b581d2865ab
  reviewedAt: '2026-11-15'
---
# Bo mạch tùy chỉnh và cấu hình sơ đồ chân

Việc thay đổi sơ đồ chân không chỉ dừng lại ở các con số GPIO. Firmware cần phải khởi tạo chính xác âm thanh, màn hình, nút bấm và nguồn điện, đồng thời xác định đúng kênh cập nhật phần mềm phù hợp trong tương lai.

<a name="scope"></a>

## Khi nào nên tạo một bo mạch tách biệt {#scope}

| Mức độ thay đổi | Khuyến nghị |
| --- | --- |
| Chọn ngôn ngữ, từ khóa đánh thức hoặc tùy chọn màn hình đã có sẵn | Sử dụng các tham số biên dịch hiện có; không cần sao chép tạo bo mạch mới |
| Sử dụng một cấu hình khác đã được định nghĩa sẵn cho cùng một mạch phần cứng | Chọn biến thể (variant) đã đặt tên tương ứng trong tệp `config.json` |
| Thay đổi chân GPIO, chip Codec, màn hình, mạch quản lý nguồn hoặc thiết kế PCB | Tạo một thư mục bo mạch mới hoặc đề nghị nhóm duy trì dự án thêm một biến thể đặt tên riêng |

::: warning Giữ vững định danh firmware tách biệt
Tuyệt đối không chỉnh sửa tệp `config.h` của một bo mạch tiêu chuẩn trong khi vẫn giữ nguyên tên định danh firmware tiêu chuẩn của bo mạch đó. Một bản cập nhật OTA sau này có thể tự động tải xuống firmware gốc của bo mạch tiêu chuẩn và ghi đè lên cấu hình đấu dây tùy chỉnh của bạn. Định danh phần mềm là một phần bắt buộc của quá trình tích hợp phần cứng.
:::

[Hướng dẫn bo mạch tùy chỉnh của firmware v2.6.0](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/custom-board.md) quản lý toàn bộ các giao diện mã nguồn chi tiết. Trang này mô tả quy trình tổng quát thay vì một tài liệu đặc tả API bo mạch tách biệt.

<a name="hardware"></a>

## 1. Kiểm kê thông số phần cứng {#hardware}

Ghi lại đầy đủ dòng chip, dung lượng Flash/PSRAM, phiên bản sơ đồ nguyên lý (schematic), loại chip điều khiển/địa chỉ/kích thước màn hình, chip Codec âm thanh, mạch điều khiển nguồn, nút bấm và toàn bộ chân GPIO. Kiểm tra kỹ các chân cấu hình khởi động (boot-strapping pins), các chân dùng cho Flash/PSRAM và cổng USB. Một chân cắm header còn trống trên mạch không đồng nghĩa với việc chân GPIO đó khả dụng.

Kiểm tra tách biệt đường nguồn và tín hiệu âm thanh. Mức điện áp logic trên chân GPIO không phải là điện áp cấp nguồn cho mô-đun ngoại vi. Chiều tín hiệu vào/ra (input/output) của vi điều khiển MCU phải khớp ngược chiều với ngoại vi kết nối.

<a name="files"></a>

## 2. Chọn bo mạch tham chiếu và tạo thư mục {#files}

Trong [môi trường biên dịch cục bộ](./build-firmware.md) của bạn, hãy chuyển sang đúng phiên bản firmware tương ứng và tạo một nhánh làm việc (branch) mới. Chọn một bo mạch tham chiếu có cấu hình chip, Codec và giao tiếp màn hình tương đồng. Tạo một thư mục độc lập theo đúng hướng dẫn của kho mã nguồn firmware.

| Tệp tin | Vai trò |
| --- | --- |
| `config.h` | Định nghĩa chân GPIO, tần số lấy mẫu và các hằng số phần cứng của bo mạch |
| `*_board.cc` | Khởi tạo ngoại vi, xử lý hành vi nút bấm và khởi tạo các đối tượng âm thanh/màn hình |
| `config.json` | Khai báo chip mục tiêu, loại bo mạch và các biến thể bản dựng |
| `README.md` | Sơ đồ nguyên lý, phiên bản phần cứng, hướng dẫn đấu nối, lệnh biên dịch và kết quả kiểm thử |

Tái sử dụng các đoạn mã phù hợp mà không biên dịch dồn tệp của mọi bo mạch vào cùng một bản dựng đích. Đăng ký bo mạch mới vào logic lựa chọn trong Kconfig và CMake của phiên bản đó. Chỉ tạo thư mục và tệp JSON đơn thuần chưa hoàn tất việc đăng ký bo mạch.

```text
main/boards/my-s3-prototype/
├── config.h                 # Chân GPIO và các hằng số
├── my_s3_prototype_board.cc # Khởi tạo và hành vi của bo mạch
├── config.json              # Chip, loại bo mạch và các biến thể
└── README.md                # Phiên bản phần cứng, sơ đồ đấu dây và kiểm thử
```

Đây chỉ là ví dụ minh họa cấu trúc thư mục. Hãy làm theo hướng dẫn bo mạch của phiên bản tương ứng để đăng ký trong Kconfig/CMake.

<a name="identity"></a>

## 3. Định nghĩa một định danh có thể truy xuất {#identity}

Sử dụng tên gọi nhất quán và ổn định cho thư mục, loại bo mạch (`type`) và các biến thể (`name`). Tệp `config.json` dưới đây chỉ minh họa cấu trúc, với giả định rằng mã nguồn, phần đăng ký và trình điều khiển đã được triển khai đầy đủ:

```json
{
  "type": "my-s3-prototype",
  "target": "esp32s3",
  "builds": [
    {
      "name": "my-s3-prototype-oled32",
      "sdkconfig_append": ["CONFIG_OLED_SSD1306_128X32=y"]
    }
  ]
}
```

Các biến thể nằm trong cùng một thư mục cũng cần có giá trị `name` riêng biệt và các nhánh cấu hình rõ ràng tương ứng với phần đấu nối/ngoại vi thực tế của chúng. Việc chỉ đặt một cái tên mới không làm cho mã khởi tạo sai lệch phần cứng trở nên tương thích.

<figure class="source-figure">

[![Từ phần cứng tùy chỉnh đến định danh firmware riêng biệt.](../../public/images/en/custom-board-identity.svg)](../../public/images/en/custom-board-identity.svg)

<figcaption>Từ phần cứng tùy chỉnh đến định danh firmware riêng biệt. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="build"></a>

## 4. Biên dịch và kiểm tra phân vùng bộ nhớ {#build}

Sau khi đăng ký xong, hãy xác nhận bo mạch đã hiển thị trong danh sách và tiến hành biên dịch biến thể của bạn:

```sh
python scripts/build.py --list-boards
python scripts/build.py my-s3-prototype --name my-s3-prototype-oled32 --language zh-CN
```

Sử dụng tham số `--language en-US` nếu muốn biên dịch tài nguyên thiết bị bằng tiếng Anh. Kiểm tra kỹ thông tin chip, bộ nhớ, tên bo mạch và tên biến thể được tạo ra. Chọn bố cục phân vùng (partition layout) khớp với dung lượng Flash và phiên bản firmware. Tuyệt đối không tự ý xóa bỏ phân vùng `ota_0` hoặc `ota_1` chỉ để lấy thêm dung lượng trống. Mọi thay đổi về phân vùng đều ảnh hưởng đến tài nguyên hệ thống, cơ chế cập nhật OTA và vùng nhớ NVS, do đó đòi hỏi một thiết kế chuyển đổi dữ liệu riêng.

Xem [tài liệu OTA theo phiên bản](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/ota.md) để hiểu rõ cơ chế báo cáo thông tin thiết bị, đối khớp bản cập nhật và kích hoạt. Không gán kênh cập nhật OTA của bo mạch tiêu chuẩn cho một thiết bị tùy chỉnh trước khi xác nhận tính tương thích.

<a name="verify"></a>

## 5. Kiểm thử theo từng giai đoạn {#verify}

1. Ngắt nguồn điện, kiểm tra lại toàn bộ mối nối dây và đường nguồn, sau đó cấp nguồn để kiểm tra quá trình khởi động, bộ nhớ Flash và PSRAM.
2. Kiểm thử tách biệt màn hình, nút bấm, âm thanh thông báo và micro để dễ dàng khoanh vùng nếu có lỗi.
3. Kiểm thử kết nối mạng, liên kết thiết bị và một cuộc trò chuyện hoàn chỉnh, sau đó mới kiểm thử các tính năng đánh thức bằng giọng nói và khử tiếng vọng (AEC) đã chọn.
4. Kiểm tra tên bo mạch và tên biến thể hiển thị trong nhật ký khởi động (logs) hoặc thông tin tác vụ. Xác nhận hệ thống cập nhật có thể phân biệt chính xác thiết bị của bạn.
5. Kiểm thử quy trình cập nhật và khôi phục hệ thống. Lưu giữ lại bố cục phân vùng, các tham số biên dịch và một tệp ảnh hoàn chỉnh có khả năng khôi phục khi gặp sự cố.

::: tip Tiêu chí hoàn thành
Mã nguồn biên dịch lại thành công từ cấu hình sạch, thiết bị tự báo cáo đúng định danh riêng của nó và mọi tính năng phần cứng đều vượt qua các bài kiểm thử thực tế. Tệp `README.md` mô tả rõ mạch phần cứng áp dụng, câu lệnh biên dịch và các giới hạn cập nhật.
:::

<a name="next"></a>

## Các bước tiếp theo {#next}

Hãy gửi kèm sơ đồ mạch, mô tả bo mạch và kết quả kiểm chứng khi đóng góp mã nguồn cho dự án firmware. Trình biên dịch trực tuyến sẽ hỗ trợ bo mạch của bạn sau khi nó được đưa vào danh mục tùy chọn chính thức hiện hành. Trước thời điểm đó, hãy sử dụng phương pháp biên dịch cục bộ.
