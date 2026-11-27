---
id: online-builder
title: Build and flash firmware online
description: Generate matching firmware and write it through your browser without installing ESP-IDF.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Production Console flashing was tested on one LCKFB LiChuang ESP32-S3. Progress/success screens and startup logs
  confirmed 2.6.0, network reconnection, and idle. Other boards and physical display, audio, and conversation remain
  unverified.
translation:
  status: review
  sourceHash: 6d3020556e1d28f44079301efc8d9e75f007b30dbb2f0cda4fd25de5646ceeae
  reviewedAt: '2026-11-15'
---
# Build and flash firmware online

Select hardware and features in the XiaoZhi Console, wait for the server to generate firmware, then download it or flash directly. Supported boards can start here without installing ESP-IDF.

<a name="scope"></a>

## Before you begin {#scope}

Identify the chip, board ID, build variant, display, and memory. If unsure, start with [firmware selection](./downloads.md#identify). Web flashing also requires desktop Chrome/Edge with Web Serial, a USB data cable, and the appropriate driver. Most devices and breadboard builds work; some Tudouzi (`tudouzi`), KevinBox2, and other revisions lack exposed USB download pins. Follow their [board download-interface requirements](./flashing.md#prepare).

Only boards in the current build catalog can be selected directly. For changed pins or unlisted hardware, follow [custom board support](../development/custom-board.md) first.

<a name="open"></a>

## 1. Open the firmware builder {#open}

1. Sign in to the [XiaoZhi Console](https://xiaozhi.me/console/).
2. Open **Firmware builder**, or go directly to the [online builder](https://xiaozhi.me/console/firmware-builder), then create a build.
3. Check the **firmware version** and **source commit** at the top of the dialog. Record them with the task; they are needed for reproducible issue reports.

Ordinary signed-in users can access this feature. Task allowances, available versions, and the hardware catalog depend on the current page; a default allowance seen once is not a permanent entitlement.

<a name="configure"></a>

## 2. Choose hardware and features {#configure}

| Setting | How to choose |
| --- | --- |
| Target chip and board | Match the physical device; similar names are not enough |
| Board/build variant | Distinguish display resolution, communication method, and hardware revisions |
| Firmware language | The device interface and spoken prompts, separate from the website language |
| Wake word | Choose an available option for the board or disable it; chips do not all support the same models |
| Display, camera, audio | Change only supported options; a missing switch cannot be enabled by pretending the device is another board |
| Provisioning | Select a hotspot or BluFi path supported by the hardware and firmware |

For the basic OLED breadboard, choose **Bread Compact Wi-Fi**, then verify the board ID and display: `bread-compact-wifi` for 128×32 and `bread-compact-wifi-128x64` for 128×64. Do not choose a different board just to reveal camera options.

AEC needs suitable audio circuitry and a reference signal. A build option alone cannot supply missing hardware.

<span id="historical-video"></span>

The authentic Console screenshots below show the Chinese interface. Use the settings described here to identify the corresponding controls in your selected interface language.

<figure class="source-figure">

[![Basic online-build settings: chip, board, display, language, and wake word.](../../public/images/zh/console-builder-basic-2026-11-14.png)](../../public/images/zh/console-builder-basic-2026-11-14.png)

<figcaption>Breadboard configuration example. Check the board ID and display before choosing a language and wake word. Versions, options, and daily limits are determined by the live page.</figcaption>
</figure>

Open the **audio and network** tab to review the options provided for the board. Unchanged settings use board defaults. A disabled **display and camera** tab is normal for some boards.

<figure class="source-figure">

[![Wi-Fi provisioning options in the audio/network tab.](../../public/images/zh/console-builder-network-2026-11-14.png)](../../public/images/zh/console-builder-network-2026-11-14.png)

<figcaption>Provisioning options for this breadboard build. Available settings depend on the board; do not copy another device's switches.</figcaption>
</figure>

An online build and the [official v2.6.0 release package](./releases/v2.6.0.md) can show the same “2.6.0” version while using different source commits. To reproduce a build, retain the commit and parameters as well as the version number.

<a name="build"></a>

## 3. Submit and wait for the build {#build}

1. Review the configuration and start the firmware build.
2. Keep the task record and watch stages such as queuing, source preparation, dependency resolution, compilation, and upload.
3. Use Cancel if you need to stop. Do not submit repeated tasks merely because no new log line has appeared yet.
4. After success, save the version, source commit, board variant, and selected options from the details.

Task history has no universal Retry button. Read the error and logs, fix the parameters or wait for a maintainer's fix, then create a new task if needed. Identical tasks may reuse cached results; a quick completion does not mean the build is untraceable.

<figure class="source-figure">

[![Completed build task with flash and download actions.](../../public/images/zh/console-builder-history-2026-11-14.png)](../../public/images/zh/console-builder-history-2026-11-14.png)

<figcaption>A completed LCKFB LiChuang ESP32-S3 task. Confirm your board and target version before using Flash or Download. Its duration is not a benchmark for other tasks.</figcaption>
</figure>

<a name="flash"></a>

## 4. Download or flash {#flash}

**Keep a download:** save the merged image and task information. For offline tools, follow the [image-type guidance](./flashing.md#image-types). An application/OTA artifact must not be treated as a complete image and written at `0x0`.

**Flash in the browser:**

1. Find the target task and select its Flash action.
2. In the connection/flashing dialog, verify the board type, board ID, chip, commit, and parameters.
3. Connect the matching device with a USB data cable. [Enter download mode](./flashing.md#download-mode) if necessary and close debugging tools using that port.
4. Start the connection and flashing operation, choose the board port in the browser chooser, and connect. Authorizing the port continues into flashing; this is not only a port preview.
5. Wait for download, validation, and writing to finish, then restart as prompted.

<figure class="source-figure">

[![Connect and flash: check the LiChuang S3 board, commit, and build options.](../../public/images/zh/console-flash-confirm-2026-11-14.png)](../../public/images/zh/console-flash-confirm-2026-11-14.png)

<figcaption>Final pre-flash check. This task is for the LiChuang S3; a breadboard user should see their own board identity before connecting a port and writing.</figcaption>
</figure>

::: info Will device settings survive?
The current web flasher writes partitions and skips NVS, but this does not guarantee that old and new NVS layouts match. Ordinary updates with the same layout can generally retain Wi-Fi. Prepare to provision again for layout changes, full-chip erases, or continuous offline writes of the merged file.
:::

Do not unplug the device, close the connection, or let the computer sleep during flashing. If chip/image validation fails, check the hardware rather than bypassing validation.

<a name="serial-port"></a>

### Choose the correct port {#serial-port}

Select the USB serial port that appears when the board is connected, then choose **Connect** in the system dialog. A computer may have multiple ESP32 devices or Bluetooth serial ports. Identify the target by unplug/replug behavior or device information, not the port number in a screenshot.

<figure class="source-figure">

[![macOS Chrome serial chooser with the target USB JTAG/serial debug unit selected.](../../public/images/zh/console-serial-picker-macos-2026-11-14.jpg)](../../public/images/zh/console-serial-picker-macos-2026-11-14.jpg)

<figcaption>macOS Chrome example: select the target USB port, then Connect. Dialog language follows the browser; port names and numbers vary.</figcaption>
</figure>

<details>
<summary>Windows port chooser example</summary>

<figure class="source-figure">

[![Browser serial authorization: choose the port that appears when the board is plugged in. COM numbers vary by computer.](../../public/images/zh/doc-18-image-011.webp)](../../public/images/zh/doc-18-image-011.webp)

<figcaption>Browser serial authorization: choose the port that appears when the board is plugged in. COM numbers vary by computer.</figcaption>
</figure>

</details>

<a name="flash-progress"></a>

### Watch partition progress {#flash-progress}

After connection, the page displays the current partition and overall progress. Keep the page and USB connection open until the final result. A completed task in build history does not mean that the device has already been flashed.

<figure class="source-figure">

[![LiChuang ESP32-S3 writing the ota_0 partition at 25%.](../../public/images/zh/console-flash-progress-2026-11-14.jpg)](../../public/images/zh/console-flash-progress-2026-11-14.jpg)

<figcaption>Actual partition-write progress. The partition name and percentage change during the operation; 25% is only the moment captured here.</figcaption>
</figure>

<a name="flash-success"></a>

### Wait for success and check restart {#flash-success}

The final message that flashing has completed and the device is restarting confirms the browser's write flow succeeded. Wait for restart, or restart manually if instructed. Then check the display, sound, and network connection.

<figure class="source-figure">

[![Successful web flash, with a green check mark and device restart message.](../../public/images/zh/console-flash-success-2026-11-14.jpg)](../../public/images/zh/console-flash-success-2026-11-14.jpg)

<figcaption>Successful write. Still verify startup and basic device functions; a completed build task alone does not establish a successful device installation.</figcaption>
</figure>

<a name="verify"></a>

## Check that it worked {#verify}

::: tip Success checks
The build task is complete, the web flasher reports success, and the firmware can be traced to its build information. After restart, display/audio match the hardware, networking works, and the device completes a conversation.
:::

<a name="troubleshooting"></a>

## Troubleshooting {#troubleshooting}

| Symptom | Action |
| --- | --- |
| Board not listed | Confirm the exact model. Custom wiring needs a separate adaptation, not a similar-looking board |
| Disabled setting or missing switch | Check the selected board's support scope; hardware does not all support the same features |
| Daily allowance reached | Follow the page's message. Deleting history does not necessarily restore an allowance |
| Queue, failure, or timeout | Save the task ID, version, and error summary; redact sensitive data before sharing a full downloaded log |
| Browser unsupported | Use desktop Chrome/Edge over HTTPS and check [flashing preparation](./flashing.md#prepare) |
| Download unavailable | Artifacts have a retention period. Save important files and create a new task if needed |

<a name="next"></a>

## Next steps {#next}

For a new device, continue with [network provisioning and binding](../getting-started/wifi-and-binding.md). For source changes, use [local builds](../development/build-firmware.md).
