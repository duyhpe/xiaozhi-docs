---
id: websocket-reference
title: Các phiên bản giao thức WebSocket
description: 'Tra cứu tài liệu firmware tương ứng cho tầng truyền tải, phiên làm việc và luồng âm thanh.'
status: review
reviewedAt: '2026-11-15'
reviewNote: 'Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Áp dụng cho firmware v2.6.0; kho mã nguồn firmware quản lý toàn bộ đặc tả kỹ thuật và mã triển khai chi tiết.'
sourceArticles:
  - DOC-38
translation:
  status: review
  sourceHash: ed94cb41ea90d1dd1ead00ec6de909dc9ad7eb380f822efd87c5c67de6c51222
  reviewedAt: '2026-11-15'
---
# Các phiên bản giao thức WebSocket

**Kho mã nguồn `xiaozhi-esp32`** duy trì đầy đủ định dạng bản tin, khung dữ liệu nhị phân (binary envelopes) và các bước chuyển đổi trạng thái. Trang này liên kết đến tài liệu kỹ thuật và mã nguồn triển khai của cùng một phiên bản.

<a name="scope"></a>

## Chọn phiên bản tham chiếu chuẩn {#scope}

Trang này áp dụng cho firmware **v2.6.0**, mã commit `4de00aed740595a8713b01f8332b9b2cf30685bc`. Đối với phiên bản khác, hãy tra cứu tài liệu trong kho mã nguồn của đúng phiên bản đó thay vì áp dụng các trường dữ liệu của bản mới hơn.

| Nội dung tra cứu | Tài liệu tham chiếu chính thức |
| --- | --- |
| Luồng hoạt động tổng thể, tiêu đề (headers), JSON, âm thanh và trạng thái | [Tài liệu WebSocket cùng phiên bản](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/websocket.md) |
| Bắt tay kết nối (handshake), tiêu đề phiên bản, xuất/nhập nhị phân, phân tích bản tin `hello` từ máy chủ | [websocket_protocol.cc](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/protocols/websocket_protocol.cc) |
| Nguồn gốc của địa chỉ kết nối và mã token | [Cấu hình OTA và kích hoạt](./ota.md) |
| Giao thức MCP truyền tải qua kết nối này | [Giao thức MCP cùng phiên bản](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/mcp-protocol.md) |

<a name="debug"></a>

## Trình tự kiểm tra {#debug}

1. Xác định phiên bản firmware, model bo mạch và phương thức kết nối thực tế từ nhật ký (logs). Kiểm tra cấu hình kết nối do dịch vụ OTA trả về trước tiên.
2. Đối chiếu các tiêu đề (headers) và bản tin `hello` để xác định phiên bản khung đóng gói (envelope version), thông số âm thanh và các năng lực được hỗ trợ.
3. Phân biệt rõ bản tin điều khiển JSON, dữ liệu âm thanh nhị phân và các lượt gọi công cụ (tool calls). Số phiên bản ở các tầng giao thức khác nhau không phải là một con số dùng chung duy nhất.
4. Kiểm tra thông tin phiên làm việc (session), trạng thái và thông báo lỗi, sau đó dựa vào chuỗi gửi/nhận thực tế để khoanh vùng sự cố.

Mã triển khai hiện tại có phân tích trường `session_id` của máy chủ và hỗ trợ nhiều định dạng khung đóng gói nhị phân. Hãy kiểm tra đồng thời cả chi tiết phiên làm việc lẫn phiên bản khung đóng gói đang được chọn.

<a name="verify"></a>

## Bảo trì và kiểm chứng {#verify}

Hãy hiệu chỉnh các khác biệt về giao thức, trường dữ liệu và ví dụ phân tích cú pháp ngay trong kho mã nguồn firmware trước, sau đó mới cập nhật các liên kết theo phiên bản trên trang tài liệu này. Sơ đồ trạng thái phải khớp với đúng phiên bản firmware đang được gỡ lỗi.

Việc kiểm chứng khả năng tương tác giữa hai đầu kết nối đòi hỏi đối chiếu phiên bản và bản tin thực tế của cả hai phía, chứ không chỉ dừng lại ở việc thiết lập kết nối WebSocket thành công. Nhớ xóa bỏ thông tin xác thực và định danh thiết bị trước khi chia sẻ các bản ghi dữ liệu truyền (traces).

<a name="next"></a>

## Các bước tiếp theo {#next}

Để tìm hiểu về ngữ nghĩa hiển thị trên màn hình, hãy xem mục [Biểu cảm và tài nguyên hiển thị](./display-emotions.md). Nếu bạn tự triển khai máy chủ riêng (self-hosted), hãy bắt đầu từ các tài liệu tham chiếu theo phiên bản và bộ kiểm thử ở trên thay vì tự sao chép lại giao thức một cách độc lập.
