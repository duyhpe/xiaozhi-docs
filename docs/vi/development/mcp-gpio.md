---
id: mcp-gpio
title: Điều khiển đèn báo GPIO bằng MCP
description: Tái sử dụng LampController và kiểm tra khả năng khám phá công cụ trên thiết bị cùng mức điện áp ngõ ra thực tế.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-33
translation:
  status: review
  sourceHash: 5a1c8a1dae664a931200baa5564943d60418a2b08599fba5eb28c382b3b96f74
  reviewedAt: '2026-11-15'
---
# Điều khiển đèn báo GPIO bằng MCP

Ví dụ này triển khai một **công cụ ngay bên trong firmware của thiết bị**, khác với dịch vụ MCP chạy bằng Python trên máy tính. Hãy bắt đầu với một đèn báo điện áp thấp trước khi điều khiển các thiết bị ngoại vi phức tạp hơn.

<a name="scope"></a>

## Chuẩn bị {#scope}

Chuẩn bị một [bo mạch tùy chỉnh](./custom-board.md), một chân GPIO khả dụng hỗ trợ ngõ ra (output) và một đèn LED kèm điện trở hạn dòng phù hợp với thông số điện áp/dòng điện của chân GPIO. Tuyệt đối không điều khiển trực tiếp động cơ, đèn công suất lớn hay cuộn hút rơ-le từ chân GPIO.

Kiểm tra kỹ các chân cấu hình khởi động (boot strapping), cổng USB, bộ nhớ lưu trữ và các chân đã gán cho ngoại vi khác trước tiên. Ví dụ này sử dụng chân gán trên mạch breadboard S3 cơ bản của bản v2.6.0 là `LAMP_GPIO = GPIO_NUM_18`, và chỉ áp dụng khi không có mô-đun mở rộng nào khác đang dùng chân GPIO18.

<a name="implementation"></a>

## 1. Tái sử dụng ví dụ có sẵn {#implementation}

Firmware cung cấp sẵn lớp [LampController](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/common/lamp_controller.h) cùng phần đăng ký tương ứng trong mã nguồn mạch breadboard cơ bản. Hãy đọc kỹ phần khởi tạo bo mạch trước để tránh đăng ký trùng lặp tên công cụ.

Lớp này khởi tạo ngõ ra ở mức thấp (low) và cung cấp ba công cụ sau:

| Công cụ | Chức năng |
| --- | --- |
| `self.lamp.get_state` | Đọc trạng thái bật/tắt của đèn đang được lưu trong phần mềm |
| `self.lamp.turn_on` | Kéo mức logic ngõ ra lên mức cao (high) |
| `self.lamp.turn_off` | Kéo mức logic ngõ ra xuống mức thấp (low) |

Chọn một chân GPIO đã được kiểm chứng trên bo mạch của bạn và duy trì vòng đời của đối tượng điều khiển (controller object) trong suốt quá trình hoạt động để phục vụ các hàm gọi lại (callbacks) của công cụ. Nếu sử dụng mô-đun kích hoạt mức thấp (active-low), bạn cần đảo ngược logic cực tính trong mã nguồn; việc chỉ đổi tên hiển thị của công cụ là không đủ.

<a name="led-wiring"></a>

### Đấu nối đèn LED dòng thấp {#led-wiring}

Ngắt toàn bộ nguồn điện, sau đó đấu nối theo sơ đồ: **GPIO18 → điện trở 330Ω → cực dương (anode) của LED; cực âm (cathode) của LED → GND**. Với một bóng LED đỏ thông thường, chân dài hơn thường là cực dương và cạnh vát phẳng trên thân vỏ thường đánh dấu cực âm, nhưng hãy luôn đối chiếu theo tài liệu kỹ thuật (datasheet) của linh kiện. Tuyệt đối không bỏ qua điện trở hạn dòng.

<figure class="source-figure">

[![Sơ đồ đấu nối đèn báo GPIO18 trên mạch S3 cơ bản.](../../public/images/en/gpio-led-wiring.svg)](../../public/images/en/gpio-led-wiring.svg)

<figcaption>Sơ đồ đấu nối đèn báo GPIO18 trên mạch S3 cơ bản. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="materials"></a>

### Video minh họa điều hướng mã nguồn bo mạch {#materials}

Mở rộng video ghi hình dưới đây để xem cách điều hướng cấu trúc thư mục. Video này sử dụng phiên bản IDE và bố cục thư mục đời cũ; hãy tra cứu các thay đổi hiện hành thông qua các liên kết v2.6.0 ở phía trên.

<SourceMaterials article="DOC-33" />

<a name="tools"></a>

## 2. Đăng ký thêm các công cụ mở rộng {#tools}

Làm theo [hướng dẫn MCP trên firmware](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/mcp-usage.md) để đặt tên công cụ rõ ràng, mô tả đúng mục đích và khai báo chặt chẽ các tham số kiểu `bool`/`int`/`string`. Phân biệt rõ `AddTool` với `AddUserOnlyTool`: các công cụ thông thường cho phép mô hình AI tự động gọi khác với các tác vụ đặc quyền chỉ do người dùng chủ động kích hoạt.

Dự án firmware quản lý tập trung các kiểu chân GPIO, quy trình đăng ký bo mạch và định nghĩa giao thức. Hãy sử dụng đúng bản triển khai theo phiên bản của dự án thay vì chép đè một bản vá C++ tách rời.

<a name="verify"></a>

## 3. Biên dịch, khám phá công cụ và đo kiểm {#verify}

1. Biên dịch biến thể bo mạch của bạn, kiểm tra nhật ký khởi động (startup logs) và xác nhận chức năng trò chuyện cơ bản hoạt động bình thường trước tiên.
2. Xác nhận các công cụ đã xuất hiện trong danh sách công cụ thiết bị của dịch vụ hoặc trong nhật ký lịch sử trò chuyện. Các công cụ tích hợp trên thiết bị không nhất thiết phải hiển thị trong danh sách điểm cuối MCP Python bên ngoài.
3. Ra lệnh rõ ràng bằng giọng nói để bật và tắt đèn báo, đồng thời quan sát cả kết quả gọi hàm lẫn mức điện áp ngõ ra thực tế/trạng thái sáng tắt của đèn LED.
4. Khởi động lại thiết bị và kiểm tra trạng thái mặc định ban đầu. Việc bật tắt đèn liên tục không được làm ảnh hưởng đến âm thanh, màn hình hay quá trình khởi động của mạch.

Trạng thái phần mềm mà ví dụ này trả về không phải là tín hiệu phản hồi từ tải vật lý thực tế. Cần có một mạch cảm biến độc lập nếu muốn xác nhận chắc chắn bóng đèn thực sự đã sáng.

<a name="next"></a>

## Các bước tiếp theo {#next}

Nếu cần thiết kế mạch đấu nối hoặc phần cứng mới, hãy quay lại mục [Bo mạch tùy chỉnh](./custom-board.md). Nếu muốn phát triển các công cụ chạy trên máy tính hoặc máy chủ, hãy xem mục [Bắt đầu nhanh với MCP](../mcp/quickstart.md).
