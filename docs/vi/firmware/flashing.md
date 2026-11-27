---
id: flashing
title: Flash and upgrade firmware
description: 'Identify the image type, flash through the browser or offline, and verify startup.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Checked against the Console partition-flashing implementation and esptool documentation. Browser, driver, and
  layout-migration behavior still need hardware verification.
translation:
  status: review
  sourceHash: 85922489a3d0aaf062389cad6245ce9597e7f31a6b53d0264b2eac7d6b63d48a
  reviewedAt: '2026-11-15'
---
# Flash and upgrade firmware

Before flashing, confirm which board you are writing to, which image type you have, and whether the operation can change existing settings. **Prefer the [XiaoZhi online builder and flasher](https://xiaozhi.me/console/firmware-builder)**: it supports most devices, including breadboard builds, without a source-development environment.

<a name="scope"></a>

## Choose your path {#scope}

| Situation | Recommended path |
| --- | --- |
| A blank board or a fresh installation | [Build and flash online](https://xiaozhi.me/console/firmware-builder); if there is no usable USB download connection, follow the board's instructions |
| Working firmware, updating the same board | Read the release's upgrade notes first; use compatible OTA or web flashing |
| Moving from an older partition layout or changing board identity | Check the release notes and prepare to provision again; install a merged image manually when required |
| Testing source changes | Follow [local builds](../development/build-firmware.md) and use `idf.py flash monitor` |

Record the firmware version, board ID, Flash/PSRAM, display specifications, and current provisioning state. Retain agent settings in your Console account; reflashing firmware and unbinding an account are different operations.

<a name="prepare"></a>

## Before you begin {#prepare}

- A Windows, macOS, or Linux computer and a USB cable that supports data.
- For web flashing, desktop Chrome or Edge with Web Serial support, opening the official Console over HTTPS. Loading a web page does not establish serial support. Phones, Safari, and Firefox are outside this guide's browser-flashing path.
- Identify the board's native USB and USB-UART interfaces using its documentation.
- Close serial monitors, IDE connections, and other flasher pages using the same port. Obtain drivers from the chip vendor or board maker.

::: info Does any USB connector support web flashing?
No. Confirm that it connects to the chip's download interface rather than supplying power only. Some Tudouzi (`tudouzi`), KevinBox2, and other hardware revisions do not expose the required USB pins. Use the download interface, external tool, or running-firmware update method documented by the board maintainer; do not infer the method from the enclosure or model name.
:::

<a name="image-types"></a>

## 1. Identify the image type {#image-types}

| File type | Use | Effect on settings |
| --- | --- | --- |
| A complete merged image, such as `merged-binary.bin` | Install at the starting address specified by the package; the S3 example here uses `0x0` | A continuous write can cover NVS; Wi-Fi settings are not guaranteed to survive |
| Application/OTA image | Use a matching OTA or development workflow | Do not treat it as a complete image and write it at `0x0` |
| Multiple build files | Use the generated flash arguments or `idf.py flash` | Each file has its own offset; do not guess addresses |

NVS stores settings such as Wi-Fi credentials. The current Console web flasher parses the merged image and writes individual partitions, skipping `nvs` and `nvs_keys`. New firmware may still reinitialize settings when layouts change. Writing the same complete file continuously with an offline tool has different behavior.

<a name="web"></a>

## 2. Flash in the browser {#web}

1. Select and build the board in the [online builder](./online-builder.md), then open flashing for a successful task.
2. Recheck the chip, board variant, and language in the task details. Connect the device with a data cable.
3. Start the connection/flashing operation and select the matching port in the browser dialog. If unsure, cancel and observe which port appears when you reconnect the device.
4. If download mode is not active, follow the steps below and reconnect. Keep the cable stable once flashing starts, and wait for completion.
5. Close the connection, press RESET/EN or power-cycle the device, and check its startup prompts.

If the page reports a chip mismatch or invalid partition table, check the firmware. Do not bypass validation by changing addresses or erasing the entire chip.

<a name="download-mode"></a>

### Enter download mode manually {#download-mode}

For a typical ESP32-S3 board with BOOT and RESET/EN buttons: hold **BOOT** → briefly press **RESET/EN** → release **BOOT**, then select the newly appearing port. Some native USB ports change names between application and ROM modes.

This differs from briefly pressing BOOT after startup to enter provisioning. Other chips, finished devices, or special boot circuits require their own board instructions.

<figure class="source-figure">

[![Web Serial permission dialog: select the board port. If unsure, cancel, unplug and reconnect the board, then authorize again.](../../public/images/zh/doc-18-image-011.webp)](../../public/images/zh/doc-18-image-011.webp)

<figcaption>Web Serial permission dialog: select the board port. If unsure, cancel, unplug and reconnect the board, then authorize again.</figcaption>
</figure>

<a name="offline"></a>

## 3. Flash a merged image offline {#offline}

For an offline installation, obtain a matching package from [official downloads](./downloads.md), extract it, and confirm its image type. These commands apply only to **an ESP32-S3 complete merged image confirmed for starting address 0x0**.

Install esptool 5.x in a separate Python environment:

```sh
python -m pip install "esptool>=5,<6"
python -m esptool version
```

Change to the image directory and replace `COM5` with your own port:

```sh
python -m esptool --chip esp32s3 --port COM5 write-flash 0x0 merged-binary.bin
```

macOS/Linux ports commonly resemble `/dev/cu.usbmodem…` or `/dev/ttyACM0`. If your environment has no `python` command, use its `python3`. The example port is not your device's actual port.

Wait for verification to finish, then restart. A normal installation does not require a full-chip erase first. Erase only when release instructions or a diagnosed problem require it; erasing clears device settings. You can also use [Espressif's official download tool](https://www.espressif.com/en/support/download/other-tools); the same image-address and settings considerations apply.

<a name="windows-tool"></a>

### Windows graphical tool {#windows-tool}

To avoid the command line, obtain Flash Download Tool from the Espressif download page above and follow the [tool guide](https://docs.espressif.com/projects/esp-test-tools/en/latest/esp32s3/production_stage/tools/flash_download_tool.html). The screenshots show version 3.9.7.

1. For this S3 example, select ESP32-S3, Develop, and UART. Check your actual chip and tool version.
2. Add the confirmed merged image, enable its row, and enter the package's write address. The merged S3 example here uses `0x0`.
3. In older tools, enable **DoNotChgBin** to preserve the image. Do not copy changes to SPI frequency or mode from a screenshot. Version 3.9.10 and later restrict these options according to the firmware build configuration by default.
4. Select the device port and start writing. Wait for completion. Other chips, multi-file packages, and application images must not blindly use this example's address.

<figure class="source-figure">

[![Flash Download Tool 3.9.7 startup options: ESP32-S3 / Develop / UART in this example.](../../public/images/zh/doc-08-image-003.webp)](../../public/images/zh/doc-08-image-003.webp)

<figcaption>Flash Download Tool 3.9.7 startup options: ESP32-S3 / Develop / UART in this example.</figcaption>
</figure>

<figure class="source-figure">

[![Select the merged image and write address. This example applies only to a complete S3 image confirmed for address 0x0.](../../public/images/zh/doc-08-image-005.webp)](../../public/images/zh/doc-08-image-005.webp)

<figcaption>Select the merged image and write address. This example applies only to a complete S3 image confirmed for address 0x0.</figcaption>
</figure>

<figure class="source-figure">

[![Restart after FINISH, then verify the running version and functions.](../../public/images/zh/doc-08-image-009.webp)](../../public/images/zh/doc-08-image-009.webp)

<figcaption>Restart after FINISH, then verify the running version and functions.</figcaption>
</figure>

<a name="verify"></a>

## Check that it worked {#verify}

::: tip Success checks
Writing and verification succeed. After restart, the expected board firmware and version run, with the expected display and startup sound. You can then [provision and bind](../getting-started/wifi-and-binding.md), or reconnect automatically to the saved network.
:::

<a name="troubleshooting"></a>

## Troubleshooting {#troubleshooting}

| Symptom | Next step |
| --- | --- |
| No serial port | Try another data cable/USB port, check drivers and download mode, and see [serial troubleshooting](../faq/index.md#serial) |
| Connection timeout or interruption | Close other port users and re-enter download mode; if needed, lower the transfer speed and check power |
| Flashing succeeds but the device keeps rebooting | Save startup logs and check the chip, memory, partitions, and board identity; do not keep trying random firmware |
| Wi-Fi needs provisioning after an upgrade | Check whether a merged write overwrote settings, NVS was erased, or the partition layout changed |

<a name="next"></a>

## Next steps {#next}

Continue with [network provisioning and binding](../getting-started/wifi-and-binding.md). Command syntax and image offsets are documented in the [esptool write guide](https://docs.espressif.com/projects/esptool/en/latest/esp32s3/esptool/basic-commands.html).
