---
id: choosing-hardware
title: Choose hardware for XiaoZhi
description: 'Choose by firmware support, interfaces, voltage, and documentation, not old prices or product titles.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-10
translation:
  status: review
  sourceHash: 0f692bd58c8825aad2639f21ddb1d8db5b9488d82b43f05f6f80744af2f98a4d
  reviewedAt: '2026-11-15'
---
# Choose hardware for XiaoZhi

Choose a complete setup with clear firmware support and wiring instructions before buying parts. A low price, similar appearance, or matching chip name does not establish compatibility.

<a name="scope"></a>

## Start with your use case {#scope}

| Use case | What to check |
| --- | --- |
| Your first voice device | The [basic S3 breadboard](./breadboard-esp32-s3.md), with a fixed set of parts and firmware |
| A smaller, lower-cost device | [C3 + ES8311](./breadboard-esp32-c3.md); do not mix in the S3 audio modules |
| A display or camera | Hardware with a matching [color display](./displays/st7789.md) or [camera](./breadboard-camera.md) adaptation |
| A custom product | [Hardware design considerations](./design-guidelines.md) and separately maintained board support |

<a name="kits"></a>

## Choose a setup, then follow its guide {#kits}

- **Finished device:** check its exact model and firmware in [supported boards](./supported-boards.md). You do not need an additional set of breadboard parts for an existing finished device.
- **Basic breadboard:** start with the [complete parts list and photos](./breadboard-esp32-s3.md#materials), covering the controller, microphone, amplifier, speaker, wires, breadboards, and display.
- **Small C3 or an existing classic ESP32:** use the [C3](./breadboard-esp32-c3.md) or [classic ESP32](./breadboard-esp32.md) guide, with its own modules, wiring, and firmware.
- **Mobile networking:** read the [4G modules, power, and wiring guide](./breadboard-4g.md). For occasional trips, first consider whether a phone's Wi-Fi hotspot meets your needs.

<a name="checklist"></a>

## Before buying {#checklist}

- **Controller and memory:** complete module model, Flash/PSRAM capacity and interface, and current firmware support.
- **Microphone/codec:** I2S, PDM, or analog interface; signal direction, supply, and channel selection.
- **Amplifier:** input format, allowed voltage, load impedance, enable behavior, and default gain circuit.
- **Display:** driver, resolution, interface, address, pins, backlight driver, and module voltage.
- **Power and cables:** USB data support, board power paths, peak load, and reliable connections.

MAX98357A and B are not universally interchangeable: their digital input formats differ. Speakers, headphones, and powered speakers are also different output loads. See [audio outputs](./audio-output.md).

<a name="verify"></a>

## After the parts arrive {#verify}

Check that markings, packages, headers, and documentation agree, then verify wiring with power disconnected. First test the basic device's startup, display, recording/playback, and conversation. Test each additional module separately.

A seller's color-display photo does not establish the specifications of the display you received. A board's 5V header is not automatically a battery-charging input.

<a name="sources"></a>

## Suppliers and documentation {#sources}

Part-identification photos and exact purchasing specifications are maintained in the matching construction guide, rather than listing unrelated modules here as a complete setup. Historical prices, stock levels, and claims about seller quality are not current promises. When changing suppliers, preserve the same electrical specifications instead of only replacing shopping links. See [boards and variants](./supported-boards.md) for support.
