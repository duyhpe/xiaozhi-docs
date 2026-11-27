---
id: community-mcp-tools
title: Công cụ và dịch vụ MCP từ cộng đồng
description: Tìm thông tin tác giả và liên kết bảo trì, đồng thời phân biệt quy trình tích hợp chung với cách thiết lập của bên thứ ba.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các dự án và nguyên mẫu của bên thứ ba chưa được kiểm thử toàn bộ; vui lòng kiểm tra kỹ phiên bản chính xác và yêu cầu phần cứng trước khi sử dụng.
sourceArticles:
  - DOC-43
  - DOC-26
  - DOC-27
  - DOC-28
translation:
  status: review
  sourceHash: 806768fa303e7a3617a1f5919109a6b8875df41408c8e26a1f902103dafbffad
  reviewedAt: '2026-11-15'
---
# Công cụ và dịch vụ MCP từ cộng đồng

Các công cụ từ cộng đồng này cung cấp nhiều phương thức vận hành và bảo trì khác nhau. Chúng không phải là dịch vụ chính thức của XiaoZhi, và việc được liệt kê tại đây không đồng nghĩa với việc trang tài liệu này đã chạy thử, kiểm toán bảo mật hay đảm bảo mọi tính năng bên ngoài.

<a name="scope"></a>

## Chọn phương thức vận hành {#scope}

| Loại hình | Mục đích sử dụng phù hợp | Nội dung cần kiểm tra |
| --- | --- | --- |
| Trình khởi chạy cục bộ trên máy tính | Duy trì các công cụ hoạt động trực tuyến trên máy tính Windows của bạn | Nguồn phát hành, thư viện phụ thuộc, chế độ ngủ (sleep) và trạng thái tiến trình |
| Nền tảng quản lý tự lưu trữ (Self-hosted) | Quản lý tập trung nhiều điểm cuối và nhiều dịch vụ | Phiên bản, cơ sở dữ liệu, xác thực, cập nhật và sao lưu dữ liệu |
| Dịch vụ lưu trữ sẵn của bên thứ ba | Nhà cung cấp dịch vụ duy trì hệ thống chạy liên tục | Quyền sử dụng thông tin xác thực, chi phí, đơn vị vận hành và cách ngừng sử dụng |

<a name="mcptools"></a>

## XiaoZhi MCPTools {#mcptools}

