---
id: display-emotions
title: Trường biểu cảm và tài nguyên hiển thị
description: 'Kiểm tra ngữ nghĩa, ánh xạ tài nguyên và cơ chế hiển thị dự phòng (fallback) đối chiếu với phiên bản firmware.'
status: review
reviewedAt: '2026-11-15'
reviewNote: 'Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Áp dụng cho firmware v2.6.0; kho mã nguồn firmware quản lý toàn bộ đặc tả kỹ thuật và mã triển khai chi tiết.'
sourceArticles:
  - DOC-39
translation:
  status: review
  sourceHash: cf931d7d2b13c6a44c2f86a819af6cb3804eff828563a9a181faad1395f12050
  reviewedAt: '2026-11-15'
---
# Trường biểu cảm và tài nguyên hiển thị

Ngữ nghĩa biểu cảm từ máy chủ, biểu tượng cảm xúc Unicode (emoji) và đồ họa hiển thị trên màn hình là những đối tượng hoàn toàn khác nhau. Kho mã nguồn firmware tương ứng sẽ quy định các giao thức bản tin và bảng ánh xạ tài nguyên.

<a name="scope"></a>

## Xác định tầng xử lý {#scope}

| Tầng xử lý | Nội dung kiểm tra |
| --- | --- |
| Giao thức (Protocol) | Các loại bản tin và trường biểu cảm trong [tài liệu WebSocket theo phiên bản](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/websocket.md) |
| Triển khai hiển thị | Các luồng xử lý `SetEmotion` thực tế trong thư mục [main/display](https://github.com/78/xiaozhi-esp32/tree/4de00aed740595a8713b01f8332b9b2cf30685bc/main/display) |
| Phông chữ, hoạt ảnh, hình ảnh | Gói tài nguyên của bản dựng hiện tại và bảng ánh xạ tên gọi |

<a name="message-and-names"></a>

## Ví dụ bản tin và tra cứu tên biểu cảm {#message-and-names}

Tài liệu WebSocket của phiên bản này đưa ra ví dụ bản tin biểu cảm như sau:

```json
{"session_id":"example-session","type":"llm","emotion":"happy","text":"😀"}
```

Trường `emotion` định danh một tài nguyên hiển thị; ký tự Unicode trong trường `text` không tự động trở thành tên tệp của tài nguyên đó. Đối với các tên mặc định như `neutral`, `happy` và `thinking`, hãy mở [bảng ánh xạ tài nguyên phông chữ 2.0.0 gồm 21 mục](https://github.com/78/xiaozhi-fonts/blob/d45dbc64052d57048f20ab1770074172ce9eb53b/mappings/emoji.json). Phần [khai báo gói phụ thuộc của firmware v2.6.0](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/idf_component.yml) sử dụng dòng phiên bản phông chữ này. Các gói tài nguyên tùy chỉnh và màn hình chuyên biệt có thể định nghĩa tên gọi cùng bảng ánh xạ riêng; hãy kiểm tra trực tiếp trên bản dựng thực tế.

Các giá trị biểu cảm không xác định sẽ không có chung một cơ chế dự phòng (fallback) duy nhất. Trên bản v2.6.0, [mã triển khai OLED](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/display/oled_display.cc) kiểm tra phông Emoji trước rồi mới đến phông biểu tượng (icon font); nếu cả hai đều không có ký tự tương ứng, màn hình sẽ hiển thị biểu tượng mặc định trung tính và báo lỗi. Trong khi đó, [mã triển khai LCD](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/display/lcd_display.cc) còn kiểm tra thêm tài nguyên hình ảnh; nếu cả hai loại phông chữ cũng không có ký tự khớp, hệ thống sẽ báo lỗi thay vì đảm bảo biểu cảm được yêu cầu đã hiển thị lên màn hình.

<a name="verify"></a>

## Trình tự khắc phục sự cố {#verify}

1. Xác nhận phiên bản firmware và phiên bản gói giao diện/tài nguyên đang dùng.
2. Quan sát giá trị `emotion` thực tế nhận được, sau đó kiểm tra xem mã hiển thị trên thiết bị có tìm thấy tài nguyên tương ứng hay không.
3. Thử nghiệm cả các giá trị thông dụng lẫn giá trị không xác định. Ghi nhận xem thiết bị chuyển về biểu tượng dự phòng, giữ nguyên hình ảnh cũ hay báo lỗi.
4. Kiểm tra trực tiếp trên màn hình mục tiêu. Ảnh chụp màn hình từ một thiết bị OLED hay LCD khác không thể dùng để thay thế.

Các bộ tách từ (tokenizers) của mô hình ngôn ngữ hoạt động khác nhau, vì vậy một biểu tượng emoji không đảm bảo luôn tương ứng với đúng một token trên mọi mô hình. Các hình ảnh trông na ná nhau cũng không làm cho tên tài nguyên của chúng có thể dùng thay thế cho nhau.

<a name="next"></a>

## Cập nhật tài nguyên {#next}

Hãy bổ sung các giá trị biểu cảm hoặc bảng ánh xạ mới đồng bộ cùng mã triển khai, gói tài nguyên và bài kiểm thử trong kho mã nguồn firmware/tài nguyên, sau đó cập nhật lại các liên kết theo phiên bản trên trang tài liệu này. Đối với tài nguyên âm thanh, hãy xem mục [Tùy chỉnh âm thanh thông báo](../development/custom-prompts.md).
