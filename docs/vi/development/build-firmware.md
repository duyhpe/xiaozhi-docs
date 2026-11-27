---
id: build-firmware
title: Thiết lập môi trường biên dịch firmware cục bộ
description: 'Đối chiếu phiên bản ESP-IDF và firmware, chọn bo mạch, biên dịch, nạp code và kiểm tra nhật ký (logs).'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Bản dịch Tiếng Việt được đối chiếu theo tài liệu gốc. Các câu lệnh và tham số bo mạch đã được đối chiếu với phiên bản v2.6.0; công cụ ESP-IDF chưa được cài đặt và quá trình biên dịch chéo hoàn chỉnh chưa được chạy trên máy thử nghiệm này, rất hoan nghênh các kết quả kiểm thử trên từng nền tảng từ cộng đồng.
translation:
  status: review
  sourceHash: b70a50c29d9166e5c8b27eda4fd85a2d8d50f163c375b4353dfe8166026febb2
  reviewedAt: '2026-11-15'
---
# Thiết lập môi trường biên dịch firmware cục bộ

Hãy thiết lập môi trường biên dịch cục bộ khi bạn cần chỉnh sửa mã nguồn, sơ đồ chân GPIO hoặc bổ sung hỗ trợ phần cứng mới. Đối với các bo mạch đã có sẵn danh mục hỗ trợ, hãy bắt đầu với [trình biên dịch trực tuyến](../firmware/online-builder.md).

<a name="scope"></a>

## Phiên bản và chuẩn bị {#scope}

Hướng dẫn này sử dụng **firmware XiaoZhi v2.6.0**. Theo [tệp README của phiên bản này](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/README.md), hệ thống yêu cầu ESP-IDF 6.0.1 trở lên và khuyến nghị sử dụng **nhánh `release/v6.1`**. Hãy dùng nhánh này thay vì thẻ phát hành (tag) `v6.1` do có một lỗi đã biết trên dòng chip C3.

Chuẩn bị sẵn Git, phiên bản Python được ESP-IDF hỗ trợ và các gói thư viện phụ thuộc của hệ điều hành. Các yêu cầu tiên quyết trên Windows, Linux và macOS sẽ khác nhau; trước tiên hãy làm theo [hướng dẫn cài đặt của Espressif](https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/get-started/index.html) dành cho nền tảng của bạn. Các ví dụ bên dưới nhắm đến dòng chip ESP32-S3.

<figure class="source-figure">

[![Các thư mục và quy trình biên dịch cục bộ.](../../public/images/en/firmware-build-flow.svg)](../../public/images/en/firmware-build-flow.svg)

<figcaption>Các thư mục và quy trình biên dịch cục bộ. Nhấp vào ảnh để xem kích thước đầy đủ.</figcaption>
</figure>

<a name="install"></a>

## 1. Cài đặt và kích hoạt ESP-IDF {#install}

Sao chép (clone) mã nguồn SDK vào thư mục làm việc tùy chọn của bạn. Nếu đã tồn tại một thư mục trùng tên, hãy kiểm tra kỹ trước khi thực hiện để tránh ghi đè ngoài ý muốn.

```sh
git clone --branch release/v6.1 --recursive https://github.com/espressif/esp-idf.git
cd esp-idf
```

Cài đặt bộ công cụ biên dịch cho chip mục tiêu và kích hoạt môi trường:

::: code-group

```powershell [Windows PowerShell]
.\install.ps1 esp32s3
.\export.ps1
```

```sh [macOS / Linux]
./install.sh esp32s3
. ./export.sh
```

:::

Bạn cần kích hoạt đúng SDK trong mỗi cửa sổ dòng lệnh (terminal) mới mở. Nếu sử dụng trình quản lý cài đặt (EIM) hoặc IDE, hãy mở cửa sổ terminal ESP-IDF của đúng bản cài đặt đó và xác nhận nhánh đang chọn khớp với yêu cầu thay vì dùng một bản SDK đời cũ.

```sh
idf.py --version
git rev-parse HEAD
```

Chạy câu lệnh thứ hai ngay trong thư mục SDK để ghi lại chính xác mã commit. Các nhánh mã nguồn liên tục được cập nhật; mã commit chính xác sẽ giúp việc tái hiện sự cố trở nên khả thi. Nhớ cài đặt thêm bộ công cụ biên dịch (toolchain) tương ứng khi chuyển sang dòng chip C3 hoặc các dòng chip mục tiêu khác.

<a name="source"></a>


## 2. Tải mã nguồn firmware {#source}

Quay trở lại thư mục làm việc của dự án và tải về thẻ phát hành (tag) cố định:

```sh
git clone --branch v2.6.0 https://github.com/78/xiaozhi-esp32.git
cd xiaozhi-esp32
git describe --tags --always
```

Việc chuyển sang thẻ `v2.6.0` thường đưa kho mã nguồn vào trạng thái đầu tách rời (detached HEAD). Hãy tạo nhánh làm việc (branch) của riêng bạn trước khi lưu các chỉnh sửa mã nguồn.

<a name="build"></a>

## 3. Liệt kê bo mạch và biên dịch {#build}

Tại thư mục gốc của kho mã nguồn firmware, sau khi đã kích hoạt môi trường ESP-IDF, hãy chạy:

```sh
python scripts/build.py --list-boards
python scripts/build.py --list-languages
```

Xác định đúng thư mục bo mạch và biến thể bản dựng của bạn. Câu lệnh dưới đây chỉ áp dụng cho [mạch breadboard S3 cơ bản dùng màn hình OLED 128×32](../hardware/breadboard-esp32-s3.md):

```sh
python scripts/build.py bread-compact-wifi --name bread-compact-wifi --language zh-CN
```

