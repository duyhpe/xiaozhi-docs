---
id: wake-words
title: Chọn và thay đổi từ khóa đánh thức (Wake words)
description: 'Lựa chọn cơ chế nhận diện từ khóa cài sẵn, tùy chỉnh hoặc dùng mô-đun ngoài phù hợp với dòng chip, bộ nhớ và mô hình.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-22
translation:
  status: review
  sourceHash: 746701523768c32240eda2a3073c2a323ce90f3a86d496aed8ba121888f0417b
  reviewedAt: '2026-11-15'
---

# Chọn và thay đổi từ khóa đánh thức (Wake words)

Hãy đảm bảo chức năng trò chuyện kích hoạt bằng nút bấm vật lý hoạt động bình thường trước khi cấu hình nhận diện từ khóa đánh thức. Việc đổi tên gọi của trợ lý, thay đổi âm thanh thông báo trên thiết bị và thay đổi cụm từ đánh thức ngoại tuyến là ba thao tác hoàn toàn tách biệt.

<a name="scope"></a>

## Chọn hướng triển khai {#scope}

| Phương án | Yêu cầu chính về firmware |
| --- | --- |
| WakeNet cài sẵn (Preset WakeNet) | Mô hình tương thích với từng dòng chip mục tiêu; các dòng C3/C5/C6 sử dụng mô hình nhẹ |
| AFE + WakeNet | Dòng chip được hỗ trợ như S3/P4/S31, kèm bộ nhớ PSRAM và các yêu cầu biên dịch tương ứng |
| Cụm từ tùy chỉnh trên mạch (Onboard custom phrase) | Luồng nhận diện tùy chỉnh MultiNet hiện tại yêu cầu dòng chip được hỗ trợ và có bộ nhớ PSRAM |
| Nhận diện giọng nói gắn ngoài (External ASR) | Mô-đun nhận diện giọng nói độc lập, tương thích mức điện áp/tín hiệu kích hoạt và có tích hợp trong mã bo mạch |

Bảng trên chỉ là điểm khởi đầu tham khảo, không phải danh sách hỗ trợ mô hình đầy đủ. Tệp [Kconfig theo phiên bản](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/Kconfig.projbuild) và danh sách mô hình ESP-SR được phân giải sẽ quyết định khả năng hỗ trợ thực tế.

<figure class="source-figure">

[![Kiểm tra các yêu cầu trước khi chọn hướng nhận diện từ khóa đánh thức.](../../public/images/en/wake-word-choice.svg)](../../public/images/en/wake-word-choice.svg)

<figcaption>Kiểm tra các yêu cầu trước khi chọn hướng nhận diện từ khóa đánh thức. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="online"></a>

## 1. Sử dụng trình biên dịch trực tuyến {#online}

Mở [trình biên dịch firmware trực tuyến](../firmware/online-builder.md), chọn chính xác model bo mạch của bạn, sau đó chọn một cụm từ đánh thức khả dụng hoặc tắt tính năng này. Việc giao diện không có ô nhập văn bản tự do không phải là lỗi; dịch vụ chỉ cung cấp các tùy chọn biên dịch tương thích với bo mạch đó.

<a name="preset"></a>

## 2. Liệt kê các mô hình cài sẵn trên máy cục bộ {#preset}

Thiết lập [môi trường biên dịch cục bộ](./build-firmware.md), cấu hình bo mạch và tải các thành phần phụ thuộc (components) trước khi liệt kê danh sách mô hình:

```sh
idf.py reconfigure
python scripts/build.py --list-wake-words
```

Tham số `--wake-word` chấp nhận tên các mô hình tương thích, `nihaoxiaozhi`, `hiesp`, hoặc `disabled`. Tập lệnh biên dịch sẽ tự động xử lý giá trị mặc định theo ngôn ngữ và mô hình. Tuyệt đối không áp dụng trực tiếp tên mô hình `wn9_*` của dòng S3 cho dòng chip C3.

Ví dụ, cấu hình mạch breadboard S3 cơ bản / màn hình OLED 128×32 có thể chỉ định rõ từ khóa đánh thức mặc định của nó. Đây không phải là câu lệnh biên dịch chung cho các bo mạch khác:

```sh
python scripts/build.py bread-compact-wifi --name bread-compact-wifi --language zh-CN --wake-word nihaoxiaozhi
idf.py -p COM5 flash monitor
```

Hãy thay thế cổng nối tiếp (serial port) cho đúng với máy tính của bạn. Ví dụ này biên dịch firmware tiếng Trung; hãy đổi sang mã ngôn ngữ được hỗ trợ khác khi cần. Để chọn một từ khóa khác, hãy lấy tên mô hình tương thích từ danh sách liệt kê ở trên và truyền vào tham số `--wake-word`.

<a name="custom"></a>

## 3. Cấu hình cụm từ đánh thức tùy chỉnh {#custom}

Trong thư mục mã nguồn firmware đã cấu hình, chạy lệnh `idf.py menuconfig` và mở mục tùy chọn đánh thức bên trong `Xiaozhi Assistant`. Nếu phần cứng có hỗ trợ, hãy chọn `Multinet model (Custom Wake Word)`. Mục `Custom Wake Word` sử dụng phiên âm Pinyin cách nhau bằng dấu cách, ví dụ `xiao tu dou`; đặt tên hiển thị cho từ khóa ở mục riêng bên dưới. Hãy kiểm thử ở ngưỡng mặc định để làm chuẩn trước khi tinh chỉnh ngưỡng chống đánh thức giả (false wakes) và bỏ sót lệnh gọi (missed wakes).

Ngưỡng nhạy hơn không đồng nghĩa với việc hoạt động tốt hơn. Hãy đối chiếu khả năng nhận diện trong phòng yên tĩnh, môi trường có tạp âm nền, khi loa thiết bị đang phát âm thanh và khi gọi lặp lại nhiều lần. Đồng thời kiểm tra dung lượng tài nguyên trống và tính tương thích của mô hình.

Sau khi chỉnh sửa từ khóa tùy chỉnh, nhấn phím `S` để lưu và thoát ra. Chạy lệnh `idf.py build` với cùng cấu hình bản dựng đó, sau đó nạp lên mạch bằng lệnh `idf.py -p COM5 flash monitor` theo cổng thực tế của bạn. Thay đổi chỉ có hiệu lực sau khi biên dịch lại và nạp lại firmware.

<a name="verify"></a>

## 4. Cài đặt và kiểm thử {#verify}

Khởi động lại thiết bị sau khi nạp firmware và xác nhận đúng biến thể cùng cụm từ đánh thức mong muốn. Kiểm thử tách biệt nút bấm vật lý, khoảng cách nói gần/xa, mức âm lượng thông thường, trạng thái sau khi ngủ (sleep) và trạng thái trong khi loa đang phát. Hành vi đánh thức hoặc ngắt lời trong lúc đang trò chuyện có cấu hình riêng; việc đánh thức thành công ở trạng thái chờ (idle) chưa đủ khẳng định tính năng hoạt động ở mọi trạng thái.

<a name="next"></a>

## Các bước tiếp theo {#next}

Các cụm từ khả dụng và khả năng tùy chỉnh phụ thuộc vào dòng chip, dung lượng bộ nhớ và mô hình. Hãy truy vấn cấu hình theo hướng dẫn ở trên trước tiên. Các thiết bị có tài nguyên hạn chế có thể sử dụng giải pháp [Mô-đun ASR gắn ngoài](../hardware/external-wake-module.md); hãy kiểm tra kỹ năng lực sẵn có trên mạch trước khi mua thêm mô-đun mở rộng.
