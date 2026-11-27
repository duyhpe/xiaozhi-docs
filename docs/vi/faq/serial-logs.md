---
id: serial-logs
title: Thu thập nhật ký khởi động và nhật ký lỗi
description: 'Chọn đúng cổng kết nối và ghi lại ngữ cảnh trước, trong và sau khi xảy ra sự cố.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các giới hạn xác minh kỹ thuật và phần cứng được nêu rõ trong từng hướng dẫn.
sourceArticles:
  - DOC-23
translation:
  status: review
  sourceHash: 88dcd7c252f906b9cfe4ae231557e3a19a4e14db5afce4dfbce1165997ba1a4c
  reviewedAt: '2026-11-15'
---
# Thu thập nhật ký khởi động và nhật ký lỗi

Nhật ký hệ thống (logs) giúp phân biệt rõ các lỗi khởi động, kết nối mạng, kích hoạt thiết bị và âm thanh. Hãy thu thập nhật ký trước rồi mới thay đổi các điều kiện phần cứng/phần mềm. Việc chỉ nhìn vào dòng thông báo cuối cùng thường sẽ bỏ sót nguyên nhân gốc rễ.

<a name="scope"></a>

## Chuẩn bị {#scope}

Chuẩn bị một sợi cáp truyền dữ liệu tốt và một phần mềm đọc cổng nối tiếp (serial tool) phù hợp. Xác định rõ bo mạch dùng cổng USB gốc (native USB) hay mạch cầu nối USB-UART. Tải trình điều khiển (driver) từ nhà sản xuất bo mạch hoặc nhà sản xuất chip; một trình điều khiển đời cũ đi kèm với một công cụ bất kỳ không bắt buộc phải cài cho mọi thiết bị.

<a name="port"></a>

## 1. Tìm đúng cổng kết nối {#port}

Đối chiếu danh sách cổng trước và sau khi cắm thiết bị vào máy tính. Trên Windows, bạn có thể xem trong Trình quản lý Thiết bị (Device Manager); trên macOS/Linux, hãy xem danh sách cổng nối tiếp trong công cụ của bạn. Nhận diện đúng kết nối dựa theo nhãn ký hiệu USB/UART trên mạch và hướng dẫn của nhà sản xuất, thay vì gọi chung chung là cổng “bên trái” hay “bên phải”.

Tên cổng có thể thay đổi khi chuyển giữa chế độ tải ROM (download mode) và chế độ chạy ứng dụng thông thường. Hãy thu thập nhật ký ở cổng khởi động thông thường. Việc chỉ thấy một cổng xuất hiện trên máy tính chưa đủ chứng minh firmware đang chạy bình thường.

<figure class="source-figure">

[![Tìm cổng nối tiếp trong Trình quản lý Thiết bị (Device Manager) của Windows. Số hiệu cổng COM sẽ khác nhau tùy từng máy tính.](../../public/images/zh/doc-23-image-001.webp)](../../public/images/zh/doc-23-image-001.webp)

<figcaption>Tìm cổng nối tiếp trong Trình quản lý Thiết bị (Device Manager) của Windows. Số hiệu cổng COM sẽ khác nhau tùy từng máy tính.</figcaption>
</figure>

<a name="capture"></a>

## 2. Kết nối và khởi động lại thiết bị {#capture}

1. Đóng toàn bộ các trang nạp firmware trên trình duyệt, cửa sổ theo dõi của IDE và các cửa sổ dòng lệnh đang chiếm dụng cổng.
2. Chọn đúng cổng kết nối. Bo mạch cơ bản thường sử dụng thông số **tốc độ baud 115200, 8 bit dữ liệu (data bits), không kiểm tra chẵn lẻ (no parity), 1 bit dừng (stop bit)**; hãy kiểm tra cấu hình riêng của các bo mạch khác.
3. Mở kết nối tới cổng, nhấn nhanh nút RESET/EN trên mạch và bắt đầu ghi lại nhật ký ngay từ lúc khởi động.
4. Tái hiện lại sự cố một lần và lưu giữ toàn bộ ngữ cảnh trước, trong và sau thời điểm xảy ra lỗi.
5. Xuất nhật ký ra tệp văn bản thuần túy (plain text) kèm theo thông tin phần cứng, phiên bản firmware và các bước thao tác thực tế.

Nếu máy đã cài đặt ESP-IDF, hãy sử dụng lệnh:

```sh
idf.py -p COM5 monitor
```

