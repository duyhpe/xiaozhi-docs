---
id: account-and-binding
title: 'Đăng nhập, khôi phục tài khoản và hủy liên kết thiết bị'
description: 'Khôi phục tài khoản của bạn, tự hủy liên kết thiết bị hoặc gửi yêu cầu hỗ trợ đối với thiết bị đang bị gắn vào tài khoản khác.'
status: review
reviewedAt: '2026-11-15'
reviewNote: 'Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các thao tác tài khoản và hồ sơ yêu cầu đã được kiểm tra; bộ phận hỗ trợ sẽ trực tiếp xét duyệt các yêu cầu xử lý thủ công.'
sourceArticles:
  - DOC-16
translation:
  status: review
  sourceHash: 3dcead553505bc36bd7d34f9a97ce4e7fc9379a23155157f4e25bd706ad041bf
  reviewedAt: '2026-11-15'
---
# Đăng nhập, khôi phục tài khoản và hủy liên kết thiết bị

Hãy xác định đúng tài khoản bạn đã sử dụng ban đầu trước khi thay đổi cấu hình trên thiết bị. Việc đăng nhập bằng một số điện thoại khác, nạp lại firmware hay xóa cài đặt Wi-Fi sẽ không xóa bỏ liên kết thiết bị đã lưu trên máy chủ.

<a name="scope"></a>

## Chọn hướng xử lý {#scope}

