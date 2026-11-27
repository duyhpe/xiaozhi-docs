---
id: audio-and-aec
title: Xử lý âm thanh và khử tiếng vọng (AEC)
description: 'Xác định cơ chế xử lý trên thiết bị/máy chủ và tín hiệu âm thanh tham chiếu, sau đó kiểm thử cuộc trò chuyện thực tế.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-21
translation:
  status: review
  sourceHash: 44cd49754f837d982b007ca0cc5e946e4a35f0cd485f5d77e716aa3db2ee6c07
  reviewedAt: '2026-11-15'
---
# Xử lý âm thanh và khử tiếng vọng (AEC)

Tính năng khử tiếng vọng (AEC) giúp giảm thiểu hiện tượng âm thanh phát ra từ loa của thiết bị bị chính micro của nó thu ngược trở lại. Hiệu quả thực tế phụ thuộc vào đường truyền tín hiệu, tín hiệu âm thanh tham chiếu (reference audio), thiết kế âm học vỏ máy và sự hỗ trợ của firmware/máy chủ, chứ không chỉ đơn thuần là bật một tùy chọn cấu hình.

<a name="scope"></a>

## Xác định hướng triển khai {#scope}

| Phương pháp | Các yêu cầu cần kiểm tra |
| --- | --- |
| AEC trên thiết bị (Device-side AEC) | Dòng chip/PSRAM, bộ xử lý AFE, hỗ trợ từ bo mạch và đường tín hiệu âm thanh tham chiếu sạch |
| AEC trên máy chủ (Server-side AEC) | Quá trình xử lý luồng thu âm (uplink) trên firmware và sự hỗ trợ rõ ràng từ máy chủ; cấu hình hiện tại đang được đánh dấu là chưa ổn định (unstable) |
| Không dùng AEC | Trước tiên hãy thiết lập âm thanh cơ bản và giao tiếp bằng nút bấm vật lý hoặc phương thức tương tác khác |

Hướng dẫn này đối chiếu theo [tệp Kconfig của kho mã nguồn theo phiên bản](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/Kconfig.projbuild). Phạm vi hỗ trợ có thể thay đổi theo từng phiên bản; hãy kiểm tra kỹ các điều kiện phụ thuộc của phiên bản đó trước tiên.

<figure class="source-figure">

[![So sánh hai đường truyền âm thanh được xử lý bởi AEC.](../../public/images/en/aec-reference-path.svg)](../../public/images/en/aec-reference-path.svg)

<figcaption>So sánh hai đường truyền âm thanh được xử lý bởi AEC. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

Sơ đồ này thể hiện mối quan hệ giữa các luồng tín hiệu, không phải sơ đồ mạch điện để tự đấu thêm micro hay dây dẫn. Thiết kế bo mạch và trình điều khiển chip Codec sẽ quyết định nguồn cấp thực tế của tín hiệu tham chiếu đầu vào.

<a name="baseline"></a>

## 1. Thiết lập mức âm thanh cơ bản (Baseline) {#baseline}

Tắt tất cả các bộ xử lý tùy chỉnh không cần thiết. Bắt đầu ở mức âm lượng thấp, kiểm tra âm thanh thông báo, khả năng thu âm và trò chuyện. Kiểm tra xem lỗ micro có bị che khuất không, loa có đang chĩa thẳng vào lỗ micro không và có hiện tượng truyền rung động cơ học qua vỏ máy không. Ghi lại kết quả hoạt động chuẩn khi chưa bật AEC.

Việc lắp hai micro không tự động tạo ra đường tín hiệu âm thanh tham chiếu. Một chiếc micro thứ hai đơn thuần không thể thay thế cho mạch lấy tín hiệu tham chiếu phần cứng.

<a name="configure"></a>

## 2. Cấu hình cho bo mạch {#configure}

Trong [trình biên dịch trực tuyến](../firmware/online-builder.md), chỉ chọn các tính năng âm thanh được cung cấp sẵn cho đúng bo mạch đó. Đối với quá trình biên dịch cục bộ, hãy chọn đúng bo mạch trước khi kiểm tra tùy chọn `Enable AFE Audio Processing` cùng các điều kiện phụ thuộc của AEC trên thiết bị hoặc máy chủ.

