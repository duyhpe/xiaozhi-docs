---
id: supported-boards
title: Find supported boards and variants
description: Confirm support using the firmware catalog and build options rather than a product listing.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-31
translation:
  status: review
  sourceHash: 3c0db3016d18da12650654c6f2531614b48039d2dc578499b64beaf811f4dca1
  reviewedAt: '2026-11-15'
---
# Find supported boards and variants

“A product is for sale,” “it uses an S3,” and “the selected firmware supports it” are different claims. Check actual support in the firmware repository and current build catalog.

<a name="scope"></a>

## Identify the hardware first {#scope}

Collect photos of both sides of the board, controller/Flash/PSRAM specifications, display and audio chip models, and the networking method such as Wi-Fi or 4G. Revisions in the same family can use different pins.

<figure class="source-figure">

[![Finished Xmini-C3-family devices: a similar enclosure does not establish the PCB revision or firmware variant.](../../public/images/zh/doc-31-image-003.webp)](../../public/images/zh/doc-31-image-003.webp)

<figcaption>Finished Xmini-C3-family devices: a similar enclosure does not establish the PCB revision or firmware variant.</figcaption>
</figure>

<figure class="source-figure">

[![ESP32-BOX-3 enclosure.](../../public/images/zh/doc-31-image-004.webp)](../../public/images/zh/doc-31-image-004.webp)

<figcaption>ESP32-BOX-3 enclosure.</figcaption>
</figure>

<figure class="source-figure">

[![M5Stack CoreS3. Check the firmware catalog for the support scope.](../../public/images/zh/doc-31-image-012.webp)](../../public/images/zh/doc-31-image-012.webp)

<figcaption>M5Stack CoreS3. Check the firmware catalog for the support scope.</figcaption>
</figure>

<a name="lookup"></a>

## 1. Search the current catalog {#lookup}

- Without an SDK: open the [online builder](../firmware/online-builder.md) and search by target chip, board, and variant.
- With source code: in the [matching version's environment](../development/build-firmware.md), run:

```sh
python scripts/build.py --list-boards
python scripts/build.py --list-boards --json
```

Directory names, board types, and build names serve different purposes. Release files may also include a manufacturer prefix. Match the complete identity, not simply whether a filename contains C3 or S3.

<a name="guides"></a>

## 2. Find the matching guide {#guides}

| Hardware | Guide |
| --- | --- |
| S3 + I2S microphone + OLED | [Basic breadboard](./breadboard-esp32-s3.md) |
| S3 + SPI LCD | [Color-display expansion](./displays/st7789.md) |
| An S3 camera setup | [Camera breadboard](./breadboard-camera.md) |
| C3 + ES8311 | [C3 breadboard](./breadboard-esp32-c3.md) or [Xmini family](./boards/xmini-c3.md) |
| Classic ESP32 | [Classic ESP32 breadboard](./breadboard-esp32.md) |
| SF32LB52 | [Separate SF32 plugin project](../community/projects/sf32lb52-plugin.md); do not use ESP32 firmware |

A board without a dedicated page here may still be supported. Check the [versioned boards directory](https://github.com/78/xiaozhi-esp32/tree/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards) and its board README.

<a name="firmware"></a>

## 3. Choose firmware {#firmware}

Once the exact variant is known, prefer [online building and flashing](../firmware/online-builder.md). Use [official downloads](../firmware/downloads.md) for an offline installation or fixed version. Changed pins need a [separate board identity](../development/custom-board.md), not the OTA identity of a standard board.

A discontinued product, stock shortage, or dead seller link does not establish that firmware support has ended. Maintain purchasing channels separately; prices and stock are determined by current seller pages.

::: tip Success checks
The physical device, build catalog, variant, memory, and peripherals can be matched exactly, without selecting the closest-looking firmware name.
:::

<a name="sources"></a>

## Next steps {#sources}

After recognizing a device from a photo, still check its revision and build variant. Continue with [hardware selection](./choosing-hardware.md) before purchasing, or [flashing](../firmware/flashing.md) after finding firmware.