Thay thế `COM5` bằng cổng thực tế của bạn và nhấn tổ hợp phím `Ctrl+]` để thoát. Bạn không nhất thiết phải cài đặt cả bộ SDK cồng kềnh chỉ để đọc nhật ký. Thay vào đó, bạn có thể sử dụng [pySerial miniterm](https://pyserial.readthedocs.io/en/latest/tools.html#module-serial.tools.miniterm): cài đặt `pyserial` trong một môi trường Python riêng biệt, sau đó chạy lệnh `python -m serial.tools.miniterm COM5 115200` với cổng thực tế của bạn. Nhấn `Ctrl+]` để thoát.

### Nếu chưa cài công cụ đọc cổng nối tiếp: cài đặt và chạy miniterm

Tải và cài đặt Python 3 phù hợp với hệ điều hành của bạn từ [python.org](https://www.python.org/downloads/). Tạo một thư mục trống và chạy một nhóm câu lệnh tương ứng bên dưới trong cửa sổ terminal của thư mục đó. Windows sử dụng lệnh `py -3`; macOS/Linux sử dụng lệnh `python3`. Cả hai nhóm lệnh đều không yêu cầu chạy tập lệnh kích hoạt môi trường:

::: code-group

```powershell [Windows PowerShell]
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install pyserial
.\.venv\Scripts\python.exe -m serial.tools.list_ports -v
.\.venv\Scripts\python.exe -m serial.tools.miniterm COM5 115200
```

```sh [macOS / Linux]
python3 -m venv .venv
.venv/bin/python -m pip install pyserial
.venv/bin/python -m serial.tools.list_ports -v
.venv/bin/python -m serial.tools.miniterm /dev/ttyACM0 115200
```

:::

Hãy đọc kỹ danh sách cổng được liệt kê ra trước, sau đó thay thế `COM5` hoặc `/dev/ttyACM0` trong câu lệnh cuối cùng bằng tên cổng thực tế của bạn. Trên macOS, tên cổng thường có dạng `/dev/cu.usbmodem…` hoặc `/dev/cu.usbserial…`; các tên trong lệnh chỉ mang tính chất ví dụ. Sau khi kết nối thành công, hãy nhấn nhanh nút RESET/EN. Nhấn tổ hợp phím **Ctrl+]** để thoát và giải phóng cổng.

- **Không thấy dữ liệu xuất ra:** kiểm tra lại đúng cổng xuất log và đảm bảo thiết bị đang ở chế độ chạy bình thường, sau đó nhấn nút RESET/EN; không đưa mạch vào chế độ tải ROM.
- **Chữ hiển thị bị lỗi font / ký tự lạ:** kiểm tra lại tốc độ baud và bảng mã ký tự (encoding); tắt chế độ hiển thị mã HEX trong các phần mềm có giao diện đồ họa.
- **Báo lỗi cổng đang bận (Port busy):** đóng các công cụ nạp firmware, phần mềm đọc cổng serial khác và cửa sổ theo dõi của IDE, sau đó kết nối lại.

Để tra cứu địa chỉ MAC, hãy làm theo hướng dẫn [Lấy thông tin thiết bị](./account-and-binding.md#device-information) nhằm phân biệt rõ địa chỉ STA, địa chỉ điểm phát sóng (hotspot), mã UUID và mã liên kết (binding code).

<a name="read"></a>

## 3. Những thông tin cần kiểm tra đầu tiên {#read}

| Giai đoạn | Dấu hiệu cần tìm |
| --- | --- |
| Khởi động (Startup) | Dòng chip, phiên bản firmware, tên bo mạch, dung lượng Flash/PSRAM, bảng phân vùng và thông báo lỗi khởi tạo đầu tiên |
| Mạng (Network) | Quá trình quét Wi-Fi, kết nối, ngắt kết nối, hoặc tình trạng lặp lại yêu cầu cấu hình mạng |
| Kích hoạt / OTA | Mã trạng thái HTTP và trạng thái kích hoạt; nhớ giữ bí mật các thông tin xác thực |
| Trò chuyện | Quá trình thiết lập kết nối, thu âm, phát lại, gọi công cụ (tool calls) và vị trí xảy ra khởi động lại |

Hãy giữ nguyên văn các thông báo lỗi lạ. Tuyệt đối không xóa bỏ thông báo lỗi đầu tiên mà chỉ giữ lại các lỗi phát sinh dây chuyền phía sau.

<a name="verify"></a>

## Kiểm tra kết quả thu thập {#verify}

Tệp văn bản nhật ký phải bao gồm phiên bản lúc khởi động và đầy đủ ngữ cảnh để người khác có thể tái hiện lại trình tự xảy ra lỗi. Nhớ xóa/che mật khẩu Wi-Fi, mã token của điểm cuối, số điện thoại và các định danh thiết bị không cần thiết. Ảnh chụp màn hình không thể thay thế cho văn bản nhật ký có thể sao chép được.

<a name="materials"></a>

## Công cụ và các bước tiếp theo {#materials}

Hãy tải các phần mềm đọc cổng nối tiếp từ trang phát hành chính thức của tác giả. Để nạp lại firmware, hãy quay lại mục [Nạp và nâng cấp firmware](../firmware/flashing.md). Tuyệt đối không gõ bừa các lệnh điều khiển ngẫu nhiên vào cửa sổ giao tiếp cổng nối tiếp.
