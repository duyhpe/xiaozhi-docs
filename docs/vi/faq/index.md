---
id: faq
title: Khắc phục sự cố theo hiện tượng
description: 'Khoanh vùng các lỗi cổng nối tiếp (serial), khởi động, mạng, tài khoản, âm thanh, màn hình và biên dịch bằng nhật ký chi tiết.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các quy trình xử lý sự cố đã được đối chiếu với phiên bản v2.6.0 và giao diện Console hiện hành; việc khắc phục từng lỗi cụ thể vẫn đòi hỏi kiểm thử trực tiếp trên thiết bị và phản hồi từ cộng đồng.
translation:
  status: review
  sourceHash: 7e50176d1429c3a645f922f65cfe0c008c680825c33a4569f12d7810a669c585
  reviewedAt: '2026-11-15'
---
# Khắc phục sự cố theo hiện tượng

Chỉ thay đổi từng điều kiện một trong mỗi lần thử nghiệm. Hãy xác định chính xác giai đoạn xảy ra lỗi trước khi sửa đổi cấu hình. Việc nạp lặp đi lặp lại nhiều bản dựng firmware của các bo mạch khác nhau có thể biến một lỗi đơn lẻ thành nhiều lỗi chồng chéo.

<a name="scope"></a>

## Xác định giai đoạn gặp lỗi {#scope}

