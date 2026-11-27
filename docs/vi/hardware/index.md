---
id: hardware
title: Hardware and wiring
description: 'Start with a fixed basic setup, then understand power and audio interfaces before expanding.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
translation:
  status: review
  sourceHash: cf39f450a21caa3da9efa0167ad8a032f06d90870b10de6ad8948c725c549532
  reviewedAt: '2026-11-15'
---
# Hardware and wiring

Choose a compatible controller, audio, and display setup, then wire it for the exact board. A versioned GPIO table takes precedence over the wire colors and positions in an older photo. Check every connection with power disconnected.

<a name="guides"></a>

## Choose a guide {#guides}

| Guide | Contents |
| --- | --- |
| [Choose your first hardware](./choosing-hardware.md) | Select by firmware support, interfaces, voltage, and documentation rather than old prices or product titles |
| [Supported boards and variants](./supported-boards.md) | Confirm support through the firmware catalog and build options, not whether a product is still for sale |
| [Basic ESP32-S3 breadboard](./breadboard-esp32-s3.md) | Build a working voice device with a fixed microphone, amplifier, and OLED setup |
| [ESP32-C3 breadboard](./breadboard-esp32-c3.md) | Use the correct codec module and pins instead of mixing C3 audio with the S3 digital-microphone setup |
| [Classic ESP32 breadboard](./breadboard-esp32.md) | Understand wiring, features, and firmware limits on the resource-constrained ESP32 |
| [ST7789 color display](./displays/st7789.md) | Check the display interface, pins, resolution, and build options |
| [4G breadboard](./breadboard-4g.md) | ML307R/NT26K modules, 44/42-pin wiring, and finished builds |
| [S3 camera breadboard](./breadboard-camera.md) | Match camera, color-display, and audio pins with the firmware |
| [Xmini-C3 and V3](./boards/xmini-c3.md) | Identify the revision before choosing firmware, power, and operating steps |
| [External ASR wake module](./external-wake-module.md) | Choose onboard or external wake detection and check supply, trigger, and configuration |
| [Battery power and charging](./battery-power.md) | Start with a USB power bank before deciding whether custom battery circuitry is needed |
| [Speakers, headphones, and audio outputs](./audio-output.md) | Distinguish amplifier, headphone, and line outputs |
| [Hardware design considerations](./design-guidelines.md) | Assess power, acoustics, enclosure, and testability, not only the controller model |

<a name="next"></a>

## Reading and feedback {#next}

The guides are open for community review. Use the feedback link at the bottom of a page and include the firmware version, board, and reproducible steps.
