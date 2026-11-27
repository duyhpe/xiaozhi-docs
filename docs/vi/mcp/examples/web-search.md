---
id: mcp-web-search
title: Thêm tính năng tìm kiếm web cho trợ lý
description: 'Trả về tiêu đề trang, liên kết, tóm tắt và ngày đăng thông qua một công cụ tìm kiếm MCP.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-25
translation:
  status: review
  sourceHash: 53a3875595ff5ac87d8acecee8874d48ad990b2e1b3962d1878bf812cc6cb629
  reviewedAt: '2026-11-15'
---
# Thêm tính năng tìm kiếm web cho trợ lý

Hãy kết nối thành công một công cụ MCP tối giản trước khi tích hợp nhà cung cấp dịch vụ tìm kiếm. Một công cụ tìm kiếm cần trả về đầy đủ tiêu đề, liên kết nguồn và nội dung tóm tắt. Kết quả tìm kiếm vẫn cần được đánh giá lại trước khi coi là thông tin xác thực.

<a name="scope"></a>

## Chuẩn bị {#scope}

Hoàn tất hướng dẫn [Bắt đầu nhanh với MCP](../quickstart.md) và tái sử dụng môi trường Python cùng thư mục cầu nối (bridge) từ bài trước. Chuẩn bị một tài khoản dịch vụ tìm kiếm mà bạn được phép sử dụng, đồng thời kiểm tra biểu phí và hạn mức hiện hành.

Ví dụ này sử dụng API tìm kiếm web (Web Search API) của Zhipu. Hãy làm theo [tài liệu chính thức của nhà cung cấp](https://docs.bigmodel.cn/cn/guide/tools/web-search) để nắm rõ giao diện và các tham số. Mỗi lượt gọi API có thể phát sinh chi phí; vui lòng kiểm tra đơn giá và hạn mức tài khoản trước khi sử dụng.

<figure class="source-figure">

[![Luồng hoạt động của công cụ tìm kiếm và hai thông tin xác thực tách biệt.](../../../public/images/en/mcp-web-search-flow.svg)](../../../public/images/en/mcp-web-search-flow.svg)

<figcaption>Luồng hoạt động của công cụ tìm kiếm và hai thông tin xác thực tách biệt. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="code"></a>

## 1. Lưu mã nguồn ví dụ {#code}

Tạo tệp `web_search.py` với đoạn mã sau, cũng có sẵn trong [kho lưu trữ tài liệu](https://github.com/78/xiaozhi-docs/blob/main/examples/mcp/web_search.py).

<<< ../../../../examples/mcp/web_search.py

### Tạo khóa API của dịch vụ tìm kiếm trước tiên

Đăng nhập vào [trang quản lý API Keys của Zhipu](https://bigmodel.cn/usercenter/proj-mgmt/apikeys), tạo một khóa API mới trong dự án của bạn, sau đó làm theo hướng dẫn của nhà cung cấp để kích hoạt tính năng tìm kiếm được dùng ở đây và kiểm tra số dư/hạn mức. Chỉ sao chép khóa API này vào cửa sổ dòng lệnh (terminal) cá nhân của bạn, tuyệt đối không dán nhầm vào ô địa chỉ điểm cuối MCP của XiaoZhi. Địa chỉ điểm cuối MCP được lấy riêng từ phần [cấu hình trợ lý](../quickstart.md#endpoint).

<a name="credentials"></a>


## 2. Thiết lập thông tin xác thực của nhà cung cấp {#credentials}

Trong cùng cửa sổ dòng lệnh (terminal) sẽ dùng để khởi chạy cầu nối, hãy thay thế chuỗi giữ chỗ bằng khóa API thực tế của bạn:

::: code-group

```powershell [PowerShell]
\$env:ZHIPU_API_KEY = 'YOUR_SEARCH_SERVICE_KEY'
```

```sh [macOS / Linux]
export ZHIPU_API_KEY='YOUR_SEARCH_SERVICE_KEY'
```

:::

Tái sử dụng các thư viện phụ thuộc như `mcp` và `httpx` từ bài bắt đầu nhanh; cài đặt bổ sung bất kỳ gói nào còn thiếu vào cùng môi trường ảo đó. Địa chỉ điểm cuối MCP và khóa API của dịch vụ tìm kiếm là hai thông tin xác thực hoàn toàn khác nhau và không thể dùng thay thế cho nhau.

<a name="verify"></a>

## 3. Khởi chạy và kiểm chứng {#verify}

Thiết lập biến `MCP_ENDPOINT` của riêng bạn, sau đó chạy lệnh:

```sh
python mcp_pipe.py web_search.py
```

Làm mới danh sách công cụ của đúng trợ lý đó và xác nhận công cụ `web_search` đã xuất hiện. Hãy yêu cầu trợ lý tra cứu một câu hỏi cụ thể trên mạng và cung cấp nguồn trích dẫn. Kiểm tra lượt gọi công cụ thực tế, tiêu đề trang, đường dẫn URL, nội dung tóm tắt và ngày đăng của kết quả. Một câu trả lời trực tiếp từ kiến thức sẵn có của mô hình không chứng minh được quá trình tìm kiếm web đã diễn ra.

Hãy coi nội dung trang web trả về như tài liệu tham khảo, tuyệt đối không thực thi theo như các chỉ thị chạy lệnh, thay đổi quyền hạn hay tiết lộ thông tin xác thực. Đối với các lỗi `401/403`, hết hạn mức (quota), quá thời gian chờ (timeout) hoặc kết quả rỗng, hãy phân biệt rõ lỗi phản hồi từ nhà cung cấp tìm kiếm với lỗi kết nối MCP.

<a name="materials"></a>

## Các lựa chọn khác {#materials}

Đối với các trình khởi chạy trên máy tính hoặc dịch vụ tìm kiếm lưu trữ sẵn, hãy xem mục [Công cụ từ cộng đồng](../../community/mcp-tools.md). Tệp đính kèm giao diện đồ họa Python bên dưới là mã nguồn lưu trữ đời cũ. Ví dụ tối giản đang được duy trì cho hướng dẫn này chính là tệp `web_search.py` ở trên.

<SourceMaterials article="DOC-25" />

<a name="next"></a>

## Các bước tiếp theo {#next}

Để kết nối một dịch vụ MCP từ xa có sẵn, hãy xem mục [Kết nối các dịch vụ MCP có sẵn](../connect-existing-servers.md). Với bất kỳ nhà cung cấp nào, hãy giới hạn độ dài truy vấn cùng kích thước phản hồi, theo dõi chi phí và nguồn dữ liệu trước khi mở rộng quy mô sử dụng.
