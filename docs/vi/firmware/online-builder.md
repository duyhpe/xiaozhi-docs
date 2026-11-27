---
id: online-builder
title: Biên dịch và nạp firmware trực tuyến
description: Tạo tệp firmware tương thích và nạp trực tiếp qua trình duyệt mà không cần cài đặt ESP-IDF.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Tính năng nạp trực tuyến trên Console đã được kiểm thử thực tế trên một bo mạch LCKFB LiChuang ESP32-S3. Các màn hình tiến trình/thành công và nhật ký khởi động đã xác nhận bản 2.6.0, khả năng tự kết nối lại mạng và trạng thái chờ; các bo mạch khác cùng hiển thị màn hình, âm thanh và cuộc trò chuyện vật lý vẫn cần kiểm thử thêm.
translation:
  status: review
  sourceHash: 6d3020556e1d28f44079301efc8d9e75f007b30dbb2f0cda4fd25de5646ceeae
  reviewedAt: '2026-11-15'
---
# Biên dịch và nạp firmware trực tuyến

Chọn phần cứng và tính năng trên trang XiaoZhi Console, chờ máy chủ biên dịch firmware, sau đó tải về hoặc nạp trực tiếp vào thiết bị. Các bo mạch được hỗ trợ có thể bắt đầu ngay tại đây mà không cần cài đặt bộ công cụ ESP-IDF.

<a name="scope"></a>

## Trước khi bắt đầu {#scope}

