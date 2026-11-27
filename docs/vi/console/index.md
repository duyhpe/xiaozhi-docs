---
id: console
title: Hướng dẫn sử dụng Console
description: 'Cấu hình trợ lý (agent), giọng nói, cơ sở tri thức và thiết bị trên XiaoZhi Console.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
translation:
  status: review
  sourceHash: 8e8c95f01888497de7a5da8614cd4d0723d2bfa6f7cfb96f482eaa67ba6a6ed7
  reviewedAt: '2026-11-15'
---
# Hướng dẫn sử dụng Console

Sử dụng trang Console để quản lý tài khoản, giọng nói, cơ sở tri thức và các thiết bị của bạn. Làm theo các hướng dẫn bên dưới; các tính năng khả dụng, hạn mức (quota) và chi phí tuân theo thông tin hiển thị trên tài khoản của bạn.

<a name="guides"></a>

## Chọn hướng dẫn {#guides}

| Hướng dẫn | Nội dung |
| --- | --- |
| [Cấu hình nhân vật, mô hình và giọng nói](#role-and-voice) | Thay đổi tên gọi, tính cách nhân vật, mô hình ngôn ngữ và giọng nói; lưu và kiểm tra hoạt động. |
| [Nhận diện giọng nói người dùng](#speaker-recognition) | Chọn bản ghi giọng nói, thêm tên người nói và mô tả mối quan hệ. |
| [Xác minh GitHub và quyền lợi](./github-verification.md) | Liên kết GitHub với tài khoản XiaoZhi đã đăng nhập và phân biệt quy trình xác minh này với nền tảng dành cho nhà phát triển. |
| [Nhân bản giọng nói](./voice-cloning.md) | Chuẩn bị bản thu âm đạt chuẩn, huấn luyện giọng nói và thử nghiệm với trợ lý. |
| [Cơ sở tri thức](./knowledge-base.md) | Phân tích tài liệu thành dữ liệu có thể tìm kiếm, kiểm tra truy xuất và kết nối cơ sở tri thức vào trợ lý. |

<a name="role-and-voice"></a>

## Thay đổi tên gọi, giọng nói và mô hình ngôn ngữ {#role-and-voice}

1. Đăng nhập vào [Console](https://xiaozhi.me/console/), tìm đúng trợ lý (agent) đang quản lý thiết bị của bạn và mở mục **Cấu hình (Configure)**.
2. Trong phần thiết lập vai trò và giọng nói, thay đổi biệt danh của trợ lý, chọn ngôn ngữ giao tiếp và giọng nói. Hãy nghe thử giọng nói trước; làm theo hướng dẫn [Nhân bản giọng nói](./voice-cloning.md) nếu muốn dùng giọng của chính bạn.
3. Để tùy chỉnh nhân vật, hãy bật phần mô tả nhân vật tùy chỉnh và điền thông tin về danh tính, giọng điệu cùng nhiệm vụ của trợ lý. Biệt danh của trợ lý không làm thay đổi [từ khóa đánh thức](../development/wake-words.md) ngoại tuyến trên thiết bị.
4. Trong phần thiết lập mô hình và bộ nhớ, chọn một mô hình ngôn ngữ khả dụng cho tài khoản của bạn. Đọc kỹ thông báo điều kiện hoặc giới hạn đối với các tùy chọn bị làm mờ (vô hiệu hóa). Năng lực xử lý và chi phí phụ thuộc vào trang cấu hình hiện tại.
5. Nhấn **Lưu (Save)**, đóng lại rồi mở lại phần cấu hình để kiểm tra xem các lựa chọn đã được lưu giữ chưa. Bắt đầu một cuộc trò chuyện mới trên thiết bị để kiểm tra nhân vật và giọng nói thực tế; việc nghe thử thành công trên web chưa đủ khẳng định thiết bị đã áp dụng cấu hình đó.

<a name="speaker-recognition"></a>

## Giúp trợ lý nhận diện người nói {#speaker-recognition}

Nhận diện giọng nói người dùng (speaker recognition) giúp phân biệt ai đang nói chuyện. Trong khi đó, nhân bản giọng nói (voice cloning) thay đổi giọng đọc dùng cho câu trả lời của thiết bị; đây là hai tính năng hoàn toàn khác nhau.

1. Nói rõ ràng với thiết bị mục tiêu đang gắn với trợ lý đó (chỉ có một người nói) để tạo ra một bản ghi giọng nói có thể lựa chọn.
2. Mở mục **Cấu hình → Nhận diện giọng nói (Configure → Speaker recognition)** của trợ lý và thêm người nói mới.
3. Chọn bản ghi giọng nói gần đây của người đó từ danh sách thả xuống. Hãy nghe lại bản ghi để tránh chọn nhầm giọng người khác hoặc đoạn thu có tiếng nói chồng chéo.
4. Nhập tên người nói và phần mô tả, ví dụ: “Tôi là Minh, người nhà của chủ thiết bị.” Lưu lại và kiểm tra xem tên người nói đã xuất hiện trong danh sách chưa.
5. Bắt đầu một cuộc trò chuyện mới và thử nghiệm với cả người đã đăng ký lẫn người chưa đăng ký. Nếu khả năng nhận diện chưa ổn định, hãy thử thu âm lại ở môi trường yên tĩnh hơn và kiểm tra lại.

Nếu danh sách bản ghi bị trống, hãy kiểm tra xem đã chọn đúng trợ lý chưa, đã có bản ghi giọng nói người dùng nào được tạo chưa và âm thanh có phát bình thường không. Tuân thủ giới hạn về số lượng người nói và độ dài mô tả trên trang. Tiếng ồn và chất lượng thu âm ảnh hưởng trực tiếp đến độ chính xác; không sử dụng tính năng này để xác thực danh tính bảo mật hay phê duyệt thanh toán.

<a name="next"></a>

## Đọc tài liệu và phản hồi {#next}

Các hướng dẫn này luôn mở để cộng đồng cùng rà soát. Hãy sử dụng liên kết phản hồi ở cuối trang để báo cáo sự cố, đính kèm thông tin về phiên bản firmware, bo mạch và các bước tái hiện vấn đề.
