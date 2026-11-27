---
id: wifi-and-binding
title: Kết nối và liên kết thiết bị của bạn
description: Kết nối thiết bị vào mạng và liên kết với tài khoản XiaoZhi Console bằng mã thiết bị gồm 6 chữ số.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Quy trình cấu hình qua Hotspot/BluFi và mã 6 chữ số đã được kiểm tra; các dòng điện thoại, bo mạch khác nhau và luồng liên kết thực tế vẫn cần cộng đồng thử nghiệm thêm.
translation:
  status: review
  sourceHash: 59da7afeee7126ddfc6b19bd2aa7772c14f3bb06ffba5dad51a2fa3353e30f04
  reviewedAt: '2026-11-15'
---
# Kết nối và liên kết thiết bị của bạn

Trước tiên hãy kết nối thiết bị vào mạng, sau đó nhập mã thiết bị vào tài khoản XiaoZhi Console của bạn. Bạn có thể bắt đầu cuộc trò chuyện đầu tiên sau khi hoàn tất cả hai bước này.

<a name="scope"></a>

## Trước khi bắt đầu {#scope}

- Một thiết bị đã nạp firmware tương thích và có nguồn cấp điện ổn định. Nếu chưa chắc chắn, hãy bắt đầu từ [hướng dẫn nạp firmware](../firmware/flashing.md).
- Một mạng khả dụng. Bản dựng Wi-Fi ESP32-S3 cơ bản trong hướng dẫn này sử dụng mạng Wi-Fi 2.4 GHz hoặc điểm phát sóng (hotspot) từ điện thoại, không dùng mạng trường học hay mạng khách yêu cầu đăng nhập thêm qua trang web (captive portal).
- Một điện thoại hoặc máy tính có thể truy cập [XiaoZhi Console](https://xiaozhi.me).

Hãy kiểm tra xem firmware của bạn được biên dịch để cấu hình qua **điểm phát sóng (hotspot)** hay **BluFi**. Đây là hai phương thức riêng biệt, không nhất thiết có hai nút để bạn chuyển đổi qua lại sau khi đã cài đặt. Với các thiết bị dùng mạng 4G hoặc Bluetooth PAN SF32, hãy làm theo hướng dẫn kết nối mạng riêng của từng bo mạch.

<a name="enter-mode"></a>

## 1. Vào chế độ cấu hình mạng (Provisioning) {#enter-mode}

Thiết bị chưa lưu thông tin Wi-Fi thường sẽ tự động vào chế độ cấu hình mạng ngay khi khởi động. Hãy làm theo hướng dẫn hiển thị trên màn hình và lời nhắc bằng giọng nói; cùng một màu đèn LED không mang ý nghĩa giống nhau trên mọi thiết bị.

Với [bo mạch S3 cơ bản trong hướng dẫn này](../hardware/breadboard-esp32-s3.md), thiết bị đã cấu hình trước đó có thể kích hoạt lại chế độ cấu hình mạng bằng cách **nhấn nhanh nút BOOT trong lúc thiết bị đang khởi động lại**. Hãy thả nút ra ngay khi chế độ cấu hình bắt đầu. Các bo mạch khác có thể dùng thao tác nhấn giữ, nhấn đúp hoặc chọn trong menu; vui lòng xem tài liệu hướng dẫn riêng của từng mạch.

Bạn không cần giữ nút BOOT trong khi nhấn nút RESET ở bước này. Tổ hợp phím đó dùng để đưa chip vào chế độ tải ROM phục vụ việc nạp firmware.

<a name="hotspot"></a>

## 2A. Cấu hình mạng qua điểm phát sóng của thiết bị (Hotspot) {#hotspot}

1. Tìm và kết nối vào mạng Wi-Fi do thiết bị phát ra. Tên mạng thường bắt đầu bằng `Xiaozhi`; hãy chọn đúng tên hiển thị trên màn hình hoặc được thiết bị đọc lên.
2. Nếu điện thoại báo “không có kết nối internet”, hãy giữ nguyên kết nối này thay vì chuyển ngay sang mạng Wi-Fi khác.
3. Trong trang cấu hình tự động bật lên, hãy chọn bộ định tuyến (router) hoặc điểm phát sóng điện thoại bạn muốn dùng, nhập mật khẩu và lưu lại.
4. Nếu trang cấu hình không tự động mở, hãy nhập địa chỉ được thiết bị thông báo vào thanh địa chỉ của trình duyệt. Với phiên bản này, địa chỉ điểm phát sóng mặc định là `http://192.168.4.1`. Đây là trang nội bộ của thiết bị, không phải trang web XiaoZhi.
5. Chờ thiết bị kết nối vào mạng mục tiêu. Sau đó, chuyển điện thoại của bạn về lại mạng có internet và mở trang Console.

Tính năng tự động chuyển đổi mạng trên điện thoại, VPN hoặc proxy có thể gây cản trở việc truy cập địa chỉ nội bộ của thiết bị. Trước tiên hãy kiểm tra xem điện thoại có còn đang kết nối với điểm phát sóng của thiết bị không, sau đó kiểm tra các cài đặt trên. Điểm phát sóng nội bộ này không cần ép buộc sử dụng HTTPS.

<figure class="source-figure">

[![Sau khi lưu cài đặt điểm phát sóng, hãy chờ thiết bị khởi động lại và kết nối vào mạng mục tiêu. Việc liên kết tài khoản lúc này chưa hoàn tất.](../../public/images/zh/doc-09-image-006.webp)](../../public/images/zh/doc-09-image-006.webp)

<figcaption>Sau khi lưu cài đặt điểm phát sóng, hãy chờ thiết bị khởi động lại và kết nối vào mạng mục tiêu. Việc liên kết tài khoản lúc này chưa hoàn tất.</figcaption>
</figure>

Nếu sử dụng điểm phát sóng từ điện thoại làm mạng thử nghiệm, hãy đảm bảo mạng đó chạy ở băng tần 2.4 GHz. Trên iPhone, bật mục **Tối đa hóa khả năng tương thích (Maximize Compatibility)** trong Cài đặt → Điểm truy cập cá nhân; trên các dòng điện thoại khác, chọn băng tần 2.4 GHz trong phần cài đặt điểm phát sóng.

<a name="blufi"></a>

## 2B. Cấu hình mạng bằng BluFi {#blufi}

Chỉ sử dụng cách này nếu tính năng BluFi đã được bật trong firmware và được bo mạch hỗ trợ:

1. Cài đặt ứng dụng EspBlufi từ kênh chính thức của Espressif. Bật Bluetooth trên điện thoại và cấp các quyền quét/kết nối theo yêu cầu của hệ điều hành.
2. Quét tìm thiết bị trong ứng dụng và chọn đúng tên quảng bá của bo mạch.
3. Làm theo hướng dẫn trên ứng dụng để chọn mạng Wi-Fi mục tiêu, nhập mật khẩu và gửi đi. Quan sát kết quả kết nối.
4. Khi thiết bị đã trực tuyến, hãy đưa điện thoại trở lại mạng có kết nối internet và tiếp tục bước liên kết tài khoản.

Việc chỉ ghép đôi trong danh sách Bluetooth của hệ thống điện thoại sẽ không hoàn tất quá trình cấu hình Wi-Fi. Tên quảng bá và giao diện ứng dụng có thể thay đổi tùy theo phiên bản firmware hoặc SDK. Xem chi tiết tại [hướng dẫn BluFi của firmware](https://github.com).

<a name="bind"></a>

## 3. Nhập mã thiết bị gồm 6 chữ số {#bind}

1. Chờ thiết bị tải cấu hình trực tuyến và hiển thị hoặc đọc lên **mã thiết bị gồm 6 chữ số**. Nếu không thấy mã xuất hiện, hãy nhấn nút trò chuyện một lần để kích hoạt tương tác, sau đó quan sát màn hình hoặc nhật ký (logs).
2. Mở trang [Console](https://xiaozhi.me) và đăng nhập bằng số điện thoại hoặc tài khoản Google khả dụng. Nếu dùng số điện thoại quốc tế chưa đăng ký, hãy làm theo hướng dẫn đăng nhập bằng Google trên trang thay vì chờ tin nhắn SMS.
3. Tại trang quản lý trợ lý (Agent), chọn **Thêm thiết bị (Add device)**, nhập mã 6 chữ số đang hiển thị trên thiết bị và xác nhận.
4. Để thêm thiết bị vào một trợ lý đã tạo sẵn, hãy làm theo hướng dẫn trong phần quản lý thiết bị của trợ lý đó. Giới hạn số lượng có thể khác nhau tùy loại thiết bị; hãy làm theo thông báo hiển thị.
5. Sau khi liên kết thành công, chờ quá trình kích hoạt hoàn tất. Nếu cần, hãy nhấn nhanh nút trò chuyện hoặc khởi động lại thiết bị, sau đó bắt đầu cuộc trò chuyện.

Mã thiết bị không phải là mã xác thực SMS, địa chỉ MAC hay số sê-ri sản phẩm. Không đăng công khai mã này để tránh người khác liên kết nhầm thiết bị của bạn.

<figure class="source-figure">

[![Kết nối mạng và liên kết tài khoản là hai bước tách biệt.](../../public/images/en/device-binding-flow.svg)](../../public/images/en/device-binding-flow.svg)

<figcaption>Kết nối mạng và liên kết tài khoản là hai bước tách biệt. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="verify"></a>

## Kiểm tra hoạt động {#verify}

::: tip Dấu hiệu thành công
Trang Console hiển thị thiết bị của bạn trong danh sách, thiết bị ngừng yêu cầu nhập mã liên tục, và khi nhấn nút hoặc gọi từ khóa đánh thức đã cài đặt, thiết bị bắt đầu cuộc trò chuyện với phản hồi bằng giọng nói rõ ràng.
:::

<a name="troubleshooting"></a>

## Khắc phục sự cố {#troubleshooting}

| Hiện tượng | Cách kiểm tra |
| --- | --- |
| Không thấy điểm phát sóng của thiết bị | Kiểm tra xem bản dựng này có dùng BluFi/4G không, chế độ cấu hình mạng đã bật chưa, nguồn cấp điện và nhật ký khởi động. Không cố khắc phục bằng cách bọc hoặc chạm tay vào ăng-ten |
| Không thể mở 192.168.4.1 | Kiểm tra xem điện thoại có còn kết nối với điểm phát sóng của thiết bị không, địa chỉ có bị nhập nhầm thành từ khóa tìm kiếm không, và tắt tính năng tự chuyển mạng/VPN |
| Không tìm thấy Wi-Fi gia đình | Với bản dựng S3 cơ bản, trước tiên hãy thử nghiệm với mạng Wi-Fi 2.4 GHz sử dụng mật khẩu trực tiếp |
| Đã kết nối Wi-Fi nhưng không có mã thiết bị | Kiểm tra kết nối internet, thời gian hệ thống của thiết bị và các yêu cầu OTA; lưu lại nhật ký (logs) liên quan để kiểm tra |
| Mã thiết bị không hợp lệ hoặc đã hết hạn | Sử dụng mã mới nhất đang hiển thị trên thiết bị, không dùng mã từ ảnh chụp cũ |
| Thiết bị thuộc về tài khoản khác | Nhờ chủ sở hữu trước [hủy liên kết thiết bị](../faq/account-and-binding.md#unbind); nếu không thể liên hệ, hãy [gửi email yêu cầu hủy liên kết](../faq/account-and-binding.md#ownership) thay vì nạp lại firmware nhiều lần |

<a name="next"></a>

## Bước tiếp theo {#next}

Chọn ngôn ngữ, vai trò và giọng nói cho trợ lý trên trang Console. Tiếp tục với [hướng dẫn bắt đầu nhanh MCP](../mcp/quickstart.md) để sử dụng các công cụ mở rộng, hoặc xem mục [khắc phục sự cố](../faq/index.md) nếu gặp lỗi.

Cơ chế cấu hình mạng của firmware được định nghĩa trong [mã nguồn triển khai Wi-Fi bản v2.6.0](https://github.com).
