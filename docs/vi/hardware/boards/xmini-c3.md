---
id: xmini-c3
title: 'Các biến thể Xmini-C3, V3 và 4G'
description: 'Xác định đúng phiên bản bo mạch trước khi chọn firmware, nguồn cấp và các bước vận hành.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-29
translation:
  status: review
  sourceHash: cbfd673a9f69a78954b2a0493ba33121aaead15af5810e0fb6480144a65d1de5
  reviewedAt: '2026-11-15'
---
# Các biến thể Xmini-C3, V3 và 4G

Xmini là một dòng phần cứng. Các biến thể Wi-Fi, V3 và 4G của dòng này là những bo mạch khác nhau. Firmware của từng loại quyết định khả năng hỗ trợ mạch điện, sơ đồ chân âm thanh và quy trình khởi tạo mạng.

<figure class="source-figure">

[![Bo mạch Xmini-C3.](../../../public/images/zh/doc-29-image-001.webp)](../../../public/images/zh/doc-29-image-001.webp)

<figcaption>Bo mạch Xmini-C3.</figcaption>
</figure>

<a name="scope"></a>

## 1. Xác định phiên bản bo mạch của bạn {#scope}

| Dòng bo mạch | Thư mục mã nguồn v2.6.0 | Điểm cần kiểm tra |
| --- | --- | --- |
| C3 Wi-Fi | `xmini/c3` | Chip ES8311, màn hình OLED và sơ đồ chân đời đầu |
| C3 V3 | `xmini/c3-v3` | Các chân I2S/I2C/PA khác với phiên bản đời đầu |
| C3 4G | `xmini/c3-4g` | Module mạng di động, thẻ SIM, nguồn cấp và cấu hình mạng |