| Vấn đề gặp phải | Bắt đầu tại đây |
| --- | --- |
| Không bao giờ nhận được mã SMS | [Đăng nhập qua SMS](#sms) |
| Quên tên đăng nhập hoặc mật khẩu | [Khôi phục tài khoản gốc](#recovery) |
| Đổi số điện thoại hoặc liên kết tài khoản Google | Đăng nhập trước, sau đó vào phần cài đặt tài khoản |
| Chuyển nhượng thiết bị của bạn cho người khác | [Hủy liên kết thiết bị của bạn](#unbind) |
| Mua lại thiết bị nhưng đang bị gắn vào tài khoản khác và không thể liên hệ chủ cũ | [Gửi yêu cầu hủy liên kết](#ownership) |
| Không biết ID thiết bị (device ID) hoặc địa chỉ MAC | [Lấy thông tin thiết bị](#device-information) |
| Cần hủy liên kết nhiều thiết bị cùng lúc | [Bảng tính yêu cầu hàng loạt](#batch) |

<a name="sms"></a>

## 1. Đăng nhập bằng SMS và Google {#sms}

Trên trang [Console chính thức](https://xiaozhi.me/console/), hãy kiểm tra mã vùng quốc gia/khu vực và làm theo các bước xác thực CAPTCHA/SMS hiện hành. Kiểm tra lại số điện thoại, sóng di động, mục tin nhắn bị chặn và thời gian giãn cách giữa các lần gửi thay vì nhấn nút gửi liên tục.

Hệ thống hiện tại sẽ điều hướng **các số điện thoại chưa đăng ký nằm ngoài đầu số +86** sang phương thức đăng nhập bằng Google. Các tài khoản dùng số điện thoại quốc tế đã tạo từ trước có thể áp dụng điều kiện khác. Hãy làm theo các thông báo hiển thị trực tiếp trên trang; việc chờ đợi 10 phút không phải là giải pháp chung cho mọi lỗi.

Đăng nhập bằng Google, đăng nhập bằng số điện thoại và xác minh GitHub là ba tính năng hoàn toàn khác nhau. GitHub chỉ cung cấp tính năng [liên kết và xác minh quyền lợi](../console/github-verification.md) sau khi bạn đã đăng nhập. Tên người dùng GitHub không thể dùng để khôi phục tài khoản XiaoZhi.

<a name="recovery"></a>

## 2. Khôi phục tài khoản gốc {#recovery}

1. Xác định lại số điện thoại, tài khoản Google hoặc tên người dùng đã đăng ký ban đầu. Việc thấy một tài khoản mới trống trơn không đồng nghĩa với việc dữ liệu cũ đã biến mất.
2. Nếu phương thức SMS hoặc Google vẫn đăng nhập được vào tài khoản gốc, hãy đăng nhập trước rồi đổi mật khẩu hoặc cập nhật phương thức liên kết trong phần cài đặt tài khoản.
3. Nếu quy trình tự khôi phục thất bại, hãy gửi email tới **[xiaozhi.ai@tenclass.com](mailto:xiaozhi.ai@tenclass.com)** kèm các thông tin bên dưới. Mô tả rõ bước bị lỗi và cách thức liên hệ lại với bạn; tuyệt đối không gửi mật khẩu hay mã xác nhận SMS qua email.

| Tình huống | Mẫu tiêu đề email | Thông tin cần cung cấp |
| --- | --- | --- |
| Bạn nhớ tên đăng nhập nhưng quên mật khẩu và không thể dùng phương thức đăng nhập đã liên kết | `【找回密码，用户名 XXX，设备ID XXX】` | Tên đăng nhập gốc và ID thiết bị |
| Bạn quên cả tên đăng nhập lẫn mật khẩu và không thể dùng phương thức đăng nhập đã liên kết | `【找回用户名，设备ID XXX，激活日期 XXX】` | ID thiết bị và ngày kích hoạt; ghi rõ ngày ước chừng nếu không nhớ chính xác |

Hai mẫu tiêu đề tiếng Trung trên có nghĩa là “Khôi phục mật khẩu, tên đăng nhập XXX, ID thiết bị XXX” và “Khôi phục tên đăng nhập, ID thiết bị XXX, ngày kích hoạt XXX”. Hãy thay thế các cụm `XXX` bằng thông tin thực tế của bạn. Xem hướng dẫn lấy [thông tin thiết bị](#device-information) ở bên dưới. Nếu thiếu thông tin nào, hãy nêu rõ thay vì đoán mò; bộ phận hỗ trợ có thể yêu cầu thêm các bước xác minh quyền sở hữu khác. Việc gửi yêu cầu không đồng nghĩa với việc tài khoản đã được khôi phục ngay lập tức.

<a name="unbind"></a>


## 3. Hủy liên kết thiết bị thuộc quyền sở hữu của bạn {#unbind}

1. Đăng nhập vào [Console](https://xiaozhi.me/console/) và tìm trợ lý (agent) đang quản lý thiết bị đó.
2. Mở danh sách **Thiết bị (Devices)** của trợ lý. Kiểm tra tên thiết bị, model bo mạch và địa chỉ MAC. Nếu địa chỉ MAC bị che bớt ký tự, hãy nhấp vào đó để sao chép địa chỉ đầy đủ và đối chiếu với thông tin bạn lưu giữ.
3. Tìm nút thao tác **Hủy liên kết (Unbind)** của thiết bị đó. Trên điện thoại, hãy cuộn xuống dưới thẻ thông tin thiết bị nếu cần; tuyệt đối không xóa nhầm toàn bộ trợ lý.
4. Đọc kỹ thông báo xác nhận: **việc hủy liên kết cũng sẽ xóa toàn bộ lịch sử trò chuyện của thiết bị này**. Kiểm tra kỹ thiết bị đang chọn và sao lưu mọi dữ liệu cần thiết trước khi nhấn xác nhận.
5. Nhờ người nhận thiết bị khởi động lại mạch, lấy mã xác minh 6 chữ số mới và [liên kết thiết bị vào tài khoản riêng của họ](../getting-started/wifi-and-binding.md#bind).

Thao tác hủy liên kết thiết bị khác với việc xóa một trợ lý. Bạn không cần phải xóa cả trợ lý chỉ để chuyển nhượng một thiết bị. Mạng Wi-Fi chỉ cần cấu hình lại nếu mạng cũ không còn sử dụng được nữa.

<a name="ownership"></a>

## 4. Thiết bị đang bị gắn vào một tài khoản khác {#ownership}

Một bộ kit mới mua, mô-đun hoặc thiết bị đã qua sử dụng có thể đã được liên kết sẵn trước khi bán, đổi trả hoặc tái chế. **Trước tiên, hãy liên hệ người bán hoặc chủ sở hữu cũ để nhờ họ hủy liên kết theo các bước ở trên.** Nếu không thể liên lạc được với họ, hãy gửi yêu cầu hỗ trợ thủ công:

1. [Lấy thông tin thiết bị](#device-information): địa chỉ MAC, ID thiết bị (nếu có), model bo mạch và phiên bản firmware.
2. Gửi email tới **[xiaozhi.ai@tenclass.com](mailto:xiaozhi.ai@tenclass.com)**.
3. Đối với một thiết bị đơn lẻ, hãy dùng tiêu đề email `【解绑设备，设备ID XXX，MAC地址 XXX】` (“Hủy liên kết thiết bị, ID thiết bị XXX, địa chỉ MAC XXX”). Thay thế các cụm `XXX` bằng thông tin thực tế. Nếu không lấy được ID thiết bị, hãy ghi là “unavailable” (không khả dụng) và giải thích lý do trong nội dung thư; tuyệt đối không điền nhầm mã liên kết 6 chữ số vào vị trí này.
4. Giải thích rõ rằng thiết bị bạn mua đang bị gắn vào tài khoản của người khác và bạn không thể liên hệ với chủ cũ. Đính kèm đầy đủ thông tin thiết bị, thông báo lỗi gặp phải và nguồn gốc mua/nhận thiết bị. Nếu bộ phận hỗ trợ yêu cầu bổ sung thông tin, hãy phản hồi ngay trong cùng chuỗi email đó.
5. Sau khi bộ phận hỗ trợ xác nhận đã xử lý xong, hãy khởi động lại thiết bị và [liên kết bằng mã 6 chữ số mới](../getting-started/wifi-and-binding.md#bind). Nếu vẫn báo lỗi, hãy trả lời lại chuỗi email đó kèm thông báo lỗi mới.

Sao chép và điền đầy đủ mẫu nội dung sau:

```text
Request: Remove the device's binding to its previous account
Reason: Device is bound to another account; previous owner cannot be reached
Device ID:
MAC address:
Board model and firmware version:
How the device was purchased/obtained:
Current error message:
```

Các yêu cầu này đều cần được xét duyệt thủ công; việc gửi email không đảm bảo thiết bị sẽ được hủy liên kết ngay lập tức. Việc nạp lại firmware, xóa cấu hình Wi-Fi hay khôi phục cài đặt gốc (factory reset) đều không thể thay thế cho thao tác hủy liên kết trên máy chủ. Chỉ gửi các mã định danh và giấy tờ chứng minh cho bộ phận hỗ trợ, tuyệt đối không đăng lên các trang báo lỗi công khai hoặc nhóm chat cộng đồng.

<a name="batch"></a>

### Yêu cầu hủy liên kết hàng loạt cho nhiều thiết bị {#batch}

1. [Tải xuống bảng tính yêu cầu hủy liên kết hàng loạt (XLSX)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/doc-16-file-001.xlsx).
2. Giữ nguyên tiêu đề các cột gốc trong tệp: **设备ID** nghĩa là **ID thiết bị (Device ID)**; **MAC地址** nghĩa là **Địa chỉ MAC (MAC address)**. Điền thông tin mỗi thiết bị trên một hàng và kiểm tra kỹ hai giá trị này thuộc về cùng một thiết bị. Hãy giải thích rõ các mục không khả dụng thay vì tự bịa ra mã ID.
3. Đính kèm tệp bảng tính đã điền hoàn chỉnh vào email gửi tới cùng địa chỉ hỗ trợ ở trên với tiêu đề `【解绑设备】` (“Hủy liên kết thiết bị”). Mô tả rõ nguồn gốc của lô thiết bị và lý do cần hủy liên kết.
4. Cung cấp thêm bất kỳ thông tin bổ sung nào nếu được yêu cầu, sau đó kiểm tra lại từng thiết bị để đảm bảo có thể liên kết bình thường sau khi hoàn tất xử lý.

<SourceMaterials article="DOC-16" />

<a name="device-information"></a>

## 5. Lấy ID thiết bị và địa chỉ MAC {#device-information}

**ID thiết bị (device ID), địa chỉ MAC, mã UUID lúc khởi động và mã liên kết 6 chữ số là bốn trường dữ liệu hoàn toàn khác nhau.** Mã 6 chữ số dùng để thêm thiết bị mới; địa chỉ MAC có định dạng dạng `02:00:00:00:00:01`. Không mặc định rằng chuỗi UUID xuất hiện trong nhật ký khởi động chính là mã ID thiết bị dạng số dùng ở máy chủ.

### ID thiết bị (Device ID)

Nếu thiết bị vẫn giao tiếp bình thường, hãy thử hỏi bằng giọng nói “What is my device ID?” (ID thiết bị của tôi là gì?) và ghi lại mã định danh mà trợ lý đọc ra. Nếu thiết bị không thể trò chuyện, không trả lời mã định danh hoặc chỉ đọc ra chuỗi UUID, hãy mô tả rõ tình trạng đó và gửi kèm địa chỉ MAC cùng nhật ký khởi động cho bộ phận hỗ trợ. Tuyệt đối không xóa trắng hay nạp lại firmware chỉ để cố lấy mã ID.

### Địa chỉ MAC

- **Nếu bạn vẫn đăng nhập được vào tài khoản gốc:** mở danh sách thiết bị của trợ lý trên Console và nhấp vào trường địa chỉ MAC để sao chép đầy đủ.
- **Nếu bạn không thể đăng nhập vào tài khoản gốc:** hãy đọc nhật ký khởi động của thiết bị trên máy tính cá nhân của bạn:

1. Cắm cáp USB truyền dữ liệu vào cổng xuất log của thiết bị. Đóng toàn bộ trang web nạp firmware, trình theo dõi của IDE và các công cụ đọc cổng nối tiếp khác đang chiếm dụng cổng đó.
2. Làm theo [hướng dẫn thu thập nhật ký cổng nối tiếp](./serial-logs.md#capture) để mở đúng cổng thực tế. Các mạch ESP32 cơ bản thường dùng thông số **tốc độ baud 115200, 8 bit dữ liệu, không kiểm tra chẵn lẻ, 1 bit dừng**. Tắt chế độ hiển thị mã HEX.
3. Khi cổng đã mở, nhấn nhanh nút **RESET/EN** để firmware khởi động bình thường. Không nhấn giữ nút BOOT để vào chế độ tải ROM ở bước này.
4. Tìm kiếm trong văn bản log cụm từ `wifi:mode` hoặc `sta (`. Trên thiết bị dùng Wi-Fi, hãy sao chép địa chỉ nằm **bên trong ngoặc `sta (...)`**, không lấy địa chỉ `softAP (...)` của điểm phát sóng cấu hình ngay phía sau.
5. Nếu không thấy dòng thông tin trên, hãy giữ lại toàn bộ thông tin thiết bị lúc khởi động cùng dòng `Board: UUID=...`, đồng thời ghi rõ model bo mạch và phiên bản firmware. Các thiết bị dùng mạng 4G hoặc Ethernet có thể không xuất log Wi-Fi; hãy tra cứu địa chỉ theo tài liệu hướng dẫn riêng của bo mạch đó hoặc theo chỉ dẫn của bộ phận hỗ trợ thay vì áp dụng ví dụ Wi-Fi này.

<figure class="source-figure">

[![Đọc địa chỉ MAC Wi-Fi STA từ nhật ký cổng nối tiếp; địa chỉ softAP thuộc về điểm phát sóng cấu hình](../../public/images/en/device-identifiers.svg)](../../public/images/en/device-identifiers.svg)

<figcaption>Ví dụ nhật ký: sao chép địa chỉ MAC nằm trong mục sta. Đây chỉ là các địa chỉ ví dụ, không phải địa chỉ thiết bị của bạn; dấu thời gian và tên điểm phát sóng sẽ khác nhau. Nhấp vào ảnh để phóng to.</figcaption>
</figure>

Nếu cửa sổ nhật ký trống trơn, hãy kiểm tra lại cổng kết nối, cáp truyền dữ liệu, nguồn cấp và chế độ khởi động bình thường. Nếu chữ bị lỗi font, hãy kiểm tra tốc độ baud, bảng mã ký tự và tắt hiển thị HEX. Không gửi các lệnh lạ vào cổng nối tiếp. Xem đầy đủ hướng dẫn tại mục [Thu thập nhật ký khởi động và nhật ký lỗi](./serial-logs.md).

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

Khôi phục tài khoản thành công sẽ giúp bạn truy cập lại đúng các trợ lý (agents) mong muốn. Sau khi hủy liên kết hoàn tất, thiết bị sẽ biến mất khỏi tài khoản cũ và người nhận có thể liên kết bằng mã 6 chữ số mới để bắt đầu trò chuyện. Việc mới chỉ gửi email hay bảng tính chưa phải là hoàn tất.

<a name="next"></a>

## Các bước tiếp theo {#next}

Quay lại mục [Kết nối và liên kết thiết bị](../getting-started/wifi-and-binding.md). Nếu gặp lỗi mã thiết bị không hợp lệ hoặc thiết bị đã kết nối mạng nhưng không phản hồi, hãy kiểm tra mục [Khắc phục sự cố](./index.md#account).
