---
id: breadboard-4g
title: 'S3 breadboard 4G: ML307R and NT26K'
description: 'Check ML307R and NT26K wiring, firmware signals, and power separately.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Applies to firmware v2.6.0. Carrier-board power, exact module revisions, and complete-device stability still need
  hardware tests.
sourceArticles:
  - DOC-05
translation:
  status: review
  sourceHash: fc5ce9aa53964183092ac34906300d11586c977259a80956ecdc4d6a485c228c
  reviewedAt: '2026-11-15'
---
# S3 breadboard 4G: ML307R and NT26K

Complete [basic S3](./breadboard-esp32-s3.md) audio, display, and buttons before adding cellular networking. ML307R and NT26K use separate board implementations; neither is simply a renamed Wi-Fi build.

<a name="scope"></a>

## Before starting: module, SIM, and power {#scope}

Check the complete carrier-board model, firmware/AT version, antenna, SIM, and mobile-data service. The same modem chip does not guarantee the same carrier-board power input, enables, or UART voltage. Confirm that carrier's official electrical documentation and startup procedure before applying power.

::: warning Confirm module power first
The physical layouts below help locate headers and position modules. **The ML307R connection to an exposed LDO solder point and the NT26K connection to the development board's 3V3 rail are not general power instructions.** Design power around the actual carrier's input range, peak current, and startup requirements. With a separate supply, share GND with ESP32; do not feed battery/external power into unidentified power nodes simultaneously.
:::

The layouts connect MAX98357A VIN to a 3V3 branch. If using the basic S3 build's USB 5V amplifier supply, keep the complete audio-power arrangement consistent with that build. SD/GAIN links depend on the actual amplifier module's operating settings.

<a name="signals"></a>

## Firmware signal connections {#signals}

<figure class="source-figure wiring-figure">

[![ML307R and NT26K UART, handshake, and common-ground connections.](../../public/images/en/breadboard-4g-signals-v2.6.0.svg)](../../public/images/en/breadboard-4g-signals-v2.6.0.svg)

<figcaption>Signal connections for firmware v2.6.0; this is not a physical header layout.</figcaption>
</figure>

GPIO11 is the ESP32 receive pin and connects to module TX. GPIO12 is the ESP32 transmit pin and connects to module RX. NT26K additionally uses GPIO9 for MRDY/DTR and GPIO10 for SRDY/RI. Audio GPIO4/5/6 and GPIO7/15/16, and OLED GPIO41/42, retain the basic S3 signal assignments.

<a name="ml307"></a>

## ML307R: two controller-board layouts {#ml307}

ML307R carriers differ by supplier. Use these pictures to identify models and interfaces. Check current electrical documentation, antenna, SIM, and AT firmware when selecting one; pictured prices and data plans are not purchasing guidance.

<div class="module-grid">

<figure class="source-figure">

[![One ML307R carrier and its product listing.](../../public/images/zh/doc-05-image-017.webp)](../../public/images/zh/doc-05-image-017.webp)

<figcaption>One ML307R carrier and its product listing. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![Another ML307R mini carrier.](../../public/images/zh/doc-05-image-018.webp)](../../public/images/zh/doc-05-image-018.webp)

<figcaption>Another ML307R mini carrier. Click to view full size.</figcaption>
</figure>

</div>

<a name="ml307-44"></a>

### Espressif standard board: 44 pins {#ml307-44}

<figure class="source-figure wiring-figure">

[![ML307R with the 44-pin controller. Use the signal assignments, but do not copy the old LDO power branch.](../../public/images/zh/doc-05-image-021.jpg)](../../public/images/zh/doc-05-image-021.jpg)

<figcaption>ML307R with the 44-pin controller. Use the signal assignments, but do not copy the old LDO power branch. Click to view full size.</figcaption>
</figure>

<a name="ml307-42"></a>

### GOOUUU board: 42 pins {#ml307-42}

<figure class="source-figure wiring-figure">

[![ML307R with the 42-pin controller. Header positions differ; UART still uses GPIO11/12.](../../public/images/zh/doc-05-image-026.jpg)](../../public/images/zh/doc-05-image-026.jpg)

<figcaption>ML307R with the 42-pin controller. Header positions differ; UART still uses GPIO11/12. Click to view full size.</figcaption>
</figure>

<a name="ml307-results"></a>

### Finished build and hidden wiring {#ml307-results}

<div class="module-grid">

<figure class="source-figure">

