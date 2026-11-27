---
id: custom-prompts
title: Tùy chỉnh âm thanh thông báo trên thiết bị
description: Thay thế các tệp âm thanh thông báo thông qua quy trình quản lý ngôn ngữ (locale) và tài nguyên OGG/Opus.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-42
translation:
  status: review
  sourceHash: 892f462117a1d13caf9104e572a5b5f3885b051cd73612c71dced7501ca15b5b
  reviewedAt: '2026-11-15'
---
# Tùy chỉnh âm thanh thông báo trên thiết bị

Âm thanh khởi động và âm thanh hướng dẫn cấu hình mạng là tài nguyên tích hợp sẵn trong firmware. Chúng hoàn toàn khác với giọng đọc câu trả lời do máy chủ tổng hợp, và việc chỉ đổi tên phần mở rộng (đuôi tệp) sẽ không thể thay thế đúng các âm thanh này.

<a name="scope"></a>

## Phiên bản tham chiếu {#scope}

Hướng dẫn này áp dụng cho thư mục `main/assets/locales/` và tập lệnh [gen_lang.py](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/scripts/gen_lang.py) trên firmware v2.6.0. Hệ thống tài nguyên mặc định đọc định dạng tệp OGG. Đối với quy trình xử lý âm thanh P3 đời cũ, hãy xem mục [Âm thanh thông báo P3 đời cũ](./archive/p3-prompts.md).

<a name="audio"></a>

## 1. Chuẩn bị tệp âm thanh nguồn {#audio}

Hãy lưu giữ lại bản thu âm gốc. Nghe kiểm tra kỹ để tránh tình trạng âm thanh bị rè vỡ (clipping), lẫn tạp âm hoặc có khoảng lặng quá dài ở đầu/cuối. Xác định rõ mã ngôn ngữ mục tiêu (locale) và tên tệp âm thanh hiện có cần thay thế. Các bản dịch giao diện người dùng (UI), mô hình từ khóa đánh thức và âm thanh thông báo là những thành phần tài nguyên tách biệt.

<a name="convert"></a>

## 2. Chuyển đổi định dạng âm thanh {#convert}

Sử dụng các tham số mã hóa Opus theo [tập lệnh chuyển đổi cùng phiên bản](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/scripts/mp3_to_ogg.sh), ví dụ:

```sh
ffmpeg -i input.wav -c:a libopus -b:a 16k -ac 1 -ar 16000 -frame_duration 60 output.ogg
```

Đây là các tham số chuyên biệt được phiên bản firmware này sử dụng, không phải tiêu chuẩn bắt buộc chung cho mọi trình phát Opus. Hãy nghe kiểm tra lại sau khi chuyển đổi và rà soát thời lượng, tần số lấy mẫu, số kênh âm thanh (mono) cũng như khả năng giải mã.

<a name="build"></a>

## 3. Sử dụng quy trình tạo tài nguyên tự động {#build}

Hãy thay thế thử nghiệm một tệp âm thanh thông báo có sẵn trước, thay vì đồng thời sửa đổi tên sự kiện và vị trí gọi hàm trong mã nguồn. Ví dụ, để thay âm thanh thông báo cấu hình mạng cho tiếng Trung giản thể trên nhánh làm việc firmware của bạn:

1. Sao lưu tệp `main/assets/locales/zh-CN/wificonfig.ogg` và xác nhận tệp này tương ứng với sự kiện cấu hình mạng mong muốn.
2. Đặt tệp `output.ogg` đã chuyển đổi vào đúng đường dẫn đó và giữ nguyên tên tệp là `wificonfig.ogg`.
3. Làm theo hướng dẫn [Biên dịch cục bộ](./build-firmware.md), chọn đúng bo mạch của bạn và biên dịch lại với tham số `--language zh-CN`. Quá trình biên dịch sẽ tự động thu thập các tệp `.ogg` của ngôn ngữ đó, tạo các tệp tiêu đề ngôn ngữ (language headers) và nhúng âm thanh vào firmware.
4. Nạp bản dựng này lên thiết bị, kích hoạt chế độ cấu hình mạng trên mạch và lắng nghe âm thanh phát ra thực tế. Sau đó mới tiếp tục thay thế lần lượt từng tệp âm thanh khác.

Đối với âm thanh thông báo tiếng Anh, hãy sử dụng tệp tương ứng trong thư mục `main/assets/locales/en-US/` và biên dịch với tham số `--language en-US`.

Việc thay thế tệp âm thanh có sẵn không yêu cầu phải chỉnh sửa văn bản giao diện trong tệp `language.json`. Phiên bản firmware này sẽ tự động dùng tệp của `en-US` làm phương án dự phòng (fallback) nếu ngôn ngữ được chọn bị thiếu tệp âm thanh tương ứng. Nếu muốn thêm sự kiện mới hoặc tên tệp mới, bạn cần sửa đổi tương ứng cả vị trí gọi hàm lẫn quy trình tạo tài nguyên; hãy tham khảo cách triển khai trong mã nguồn cùng phiên bản.

Tuyệt đối không chỉ chỉnh sửa thủ công các tệp được sinh tự động như `main/assets/lang_config.h`, vì quá trình tạo lại tài nguyên sẽ ghi đè toàn bộ thay đổi đó. Quy cách đóng gói tài nguyên, dung lượng phân vùng và giao diện phát âm thanh đều được quy định cố định bởi mã nguồn firmware.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Biên dịch firmware từ một bản dựng sạch (clean build) và kiểm tra xem sự kiện thực tế trên thiết bị có phát đúng đoạn âm thanh của ngôn ngữ mục tiêu hay không. Đảm bảo các ngôn ngữ khác, tính năng đánh thức bằng giọng nói và âm thanh hội thoại không bị ảnh hưởng ngoài ý muốn. Hãy lưu giữ lại tệp âm thanh nguồn, câu lệnh chuyển đổi và thông tin phiên bản bản dựng thay vì chỉ giữ lại tệp nhị phân `.bin` đã biên dịch.
