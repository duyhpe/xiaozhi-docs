---
id: github-verification
title: Xác minh GitHub và quyền lợi
description: Liên kết tài khoản GitHub với tài khoản XiaoZhi của bạn và tìm hiểu các quyền lợi nhận được sau khi xác minh.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-01
translation:
  status: review
  sourceHash: d6da98922fdc1815d5a84a214eafb46c1d4cc502b5f15b70821f48923090f75c
  reviewedAt: '2026-11-15'
---
# Xác minh GitHub và quyền lợi

Tính năng xác minh GitHub giúp liên kết tài khoản GitHub với một tài khoản XiaoZhi đã đăng nhập sẵn, qua đó mở khóa các quyền lợi về mô hình và hạn mức sử dụng tương ứng. Đây không phải là phương thức đăng nhập độc lập hay bước đăng ký cho nền tảng nhà phát triển thương mại.

<a name="scope"></a>

## Chuẩn bị {#scope}

Chuẩn bị sẵn tài khoản XiaoZhi và tài khoản GitHub của riêng bạn, đồng thời đảm bảo bạn có thể đăng nhập vào cả hai. Các mô hình khả dụng và quyền lợi cụ thể phụ thuộc vào thông tin hiển thị trên trang tài khoản Console hiện hành.

<a name="open"></a>

## 1. Mở trang xác minh {#open}

Đăng nhập vào [XiaoZhi Console](https://xiaozhi.me/console/) và chọn mục xác minh GitHub trong trình đơn tài khoản, hoặc truy cập trực tiếp [trang xác minh GitHub](https://xiaozhi.me/console/github-auth).

<a name="bind"></a>

## 2. Liên kết và kiểm tra kết quả {#bind}

1. Chọn tùy chọn liên kết GitHub và chuyển tiếp sang trang cấp quyền (authorization) của GitHub.
2. Kiểm tra kỹ tài khoản GitHub đang đăng nhập cùng ứng dụng được cấp quyền, sau đó hoàn tất các bước xác nhận theo yêu cầu.
3. Khi được chuyển hướng quay lại XiaoZhi, hãy kiểm tra tên người dùng đã liên kết và trạng thái xác minh. Nếu thao tác thất bại, hãy đọc kỹ thông báo lỗi thay vì tải lại một đường dẫn phản hồi (callback URL) đã hết hạn.
4. Mở lại phần cài đặt mô hình và cơ sở tri thức để kiểm tra các tùy chọn cùng hạn mức thực tế được cấp cho tài khoản của bạn.

<figure class="source-figure">

[![Quy trình xác minh GitHub.](../../public/images/en/github-auth-flow.svg)](../../public/images/en/github-auth-flow.svg)

<figcaption>Quy trình xác minh GitHub. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="benefits"></a>

## 3. Tìm hiểu các quyền lợi {#benefits}

| Hạng mục | Nơi kiểm tra |
| --- | --- |
| Mô hình và giọng nói | Danh sách trong phần cấu hình trợ lý hiện tại; chính sách dịch vụ có thể thay đổi |
| Cơ sở tri thức và số lượng tài liệu | Các thông báo trên trang [cơ sở tri thức](./knowledge-base.md); hạn mức khác nhau tùy loại tài khoản |
| Số lượng thiết bị | Giới hạn hiển thị khi thực hiện thao tác thêm thiết bị mới |
| Năng lực nền tảng nhà phát triển thương mại | Tách biệt hoàn toàn với việc liên kết GitHub; cần tuân thủ yêu cầu riêng của nền tảng thương mại |

Các quyền lợi dịch vụ có thể thay đổi theo thời gian. Hãy kiểm tra lại trang thông tin tài khoản trước khi mua gói hoặc cấu hình tính năng.

<a name="verify"></a>

## Hủy liên kết và kiểm tra lại {#verify}

Đọc kỹ các lưu ý hiển thị trên trang trước khi hủy liên kết. Hiện tại, việc gỡ bỏ xác minh GitHub sẽ tự động đăng xuất phiên làm việc và yêu cầu bạn đăng nhập lại. Không đánh giá quyền lợi dựa trên một trang cũ còn mở sau khi đã đăng xuất. Sau khi đăng nhập lại, hãy kiểm tra trạng thái liên kết, các mô hình khả dụng và các dịch vụ hiện có.

<a name="next"></a>

## Các bước tiếp theo {#next}

Tiếp tục với hướng dẫn [Cơ sở tri thức](./knowledge-base.md) hoặc [Nhân bản giọng nói](./voice-cloning.md). Nếu gặp sự cố đăng nhập, hãy xem mục [Khắc phục sự cố tài khoản](../faq/account-and-binding.md).