| Giai đoạn đang bị kẹt | Bắt đầu kiểm tra tại đây |
| --- | --- |
| Máy tính không nhận diện thiết bị hoặc quá trình nạp firmware thất bại | [Cổng nối tiếp và nạp firmware](#serial) |
| Nạp firmware hoàn tất nhưng thiết bị không khởi động hoặc khởi động lại liên tục | [Khởi động và nguồn điện](#boot) |
| Không thấy điểm phát sóng (hotspot) hoặc không kết nối được mạng | [Cấu hình mạng và kết nối](#network) |
| Đã có mã thiết bị nhưng liên kết tài khoản thất bại | [Tài khoản và quyền sở hữu](#account) |
| Không có âm thanh, không thu được micro hoặc không phản hồi từ khóa đánh thức | [Âm thanh và từ khóa đánh thức](#audio) |
| Màn hình trắng/đen, hiển thị sai lệch hoặc mất nét | [Màn hình hiển thị](#display) |
| Biên dịch mã nguồn trên máy tính thất bại | [Môi trường biên dịch](#build) |
| Không tìm thấy công cụ MCP hoặc gọi công cụ thất bại | [Công cụ MCP](#mcp) |

<a name="serial"></a>

## Cổng nối tiếp và nạp firmware {#serial}

**Không hiện cổng nối tiếp (serial port):** sử dụng một sợi cáp USB có hỗ trợ truyền dữ liệu đã kiểm chứng và cắm trực tiếp vào cổng trên máy tính. Đối chiếu danh sách thiết bị trước và sau khi cắm cáp. Kiểm tra xem mạch dùng cổng USB-UART hay cổng USB gốc (native USB) cùng trình điều khiển (driver) tương ứng theo tài liệu của bo mạch. Sau đó thử [đưa mạch vào chế độ tải (download mode) thủ công](../firmware/flashing.md#download-mode).

**Có hiển thị cổng nhưng kết nối thất bại:** đóng toàn bộ cửa sổ theo dõi (monitor) của IDE, các phần mềm đọc cổng serial và các tab trình duyệt nạp firmware khác, sau đó đưa mạch vào lại chế độ tải. Tuyệt đối không để hai công cụ cùng chiếm dụng một cổng COM.

**Thiếu nút kết nối trên trình duyệt hoặc trình duyệt không hỗ trợ:** sử dụng trình duyệt Chrome hoặc Edge trên máy tính qua giao thức HTTPS. Việc trang web tải được không đồng nghĩa với việc trình duyệt hỗ trợ Web Serial. Ngoài ra, bạn có thể chuyển sang dùng phương pháp [nạp firmware ngoại tuyến](../firmware/flashing.md#offline).

<a name="boot"></a>

## Khởi động và nguồn điện {#boot}

1. Ngắt toàn bộ nguồn điện và kiểm tra lại dây cấp nguồn, tình trạng chập mạch giữa các chân cắm liền kề và ngõ ra loa. Tuyệt đối không thử đảo ngược cực tính nguồn để kiểm tra lỗi.
2. Sử dụng nguồn cấp USB ổn định và cáp ngắn chất lượng tốt. Tháo tạm các mô-đun pin hoặc 4G mở rộng mới gắn thêm và quay về cấu hình phần cứng cơ bản ban đầu trước tiên.
3. Thu thập nhật ký khởi động (startup logs) bao gồm thông tin phiên bản, dòng chip, quá trình khởi tạo Flash/PSRAM và thông báo lỗi đầu tiên xuất hiện.
4. Nếu thiết bị chỉ tự khởi động lại khi đang phát âm thanh lớn hoặc khi truyền dữ liệu mạng, hãy kiểm tra nguồn cấp, mức âm lượng và tải loa trước tiên, đặc biệt là khi nhật ký báo lỗi sụt áp (brownout).
5. Đối với các lỗi khởi tạo PSRAM, bảng phân vùng hoặc trình điều khiển màn hình, hãy đối chiếu lại phần cứng theo mục [Tải xuống và chọn firmware](../firmware/downloads.md#identify).

Sử dụng lệnh `idf.py -p <PORT> monitor` trong môi trường phát triển cục bộ hoặc một phần mềm theo dõi cổng nối tiếp. Bo mạch cơ bản thường sử dụng tốc độ baud `115200`; hãy kiểm tra hướng dẫn riêng của các bo mạch khác. Nhớ ngắt kết nối cổng nạp trước khi mở trình theo dõi monitor, và xóa/che các thông tin nhạy cảm như mật khẩu Wi-Fi, mã token và định danh cá nhân trước khi chia sẻ nhật ký.

<a name="network"></a>

## Cấu hình mạng và kết nối {#network}

**Không thấy điểm phát sóng (hotspot) của XiaoZhi:** trước tiên hãy kiểm tra xem bản dựng có sử dụng BluFi hay phương thức kết nối mạng nào khác không, sau đó xác nhận thiết bị đã vào chế độ cấu hình mạng chưa. Việc thiếu điểm phát sóng đơn thuần chưa đủ khẳng định hỏng ăng-ten. Tuyệt đối không quấn dây quanh ăng-ten hay chạm tay vào ăng-ten để “cải thiện” sóng.

**Đã kết nối vào điểm phát sóng của thiết bị nhưng không mở được trang cấu hình:** xác nhận điện thoại vẫn đang giữ kết nối với điểm phát sóng đó, nhập trực tiếp địa chỉ `http://192.168.4.1` vào thanh địa chỉ trình duyệt, đồng thời tắt tính năng tự động chuyển đổi mạng và VPN/proxy trên điện thoại. Xem chi tiết tại mục [Cấu hình qua điểm phát sóng](../getting-started/wifi-and-binding.md#hotspot).

**Đã kết nối Wi-Fi nhưng trò chuyện thất bại:** việc kết nối thành công vào bộ định tuyến Wi-Fi chưa đảm bảo thiết bị truy cập được máy chủ OTA và dịch vụ trò chuyện. Hãy kiểm tra kết nối internet của router, cấu hình DNS và các cổng đăng nhập phụ (captive portals). Thử so sánh bằng cách kết nối trực tiếp với điểm phát sóng 2.4 GHz từ điện thoại.

**Thay đổi mạng Wi-Fi khác:** thực hiện đúng quy trình cấu hình lại mạng của bo mạch đó. Không mặc định rằng mọi phiên bản firmware chỉ lưu một mạng duy nhất, và cũng không dùng thao tác xóa trắng toàn bộ chip (full-chip erase) làm giải pháp khắc phục mặc định.

<a name="account"></a>


## Tài khoản và quyền sở hữu {#account}

| Vấn đề | Hành động đầu tiên cần làm |
| --- | --- |
| Không nhận được tin nhắn SMS | Kiểm tra mã vùng quốc gia, tài khoản hiện có và các thông báo trên trang; tài khoản quốc tế mới nên làm theo hướng dẫn đăng nhập bằng Google |
| Mã xác nhận không chính xác | Phân biệt rõ mã SMS với mã thiết bị gồm 6 chữ số; sử dụng mã hiện tại đang hiển thị trên thiết bị |
| Thiết bị đã được liên kết với tài khoản khác | Nhờ chủ sở hữu trước [hủy liên kết thiết bị](./account-and-binding.md#unbind); nếu không thể liên hệ, hãy [gửi email yêu cầu hủy liên kết](./account-and-binding.md#ownership) kèm thông tin thiết bị |
| Không thể thêm thiết bị vào trợ lý hiện có | Đọc kỹ giới hạn về loại thiết bị và số lượng tối đa hiện hành, đồng thời xác nhận đúng giao diện thao tác và tài khoản |

Tuyệt đối không đăng công khai mã thiết bị, địa chỉ MAC đầy đủ, số điện thoại tài khoản hoặc giấy tờ tùy thân lên các trang báo lỗi công khai. Nếu không thể liên hệ chủ sở hữu trước, hãy làm theo [các bước gửi email yêu cầu](./account-and-binding.md#ownership); sử dụng [bảng tính xử lý hàng loạt](./account-and-binding.md#batch) nếu cần xử lý nhiều thiết bị cùng lúc. Việc nạp lại firmware không xóa bỏ quyền sở hữu đã gắn trên máy chủ.

<a name="audio"></a>

## Âm thanh và từ khóa đánh thức {#audio}

- **Âm thanh thông báo phát bình thường nhưng thiết bị không nghe thấy bạn nói:** hãy thử bắt đầu cuộc trò chuyện bằng nút bấm vật lý trước. Kiểm tra nguồn cấp của micro, chiều truyền dữ liệu, chân chọn kênh L/R và lỗ thoát âm trên vỏ máy. Xem mục [Đấu nối micro](../hardware/breadboard-esp32-s3.md#microphone).
- **Thiết bị nhận diện được giọng nói nhưng không phát ra tiếng:** kiểm tra mức âm lượng, chân kích hoạt mạch khuếch đại (amplifier enable), các chân DIN/BCLK/LRC và tải loa. Tuyệt đối không nối ngõ ra loa công suất vào tai nghe dùng chung dây mát (common-ground); xem mục [Ngõ ra âm thanh](../hardware/audio-output.md).
- **Trò chuyện bằng nút bấm hoạt động tốt nhưng đánh thức bằng giọng nói thất bại:** kiểm tra xem tính năng đánh thức có đang bị tắt không và mô hình đã chọn có khớp với dòng chip/dung lượng bộ nhớ không. Chip C3 và S3 sử dụng các mô hình khác nhau; không phải mọi thiết bị C3 đều thiếu hỗ trợ từ khóa đánh thức.
- **Muốn thay đổi cụm từ đánh thức:** trước tiên hãy kiểm tra các tùy chọn tương thích trong [trình biên dịch trực tuyến](../firmware/online-builder.md#configure). Cụm từ tùy chỉnh cũng phụ thuộc vào dòng chip, bộ nhớ PSRAM và cấu hình biên dịch; không phải bo mạch nào cũng hỗ trợ nhập văn bản tự do.
- **Vẫn còn tiếng vọng dù đã bật AEC:** kiểm tra đường tín hiệu âm thanh tham chiếu và phần cứng có nằm trong danh sách hỗ trợ không. Một tùy chọn khi biên dịch không thể thay thế cho thiết kế mạch điện và cấu trúc âm học; xem mục [cấu hình âm thanh của firmware](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/Kconfig.projbuild).

Tính năng BluFi chỉ dùng để cấu hình kết nối Wi-Fi; nó không đồng nghĩa với việc thiết bị hỗ trợ tai nghe Bluetooth.

### Thay đổi nhân vật, giọng nói hoặc người nói được nhận diện

- Thay đổi tên gọi trợ lý, giọng nói hoặc mô hình ngôn ngữ theo [các bước trên Console](../console/index.md#role-and-voice), nhấn lưu, sau đó bắt đầu một cuộc trò chuyện mới.
- Giúp trợ lý nhận diện các thành viên trong gia đình hoặc người nói khác theo [các bước nhận diện giọng nói](../console/index.md#speaker-recognition): chọn bản ghi âm và nhập tên cùng mô tả.
- Thay đổi từ khóa đánh thức ngoại tuyến theo hướng dẫn [Từ khóa đánh thức](../development/wake-words.md). Việc đổi tên nhân vật trợ lý không làm thay đổi từ khóa đánh thức.

<a name="display"></a>

## Màn hình hiển thị {#display}

Khi màn hình không lên hình, hãy kiểm tra tuần tự: model/chip điều khiển → nguồn cấp → các chân giao tiếp I2C/SPI → địa chỉ/độ phân giải → biến thể firmware. Các màn hình SSD1306 128×32, 128×64, SH1106 và màn hình SPI LCD đòi hỏi cấu hình hoàn toàn khác nhau.

Nếu âm thanh hoạt động bình thường nhưng màn hình không sáng, hãy lưu lại nhật ký khởi động trước khi kết luận hỏng vi điều khiển MCU. Chân đèn LED RGB tích hợp trên mạch có thể khác nhau tùy từng phiên bản phần cứng, do đó một màu đèn không phải là mã báo lỗi dùng chung cho mọi bo mạch.

<a name="build"></a>

## Môi trường biên dịch {#build}

Đối với XiaoZhi v2.6.0, phiên bản ESP-IDF 6.0.1 là yêu cầu tối thiểu và nhánh `release/v6.1` được khuyến nghị sử dụng. Tuyệt đối không trộn lẫn môi trường IDF 5.x, tệp `sdkconfig` cũ và mã nguồn mới. Sau khi chuyển đổi phiên bản SDK, hãy dọn dẹp bản dựng và cấu hình lại theo hướng dẫn [Biên dịch cục bộ](../development/build-firmware.md).

Đối với lỗi `CreateProcess` của Ninja trên Windows do độ dài dòng lệnh vượt giới hạn, hãy áp dụng quy trình bật tệp phản hồi (response-file) trong hướng dẫn biên dịch. Việc tắt phần mềm diệt virus không phải là giải pháp khắc phục chuẩn.

<a name="mcp"></a>

## Công cụ MCP {#mcp}

Kiểm tra tuần tự từ: khởi chạy công cụ cục bộ → kết nối tới điểm cuối cầu nối → hiển thị công cụ trên Console → lượt gọi thực tế trong cuộc trò chuyện. Nhập sai địa chỉ điểm cuối của trợ lý, tiến trình bị thoát ngầm hoặc ghi nhật ký lẫn vào luồng `stdout` đều có thể làm gián đoạn tích hợp. Xem mục [Khắc phục sự cố MCP](../mcp/quickstart.md#troubleshooting).

Xem mục [Nhật ký cổng nối tiếp (Serial logs)](./serial-logs.md) để nắm rõ các bước thu thập log đầy đủ và mục [Đăng nhập và hủy liên kết](./account-and-binding.md) nếu gặp sự cố về quyền sở hữu thiết bị.

<a name="verify"></a>

## Ghi lại các thông tin sau trước khi báo cáo sự cố {#verify}

Cung cấp đường dẫn URL của trang tài liệu, các bước thực hiện thực tế, kết quả mong đợi/thực tế, dòng chip và biến thể bo mạch, phiên bản firmware, cách cấp nguồn và nhật ký báo lỗi đã che thông tin nhạy cảm. Đối với lỗi đấu nối dây, hãy chụp ảnh rõ nét các ký hiệu in trên mạch (silkscreen) sau khi đã ngắt nguồn điện.

<a name="next"></a>

## Các bước tiếp theo {#next}

Quay lại mục [Bắt đầu sử dụng](../getting-started/index.md) và thực hiện lại công đoạn tương ứng. Nếu sự cố vẫn chưa được giải quyết, hãy sử dụng liên kết phản hồi ở cuối trang và mô tả rõ bước nào không thể tái hiện được.
