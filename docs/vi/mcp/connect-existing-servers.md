---
id: connect-existing-mcp
title: Kết nối các dịch vụ MCP có sẵn
description: 'Kết nối cầu nối các dịch vụ stdio, SSE hoặc Streamable HTTP vào trợ lý của bạn.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-28
translation:
  status: review
  sourceHash: 1efe1831a2af07eb33356ad4b9b5febc315f08b458b414aed8acb95501de775e
  reviewedAt: '2026-11-15'
---
# Kết nối các dịch vụ MCP có sẵn

Một dịch vụ MCP có sẵn không cần phải viết lại thành một chương trình công cụ khác. Hãy xác định giao thức truyền tải (transport) của dịch vụ đó và kiểm chứng nó hoạt động độc lập trước khi kết nối với điểm cuối XiaoZhi.

<a name="scope"></a>

## Trước khi bắt đầu {#scope}

Hoàn tất hướng dẫn [Bắt đầu nhanh với MCP](./quickstart.md) và kiểm chứng một công cụ tối giản trên điểm cuối của riêng bạn. Hướng dẫn này tái sử dụng mã commit `mcp_pipe.py` cố định cùng môi trường Python từ bài trước, nhưng sẽ đọc cấu hình cho nhiều dịch vụ cùng lúc.

| Loại dịch vụ | Thông tin kết nối |
| --- | --- |
| stdio | Lệnh chạy cục bộ, tham số, tệp làm việc và các biến môi trường |
| SSE | Đường dẫn URL SSE theo tài liệu của dịch vụ và thông tin xác thực |
| Streamable HTTP | Đường dẫn URL HTTP MCP theo tài liệu của dịch vụ và thông tin xác thực |

Việc chỉ thay đổi giá trị `type` sẽ không biến một REST API thông thường hay một địa chỉ WebSocket bất kỳ thành dịch vụ MCP.

<figure class="source-figure">

[![Chọn đúng giao thức truyền tải cho một dịch vụ MCP có sẵn.](../../public/images/en/mcp-transport-choice.svg)](../../public/images/en/mcp-transport-choice.svg)

<figcaption>Chọn đúng giao thức truyền tải cho một dịch vụ MCP có sẵn. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="standalone"></a>

## 1. Kiểm chứng dịch vụ hoạt động độc lập {#standalone}

Sử dụng trình khách MCP (MCP client) hoặc phương pháp kiểm thử được người duy trì dịch vụ hỗ trợ để xác minh bước khởi tạo (`initialize`), khả năng khám phá công cụ và một lượt gọi hàm thành công. Cố định phiên bản phần mềm và nắm rõ những tệp tin, thiết bị hoặc tài khoản từ xa nào mà dịch vụ đó có quyền truy cập.

Đối với các công cụ thao tác tệp cục bộ, chỉ cấp quyền truy cập cho các thư mục thực sự cần thiết. Đối với Home Assistant và các mã thông báo (token) tương tự, chỉ cấp phạm vi quyền hạn tối thiểu cần dùng. Tuyệt đối không sao chép nguyên văn tệp cấu hình của người khác vốn có chứa đường dẫn thực tế, token và quyền quản trị.

<a name="config"></a>

## 2. Tạo tệp cấu hình {#config}

Tạo tệp `mcp_config.json` ngay trong thư mục chứa cầu nối. Đây là một ví dụ về cấu trúc; hãy thay thế toàn bộ lệnh, đường dẫn và URL giữ chỗ bằng dịch vụ thực tế của bạn:


```json
{
  "mcpServers": {
    "local-tool": {
      "type": "stdio",
      "command": "python",
      "args": ["/absolute/path/to/your_server.py"]
    },
    "remote-tool": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "headers": {"Authorization": "Bearer REPLACE_LOCALLY"}
    }
  }
}
```

Đối với giao thức SSE, hãy sử dụng `type: "sse"` và địa chỉ URL thực tế của dịch vụ. Tuyệt đối không tự đoán các đường dẫn như `/sse` hay `/mcp`. Đặt `disabled: true` để tạm thời bỏ qua một dịch vụ. Hãy thay thế thông tin xác thực ngay trên máy cục bộ và không đưa dữ liệu bí mật thực tế lên kho lưu trữ mã nguồn (Git).

