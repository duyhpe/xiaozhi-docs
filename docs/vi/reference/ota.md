---
id: ota-reference
title: 'Cấu hình OTA, kích hoạt và cập nhật'
description: 'Sử dụng tài liệu tham chiếu firmware theo đúng phiên bản để phân biệt cấu hình, liên kết tài khoản và tải bản cập nhật.'
status: review
reviewedAt: '2026-11-15'
reviewNote: 'Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Áp dụng cho firmware v2.6.0; kho mã nguồn firmware quản lý toàn bộ đặc tả kỹ thuật và mã triển khai chi tiết.'
sourceArticles:
  - DOC-40
translation:
  status: review
  sourceHash: 085c401beb16cf42386e8b7dfd5bdf339b92a4a5e4bdc9bcdb23c95d4376e9f1
  reviewedAt: '2026-11-15'
---
# Cấu hình OTA, kích hoạt và cập nhật

Khi khởi động, XiaoZhi sẽ truy vấn dịch vụ OTA để lấy cấu hình kết nối, thông tin kích hoạt và phiên bản firmware khả dụng. Khái niệm OTA ở đây bao hàm nhiều tác vụ hơn là chỉ tải xuống một bản cập nhật. **Phiên bản `xiaozhi-esp32` tương ứng** sẽ quy định toàn bộ giao ước kỹ thuật này.

<a name="scope"></a>

## Đối chiếu cùng một phiên bản {#scope}

Trang này áp dụng cho phiên bản v2.6.0 / `4de00aed740595a8713b01f8332b9b2cf30685bc`.

| Chủ đề | Tài liệu tham chiếu chính thức của firmware |
| --- | --- |
| Địa chỉ, định danh yêu cầu, năng lực thiết bị, phản hồi cấu hình | [Tài liệu OTA](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/ota.md) |
| Chuỗi thử thách kích hoạt, tải xuống và quyết định phiên bản | [Mã nguồn thiết bị main/ota.cc](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/ota.cc) |
| Khởi động, liên kết tài khoản và chuyển đổi trạng thái cập nhật | [Mã triển khai ứng dụng](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/application.cc) |

Khi gỡ lỗi một phiên bản khác, hãy chuyển đổi đồng bộ cả tài liệu lẫn mã nguồn sang phiên bản đó. Hệ thống máy chủ triển khai cần tuân thủ đúng các phiên bản trình khách (client) mà nó hỗ trợ, thay vì trộn lẫn đường dẫn và định dạng yêu cầu của nhiều phiên bản khác nhau.

<a name="flows"></a>

## Phân biệt bốn luồng thao tác {#flows}

- **Cài đặt lần đầu:** sử dụng đúng bo mạch và tệp ảnh hoàn chỉnh; xem mục [Nạp và nâng cấp firmware](../firmware/flashing.md).
- **Lấy cấu hình kết nối:** thiết bị gửi yêu cầu lấy thiết lập kết nối và năng lực của chính nó. Kiểm tra địa chỉ URL thực tế, thông tin định danh và mã phản hồi HTTP.
- **Kích hoạt và liên kết tài khoản:** tuân theo dữ liệu phản hồi và trạng thái hiện tại của thiết bị. Chuỗi thử thách (challenge), mã thiết bị 6 chữ số và số sê-ri (serial number) đảm nhiệm các vai trò hoàn toàn khác nhau.
- **Cập nhật phiên bản:** kiểm tra phiên bản firmware, bo mạch mục tiêu và bố cục phân vùng trước khi tải về tệp cài đặt tương thích.

Phiên bản bố cục yêu cầu HTTP, phiên bản xác thực kích hoạt, phiên bản khung truyền tải (transport envelope), phiên bản MCP và giá trị `application.version` là những khái niệm tách biệt. Hãy tra cứu đặc tả của đúng phiên bản tương ứng để biết các trường dữ liệu, tiêu đề (headers) và ví dụ hợp lệ.

<a name="debug"></a>

## Trình tự khắc phục sự cố {#debug}

Kiểm tra kết nối mạng và thời gian hệ thống trên thiết bị trước tiên, sau đó kiểm tra lần lượt yêu cầu lấy cấu hình, bước kích hoạt, kết nối trò chuyện và cuối cùng là đối khớp bản cập nhật. Phân biệt rõ các lỗi: không thể kết nối tới dịch vụ, thiết bị chưa liên kết tài khoản, không có bản cập nhật được chọn và lỗi tải tệp xuống. Một đường dẫn cập nhật cố định không thể thay thế cho điểm cuối cấu hình của mọi thiết bị.

Các đường dẫn như `/api/ota/` đời cũ và `/xiaozhi/ota/` hiển thị trên thiết bị có thể thuộc về các tầng triển khai khác nhau. Hãy đối chiếu tài liệu triển khai hệ thống và mã nguồn trình khách của bạn để xác định chính xác điểm cuối được truy vấn và cơ chế định tuyến thực tế.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Trong môi trường kiểm thử được kiểm soát, hãy thử nghiệm tách biệt các trường hợp: thiết bị chưa liên kết / đã liên kết, có bản cập nhật / không có bản cập nhật và khả năng phục hồi khi gặp lỗi. Ghi lại phiên bản trình khách và cấu hình máy chủ. Các thay đổi về bố cục phân vùng cũng đòi hỏi bài kiểm thử cài đặt toàn bộ và kiểm tra khả năng giữ lại dữ liệu. Một phản hồi `HTTP 200` đơn thuần chưa đủ chứng minh quá trình kích hoạt hay cập nhật đã thành công.

<a name="next"></a>

## Các bước tiếp theo {#next}

Đối với nhu cầu sử dụng hằng ngày, hãy xem mục [Tải xuống và chọn firmware](../firmware/downloads.md) và [Kết nối và liên kết thiết bị](../getting-started/wifi-and-binding.md). Các nhà phát triển máy chủ nên duy trì quy chuẩn giao tiếp và bộ kiểm thử bám sát kho mã nguồn firmware, đồng thời đối chiếu các trường dữ liệu và phân vùng với các phiên bản trình khách được hỗ trợ.
