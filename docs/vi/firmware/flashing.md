---
id: flashing
title: Nạp và nâng cấp firmware
description: 'Xác định loại tệp ảnh firmware, nạp qua trình duyệt hoặc ngoại tuyến và kiểm tra quá trình khởi động.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Đã kiểm tra theo cơ chế nạp phân vùng trên Console và tài liệu esptool; hành vi trên trình duyệt, trình điều khiển (driver) và quá trình chuyển đổi bố cục phân vùng vẫn cần kiểm thử thực tế trên phần cứng.
translation:
  status: review
  sourceHash: 85922489a3d0aaf062389cad6245ce9597e7f31a6b53d0264b2eac7d6b63d48a
  reviewedAt: '2026-11-15'
---
# Nạp và nâng cấp firmware

Trước khi nạp, hãy xác nhận chính xác bo mạch bạn đang ghi dữ liệu, loại tệp ảnh firmware (image type) đang có và liệu thao tác này có làm thay đổi các cài đặt hiện có hay không. **Ưu tiên sử dụng [trình biên dịch và nạp trực tuyến XiaoZhi](https://xiaozhi.me/console/firmware-builder)**: công cụ này hỗ trợ hầu hết thiết bị, bao gồm cả các mạch lắp trên breadboard, mà không cần cài đặt môi trường phát triển mã nguồn.

<a name="scope"></a>

## Chọn phương thức phù hợp {#scope}

| Tình huống | Phương thức khuyến nghị |
| --- | --- |
| Bo mạch trống hoặc cài đặt mới hoàn toàn | [Biên dịch và nạp trực tuyến](https://xiaozhi.me/console/firmware-builder); nếu thiết bị không có cổng nạp USB khả dụng, hãy làm theo hướng dẫn riêng của bo mạch |
| Firmware đang hoạt động, cập nhật trên cùng một bo mạch | Đọc kỹ ghi chú nâng cấp của bản phát hành trước; sử dụng cập nhật OTA tương thích hoặc nạp qua web |
| Chuyển từ bố cục phân vùng cũ hơn hoặc thay đổi định danh bo mạch | Kiểm tra ghi chú phát hành và chuẩn bị cấu hình lại mạng; nạp thủ công tệp ảnh đã gộp (merged image) khi được yêu cầu |
| Kiểm thử các thay đổi trong mã nguồn | Làm theo hướng dẫn [tự biên dịch cục bộ](../development/build-firmware.md) và sử dụng lệnh `idf.py flash monitor` |

Ghi lại phiên bản firmware, mã bo mạch (board ID), dung lượng Flash/PSRAM, thông số màn hình và trạng thái cấu hình mạng hiện tại. Cài đặt trợ lý (agent) vẫn được lưu giữ trên tài khoản Console của bạn; việc nạp lại firmware và hủy liên kết tài khoản là hai thao tác hoàn toàn tách biệt.

<a name="prepare"></a>

## Trước khi bắt đầu {#prepare}

- Một máy tính chạy Windows, macOS hoặc Linux cùng một sợi cáp USB có hỗ trợ truyền dữ liệu.
- Để nạp qua web, cần sử dụng trình duyệt Chrome hoặc Edge trên máy tính có hỗ trợ Web Serial, mở trang Console chính thức qua giao thức HTTPS. Việc trang web tải được không đồng nghĩa với việc trình duyệt hỗ trợ cổng nối tiếp (serial). Điện thoại, Safari và Firefox nằm ngoài phạm vi hỗ trợ nạp qua trình duyệt của hướng dẫn này.
- Xác định đúng cổng USB gốc (native USB) và cổng USB-UART của bo mạch thông qua tài liệu kỹ thuật của mạch.
- Đóng các cửa sổ theo dõi cổng nối tiếp (serial monitors), kết nối từ IDE và các trang nạp firmware khác đang chiếm dụng cùng một cổng COM. Tải trình điều khiển (driver) từ nhà sản xuất chip hoặc nhà sản xuất bo mạch.

::: info Có phải cổng USB nào cũng hỗ trợ nạp qua web không?
Không. Hãy xác nhận cổng USB đó có nối vào giao tiếp nạp của chip chứ không phải cổng chỉ cấp nguồn. Một số phiên bản phần cứng như Tudouzi (`tudouzi`), KevinBox2 không đưa các chân nạp USB cần thiết ra ngoài. Hãy sử dụng giao tiếp nạp, công cụ nạp ngoài hoặc phương thức cập nhật ngay trên firmware đang chạy theo tài liệu của người duy trì bo mạch; không suy đoán cách nạp dựa vào vỏ hộp hay tên gọi sản phẩm.
:::

<a name="image-types"></a>

## 1. Xác định loại tệp ảnh firmware {#image-types}

| Loại tệp | Cách sử dụng | Ảnh hưởng đến cài đặt |
| --- | --- | --- |
| Tệp ảnh đã gộp hoàn chỉnh, ví dụ `merged-binary.bin` | Nạp vào địa chỉ bắt đầu được quy định trong gói phát hành; ví dụ trên dòng S3 sử dụng địa chỉ `0x0` | Ghi liên tục toàn bộ tệp có thể ghi đè lên phân vùng NVS; không đảm bảo giữ lại được cài đặt Wi-Fi |
| Tệp ứng dụng / OTA (Application/OTA image) | Sử dụng trong quy trình cập nhật OTA tương thích hoặc quy trình phát triển | Không coi đây là tệp ảnh hoàn chỉnh để nạp vào địa chỉ `0x0` |
| Nhiều tệp biên dịch rời | Sử dụng các tham số nạp được tạo sẵn hoặc lệnh `idf.py flash` | Mỗi tệp có địa chỉ nạp (offset) riêng; tuyệt đối không tự đoán địa chỉ |

Phân vùng NVS lưu trữ các thiết lập như thông tin đăng nhập Wi-Fi. Trình nạp qua web trên Console hiện tại sẽ phân tích tệp ảnh đã gộp và ghi từng phân vùng riêng lẻ, bỏ qua `nvs` và `nvs_keys`. Tuy nhiên, firmware mới vẫn có thể khởi tạo lại các thiết lập nếu bố cục phân vùng thay đổi. Việc ghi liên tục toàn bộ tệp bằng công cụ nạp ngoại tuyến sẽ có cơ chế hoạt động khác.

<a name="web"></a>

## 2. Nạp firmware qua trình duyệt {#web}

1. Chọn và biên dịch bo mạch trong [trình biên dịch trực tuyến](./online-builder.md), sau đó mở giao diện nạp cho tác vụ đã biên dịch thành công.
2. Kiểm tra lại dòng chip, biến thể bo mạch và ngôn ngữ trong phần chi tiết tác vụ. Kết nối thiết bị bằng cáp dữ liệu.
3. Bắt đầu thao tác kết nối/nạp và chọn cổng tương ứng trong hộp thoại trình duyệt. Nếu chưa chắc chắn, hãy bấm Hủy và quan sát xem cổng nào xuất hiện khi bạn cắm lại thiết bị.
4. Nếu chế độ tải (download mode) chưa được kích hoạt, hãy làm theo các bước bên dưới rồi kết nối lại. Giữ cáp ổn định khi quá trình nạp bắt đầu và chờ đến khi hoàn tất.
5. Đóng kết nối, nhấn nút RESET/EN hoặc tắt rồi bật lại nguồn thiết bị và kiểm tra thông báo khởi động.

Nếu trang web báo lỗi không khớp chip (chip mismatch) hoặc bảng phân vùng không hợp lệ, hãy kiểm tra lại tệp firmware. Không cố gắng bỏ qua bước xác thực bằng cách thay đổi địa chỉ nạp hay xóa trắng toàn bộ chip.

<a name="download-mode"></a>

### Đưa mạch vào chế độ tải (download mode) thủ công {#download-mode}

Đối với một bo mạch ESP32-S3 tiêu chuẩn có hai nút BOOT và RESET/EN: nhấn giữ nút **BOOT** → nhấn nhanh nút **RESET/EN** → thả nút **BOOT**, sau đó chọn cổng COM mới xuất hiện. Một số cổng USB gốc (native USB) sẽ đổi tên khi chuyển giữa chế độ chạy ứng dụng và chế độ ROM.

Thao tác này khác với việc nhấn nhanh nút BOOT sau khi khởi động để vào chế độ cấu hình Wi-Fi. Các dòng chip khác, thiết bị hoàn chỉnh hoặc mạch có cơ chế khởi động đặc biệt cần làm theo hướng dẫn riêng của từng bo mạch.

<figure class="source-figure">

[![Hộp thoại cấp quyền Web Serial: chọn cổng của bo mạch. Nếu chưa chắc chắn, hãy bấm Hủy, rút cáp rồi cắm lại bo mạch và cấp quyền lại.](../../public/images/zh/doc-18-image-011.webp)](../../public/images/zh/doc-18-image-011.webp)

<figcaption>Hộp thoại cấp quyền Web Serial: chọn cổng của bo mạch. Nếu chưa chắc chắn, hãy bấm Hủy, rút cáp rồi cắm lại bo mạch và cấp quyền lại.</figcaption>
</figure>

<a name="offline"></a>

## 3. Nạp tệp ảnh đã gộp (merged image) ngoại tuyến {#offline}

Để cài đặt ngoại tuyến, hãy tải gói tương thích từ mục [tải xuống chính thức](./downloads.md), giải nén và xác nhận loại tệp ảnh. Các câu lệnh dưới đây chỉ áp dụng cho **tệp ảnh gộp hoàn chỉnh của ESP32-S3 đã được xác nhận nạp ở địa chỉ bắt đầu `0x0`**.

Cài đặt công cụ `esptool` phiên bản 5.x trong một môi trường Python riêng biệt:

```sh
python -m pip install "esptool>=5,<6"
python -m esptool version
```

Di chuyển vào thư mục chứa tệp ảnh firmware và thay `COM5` bằng cổng thực tế của bạn:

```sh
python -m esptool --chip esp32s3 --port COM5 write-flash 0x0 merged-binary.bin
```

Trên macOS/Linux, tên cổng thường có dạng `/dev/cu.usbmodem…` hoặc `/dev/ttyACM0`. Nếu môi trường của bạn không có lệnh `python`, hãy thay bằng `python3`. Tên cổng trong ví dụ không phải là cổng thực tế trên máy của bạn.

Chờ quá trình xác thực hoàn tất, sau đó khởi động lại thiết bị. Một lần cài đặt thông thường không yêu cầu xóa trắng toàn bộ chip (full-chip erase) trước đó. Chỉ thực hiện xóa trắng khi hướng dẫn của bản phát hành yêu cầu hoặc khi đã chẩn đoán ra lỗi; việc xóa trắng sẽ làm mất toàn bộ cài đặt trên thiết bị. Bạn cũng có thể sử dụng [công cụ nạp chính thức của Espressif](https://www.espressif.com/en/support/download/other-tools); các lưu ý về địa chỉ tệp ảnh và cài đặt thiết bị vẫn áp dụng tương tự.

<a name="windows-tool"></a>

### Công cụ giao diện đồ họa trên Windows {#windows-tool}

Nếu không muốn dùng dòng lệnh, bạn có thể tải **Flash Download Tool** từ trang tải xuống của Espressif ở trên và làm theo [hướng dẫn sử dụng công cụ](https://docs.espressif.com/projects/esp-test-tools/en/latest/esp32s3/production_stage/tools/flash_download_tool.html). Ảnh minh họa bên dưới sử dụng phiên bản 3.9.7.

1. Với ví dụ dòng S3 này, hãy chọn ESP32-S3, Develop và UART. Kiểm tra đúng dòng chip thực tế và phiên bản công cụ của bạn.
2. Thêm tệp ảnh đã gộp được xác nhận, tích chọn hàng tương ứng và nhập địa chỉ ghi của gói. Ví dụ tệp ảnh gộp S3 tại đây sử dụng địa chỉ `0x0`.
3. Trên các phiên bản công cụ cũ, hãy bật tùy chọn **DoNotChgBin** để giữ nguyên vẹn tệp ảnh. Không sao chép các thay đổi về tần số hay chế độ SPI từ ảnh chụp màn hình. Từ phiên bản 3.9.10 trở đi, công cụ mặc định khóa các tùy chọn này theo đúng cấu hình biên dịch của firmware.
4. Chọn cổng thiết bị và bắt đầu ghi dữ liệu. Chờ đến khi hoàn tất. Các dòng chip khác, gói gồm nhiều tệp rời và tệp ứng dụng OTA tuyệt đối không được áp dụng mù quáng địa chỉ của ví dụ này.

<figure class="source-figure">

[![Tùy chọn khởi động Flash Download Tool 3.9.7: chọn ESP32-S3 / Develop / UART trong ví dụ này.](../../public/images/zh/doc-08-image-003.webp)](../../public/images/zh/doc-08-image-003.webp)

<figcaption>Tùy chọn khởi động Flash Download Tool 3.9.7: chọn ESP32-S3 / Develop / UART trong ví dụ này.</figcaption>
</figure>

<figure class="source-figure">

[![Chọn tệp ảnh đã gộp và địa chỉ ghi. Ví dụ này chỉ áp dụng cho tệp ảnh S3 hoàn chỉnh được xác nhận ở địa chỉ 0x0.](../../public/images/zh/doc-08-image-005.webp)](../../public/images/zh/doc-08-image-005.webp)

<figcaption>Chọn tệp ảnh đã gộp và địa chỉ ghi. Ví dụ này chỉ áp dụng cho tệp ảnh S3 hoàn chỉnh được xác nhận ở địa chỉ 0x0.</figcaption>
</figure>

<figure class="source-figure">

[![Khởi động lại sau khi hiện chữ FINISH, sau đó kiểm tra phiên bản đang chạy và các chức năng.](../../public/images/zh/doc-08-image-009.webp)](../../public/images/zh/doc-08-image-009.webp)

<figcaption>Khởi động lại sau khi hiện chữ FINISH, sau đó kiểm tra phiên bản đang chạy và các chức năng.</figcaption>
</figure>

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

::: tip Dấu hiệu thành công
Quá trình ghi và xác thực thành công. Sau khi khởi động lại, thiết bị chạy đúng firmware và phiên bản bo mạch mong đợi, hiển thị màn hình và phát âm thanh khởi động bình thường. Lúc này bạn có thể tiến hành [cấu hình mạng và liên kết thiết bị](../getting-started/wifi-and-binding.md), hoặc thiết bị sẽ tự kết nối lại với mạng Wi-Fi đã lưu.
:::

<a name="troubleshooting"></a>

## Khắc phục sự cố {#troubleshooting}

| Hiện tượng | Bước xử lý tiếp theo |
| --- | --- |
| Không nhận cổng Serial | Thử đổi cáp truyền dữ liệu/cổng USB khác, kiểm tra driver và chế độ tải (download mode), xem thêm tại [khắc phục sự cố cổng Serial](../faq/index.md#serial) |
| Quá thời gian kết nối (timeout) hoặc bị ngắt quãng | Đóng các phần mềm khác đang chiếm dụng cổng và đưa mạch vào lại chế độ tải; nếu cần, hãy giảm tốc độ truyền (baud rate) và kiểm tra nguồn cấp |
| Nạp thành công nhưng thiết bị khởi động lại liên tục | Lưu lại nhật ký khởi động và kiểm tra dòng chip, bộ nhớ, phân vùng cùng định danh bo mạch; không thử nạp bừa các bản firmware ngẫu nhiên |
| Phải cấu hình lại Wi-Fi sau khi nâng cấp | Kiểm tra xem thao tác ghi tệp ảnh gộp có ghi đè lên cài đặt cũ không, phân vùng NVS có bị xóa không, hoặc bố cục phân vùng có thay đổi không |

<a name="next"></a>

## Các bước tiếp theo {#next}

Tiếp tục với bước [cấu hình mạng và liên kết thiết bị](../getting-started/wifi-and-binding.md). Cú pháp câu lệnh và các địa chỉ nạp tệp ảnh được trình bày chi tiết trong [hướng dẫn ghi dữ liệu của esptool](https://docs.espressif.com/projects/esptool/en/latest/esp32s3/esptool/basic-commands.html).
