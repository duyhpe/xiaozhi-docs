---
id: sf32lb52-plugin
title: SF32LB52 tutorials and firmware
description: Use JLC's maintained through-hole tutorial and firmware for the matching SF32 hardware.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  JLC tutorial, firmware, and downloads links were checked. This site maintains entry points rather than a separate copy
  of the design and operating instructions.
sourceArticles:
  - DOC-30
prev: false
next: false
translation:
  status: review
  sourceHash: d3aab5491926e10cf6345b29bf172806a494fa84cf666df6ae057ec304ef495a
  reviewedAt: '2026-11-15'
---
# SF32LB52 tutorials and firmware

SF32LB52 XiaoZhi uses separate SF32 firmware. For the through-hole build's circuit, PCB, soldering, enclosure, and panels, use JLC's complete maintained tutorial directly. The linked tutorial is in Chinese.

<a name="scope"></a>

## Tutorials and design files {#scope}

<span id="materials"></span>
<span id="circuit"></span>
<span id="enclosure"></span>

| Goal | Maintained resource |
| --- | --- |
| Build the through-hole version from scratch | [JLC's complete XiaoZhi tutorial](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/) |
| Circuit, PCB, soldering, and enclosure | Choose the relevant chapter and check your hardware revision |
| Schematics, PCB, and enclosure files | [JLC downloads](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/download.html) |

<a name="flash"></a>

## Firmware and use {#flash}

<span id="network"></span>
<span id="verify"></span>

- [Firmware download and flashing tutorial](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/firmware-download.html): use the tools, files, and addresses specified for this hardware.
- [xiaozhi-sf32 source and usage](https://github.com/78/xiaozhi-sf32): check supported hardware and version-specific instructions.
- [SF32 releases](https://github.com/78/xiaozhi-sf32/releases): select a matching board build.

SF32 and ESP32 differ in chip, programming tools, and firmware format. Do not flash ESP32 online-build output or a complete ESP32 image onto this device. Follow the SF32 tutorial and check phone support for network provisioning.

<a name="hardware"></a>

## Identify the hardware {#hardware}

<figure class="source-figure">

[![Through-hole prototype and finished appearance.](../../../public/images/zh/doc-30-image-001.webp)](../../../public/images/zh/doc-30-image-001.webp)

<figcaption>Through-hole prototype and finished appearance.</figcaption>
</figure>

<a name="sources"></a>

## Next steps {#sources}

For an ESP32 breadboard, continue with the [basic S3 guide](../../hardware/breadboard-esp32-s3.md). See [Open hardware](../open-hardware.md) for other community designs.
