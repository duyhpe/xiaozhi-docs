---
id: breadboard-camera
title: ESP32-S3 camera breadboard
description: 'Match the camera, color display, audio pins, and firmware as a complete build.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-07
translation:
  status: review
  sourceHash: 7ef83bda1dd98468642460ca93dd840a81009ebffce384b8881ac7e0f1f7faf9
  reviewedAt: '2026-11-15'
---
# ESP32-S3 camera breadboard

This guide covers `bread-compact-wifi-s3cam`, a board configuration that combines a camera, SPI display, and audio. Adding a camera to ordinary S3 OLED/LCD wiring does not make it this build.

<a name="finished-overview"></a>

## See the finished build {#finished-overview}

<figure class="source-figure">

[![Camera breadboard assembly example.](../../public/images/zh/doc-07-image-004.webp)](../../public/images/zh/doc-07-image-004.webp)

<figcaption>Camera breadboard assembly example.</figcaption>
</figure>

<figure class="source-figure">

[![Another view of the prototype; use this page's versioned pin table for signal connections.](../../public/images/zh/doc-07-image-005.webp)](../../public/images/zh/doc-07-image-005.webp)

<figcaption>Another view of the prototype; use this page's versioned pin table for signal connections.</figcaption>
</figure>

<a name="scope"></a>

## Preparation {#scope}

Check S3 memory, camera sensor and pins, display driver and resolution, microphone, and amplifier. This example uses an N16R8 CAM board and OV3660. OV2640, OV5640, and other sensors each need driver, pin-order, and image-capture verification. A matching connector alone does not establish compatibility.

<figure class="source-figure">

[![Camera module and ribbon connector.](../../public/images/zh/doc-07-image-001.webp)](../../public/images/zh/doc-07-image-001.webp)

<figcaption>Camera module and ribbon connector.</figcaption>
</figure>

<figure class="source-figure">

[![LCD module.](../../public/images/zh/doc-06-image-001.webp)](../../public/images/zh/doc-06-image-001.webp)

<figcaption>LCD module.</figcaption>
</figure>

<figure class="source-figure">

[![LCD interface labels.](../../public/images/zh/doc-06-image-002.webp)](../../public/images/zh/doc-06-image-002.webp)

<figcaption>LCD interface labels.</figcaption>
</figure>

<a name="wiring"></a>

## 1. Check the signal table {#wiring}

The following assignments come from the [versioned board configuration](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-wifi-s3cam/config.h). Check power, ribbon orientation, and peripheral enables against the actual module documentation as well.

| Module | Signal → GPIO |
| --- | --- |
| Microphone | WS→1, SCK→2, data input→42 |
| Amplifier | DIN→39, BCLK→40, LRC→41 |
| LCD | CLK→19, MOSI→20, DC→47, RST→21, CS→45, backlight→38 |
| Camera D0–D7 | 11, 9, 8, 10, 12, 18, 17, 16 |
| Camera control | XCLK→15, PCLK→13, VSYNC→6, HREF→7, SIOC→5, SIOD→4 |

The LCD uses GPIO19/20. In particular, check the board circuit when using native USB; do not rewire its data lines arbitrarily. Disconnect power and check every assignment. Do not also apply the ordinary breadboard's GPIO4/5/6 audio wiring.

<a name="wiring-diagram"></a>

### Camera-board signal diagram {#wiring-diagram}

A camera ribbon already wired on the CAM carrier does not need to be replaced with individual wires. First check that the carrier connections match this firmware configuration. The diagram shows audio, LCD, and sensor assignments together for comparison with the assembly photos.

<figure class="source-figure wiring-figure">

[![S3 camera-board audio, display, and camera signal assignments.](../../public/images/en/breadboard-camera-signals-v2.6.0.svg)](../../public/images/en/breadboard-camera-signals-v2.6.0.svg)

<figcaption>Matches the v2.6.0 camera-board configuration. Click to view full size. Check module power and existing CAM-board wiring against the specific hardware documentation.</figcaption>
</figure>

<a name="build"></a>

## 2. Build and test each function {#build}

1. In the [online builder](../firmware/online-builder.md), choose the exact camera board, variant, and display parameters. The directory's current default is ST7789 240×320.
2. Set mirroring/flipping for the camera's installed orientation. If an option is unavailable, do not select another board just to enable it.
3. Follow [Flashing firmware](../firmware/flashing.md), then check the display and audio first.
4. [Connect and bind](../getting-started/wifi-and-binding.md), and verify ordinary conversation.
5. Use the image-recognition feature supported by the current service to check orientation, exposure, sharpness, and the actual tool result.

A successful compile does not establish that the camera works. If `camera init` fails, check logs, sensor type, and power. For a black image, check the ribbon and lens rather than repeatedly trying unidentified binaries.

<a name="materials"></a>

## Wiring video and files {#materials}

The video below demonstrates wiring this hardware. For another sensor, check its driver and ribbon separately. Obtain matching firmware through [Choosing firmware](../firmware/downloads.md).

<SourceMaterials article="DOC-07" />

<a name="verify"></a>

## Verify the result {#verify}

Image content and orientation should be correct. Audio, display, Wi-Fi, and image recognition should work together, without power-related resets or pin conflicts during repeated tests. Reports should include the camera model, board revision, source version, and redacted logs.
