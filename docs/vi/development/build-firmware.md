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


## 2. Get firmware source {#source}

Return to your project workspace and use the fixed release tag:

```sh
git clone --branch v2.6.0 https://github.com/78/xiaozhi-esp32.git
cd xiaozhi-esp32
git describe --tags --always
```

Checking out tag `v2.6.0` normally leaves a detached HEAD. Create your own working branch before saving source changes.

<a name="build"></a>

## 3. List boards and build {#build}

In the firmware repository root, with ESP-IDF activated, run:

```sh
python scripts/build.py --list-boards
python scripts/build.py --list-languages
```

Identify your board directory and build variant. This command applies only to the [basic S3 with a 128×32 OLED](../hardware/breadboard-esp32-s3.md):

```sh
python scripts/build.py bread-compact-wifi --name bread-compact-wifi --language zh-CN
```

This example builds Simplified Chinese device resources. For English resources, select `en-US` from the language list and use `--language en-US` instead. Website language and device firmware language are separate choices.

The script uses the board's `config.json` to select the target and variant, then generates artifacts. For another board, use its directory and variant. Do not change a sample board's pins while retaining its standard firmware identity.

To choose a wake phrase, resolve components and list available models first:

```sh
idf.py reconfigure
python scripts/build.py --list-wake-words
```

`--wake-word` accepts compatible model names, `nihaoxiaozhi`, or `disabled`. The model must match chip and memory resources. See the [versioned custom-board guide](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/custom-board.md) for full arguments and capabilities.

<a name="flash"></a>

## 4. Check artifacts and flash {#flash}

After a successful build, record version and variant. The default complete image is `build/merged-binary.bin`. Add `--zip` to the build command for a distribution package in `releases/`.

With the matching device connected, flash and monitor using this build's configuration. Replace the example port with your own:

```sh
idf.py -p COM5 flash monitor
```

On macOS/Linux, use your `/dev/…` port. Exit the monitor with **Ctrl+]** and release the port before reflashing. When distributing an image for another tool, follow [image-type instructions](../firmware/flashing.md#image-types); do not guess application offsets.

<a name="troubleshooting"></a>

## SDK changes and Windows troubleshooting {#troubleshooting}

**After changing the SDK commit:** update SDK submodules and rerun the relevant install/activation scripts. In the firmware directory, clean the build and reselect the board. `fullclean` cleans build output; it does not fix the wrong board or mixed SDK terminals.

```sh
# In the SDK directory
git submodule update --init --recursive
# Reactivate the SDK, then return to the firmware directory
idf.py fullclean
```

**Windows command line too long:** in the failing project and ESP-IDF terminal, enable response files and rebuild:

```powershell
idf.py -D CMAKE_NINJA_FORCE_RESPONSE_FILE=ON reconfigure
idf.py build
```

Enable it again after clearing CMake's cache. A shorter project path may help path problems, but the system's long-path option does not directly increase the whole command-line length limit. Do not disable security software to hide an undiagnosed build error.

<a name="verify"></a>

## Verify the result {#verify}

::: tip Completion check
The build succeeds, startup logs show the intended firmware and board, and display, audio, provisioning, and a conversation work. Generating a `.bin` alone does not verify hardware support.
:::

<a name="next"></a>

## Next steps {#next}

Before changing pins, read [Custom boards](./custom-board.md). For runtime problems, collect details using [Troubleshooting](../faq/index.md), then report firmware and SDK commits and the first actual error.