Ví dụ, giao tiếp I2C của chip Codec đời đầu sử dụng chân GPIO3/4, trong khi phiên bản V3 lại sử dụng chân GPIO0/1. Không suy đoán cách đấu dây của bo mạch đời mới từ hình ảnh của phiên bản cũ. Hãy tham khảo [thư mục bo mạch theo phiên bản](https://github.com/78/xiaozhi-esp32/tree/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/xmini).

<figure class="source-figure">

[![Vị trí nút BOOT, công tắc nguồn và cổng USB trên bo mạch đời đầu; không dùng ảnh này để suy đoán chân của bản V3.](../../../public/images/zh/doc-29-image-019.webp)](../../../public/images/zh/doc-29-image-019.webp)

<figcaption>Vị trí nút BOOT, công tắc nguồn và cổng USB trên bo mạch đời đầu; không dùng ảnh này để suy đoán chân của bản V3.</figcaption>
</figure>

<a name="flash"></a>

## 2. Cài đặt firmware {#flash}

Tìm chính xác bo mạch và biến thể trong [trình biên dịch trực tuyến](../../firmware/online-builder.md) hoặc mục [tải xuống chính thức](../../firmware/downloads.md). Một gói phát hành có thể bao gồm tiền tố tên nhà sản xuất; hãy đối chiếu đồng thời cả tên thư mục và tên đầy đủ của tệp. Nếu thiết bị v1 cũ cần dùng firmware đời trước, chỉ sử dụng [bản v1.9.4](../../firmware/releases/v1.9.4.md) khi khớp với phần cứng.

Làm theo [hướng dẫn nạp firmware](../../firmware/flashing.md) để đưa bo mạch vào chế độ tải (download mode). Cơ chế nút BOOT và cổng USB của C3 khác với bản S3 cơ bản. Hãy sử dụng tài liệu của bo mạch và mã nguồn tương ứng thay vì sao chép cách nối chân GPIO0 của S3.

### Trường hợp bo mạch trống chưa hiện cổng COM

Đối với bo mạch Xmini-C3 minh họa ở đây (có nút BOOT và công tắc nguồn): hãy gạt tắt công tắc nguồn, cắm cáp dữ liệu USB, nhấn giữ nút **BOOT**, sau đó gạt bật nguồn. Thả nút BOOT ra sau khi máy tính nhận diện cổng COM mới và chọn cổng đó trong công cụ nạp. Việc chỉ rút cáp USB có thể không ngắt nguồn hoàn toàn nếu bo mạch đang gắn pin; hãy dùng công tắc nguồn. Sau khi nạp xong, thả nút BOOT và tắt rồi bật lại nguồn để khởi chạy ứng dụng. Làm theo hướng dẫn riêng của bo mạch đối với các phiên bản khác.

<a name="use"></a>

## 3. Kết nối mạng, liên kết thiết bị và trò chuyện {#use}

Đối với các bo mạch Wi-Fi, hãy cấu hình mạng qua điểm phát sóng (hotspot) hoặc BluFi tùy theo bản dựng, sau đó tiếp tục bước [liên kết thiết bị](../../getting-started/wifi-and-binding.md). Đối với bản 4G, hãy kiểm tra module, thẻ SIM và trạng thái kết nối mạng trước khi lấy mã thiết bị gồm 6 chữ số.

Kiểm tra khả năng thu âm của micro và phát âm thanh ra loa bằng nút bấm trước khi thử nghiệm từ khóa đánh thức. Các bản dựng C3 hiện nay có thể sử dụng các mô hình WakeNet dung lượng nhẹ tương thích; nhận định cũ cho rằng C3 không bao giờ hỗ trợ từ khóa đánh thức ngoại tuyến đã lỗi thời. Xem mục [từ khóa đánh thức](../../development/wake-words.md) và thông tin mô hình thực tế để biết các cụm từ được hỗ trợ.

Kiểm tra tính năng đo điện áp pin, cổng sạc, chế độ ngủ (sleep) và chức năng các nút bấm theo đúng phiên bản phần cứng cụ thể. Việc màn hình hiển thị biểu tượng pin không đồng nghĩa với việc mọi biến thể đều có mạch đo dung lượng pin.

### Cấu hình lại mạng và quyền sở hữu tài khoản

Trên firmware Wi-Fi Xmini-C3 bản v2.6.0, nhấn nhanh nút **BOOT** ngay trong lúc thiết bị đang khởi động lại để vào chế độ cấu hình Wi-Fi. Khi thiết bị đang ở trạng thái chờ bình thường, nút này dùng để điều khiển cuộc trò chuyện; khi bật chế độ nhấn để nói (press-to-talk), hãy nhấn giữ để ghi âm và thả ra để kết thúc. Việc nhấn giữ nút BOOT trong lúc bật nguồn sẽ đưa mạch vào chế độ nạp firmware chứ không phải chế độ cấu hình Wi-Fi.

Nếu thiết bị đang thuộc về một tài khoản khác, trước tiên hãy nhờ chủ sở hữu đó [hủy liên kết thiết bị](../../faq/account-and-binding.md#unbind). Nếu không thể liên hệ, hãy làm theo hướng dẫn [gửi email yêu cầu hủy liên kết](../../faq/account-and-binding.md#ownership) kèm theo địa chỉ MAC và các thông tin thiết bị liên quan.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Xác nhận phiên bản và biến thể firmware khớp với phần cứng, sau đó kiểm tra màn hình, âm thanh, kết nối mạng và cuộc trò chuyện. Chỉ thử nghiệm tính năng đo pin và đánh thức bằng giọng nói trên các phiên bản có phần cứng và bản dựng hỗ trợ. Ghi nhận kết quả cho từng phiên bản bo mạch cụ thể thay vì áp dụng chung kết quả của một bo mạch cho cả dòng sản phẩm.

<a name="sources"></a>

## Các bước tiếp theo {#sources}

Sử dụng hình ảnh minh họa để nhận diện vị trí nút bấm và cổng kết nối trên phiên bản tương ứng. Sơ đồ chân và cơ chế hoạt động được quy định bởi tài liệu bo mạch và firmware khớp với nó. Phần cứng mã nguồn mở được duy trì tại [dự án Xmini của Xia Ge](https://oshwhub.com/tenclass01/xmini_c3). Nếu bạn tự lắp mạch breadboard C3, hãy xem hướng dẫn [Mạch C3 với ES8311](../breadboard-esp32-c3.md).
