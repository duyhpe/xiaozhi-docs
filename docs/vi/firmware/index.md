---
id: firmware
title: Firmware and flashing
description: 'Select matching firmware, build online, and install or update your device.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
translation:
  status: review
  sourceHash: 775ddc324cf11e20e1b5d976b1807c171d9defad58f4e25b6d4ab70c165eb8e4
  reviewedAt: '2026-11-15'
---
# Firmware and flashing

Identify the chip, board variant, and image type before installing or updating. Historical releases are archived separately. For most devices, including breadboards, start with [online building and flashing](https://xiaozhi.me/console/firmware-builder). For devices without an exposed USB download interface, follow the board instructions first.

<a name="guides"></a>

## Choose a guide {#guides}

| Guide | What it covers |
| --- | --- |
| [Online building and browser flashing](./online-builder.md) | Build for your board and flash through a browser without installing ESP-IDF. |
| [Choose and download firmware](./downloads.md) | Match chip, board, and variant, distinguishing current installation from legacy maintenance. |
| [Flash and update](./flashing.md) | Identify image types, use browser or offline flashing, and check startup. |
| [v2.6.0 release](./releases/v2.6.0.md) | Find packages for breadboards, JLC S3, and other variants. |
| [Legacy v1.9.4](./releases/v1.9.4.md) | Match product and chip when maintaining v1 devices. |

<a name="next"></a>

## Reading and feedback {#next}

These guides are open for community review. Report problems through the page's feedback link with firmware version, board, and reproducible steps.