Xác định chính xác dòng chip, mã bo mạch (board ID), biến thể biên dịch, màn hình và dung lượng bộ nhớ. Nếu chưa chắc chắn, hãy bắt đầu từ mục [chọn firmware](./downloads.md#identify). Việc nạp qua trình duyệt cũng yêu cầu sử dụng trình duyệt Chrome/Edge trên máy tính có hỗ trợ Web Serial, cáp USB truyền dữ liệu tốt và trình điều khiển (driver) phù hợp. Hầu hết các thiết bị và mạch breadboard đều dùng được cách này; một số phiên bản như Tudouzi (`tudouzi`), KevinBox2 không có chân nạp USB lộ sẵn — vui lòng làm theo [yêu cầu giao tiếp nạp của từng bo mạch](./flashing.md#prepare).

Chỉ những bo mạch có trong danh mục biên dịch hiện hành mới có thể chọn trực tiếp. Nếu đã thay đổi sơ đồ chân hoặc dùng phần cứng chưa có trong danh sách, hãy làm theo hướng dẫn [hỗ trợ bo mạch tùy chỉnh](../development/custom-board.md) trước tiên.

<a name="open"></a>

## 1. Mở trình biên dịch firmware {#open}

1. Đăng nhập vào [XiaoZhi Console](https://xiaozhi.me/console/).
2. Mở mục **Trình biên dịch firmware (Firmware builder)**, hoặc truy cập trực tiếp [trình biên dịch trực tuyến](https://xiaozhi.me/console/firmware-builder), sau đó tạo một tác vụ biên dịch mới.
3. Kiểm tra **phiên bản firmware** và **mã commit nguồn (source commit)** ở đầu hộp thoại. Hãy ghi lại các thông tin này cùng tác vụ biên dịch; chúng rất cần thiết nếu bạn cần báo cáo lỗi có thể tái hiện.

Người dùng đăng nhập thông thường đều có thể sử dụng tính năng này. Hạn mức tác vụ, các phiên bản khả dụng và danh mục phần cứng phụ thuộc vào giao diện hiện tại của trang web; hạn mức mặc định hiển thị tại một thời điểm không phải là quyền lợi cố định vĩnh viễn.

<a name="configure"></a>

## 2. Chọn phần cứng và tính năng {#configure}

| Tùy chọn | Cách lựa chọn |
| --- | --- |
| Chip mục tiêu và bo mạch | Khớp với thiết bị vật lý thực tế; chỉ tên gọi gần giống nhau là chưa đủ |
| Biến thể bo mạch / bản dựng | Phân biệt rõ độ phân giải màn hình, phương thức kết nối mạng và phiên bản phần cứng |
| Ngôn ngữ firmware | Ngôn ngữ giao diện và lời nhắc giọng nói trên thiết bị, tách biệt với ngôn ngữ hiển thị của trang web |
| Từ khóa đánh thức | Chọn tùy chọn khả dụng cho bo mạch hoặc tắt đi; không phải dòng chip nào cũng hỗ trợ cùng một loại mô hình |
| Màn hình, camera, âm thanh | Chỉ thay đổi các tùy chọn được hỗ trợ; không thể bật một tính năng đang bị ẩn bằng cách chọn giả sang bo mạch khác |
| Cấu hình mạng (Provisioning) | Chọn phương thức qua điểm phát sóng (hotspot) hoặc BluFi mà phần cứng và firmware hỗ trợ |

Đối với mạch breadboard OLED cơ bản, hãy chọn **Bread Compact Wi-Fi**, sau đó kiểm tra lại mã bo mạch và màn hình: `bread-compact-wifi` cho màn hình 128×32 và `bread-compact-wifi-128x64` cho màn hình 128×64. Không chọn sang bo mạch khác chỉ để làm hiện tùy chọn camera.

Tính năng khử tiếng vọng AEC đòi hỏi mạch âm thanh phù hợp và có đường tín hiệu tham chiếu. Chỉ riêng việc bật tùy chọn khi biên dịch không thể bù đắp cho phần cứng bị thiếu.

<span id="historical-video"></span>

Các ảnh chụp màn hình Console thực tế bên dưới hiển thị giao diện tiếng Trung. Hãy đối chiếu các thiết lập mô tả ở trên để nhận diện đúng các nút điều khiển tương ứng trên ngôn ngữ giao diện bạn đang dùng.

<figure class="source-figure">

[![Các thiết lập biên dịch trực tuyến cơ bản: chip, bo mạch, màn hình, ngôn ngữ và từ khóa đánh thức.](../../public/images/zh/console-builder-basic-2026-11-14.png)](../../public/images/zh/console-builder-basic-2026-11-14.png)

<figcaption>Ví dụ cấu hình cho mạch breadboard. Kiểm tra mã bo mạch (board ID) và màn hình trước khi chọn ngôn ngữ và từ khóa đánh thức. Phiên bản, tùy chọn và hạn mức hằng ngày được quy định bởi trang web tại thời điểm sử dụng.</figcaption>
</figure>

Mở thẻ **âm thanh và mạng (audio and network)** để xem lại các tùy chọn dành cho bo mạch. Các thiết lập không thay đổi sẽ sử dụng giá trị mặc định của bo mạch. Việc thẻ **màn hình và camera (display and camera)** bị vô hiệu hóa (mờ đi) là bình thường đối với một số bo mạch.

<figure class="source-figure">

[![Các tùy chọn cấu hình Wi-Fi trong thẻ âm thanh/mạng.](../../public/images/zh/console-builder-network-2026-11-14.png)](../../public/images/zh/console-builder-network-2026-11-14.png)

<figcaption>Các tùy chọn cấu hình mạng cho bản dựng breadboard này. Các thiết lập khả dụng phụ thuộc vào từng bo mạch; không sao chép công tắc tùy chọn của thiết bị khác.</figcaption>
</figure>

Một bản biên dịch trực tuyến và [gói phát hành chính thức v2.6.0](./releases/v2.6.0.md) có thể cùng hiển thị số phiên bản “2.6.0” nhưng lại sử dụng mã commit nguồn khác nhau. Để tái tạo lại chính xác một bản dựng, hãy lưu lại cả mã commit, các tham số đã chọn lẫn số phiên bản.

<a name="build"></a>

## 3. Gửi yêu cầu và chờ biên dịch {#build}

1. Kiểm tra lại cấu hình và bắt đầu quá trình biên dịch firmware.
2. Giữ lại thông tin tác vụ và theo dõi các giai đoạn như xếp hàng chờ, chuẩn bị mã nguồn, tải thư viện phụ thuộc, biên dịch và tải tệp lên.
3. Sử dụng nút Hủy (Cancel) nếu cần dừng lại. Không gửi liên tiếp nhiều tác vụ giống nhau chỉ vì chưa thấy dòng nhật ký mới xuất hiện.
4. Sau khi thành công, hãy lưu lại phiên bản, mã commit nguồn, biến thể bo mạch và các tùy chọn đã chọn từ phần chi tiết.

Lịch sử tác vụ không có nút Thử lại (Retry) dùng chung. Hãy đọc thông báo lỗi và nhật ký, sửa lại các tham số hoặc chờ người bảo trì khắc phục, sau đó tạo một tác vụ mới nếu cần. Các tác vụ giống hệt nhau có thể dùng lại kết quả bộ nhớ đệm; việc biên dịch hoàn tất nhanh không có nghĩa là bản dựng đó không thể truy xuất nguồn gốc.

<figure class="source-figure">

[![Tác vụ biên dịch đã hoàn tất kèm nút nạp trực tiếp và tải xuống.](../../public/images/zh/console-builder-history-2026-11-14.png)](../../public/images/zh/console-builder-history-2026-11-14.png)

<figcaption>Một tác vụ LCKFB LiChuang ESP32-S3 đã hoàn tất. Xác nhận đúng bo mạch và phiên bản mục tiêu trước khi dùng tính năng Nạp (Flash) hoặc Tải xuống (Download). Thời gian biên dịch của tác vụ này không phải là mốc chuẩn cho các tác vụ khác.</figcaption>
</figure>

<a name="flash"></a>
## 4. Tải xuống hoặc nạp trực tiếp {#flash}

**Lưu bản tải về:** lưu lại tệp ảnh đã gộp (merged image) và thông tin tác vụ. Nếu dùng công cụ nạp ngoại tuyến, hãy làm theo [hướng dẫn phân loại tệp ảnh](./flashing.md#image-types). Không được coi tệp ứng dụng/OTA là một tệp ảnh hoàn chỉnh để nạp vào địa chỉ `0x0`.

**Nạp trực tiếp qua trình duyệt:**

1. Tìm tác vụ mục tiêu và chọn thao tác Nạp (Flash).
2. Trong hộp thoại kết nối/nạp, hãy kiểm tra kỹ loại bo mạch, mã bo mạch (board ID), dòng chip, mã commit và các tham số.
3. Kết nối đúng thiết bị bằng cáp dữ liệu USB. [Đưa mạch vào chế độ tải (download mode)](./flashing.md#download-mode) nếu cần thiết và đóng tất cả các công cụ gỡ lỗi đang chiếm dụng cổng COM đó.
4. Bắt đầu quá trình kết nối và nạp, chọn cổng của bo mạch trong hộp thoại chọn cổng của trình duyệt và bấm Kết nối. Việc cấp quyền cho cổng sẽ chuyển tiếp thẳng sang quá trình nạp chứ không chỉ là xem trước cổng.
5. Chờ quá trình tải tệp, xác thực và ghi dữ liệu hoàn tất, sau đó khởi động lại thiết bị theo hướng dẫn.

<figure class="source-figure">

[![Kết nối và nạp: kiểm tra bo mạch LiChuang S3, mã commit và các tùy chọn biên dịch.](../../public/images/zh/console-flash-confirm-2026-11-14.png)](../../public/images/zh/console-flash-confirm-2026-11-14.png)

<figcaption>Bước kiểm tra cuối cùng trước khi nạp. Tác vụ này dành cho bo mạch LiChuang S3; người dùng mạch breadboard cần thấy đúng định danh bo mạch của mình trước khi kết nối cổng và ghi dữ liệu.</figcaption>
</figure>

::: info Cài đặt trên thiết bị có được giữ lại không?
Trình nạp qua web hiện tại chỉ ghi các phân vùng chương trình và bỏ qua phân vùng NVS, nhưng điều này không đảm bảo bố cục NVS cũ và mới luôn khớp nhau. Các bản cập nhật thông thường có cùng bố cục thường vẫn giữ lại được thông tin Wi-Fi. Hãy sẵn sàng cấu hình lại mạng nếu có thay đổi bố cục phân vùng, xóa trắng toàn bộ chip (full-chip erase) hoặc nạp liên tục tệp gộp bằng công cụ ngoại tuyến.
:::

Không rút cáp thiết bị, đóng kết nối hoặc để máy tính rơi vào chế độ ngủ (sleep) trong quá trình nạp. Nếu bước xác thực chip hoặc tệp ảnh báo lỗi, hãy kiểm tra lại phần cứng thay vì tìm cách bỏ qua bước xác thực.

<a name="serial-port"></a>

### Chọn đúng cổng Serial {#serial-port}

Chọn cổng nối tiếp USB (USB serial port) xuất hiện khi cắm bo mạch vào máy tính, sau đó chọn **Kết nối (Connect)** trong hộp thoại hệ thống. Một máy tính có thể có nhiều thiết bị ESP32 hoặc cổng nối tiếp Bluetooth. Hãy nhận diện đúng cổng mục tiêu bằng cách quan sát cổng xuất hiện/biến mất khi cắm/rút cáp hoặc xem thông tin thiết bị, không dựa vào tên số thứ tự cổng trong ảnh minh họa.

<figure class="source-figure">

[![Hộp thoại chọn cổng Serial trên macOS Chrome với thiết bị gỡ lỗi USB JTAG/serial mục tiêu được chọn.](../../public/images/zh/console-serial-picker-macos-2026-11-14.jpg)](../../public/images/zh/console-serial-picker-macos-2026-11-14.jpg)

<figcaption>Ví dụ trên macOS Chrome: chọn cổng USB mục tiêu, sau đó bấm Kết nối. Ngôn ngữ hộp thoại tuân theo ngôn ngữ trình duyệt; tên và số hiệu cổng sẽ khác nhau tùy máy.</figcaption>
</figure>

<details>
<summary>Ví dụ hộp thoại chọn cổng trên Windows</summary>

<figure class="source-figure">

[![Cấp quyền cổng Serial trên trình duyệt: chọn cổng xuất hiện khi cắm bo mạch vào. Số cổng COM sẽ khác nhau tùy từng máy tính.](../../public/images/zh/doc-18-image-011.webp)](../../public/images/zh/doc-18-image-011.webp)

<figcaption>Cấp quyền cổng Serial trên trình duyệt: chọn cổng xuất hiện khi cắm bo mạch vào. Số cổng COM sẽ khác nhau tùy từng máy tính.</figcaption>
</figure>

</details>

<a name="flash-progress"></a>

### Theo dõi tiến trình ghi phân vùng {#flash-progress}

Sau khi kết nối, trang web sẽ hiển thị phân vùng đang ghi và tiến trình tổng thể. Hãy giữ nguyên trang web và kết nối USB cho đến khi có kết quả cuối cùng. Một tác vụ báo hoàn tất trong lịch sử biên dịch không có nghĩa là thiết bị đã được nạp firmware.

<figure class="source-figure">

[![Bo mạch LiChuang ESP32-S3 đang ghi phân vùng ota_0 ở mức 25%.](../../public/images/zh/console-flash-progress-2026-11-14.jpg)](../../public/images/zh/console-flash-progress-2026-11-14.jpg)

<figcaption>Tiến trình ghi phân vùng thực tế. Tên phân vùng và tỷ lệ phần trăm sẽ thay đổi trong suốt quá trình nạp; mức 25% chỉ là thời điểm được chụp lại tại đây.</figcaption>
</figure>

<a name="flash-success"></a>

### Chờ thông báo thành công và kiểm tra khởi động lại {#flash-success}

Thông báo cuối cùng xác nhận quá trình nạp đã hoàn tất và thiết bị đang khởi động lại chứng tỏ quy trình ghi của trình duyệt đã thành công. Hãy chờ thiết bị tự khởi động lại, hoặc khởi động lại thủ công nếu được hướng dẫn. Sau đó kiểm tra màn hình, âm thanh và kết nối mạng.

<figure class="source-figure">

[![Nạp qua web thành công với dấu tích xanh và thông báo khởi động lại thiết bị.](../../public/images/zh/console-flash-success-2026-11-14.jpg)](../../public/images/zh/console-flash-success-2026-11-14.jpg)

<figcaption>Ghi dữ liệu thành công. Bạn vẫn cần kiểm tra quá trình khởi động và các chức năng cơ bản của thiết bị; việc hoàn tất tác vụ biên dịch không tự khẳng định việc cài đặt lên thiết bị đã thành công.</figcaption>
</figure>

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

::: tip Dấu hiệu thành công
Tác vụ biên dịch hoàn tất, trình nạp qua web báo thành công và có thể truy xuất được thông tin bản dựng của firmware. Sau khi khởi động lại, màn hình và âm thanh hoạt động khớp với phần cứng, kết nối mạng thông suốt và thiết bị hoàn thành được một cuộc trò chuyện.
:::

<a name="troubleshooting"></a>

## Khắc phục sự cố {#troubleshooting}

| Hiện tượng | Cách xử lý |
| --- | --- |
| Không tìm thấy bo mạch trong danh sách | Xác nhận chính xác model phần cứng. Nếu tự đấu nối sơ đồ chân khác, bạn cần tạo bản tinh chỉnh riêng chứ không chọn một bo mạch trông gần giống |
| Tùy chọn bị mờ (vô hiệu hóa) hoặc thiếu công tắc bật/tắt | Kiểm tra phạm vi hỗ trợ của bo mạch đã chọn; không phải phần cứng nào cũng hỗ trợ các tính năng giống nhau |
| Đã đạt giới hạn lượt biên dịch trong ngày | Làm theo thông báo hiển thị trên trang. Việc xóa lịch sử tác vụ không nhất thiết khôi phục lại hạn mức trong ngày |
| Xếp hàng chờ lâu, lỗi hoặc quá thời gian chờ | Lưu lại mã tác vụ (task ID), phiên bản và tóm tắt lỗi; ẩn các thông tin nhạy cảm trước khi chia sẻ toàn bộ tệp nhật ký tải về |
| Trình duyệt không được hỗ trợ | Sử dụng trình duyệt Chrome hoặc Edge trên máy tính qua giao thức HTTPS và xem lại mục [chuẩn bị nạp firmware](./flashing.md#prepare) |
| Không thể tải tệp xuống | Các tệp thành phẩm chỉ được lưu trữ trong một khoảng thời gian nhất định. Hãy tải về lưu giữ các tệp quan trọng và tạo tác vụ mới nếu cần |

<a name="next"></a>

## Các bước tiếp theo {#next}

Đối với thiết bị mới, hãy tiếp tục với bước [cấu hình mạng và liên kết thiết bị](../getting-started/wifi-and-binding.md). Nếu bạn có chỉnh sửa mã nguồn, hãy sử dụng phương pháp [tự biên dịch cục bộ](../development/build-firmware.md).
