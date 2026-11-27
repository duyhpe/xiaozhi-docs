---
id: downloads
title: Tải xuống và chọn firmware
description: 'Chọn firmware theo chip, bo mạch và biến thể, đồng thời phân biệt giữa cài đặt mới với các phiên bản đời cũ.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Bản phát hành chính thức v2.6.0 đã được kiểm tra; không phải mọi tệp nhị phân của từng bo mạch đều đã được chạy thử thực tế, vì vậy hãy xác nhận phần cứng của bạn trước khi tải xuống.
translation:
  status: review
  sourceHash: 02a25845b6efa25e40a95ff876fc308fa2ff3f3b7632f93e50935c99cda45a90
  reviewedAt: '2026-11-15'
---
# Tải xuống và chọn firmware

Firmware bắt buộc phải khớp với bo mạch và biến thể phần cứng. Hai thiết bị cùng sử dụng chip ESP32-S3 vẫn có thể không tương thích với nhau do khác biệt về màn hình, chip âm thanh và sơ đồ chân GPIO.

<a name="scope"></a>

## Ưu tiên sử dụng trình biên dịch và nạp trực tuyến {#scope}

Đối với hầu hết thiết bị, bao gồm cả các mạch lắp trên breadboard, hãy sử dụng [trình biên dịch firmware XiaoZhi](https://xiaozhi.me/console/firmware-builder) để tạo firmware tương thích và nạp trực tiếp qua mạng. Xem chi tiết tại [hướng dẫn nạp trực tuyến](./online-builder.md).

Chỉ sử dụng các phương án thay thế bên dưới khi bạn cần một phiên bản cũ cố định, cần cài đặt ngoại tuyến (offline) hoặc có chỉnh sửa mã nguồn. Một số phiên bản của Tudouzi, KevinBox2 và vài thiết bị khác không có chân nạp USB lộ sẵn; trước tiên hãy kiểm tra [hướng dẫn về giao tiếp nạp](./flashing.md#prepare).

| Nhu cầu của bạn | Nơi lấy firmware |
| --- | --- |
| Cài đặt lần đầu hoặc cập nhật thông thường cho hầu hết thiết bị | [Trình biên dịch trực tuyến](./online-builder.md): chọn bo mạch, ngôn ngữ, từ khóa đánh thức và các tùy chọn được hỗ trợ |
| Bản dựng mặc định đã phát hành chính thức | [Danh sách tải xuống bản phát hành v2.6.0](./releases/v2.6.0.md): đối chiếu đúng bo mạch, màn hình và biến thể kết nối mạng |
| Phần cứng tùy chỉnh hoặc có chỉnh sửa mã nguồn | [Tự biên dịch cục bộ](../development/build-firmware.md) với định danh bo mạch riêng biệt |

Tính đến ngày **2026-11-14**, bản phát hành chính thức được đối chiếu cho trang này là **[v2.6.0](https://github.com/78/xiaozhi-esp32/releases/tag/v2.6.0)**. Hãy kiểm tra ghi chú phát hành (Release notes) chính thức để cập nhật các phiên bản mới hơn; một phiên bản cố định nêu trong hướng dẫn này không vĩnh viễn là bản “mới nhất”.

<a name="identify"></a>

## 1. Xác định bo mạch và biến thể {#identify}

Thu thập đầy đủ các thông tin sau trước khi tải xuống. Với sản phẩm thương mại hoàn chỉnh, hãy xem tài liệu của người bán hoặc nhà sản xuất bo mạch; với mạch tự đấu nối, hãy kiểm tra cấu hình trong mã nguồn.

| Hạng mục | Tại sao quan trọng |
| --- | --- |
| Dòng chip | Các nền tảng như `esp32s3`, `esp32c3` và `esp32` hoàn toàn khác nhau |
| Mã bo mạch (Board ID) và biến thể | Quyết định sơ đồ chân GPIO, quá trình khởi tạo ngoại vi và định danh khi nâng cấp firmware |
| Bộ nhớ Flash / PSRAM | Dung lượng và chuẩn giao tiếp ảnh hưởng đến tài nguyên, phân vùng bộ nhớ và quá trình khởi động |
| Màn hình và âm thanh | Chip điều khiển/độ phân giải màn hình, micro và chip Codec bắt buộc phải khớp |
| Mạng và cấu hình (Provisioning) | Kết nối Wi-Fi/4G và phương thức hotspot/BluFi phụ thuộc vào bo mạch và tùy chọn biên dịch |

Ví dụ: [mạch breadboard S3 cơ bản](../hardware/breadboard-esp32-s3.md) sử dụng bản `bread-compact-wifi` cho màn hình OLED 128×32 và `bread-compact-wifi-128x64` cho màn hình 128×64. Các tệp của bản màn hình LCD và camera không thể dùng lẫn cho các bản dựng này.

<a name="release"></a>

## 2. Tải xuống từ bản phát hành chính thức {#release}

1. Tìm đúng sản phẩm, dòng chip và phân loại trong [danh sách tải xuống v2.6.0](./releases/v2.6.0.md), hoặc mở trang [Release chính thức](https://github.com/78/xiaozhi-esp32/releases/tag/v2.6.0). Đọc kỹ các thay đổi, phạm vi hỗ trợ và lưu ý nâng cấp trước tiên.
2. Tìm chính xác bo mạch và biến thể trong bảng, xác nhận đúng dòng chip, sau đó tải về và giải nén toàn bộ tệp ZIP theo đúng tên hiển thị. Các tệp nén **Source code** do GitHub tự động tạo không phải là firmware đã biên dịch cho thiết bị.
3. Xác định xem gói tải về chứa tệp ảnh đã gộp (merged image), tệp ứng dụng OTA hay nhiều tệp rời. Làm theo [hướng dẫn phân loại tệp ảnh](./flashing.md#image-types) để chọn đúng phương thức ghi dữ liệu.
4. Nếu không tìm thấy chính xác biến thể của mình, hãy dùng trình biên dịch trực tuyến hoặc hỏi người duy trì bo mạch đó. Tuyệt đối không nạp thử tệp có tên trông gần giống nhất.

<a name="checksum"></a>

### Kiểm tra tính toàn vẹn của tệp {#checksum}

Nếu bản phát hành hoặc tệp biên dịch có cung cấp mã kiểm tra SHA-256, hãy đối chiếu mã này trước. Các lệnh dưới đây chỉ tính toán mã băm (hash) của tệp trên máy tính của bạn:

::: code-group

```powershell [Windows PowerShell]
Get-FileHash .\merged-binary.bin -Algorithm SHA256
```

```sh [macOS]
shasum -a 256 merged-binary.bin
```

```sh [Linux]
sha256sum merged-binary.bin
```

:::

Việc tự tính toán mã băm trên máy không chứng minh tệp đó an toàn; hãy đối chiếu giá trị này với mã công bố trên kênh phát hành chính thức đáng tin cậy. Nếu không có giá trị tham chiếu, hãy lưu lại nguồn tải, phiên bản và tên tệp để tiện truy xuất về sau.

<a name="upgrades"></a>

## 3. Các phiên bản cũ và thay đổi bố cục phân vùng {#upgrades}

| Tình huống | Cách xử lý |
| --- | --- |
| Bản cập nhật nhỏ cho cùng một bo mạch có bố cục phân vùng tương thích | Làm theo hướng dẫn nâng cấp qua OTA hoặc qua web của bản phát hành đó |
| Nâng cấp từ bố cục v1 lên bố cục v2 | Kiểm tra phần cứng và tệp ảnh đã gộp mục tiêu, cài đặt theo đúng yêu cầu di trú dữ liệu và chuẩn bị cấu hình lại Wi-Fi |
| Thay đổi sơ đồ chân, màn hình hoặc bo mạch | Tạo bản tinh chỉnh tương thích trước; không ghi đè một bản dựng tiêu chuẩn không phù hợp lên phần cứng tùy chỉnh |
| Duy trì khả năng tương thích với thiết bị đời cũ | Lưu giữ chính xác phiên bản cùng mã băm của tệp và ghi chú lý do không thể nâng cấp |

Trang tài liệu này duy trì hai mục tải xuống: [danh sách v2.6.0](./releases/v2.6.0.md) hiện hành và [v1.9.4 dành cho các thiết bị đời v1](./releases/v1.9.4.md). Hãy kiểm tra các thay đổi về phân vùng trước khi nâng cấp hoặc hạ cấp; không mặc định rằng tính năng cập nhật OTA trực tiếp luôn hoạt động.

<a name="download-access"></a>

## Khi không thể tải tệp từ GitHub {#download-access}

1. Để cài đặt cho một bo mạch hiện đang được hỗ trợ, hãy mở [trình biên dịch trực tuyến XiaoZhi](https://xiaozhi.me/console/firmware-builder), chọn bo mạch và các tùy chọn, sau đó [tải về hoặc nạp trực tiếp tác vụ đã biên dịch thành công](./online-builder.md#flash). Trình đơn tác vụ cho phép tải xuống tệp ảnh đầy đủ; trình duyệt không cần tự tải gói cài đặt từ GitHub Releases.
2. Nếu bắt buộc phải dùng một gói phát hành chính thức cụ thể, hãy lưu lại phiên bản và tên tệp đầy đủ, tải xuống trên một mạng có thể truy cập GitHub, đối chiếu với mã kiểm tra chính thức đã công bố rồi chuyển sang máy tính dùng để nạp firmware.
3. Đối với các thiết bị dùng bản v1.9.4 hoặc các bản dựng cũ đặc thù, không thay thế bằng firmware từ trình biên dịch trực tuyến hiện tại cho cùng một tệp. Trang web này hiện không duy trì máy chủ dự phòng (mirror) riêng đảm bảo nội dung trùng khớp.

Một bản biên dịch trực tuyến có thể sử dụng phiên bản mã nguồn hoặc tùy chọn khác với gói phát hành chính thức, nên tệp nhị phân tạo ra không hoàn toàn giống hệt nhau. Chỉ riêng tên tệp giống nhau không đủ cơ sở để tin tưởng một trang lưu trữ tệp hay proxy không rõ nguồn gốc.

<a name="verify"></a>

## Kiểm tra mức độ sẵn sàng {#verify}

::: tip Dấu hiệu kiểm tra thành công
Bạn đã xác định rõ nguồn gốc, phiên bản, dòng chip mục tiêu, biến thể bo mạch và loại tệp ảnh của firmware, và tất cả đều khớp với thiết bị vật lý. Bạn đã sẵn sàng để nạp firmware.
:::

<a name="next"></a>

## Các bước tiếp theo {#next}

Với hầu hết thiết bị, hãy sử dụng tính năng [biên dịch và nạp trực tuyến](https://xiaozhi.me/console/firmware-builder). Nếu cần cài đặt ngoại tuyến, xem mục [nạp và cập nhật firmware](./flashing.md). Nếu bo mạch của bạn chưa có trong danh sách, hãy đọc hướng dẫn [hỗ trợ bo mạch tùy chỉnh](../development/custom-board.md) và tạo định danh firmware có thể truy xuất nguồn gốc trước tiên.