Tác giả: **ZongZiTongXue (粽子同学)**. Dự án: [xiaozhi-MCPTools](https://github.com/ZongZiTongXue/xiaozhi-MCPTools). Hãy đọc kỹ ghi chú phát hành của tác giả về phiên bản hiện hành và gói cài đặt trước khi sử dụng.

Tác giả tự duy trì hướng dẫn cài đặt chi tiết. Đối với các lỗi phân quyền hoặc lỗi `401`, hãy kiểm tra ghi chú phát hành và cấu hình xác thực. Hãy kiểm chứng điểm cuối của bạn bằng [ví dụ tối giản chính thức](../mcp/quickstart.md) trước tiên và lưu giữ lại thông báo lỗi khởi chạy thực tế.

### Cài đặt và thiết lập kết nối đầu tiên

[Hướng dẫn cài đặt do tác giả duy trì (tiếng Trung)](https://kcn80f4hacgs.feishu.cn/docx/HErcd1F8LoKjDnx3O0Pcktd3nPI) cung cấp các bản phát hành, thiết lập thư viện phụ thuộc và các bước thao tác giao diện; ngoài ra còn có [video hướng dẫn cài đặt (tiếng Trung)](https://v.douyin.com/PK-NmFdDIsE/). Hãy tuân thủ yêu cầu của đúng phiên bản bạn tải về thay vì dùng lại mật khẩu trình cài đặt hoặc thiết lập quyền từ phiên bản khác.

1. Hoàn tất quá trình khởi tạo của phiên bản đó và kiểm tra Python/thư viện phụ thuộc mà không phát sinh lỗi cài đặt.
2. [Sao chép địa chỉ điểm cuối MCP của trợ lý mục tiêu](../mcp/quickstart.md#endpoint), thêm vào ứng dụng, đặt cho mục này một tên trợ lý dễ nhận biết và lưu lại.
3. Giữ cửa sổ dòng lệnh (terminal) hiển thị trong lần chạy đầu tiên, khởi chạy MCP và kiểm tra lỗi kết nối cũng như lỗi của tiến trình con.
4. Làm mới danh sách công cụ trong cùng trợ lý đó, yêu cầu gọi rõ ràng một công cụ và kiểm chứng kết quả thực tế. Các công cụ chạy cục bộ sẽ ngoại tuyến khi máy tính chuyển sang chế độ ngủ hoặc khi bạn đóng ứng dụng.

Khi gặp lỗi cài đặt hoặc xác thực, hãy lưu giữ thông báo lỗi thực tế cùng phiên bản phần mềm và làm theo hướng dẫn xử lý sự cố hiện hành của tác giả. Một lưu ý cũ về việc có thể bỏ qua lỗi `401` ở phiên bản trước không có nghĩa là mọi lỗi xác thực đều an toàn để bỏ qua.

<a name="mcphub"></a>

## xiaozhi-mcphub {#mcphub}

Người duy trì: **huangjunsen0406**. Dự án: [xiaozhi-mcphub](https://github.com/huangjunsen0406/xiaozhi-mcphub), hỗ trợ quản lý nhiều điểm cuối, phân nhóm và điều phối dịch vụ tập trung.

<figure class="source-figure">

[![Chợ công cụ của xiaozhi-mcphub. Đây là giao diện lựa chọn dịch vụ, không phải sơ đồ kiến trúc kết nối.](../../public/images/zh/doc-27-image-006.webp)](../../public/images/zh/doc-27-image-006.webp)

<figcaption>Chợ công cụ của xiaozhi-mcphub. Đây là giao diện lựa chọn dịch vụ, không phải sơ đồ kiến trúc kết nối.</figcaption>
</figure>

Trước khi tự triển khai lên máy chủ (self-hosting), hãy đọc kỹ tệp `README` của phiên bản đó, cố định phiên bản image/mã nguồn, đổi thông tin đăng nhập mặc định, đồng thời kiểm tra phương án cơ sở dữ liệu và sao lưu dự phòng.

<a name="bridge-tools"></a>

## Cầu nối HyperChat / McpPipe {#bridge-tools}

Cài đặt từ [dự án và bản phát hành HyperChat](https://github.com/BigSweetPotatoStudio/HyperChat) cùng [dự án và hướng dẫn tích hợp McpPipe](https://github.com/onepy/Mcp_Pipe-Xiaozhi-All#readme). Chọn các phiên bản tương thích và làm theo tệp `README` của từng dự án để cài đặt và khởi chạy.

1. Tạo một cổng kết nối MCP (MCP gateway) trong HyperChat, chọn các công cụ muốn chia sẻ trong danh sách MCP được phép (allowed-MCP), lưu lại và sao chép địa chỉ URL cổng kết nối vừa tạo.
2. Trong McpPipe, chọn giao thức truyền tải khớp với địa chỉ URL đó. Đối với cổng Streamable HTTP, hãy chọn chế độ tương ứng và dán URL cổng kết nối vào ô địa chỉ dịch vụ từ xa.
3. Dán [địa chỉ điểm cuối MCP của trợ lý XiaoZhi](../mcp/quickstart.md#endpoint) vào ô điểm cuối XiaoZhi. URL cổng kết nối và điểm cuối XiaoZhi đảm nhiệm hai vai trò khác nhau; tuyệt đối không dán tráo đổi vị trí của chúng.
4. Kết nối và duy trì chạy cả hai ứng dụng. Làm mới danh sách công cụ trên XiaoZhi Console, sau đó thực hiện một lượt gọi công cụ rõ ràng. Sau khi thêm công cụ mới, hãy nhớ bật công cụ đó trong danh sách được phép của cổng kết nối và kết nối lại.

Xem mục [Kết nối các dịch vụ MCP có sẵn](../mcp/connect-existing-servers.md) để nắm rõ cấu hình chung và cách xử lý sự cố cho stdio, SSE và HTTP.

<a name="search"></a>

## Tìm kiếm web Shanmao {#search}

Shanmao Technology cung cấp dịch vụ tìm kiếm lưu trữ sẵn. Trước khi sử dụng, hãy kiểm tra điểm truy cập HTTPS hiện hành, biểu phí và đơn vị vận hành, sau đó cân nhắc kỹ xem có nên giao thông tin xác thực MCP của bạn cho dịch vụ này hay không.

Sử dụng [hướng dẫn bảo trì dịch vụ](https://my.feishu.cn/docx/DN0ndX1JaoP4EWx1FBWcdCmcnoc) để xác minh địa chỉ HTTPS hiện hành và đơn vị vận hành. Nếu muốn tự triển khai tích hợp tìm kiếm trên máy của mình, hãy xem [ví dụ tìm kiếm web](../mcp/examples/web-search.md).

<SourceMaterials article="DOC-43" />

<a name="materials"></a>

## Trước khi kết nối {#materials}

Hãy sử dụng bản phát hành hiện hành của người duy trì dự án, đồng thời kiểm tra quyền hạn truy cập, thư viện phụ thuộc và cách thoát chương trình an toàn. Xóa bỏ địa chỉ điểm cuối MCP, khóa API và dữ liệu cá nhân trước khi chia sẻ tệp cấu hình hoặc ảnh chụp màn hình.

<a name="verify"></a>

## Kiểm tra tính khả dụng {#verify}

Bằng tài khoản của chính bạn, hãy kiểm chứng lần lượt: kết nối điểm cuối → khám phá công cụ → gọi công cụ rõ ràng → kết quả trả về chính xác, sau đó kiểm tra quá trình khởi động lại, khôi phục mạng và tắt ứng dụng. Chỉ chia sẻ nhật ký đã che thông tin nhạy cảm. Mọi sự cố phát sinh từ công cụ bên thứ ba vui lòng gửi trực tiếp tới người duy trì dự án tương ứng.