Ví dụ trên biên dịch tài nguyên thiết bị bằng tiếng Trung giản thể. Để sử dụng tài nguyên tiếng Anh, hãy chọn `en-US` trong danh sách ngôn ngữ và thay thế bằng tham số `--language en-US`. Ngôn ngữ hiển thị trên trang web và ngôn ngữ firmware trên thiết bị là hai lựa chọn tách biệt.

Tập lệnh biên dịch sẽ đọc tệp `config.json` của bo mạch để chọn dòng chip mục tiêu cùng biến thể, sau đó tạo ra các tệp thành phẩm. Nếu dùng bo mạch khác, hãy truyền đúng tên thư mục và biến thể của bo mạch đó. Tuyệt đối không tự ý sửa đổi sơ đồ chân của một bo mạch mẫu trong khi vẫn giữ nguyên định danh firmware tiêu chuẩn của nó.

Để chọn cụm từ đánh thức, trước tiên hãy tải các thành phần phụ thuộc (components) và liệt kê danh sách mô hình khả dụng:

```sh
idf.py reconfigure
python scripts/build.py --list-wake-words
```

Tham số `--wake-word` chấp nhận tên các mô hình tương thích, `nihaoxiaozhi`, hoặc `disabled`. Mô hình được chọn phải phù hợp với dòng chip và dung lượng bộ nhớ của mạch. Xem chi tiết đầy đủ các tham số và tính năng trong [hướng dẫn bo mạch tùy chỉnh theo phiên bản](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/custom-board.md).

<a name="flash"></a>

## 4. Kiểm tra thành phẩm và nạp firmware {#flash}

Sau khi biên dịch thành công, hãy ghi lại số phiên bản và biến thể. Tệp ảnh hoàn chỉnh mặc định nằm tại `build/merged-binary.bin`. Thêm tham số `--zip` vào câu lệnh biên dịch nếu bạn muốn xuất gói phân phối vào thư mục `releases/`.

Kết nối đúng thiết bị phần cứng, sau đó nạp firmware và mở cửa sổ theo dõi cổng nối tiếp (monitor) theo cấu hình vừa biên dịch. Thay thế cổng ví dụ bằng cổng thực tế trên máy của bạn:

```sh
idf.py -p COM5 flash monitor
```

Trên macOS/Linux, hãy sử dụng cổng dạng `/dev/…` của bạn. Nhấn tổ hợp phím **Ctrl+]** để thoát khỏi trình theo dõi monitor và giải phóng cổng COM trước khi nạp lại lần sau. Khi phân phối tệp ảnh cho công cụ nạp khác, hãy tuân thủ [hướng dẫn phân loại tệp ảnh](../firmware/flashing.md#image-types); không tự suy đoán địa chỉ nạp ứng dụng (offset).

<a name="troubleshooting"></a>

## Thay đổi SDK và khắc phục sự cố trên Windows {#troubleshooting}

**Sau khi thay đổi mã commit của SDK:** cập nhật lại các mô-đun con (submodules) của SDK và chạy lại các tập lệnh cài đặt/kích hoạt tương ứng. Trong thư mục firmware, hãy dọn dẹp bản dựng cũ và chọn lại bo mạch. Lệnh `fullclean` chỉ xóa các tệp đầu ra của quá trình biên dịch; nó không tự sửa lỗi chọn nhầm bo mạch hay dùng lẫn lộn cửa sổ terminal của các bản SDK khác nhau.

```sh
# Trong thư mục SDK
git submodule update --init --recursive
# Kích hoạt lại SDK, sau đó quay về thư mục firmware
idf.py fullclean
```

**Lỗi dòng lệnh quá dài trên Windows:** ngay trong thư mục dự án và cửa sổ terminal ESP-IDF bị lỗi, hãy bật tính năng tệp phản hồi (response files) và biên dịch lại:

```powershell
idf.py -D CMAKE_NINJA_FORCE_RESPONSE_FILE=ON reconfigure
idf.py build
```

Bạn cần chạy lại lệnh cấu hình này sau mỗi lần dùng `idf.py fullclean` hoặc xóa bộ nhớ đệm CMake. Việc di chuyển dự án sang một đường dẫn thư mục ngắn hơn có thể giúp giảm bớt vấn đề về độ dài đường dẫn, nhưng tùy chọn hỗ trợ đường dẫn dài của hệ điều hành Windows không trực tiếp mở rộng giới hạn tổng độ dài dòng lệnh. Không tắt phần mềm diệt virus/bảo mật chỉ để che giấu một lỗi biên dịch chưa xác định được nguyên nhân.

<a name="verify"></a>

## Kiểm tra kết quả hoạt động {#verify}

::: tip Tiêu chí hoàn thành
Quá trình biên dịch thành công, nhật ký khởi động hiển thị đúng phiên bản firmware và định danh bo mạch mong muốn, đồng thời màn hình, âm thanh, cấu hình mạng và cuộc trò chuyện đều hoạt động ổn định. Chỉ riêng việc tạo ra tệp `.bin` chưa đủ chứng minh phần cứng đã được hỗ trợ hoàn chỉnh.
:::

<a name="next"></a>

## Các bước tiếp theo {#next}

Trước khi thay đổi sơ đồ chân GPIO, hãy đọc kỹ mục [Bo mạch tùy chỉnh](./custom-board.md). Nếu gặp sự cố khi thiết bị đang chạy, hãy thu thập đầy đủ thông tin theo hướng dẫn [Khắc phục sự cố](../faq/index.md), sau đó báo cáo kèm theo mã commit của firmware, mã commit của SDK và thông báo lỗi thực tế đầu tiên xuất hiện.