Tính năng AEC trên thiết bị hiện tại yêu cầu dòng chip được hỗ trợ, có bộ nhớ PSRAM, bộ xử lý AFE và bo mạch tương thích kèm tín hiệu âm thanh tham chiếu được cấp từ phần cứng tương ứng. Tuyệt đối không xóa bỏ các ràng buộc phụ thuộc trong Kconfig để cố ép bật tính năng này trên một bo mạch không có mạch tín hiệu tham chiếu.

Xem hướng dẫn [Biên dịch cục bộ](./build-firmware.md) để nắm rõ quy trình thiết lập môi trường và cấu hình.

### Bật tính năng và cài đặt cục bộ

1. Hoàn tất một bản dựng chuẩn cho đúng bo mạch của bạn theo hướng dẫn [Biên dịch cục bộ](./build-firmware.md#build), sau đó chạy lệnh `idf.py menuconfig` ngay trong thư mục mã nguồn firmware đó.
2. Trong mục **Xiaozhi Assistant**, đánh dấu chọn **Enable AFE Audio Processing**, sau đó chọn **Enable Device-Side AEC**. Bạn có thể nhấn phím `/` để tìm kiếm nhanh các biến `USE_AUDIO_PROCESSOR` và `USE_DEVICE_AEC`. Nếu một tùy chọn bị ẩn hoặc không khả dụng, hãy kiểm tra các điều kiện phụ thuộc của nó thay vì chọn sang một bo mạch khác chỉ để làm hiện tùy chọn đó.
3. Nhấn phím `S`, xác nhận tên tệp cấu hình và thoát ra. Biên dịch và nạp lại firmware bằng các lệnh sau, thay thế `COM5` bằng cổng thực tế của bạn:

```sh
idf.py build
idf.py -p COM5 flash monitor
```

4. Sau khi thiết bị khởi động lại, hãy kiểm tra phiên bản đang chạy và thực hiện bài so sánh bên dưới. Việc chỉ chọn tùy chọn trong menu mà không biên dịch lại và nạp lại sẽ không làm thay đổi firmware trên thiết bị. Đối với AEC trên máy chủ, trước tiên hãy xác nhận máy chủ có hỗ trợ và tuân thủ các yêu cầu kiểm thử của mục **Enable Server-Side AEC (Unstable)**.

<a name="test"></a>

## 3. So sánh trong cùng điều kiện thử nghiệm {#test}

1. Ghi lại thông số phiên bản firmware, mức âm lượng, khoảng cách nói, thiết kế vỏ máy và nguồn cấp điện.
2. Trong một căn phòng yên tĩnh, kiểm tra xem âm thanh phát ra từ loa có gây kích hoạt đánh thức giả (false wakes) hoặc bị nhận diện nhầm thành giọng nói của người dùng hay không.
3. Trên phần cứng có hỗ trợ, bật đường dẫn AEC đã chọn và lặp lại bài kiểm thử mà không thay đổi bất kỳ điều kiện nào khác.
4. Bổ sung thêm tạp âm nền và mức âm lượng dự kiến sử dụng thực tế, đồng thời kiểm tra tình trạng bỏ sót lệnh gọi, khả năng ngắt lời (interruption) và hiện tượng hú rít phản hồi kéo dài.

Việc biên dịch thành công hoặc thiết bị phát ra câu trả lời đơn thuần chưa đủ chứng minh tính năng khử tiếng vọng hoạt động hiệu quả. Các cơ chế AEC, phát hiện giọng nói (VAD) và ngắt lời hội thoại hoạt động ở các tầng xử lý khác nhau; hãy quan sát và đánh giá tách biệt từng cơ chế.

::: tip Tiêu chí hoàn thành
Xác định đúng đường truyền tín hiệu tham chiếu/xử lý thực tế và đối chiếu kết quả trước/sau khi bật AEC trong cùng điều kiện môi trường. Giao diện hiển thị trên màn hình hay số lượng micro gắn trên mạch không tự khẳng định hiệu năng khử tiếng vọng.
:::

<a name="next"></a>

## Các bước tiếp theo {#next}

Để tìm hiểu về thiết kế âm học và phần cứng, hãy xem mục [Các lưu ý khi thiết kế phần cứng](../hardware/design-guidelines.md). Để tìm hiểu cơ chế kích hoạt thiết bị, xem mục [Từ khóa đánh thức](./wake-words.md). Luôn kiểm tra vị trí các tùy chọn và điều kiện phụ thuộc tương ứng với phiên bản firmware và ESP-IDF bạn đang dùng.