[![Completed ML307R extension.](../../public/images/zh/doc-05-image-038.jpg)](../../public/images/zh/doc-05-image-038.jpg)

<figcaption>Completed ML307R extension. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![ML307R wiring with peripheral modules moved aside.](../../public/images/zh/doc-05-image-039.jpg)](../../public/images/zh/doc-05-image-039.jpg)

<figcaption>ML307R wiring with peripheral modules moved aside. Click to view full size.</figcaption>
</figure>

</div>

<details>
<summary>Identifying the LDO connection point; not a power-connection step</summary>

<figure class="source-figure">

[![Close-up of the LDO connection point. This guide does not draw power from that solder point.](../../public/images/zh/doc-05-image-025.webp)](../../public/images/zh/doc-05-image-025.webp)

<figcaption>Close-up of the LDO connection point. This guide does not draw power from that solder point. Click to view full size.</figcaption>
</figure>

</details>

<a name="nt26"></a>

## NT26K: two controller-board layouts {#nt26}

<figure class="source-figure">

[![NT26K carrier pin layout. Check signals and power interfaces against the actual revision.](../../public/images/zh/doc-05-image-019.webp)](../../public/images/zh/doc-05-image-019.webp)

<figcaption>NT26K carrier pin layout. Check signals and power interfaces against the actual revision. Click to view full size.</figcaption>
</figure>

<a name="nt26-44"></a>

### Espressif standard board: 44 pins {#nt26-44}

<figure class="source-figure wiring-figure">

[![NT26K with the 44-pin controller. Check GPIO9/10/11/12 against the configuration and review the pictured 3V3 power arrangement separately.](../../public/images/zh/doc-05-image-031.webp)](../../public/images/zh/doc-05-image-031.webp)

<figcaption>NT26K with the 44-pin controller. Check GPIO9/10/11/12 against the configuration and review the pictured 3V3 power arrangement separately. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![NT26K prototype with the standard controller.](../../public/images/zh/doc-05-image-032.webp)](../../public/images/zh/doc-05-image-032.webp)

<figcaption>NT26K prototype with the standard controller. Click to view full size.</figcaption>
</figure>

<a name="nt26-42"></a>

### GOOUUU board: 42 pins {#nt26-42}

<figure class="source-figure wiring-figure">

[![NT26K with the 42-pin controller. ML307R-style two-wire UART wiring is not the complete NT26K connection.](../../public/images/zh/doc-05-image-033.webp)](../../public/images/zh/doc-05-image-033.webp)

<figcaption>NT26K with the 42-pin controller. ML307R-style two-wire UART wiring is not the complete NT26K connection. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![NT26K prototype with the GOOUUU controller.](../../public/images/zh/doc-05-image-034.webp)](../../public/images/zh/doc-05-image-034.webp)

<figcaption>NT26K prototype with the GOOUUU controller. Click to view full size.</figcaption>
</figure>

<a name="build"></a>

## Select firmware and test in stages {#build}

| Module | Firmware board | v2.6.0 build options |
| --- | --- | --- |
| ML307R | `bread-compact-ml307` | 128×32; also `bread-compact-ml307-128x64` |
| NT26K | `bread-compact-nt26` | Default SSD1306 128×32 |

Refer to the [ML307 configuration](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-ml307/config.h), [ML307 build variants](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-ml307/config.json), [NT26 configuration](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-nt26/config.h), and [NT26 build variants](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-nt26/config.json).

1. With power disconnected, check UART direction, NT26K handshake lines, common GND, and the verified power path.
2. Build for the matching modem board and follow [Flashing firmware](../firmware/flashing.md). Adding a few wires to the basic Wi-Fi build is insufficient.
3. Read [serial logs](../faq/serial-logs.md). Distinguish no modem response, SIM/network registration, mobile data, and OTA/conversation connections.
4. After mobile data works, complete [device binding](../getting-started/wifi-and-binding.md#bind), then test prompt audio, recording, and a conversation.
5. Test reconnection and supply stability during playback. Record the version and symptoms of resets or RF interference. Adjust antenna/audio spacing and routing according to the module design; do not attach the antenna to speaker wires.

<a name="verify"></a>

## Completion check and next steps {#verify}

Logs should establish modem operation, network registration, and a working data path. The device should bind and converse without resetting during playback or network transmission. Prototype photos do not establish that a power design has been tested with every carrier, SIM, or network.

Return to [basic S3 variants](./breadboard-esp32-s3.md#variants), or see [Color displays](./displays/st7789.md).