<a name="run"></a>

## 3. Khởi chạy và kiểm tra từng giai đoạn {#run}

Thiết lập biến `MCP_ENDPOINT` trong cùng cửa sổ dòng lệnh (terminal), sau đó chạy lệnh mà không truyền tham số tên tệp kịch bản:

```sh
python mcp_pipe.py
```

Mã commit gốc này sẽ đọc tệp cấu hình và tạo các cầu nối cho những dịch vụ đang được bật. Các kết nối HTTP/SSE sẽ sử dụng gói `mcp-proxy` đã cài đặt trong môi trường. Hãy bật từng dịch vụ một để dễ dàng khoanh vùng sự cố.

Nếu bạn truyền kèm tên một tệp kịch bản Python cục bộ, chương trình sẽ chỉ chạy duy nhất kịch bản đó giống như trong phần bắt đầu nhanh. Tên của một mục khai báo trong tệp cấu hình không phải là đường dẫn tới tệp kịch bản.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Trợ lý mục tiêu phải khám phá được đúng các công cụ mong đợi và thực sự gọi thành công chúng trong lịch sử trò chuyện. Hãy kiểm thử cả tình huống khởi động lại dịch vụ và khôi phục kết nối mạng. Việc công cụ hiển thị trong một ứng dụng khách trên máy tính chưa đủ chứng minh trợ lý XiaoZhi có thể gọi được nó.

<a name="materials"></a>

## Các công cụ giao diện đồ họa của bên thứ ba {#materials}

HyperChat, McpPipe và các công cụ khác có thể hỗ trợ quản lý cổng kết nối (gateway) và phiên làm việc. Tác giả của các công cụ này tự duy trì thông tin cài đặt và phiên bản chi tiết. Xem thêm tại mục [Công cụ MCP từ cộng đồng](../community/mcp-tools.md).

### Điểm khởi đầu cho quyền truy cập tệp và Home Assistant
- **Truy cập tệp (File access):** làm theo [hướng dẫn máy chủ hệ thống tệp MCP chính thức](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem), cài đặt phiên bản Node.js được yêu cầu và chỉ định rõ các thư mục được phép truy cập trong tham số `stdio`. Hãy thử nghiệm việc liệt kê và đọc một thư mục chuyên biệt trước khi cấp quyền cho nhiều thư mục hơn mức cần thiết.
- **Home Assistant:** xem [hướng dẫn máy chủ MCP của Home Assistant](https://www.home-assistant.io/integrations/mcp_server/) để lấy địa chỉ URL MCP thực tế, cấu hình quyền truy cập và chọn các thực thể/công cụ được phép chia sẻ. Chọn một cầu nối hỗ trợ giao thức truyền tải và phương thức xác thực đó. Tính năng “MCP Client” của Home Assistant hoạt động theo chiều ngược lại và không thay thế cho cấu hình máy chủ (server).
- **Cổng kết nối đồ họa (Graphical gateway):** làm theo [các bước dành cho HyperChat / McpPipe](../community/mcp-tools.md#bridge-tools), lưu ý giữ tách biệt địa chỉ URL của cổng từ xa với địa chỉ điểm cuối XiaoZhi.

Hãy kiểm thử bản thân dịch vụ đó hoạt động ổn định trước khi quay lại tệp cấu hình của hướng dẫn này. Việc cài đặt một công cụ trên máy tính không tự động hiển thị công cụ đó cho trợ lý mục tiêu.

<a name="next"></a>

## Các bước tiếp theo {#next}

Xem mục [Tìm kiếm web](./examples/web-search.md) để tích hợp tính năng tra cứu thông tin, hoặc xem mục [Công cụ GPIO trên thiết bị](../development/mcp-gpio.md) để điều khiển phần cứng ngay bên trong firmware. Cơ chế hoạt động của cầu nối được định nghĩa theo [phiên bản gốc được sử dụng tại đây](https://github.com/78/mcp-calculator/tree/c537f71d61fd73b47d6c8955b5df6d3721acf4e4).
