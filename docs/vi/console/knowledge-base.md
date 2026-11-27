---
id: knowledge-base
title: 'Cơ sở tri thức: tải lên, truy xuất và kết nối'
description: 'Phân tích tài liệu thành nội dung có thể tìm kiếm, kiểm tra khả năng truy xuất và kết nối cơ sở tri thức với trợ lý.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-17
translation:
  status: review
  sourceHash: 1556006c8abb91205ac53f2a226851c9b979f475dc01d8bb68b42dd76afbdea0
  reviewedAt: '2026-11-15'
---
# Cơ sở tri thức: tải lên, truy xuất và kết nối

Tải tài liệu lên mới chỉ là bước đầu tiên. Tài liệu cần phải được phân tích cú pháp (parse), chia thành các đoạn nhỏ (chunks) để có thể tìm kiếm được, sau đó kết nối với đúng trợ lý (agent) đang sử dụng thì mới hỗ trợ được cho cuộc trò chuyện.

<a name="scope"></a>

## Chuẩn bị {#scope}

Hướng dẫn này áp dụng cho [tính năng cơ sở tri thức trong trang Console người dùng](https://xiaozhi.me/console/knowledge-base), vốn tách biệt với cơ sở tri thức doanh nghiệp trên nền tảng nhà phát triển thương mại. Hãy bắt đầu với một tài liệu nhỏ, có cấu trúc rõ ràng và bạn có quyền hợp pháp để đưa cho dịch vụ xử lý.

Giao diện tải lên hiện hỗ trợ các định dạng PDF, DOCX, XLSX/XLS, PPTX/PPT, Markdown, TXT, CSV, HTML, EPUB cùng nhiều định dạng khác. Việc hệ thống chấp nhận định dạng tệp không đảm bảo rằng hình ảnh, bảng biểu phức tạp hay văn bản quét (scan) sẽ được trích xuất chính xác. Hãy tuân thủ các giới hạn hiện hành và kiểm tra kỹ kết quả sau khi phân tích.

<figure class="source-figure">

[![Quy trình làm việc với cơ sở tri thức: tải lên, kiểm tra, truy xuất và kết nối.](../../public/images/en/knowledge-base-flow.svg)](../../public/images/en/knowledge-base-flow.svg)

<figcaption>Quy trình làm việc với cơ sở tri thức: tải lên, kiểm tra, truy xuất và kết nối. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="upload"></a>

## 1. Tạo mới và tải tài liệu lên {#upload}

Loại tài khoản và trạng thái xác minh GitHub sẽ quyết định số lượng cơ sở tri thức cũng như số lượng tài liệu tối đa trong mỗi cơ sở tri thức. Hãy kiểm tra giới hạn hiển thị trên tài khoản của bạn.

<a name="create"></a>

### Tạo cơ sở tri thức {#create}

Nhấp vào **Tạo cơ sở tri thức mới (New knowledge base)** và nhập tên cùng phần mô tả dễ nhận biết. Hãy giải thích rõ các tài liệu bên trong bao quát những câu hỏi nào và khi nào cần tra cứu chúng, thay vì chỉ viết chung chung là “cơ sở tri thức”. Ví dụ:

```text
Thư viện này bao gồm hướng dẫn lắp ráp, cấu hình mạng và khắc phục sự cố cho bộ robot Starlight.
Đối với các câu hỏi về đấu nối dây, kết nối mạng hoặc lỗi của bộ kit này, hãy tra cứu thư viện này trước khi trả lời dựa trên kết quả tìm được.
Nếu không tìm thấy câu trả lời phù hợp, hãy thông báo rõ thay vì tự suy đoán sơ đồ dây hay thông số kỹ thuật.
```

Hãy thay thế tên sản phẩm và phạm vi nội dung bằng dữ liệu thực tế của bạn, lưu lại và kiểm tra xem thư viện đã xuất hiện trong danh sách chưa. Phần mô tả giúp mô hình chọn đúng công cụ tra cứu, nhưng không đảm bảo công cụ sẽ được gọi trong mọi cuộc trò chuyện.

<a name="upload-document"></a>

### Tải tài liệu lên {#upload-document}

Mở trang quản lý tài liệu của cơ sở tri thức vừa tạo, tải tệp lên, đặt tên cho tài liệu, chọn phương thức phân tích cú pháp khả dụng và gửi đi.

<a name="parse"></a>

### Chờ quá trình phân tích hoàn tất {#parse}

Kiểm tra trạng thái phân tích và các thông báo lỗi (nếu có). Sau khi quá trình phân tích hoàn tất, hãy mở giao diện xem các đoạn nội dung đã chia (chunk view). Việc tải tệp lên thành công đơn thuần không đồng nghĩa với việc nội dung bên trong đã có thể tìm kiếm được.

<a name="chunks"></a>

## 2. Kiểm tra các đoạn nội dung đã chia (Chunks) {#chunks}

Trên trang xem các đoạn nội dung của tài liệu, hãy kiểm tra xem tiêu đề, đoạn văn, bảng biểu và các con số có giữ nguyên được ý nghĩa gốc hay không. Cụ thể cần rà soát:

- Tệp PDF dạng bản quét (scan) có trích xuất được chữ hay không? Các chú thích trong hình ảnh có bị thiếu không?
- Các hàng/cột trong bảng, đơn vị đo, ngày tháng và các câu phủ định có bị tách sai lệch không?
- Các tiêu đề đầu trang (header), chân trang (footer), trang mục lục lặp đi lặp lại hoặc văn bản không liên quan có gây nhiễu cho việc truy xuất không?
- Một câu trả lời quan trọng có bị cắt đôi sang hai đoạn khác nhau không? Có cần chỉnh sửa lại tài liệu gốc hoặc biên tập lại từng đoạn không?

Hãy kiểm tra lại sau khi chỉnh sửa. Việc tải thêm nhiều bản sao trùng lặp của cùng một tài liệu sẽ không khắc phục được lỗi phân tích cú pháp sai.

<a name="recall"></a>

## 3. Kiểm thử khả năng truy xuất {#recall}

Sử dụng bộ câu hỏi đã chuẩn bị sẵn để chạy thử nghiệm truy xuất và kiểm tra xem các đoạn văn bản trả về có hỗ trợ trực tiếp cho câu trả lời hay không. Bộ câu hỏi nên bao gồm: một câu hỏi mà tài liệu có thể trả lời trực tiếp, một câu hỏi diễn đạt lại theo cách khác (paraphrase) và một câu hỏi nằm ngoài phạm vi tài liệu.

Nếu không có kết quả trả về, hãy kiểm tra lại quá trình phân tích tài liệu, cách đặt từ khóa câu hỏi và xác nhận xem tài liệu có thực sự chứa thông tin đó không. Nếu kết quả trả về bị sai lệch, hãy kiểm tra chất lượng tài liệu, cách chia đoạn và các đoạn văn bản có từ ngữ na ná nhưng không liên quan. Đừng vội quy kết nguyên nhân đầu tiên là do mô hình AI.

<a name="associate"></a>

## 4. Kết nối với trợ lý (Agent) {#associate}

1. Mở phần cấu hình của trợ lý mục tiêu và đi tới mục tính năng mở rộng.
2. Bật tính năng cơ sở tri thức trong nhóm dịch vụ chính thức. Khi trường lựa chọn xuất hiện, hãy chọn đúng cơ sở tri thức bạn vừa kiểm thử.
3. Lưu lại, xác nhận thiết bị đang gắn với trợ lý này và thử hỏi lại đúng những câu hỏi trên trong một cuộc trò chuyện thực tế.

Nếu không thấy trường lựa chọn cơ sở tri thức, hãy kiểm tra xem tính năng đã được bật chưa, ngôn ngữ hiện tại của trợ lý có hỗ trợ dịch vụ này không và tài khoản đã có cơ sở tri thức khả dụng nào chưa.

### Xác nhận cuộc trò chuyện thực sự đã tra cứu tài liệu

Mở lịch sử trò chuyện của trợ lý mục tiêu, tìm đến câu hỏi của bạn và mở rộng chi tiết lượt gọi công cụ liên quan đến tri thức. Tên công cụ có thể hiển thị là `search_knowledge`; hãy đối chiếu theo tên công cụ thực tế của dịch vụ. Kiểm tra từ khóa truy vấn, các đoạn tài liệu trả về và xem câu trả lời của trợ lý có bám sát các đoạn tài liệu đó hay không.

Nếu không thấy lượt gọi tìm kiếm nào xuất hiện, hãy kiểm tra lại thiết lập liên kết thư viện đã lưu và phần mô tả, sau đó thử hỏi một câu hỏi chi tiết trích từ tài liệu. Một câu trả lời nghe có vẻ hợp lý dựa trên kiến thức có sẵn của mô hình không chứng minh rằng cơ sở tri thức đã được kết nối thành công.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Quá trình phân tích cú pháp thành công, công cụ truy xuất tìm đúng các đoạn văn bản liên quan và liên kết với trợ lý đã được lưu. Các câu trả lời trong cuộc trò chuyện thực tế sử dụng thông tin từ tài liệu mà không suy diễn nội dung thiếu thành kiến thức có sẵn. Kiểm tra nhật ký gọi công cụ trong lịch sử trò chuyện khi cần thiết.

<a name="materials"></a>

## Video và tài liệu tham khảo {#materials}

Video dưới đây minh họa cuộc trò chuyện sử dụng cơ sở tri thức. Hãy làm theo các bước hướng dẫn ở trên để tạo, phân tích và kết nối cơ sở tri thức của riêng bạn.

<SourceMaterials article="DOC-17" />

<a name="next"></a>

## Các bước tiếp theo {#next}

Để tìm hiểu cách khám phá công cụ và xử lý sự cố chuỗi gọi hàm, hãy xem mục [Bắt đầu nhanh với MCP](../mcp/quickstart.md). Sau mỗi lần thay đổi tài liệu, hãy lặp lại quy trình: phân tích cú pháp → kiểm tra đoạn chia → thử nghiệm truy xuất → trò chuyện thực tế thay vì chỉ kiểm tra mỗi bước tải tệp lên.
