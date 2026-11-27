---
id: breadboard-esp32-s3
title: Build a basic ESP32-S3 breadboard XiaoZhi
description: 'Build your first XiaoZhi conversation device with a fixed microphone, amplifier, and OLED wiring setup.'
status: review
reviewedAt: '2026-11-15'
sourceArticles:
  - DOC-05
  - DOC-10
reviewNote: >-
  Pins were compared with v2.6.0 board source and component documentation. The complete wiring, power load, and
  different physical modules still need hardware reproduction.
translation:
  status: review
  sourceHash: 8c6b70084165aaff4e78c88625964e5010e8ffabb2a3414053c455bb50561512
  reviewedAt: '2026-11-15'
---
# Build a basic ESP32-S3 breadboard XiaoZhi

First complete a basic Wi-Fi device with one microphone, one speaker, and an OLED. Add a color display, camera, or 4G module afterward. Expansion variants can use different pins and firmware.

<a name="finished-overview"></a>

## See the finished build first {#finished-overview}

The first photo shows the basic microphone/amplifier build; the second adds an OLED. Complete this setup before considering a color display, camera, or 4G. Links to those variants' wiring guides appear at the end.

<div class="module-grid">

<figure class="source-figure">

[![Basic build: ESP32-S3, microphone, amplifier, and speaker.](../../public/images/zh/doc-05-image-035.jpg)](../../public/images/zh/doc-05-image-035.jpg)

<figcaption>Basic build: ESP32-S3, microphone, amplifier, and speaker. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![OLED expansion: a display added to the basic audio build.](../../public/images/zh/doc-05-image-037.jpg)](../../public/images/zh/doc-05-image-037.jpg)

<figcaption>OLED expansion: a display added to the basic audio build. Click to view full size.</figcaption>
</figure>

</div>

<a name="scope"></a>

## Hardware used in this guide {#scope}

| Item | Selection |
| --- | --- |
| Development board | ESP32-S3-DevKitC-1, WROOM-1 N16R8: 16MB Flash and 8MB PSRAM |
| Microphone | INMP441 I2S module |
| Amplifier | MAX98357A I2S module with its default enable/gain circuit |
| Speaker | One 8Ω, 3W passive speaker |
| Display | I2C SSD1306, 128×32; 128×64 needs the matching firmware variant |
| Firmware board | `bread-compact-wifi`; `bread-compact-wifi-128x64` for 128×64 |
| Other parts | Breadboards, short jumpers, a reliable USB data cable, and USB power adequate for the load |

The pins follow the [firmware v2.6.0 configuration](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/boards/bread-compact-wifi/config.h), using its default separate input/output I2S wiring. Other chips, N8R2, camera, LCD, and 4G variants need their own configuration checks; appearance alone does not justify reusing this table.

<a name="materials"></a>

## Parts list: identify each module {#materials}

Use these photos to identify parts for this build. Check markings, model numbers, and soldering orientation rather than the colors in seller photos. The connection steps here specifically use INMP441 and MAX98357A.

<a name="board-identification"></a>

### ESP32-S3 development board {#board-identification}

Read the complete module model on the metal shield, then identify the header layout. The 44-pin standard board and 42-pin GOOUUU board have separate [position diagrams below](#board-layouts). Different header counts do not by themselves imply different GPIO firmware.

<div class="module-grid">

<figure class="source-figure">

[![Module markings: check WROOM-1 and N16R8.](../../public/images/zh/doc-05-image-001.webp)](../../public/images/zh/doc-05-image-001.webp)

<figcaption>Module markings: check WROOM-1 and N16R8. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![ESP32-S3-DevKitC-1 development board.](../../public/images/zh/doc-05-image-002.webp)](../../public/images/zh/doc-05-image-002.webp)

<figcaption>ESP32-S3-DevKitC-1 development board. Click to view full size.</figcaption>
</figure>

</div>

<details>
<summary>Identify the RGB solder-point area on some older boards</summary>

<figure class="source-figure">

[![RGB-area detail on an older board revision, for identification only. No board rework is required just to light the RGB LED.](../../public/images/zh/doc-05-image-003.webp)](../../public/images/zh/doc-05-image-003.webp)

<figcaption>RGB-area detail on an older board revision, for identification only. No board rework is required just to light the RGB LED. Click to view full size.</figcaption>
</figure>

The RGB LED lighting up is not a universal wiring-success test. This guide checks buttons, display, recording/playback, and conversation.

</details>

<a name="microphone-modules"></a>

### Digital microphone {#microphone-modules}

<figure class="source-figure">

[![INMP441 module: identify VDD, GND, WS, SCK, SD, and L/R.](../../public/images/zh/doc-05-image-004.webp)](../../public/images/zh/doc-05-image-004.webp)

<figcaption>INMP441 module: identify VDD, GND, WS, SCK, SD, and L/R. Click to view full size.</figcaption>
</figure>

ZTS6672 and ICS43434 are also common microphone modules. The photos identify them; before substituting one, check pin orientation, channel, and firmware configuration.

<div class="module-grid">

<figure class="source-figure">

[![ZTS6672 microphone module.](../../public/images/zh/doc-05-image-005.webp)](../../public/images/zh/doc-05-image-005.webp)

<figcaption>ZTS6672 microphone module. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![ICS43434 microphone module.](../../public/images/zh/doc-05-image-006.webp)](../../public/images/zh/doc-05-image-006.webp)

<figcaption>ICS43434 microphone module. Click to view full size.</figcaption>
</figure>

</div>

<a name="audio-modules"></a>

### Digital amplifier and speaker {#audio-modules}

MAX98357A accepts digital I2S; connect the speaker across its two output terminals. The HT517 photo is also provided for identification. For that module, check the actual input, supply, enable behavior, and speaker connector specifications rather than swapping by header position alone.

<div class="module-grid">

<figure class="source-figure">

[![MAX98357A module, headers, and speaker terminals.](../../public/images/zh/doc-05-image-007.webp)](../../public/images/zh/doc-05-image-007.webp)

<figcaption>MAX98357A module, headers, and speaker terminals. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![HT517 amplifier module and connector.](../../public/images/zh/doc-05-image-008.webp)](../../public/images/zh/doc-05-image-008.webp)

<figcaption>HT517 amplifier module and connector. Click to view full size.</figcaption>
</figure>

</div>

<div class="module-grid">

<figure class="source-figure">

[![An 8Ω enclosed speaker; this guide uses 8Ω, 3W.](../../public/images/zh/doc-05-image-009.webp)](../../public/images/zh/doc-05-image-009.webp)

<figcaption>An 8Ω enclosed speaker; this guide uses 8Ω, 3W. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![A 4Ω enclosed speaker example; amplifier loading and power headroom require a separate check.](../../public/images/zh/doc-05-image-010.webp)](../../public/images/zh/doc-05-image-010.webp)

<figcaption>A 4Ω enclosed speaker example; amplifier loading and power headroom require a separate check. Click to view full size.</figcaption>
</figure>

</div>

<a name="breadboard-parts"></a>

### Breadboards, wires, and buttons {#breadboard-parts}

Two interlocking 400-point breadboards let the controller sit in the middle with modules on either side. The center channel separates the two groups of five contacts in each row. With power disconnected, check power-rail continuity and whether the long rails are split midway.

<div class="module-grid">

<figure class="source-figure">

[![Two interlocking breadboards.](../../public/images/zh/doc-05-image-013.jpg)](../../public/images/zh/doc-05-image-013.jpg)

<figcaption>Two interlocking breadboards. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![Breadboard contacts: adjacent holes are not necessarily connected.](../../public/images/zh/doc-05-image-014.webp)](../../public/images/zh/doc-05-image-014.webp)

<figcaption>Breadboard contacts: adjacent holes are not necessarily connected. Click to view full size.</figcaption>
</figure>

</div>

<div class="module-grid">

<figure class="source-figure">

[![Short breadboard jumper wires.](../../public/images/zh/doc-05-image-011.webp)](../../public/images/zh/doc-05-image-011.webp)

<figcaption>Short breadboard jumper wires. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![Dupont leads: choose connector ends for the board and module headers.](../../public/images/zh/doc-05-image-012.webp)](../../public/images/zh/doc-05-image-012.webp)

<figcaption>Dupont leads: choose connector ends for the board and module headers. Click to view full size.</figcaption>
</figure>

</div>

<figure class="source-figure">

[![Optional tactile switch: pins on the same side may already be connected. Check continuity before installation.](../../public/images/zh/doc-05-image-020.webp)](../../public/images/zh/doc-05-image-020.webp)

<figcaption>Optional tactile switch: pins on the same side may already be connected. Check continuity before installation. Click to view full size.</figcaption>
</figure>

<a name="oled-modules"></a>

### OLED display {#oled-modules}

<div class="module-grid">

<figure class="source-figure">

[![A 0.91-inch 128×32 OLED.](../../public/images/zh/doc-05-image-015.webp)](../../public/images/zh/doc-05-image-015.webp)

<figcaption>A 0.91-inch 128×32 OLED. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![A 0.96-inch 128×64 OLED.](../../public/images/zh/doc-05-image-016.webp)](../../public/images/zh/doc-05-image-016.webp)

<figcaption>A 0.96-inch 128×64 OLED. Click to view full size.</figcaption>
</figure>

</div>

Both displays can use GPIO41/42 for I2C, but need firmware for the matching resolution. Check pin order and VCC/GND positions against your own display's markings.

4G module identification, power, and variant layouts are collected in the [ML307R / NT26K expansion guide](./breadboard-4g.md). They are not required for your first Wi-Fi build.

<a name="prepare"></a>

## 1. Identify headers and power connections {#prepare}

Disconnect all power before wiring. Locate pins by their printed `GPIO` numbers and power labels, not photo orientation or header position numbers. Breadboard power rails may also be split midway.

- Supply INMP441 and this guide's OLED from `3V3`, not 5V.
- Supply the MAX98357A module from the board's `5V` node. This applies only to a DevKitC-1 whose power wiring matches the official schematic and which is powered solely through USB. Check the schematic first; do not copy this supply connection to an unverified compatible board.
- Connect module signal grounds to board `GND`. The amplifier's negative speaker terminal is not signal ground.
- Do not draw power from exposed regulator pins or inject a second supply into the board's 5V/3V3 rails.

See the [official schematic](https://dl.espressif.com/dl/schematics/SCH_ESP32-S3-DevKitC-1_V1.1_20220413.pdf) for power nodes. USB supply capability, cables, and amplifier loading affect stability. Begin testing at low volume.

<a name="wiring-overview"></a>

## Overall wiring: connect the complete basic setup {#wiring-overview}

This diagram combines every microphone, amplifier, speaker, and OLED connection. Use the following tables to check each wire. **The amplifier VIN uses the verified onboard USB 5V node; the microphone and OLED use 3V3.**

<figure class="source-figure wiring-figure">

[![Basic S3: complete audio, power, and OLED connections.](../../public/images/en/breadboard-s3-wiring-v2.6.0.svg)](../../public/images/en/breadboard-s3-wiring-v2.6.0.svg)

<figcaption>Basic S3 audio, power, and OLED signal wiring for firmware v2.6.0; this is not a physical header-position diagram.</figcaption>
</figure>

<a name="board-layouts"></a>

### 44-pin and 42-pin physical layouts {#board-layouts}

Use these breadboard layouts to find headers and place modules. Match every labeled GPIO to the physical board.

::: warning Optional wiring shown in these layouts
The layout photos show the amplifier VIN on a **3V3** branch. This guide's fixed setup uses the verified **5V** node; handle SD/MODE and GAIN according to your module's operating configuration. The pictures also show an optional ML307R branch and **power taken from an LDO solder point**. For the basic Wi-Fi build, omit the entire 4G branch and do not take power from that solder point.
:::

<a name="layout-44"></a>

#### Espressif standard board · 44 pins {#layout-44}

<figure class="source-figure wiring-figure">

[![44-pin standard-board layout, annotated by Surfer. Omit the 4G/LDO branch for Wi-Fi and use this guide's 5V amplifier supply.](../../public/images/zh/doc-05-image-021.jpg)](../../public/images/zh/doc-05-image-021.jpg)

<figcaption>44-pin standard-board layout, annotated by Surfer. Omit the 4G/LDO branch for Wi-Fi and use this guide's 5V amplifier supply. Click to view full size.</figcaption>
</figure>

<a name="layout-42"></a>

#### GOOUUU board · 42 pins {#layout-42}

<figure class="source-figure wiring-figure">

[![42-pin GOOUUU layout, annotated by Surfer. Power header positions differ; omit 4G/LDO for Wi-Fi and follow this guide's amplifier supply.](../../public/images/zh/doc-05-image-026.jpg)](../../public/images/zh/doc-05-image-026.jpg)

<figcaption>42-pin GOOUUU layout, annotated by Surfer. Power header positions differ; omit 4G/LDO for Wi-Fi and follow this guide's amplifier supply. Click to view full size.</figcaption>
</figure>

Both layouts use microphone GPIO4/5/6, amplifier GPIO7/15/16, and OLED GPIO41/42. After checking that the chip, memory, and modules also match, use the same `bread-compact-wifi` build. Left/right positions on a board are not GPIO numbers.

<a name="microphone"></a>

## 2. Connect the microphone {#microphone}

| INMP441 pin | ESP32-S3 connection | Purpose |
| --- | --- | --- |
| VDD / VCC | 3V3 | Microphone supply |
| GND | GND | Signal ground |
| WS | GPIO4 | Input word-select clock |
| SCK | GPIO5 | Input bit clock |
| SD | GPIO6 | Microphone data into the controller |
| L/R | GND | Select the left channel for this input configuration |

Similar labels do not imply the same direction: the microphone's `SD` is an output connected to the firmware's `DIN` input. For INMP441 power and channel selection, see the [TDK datasheet](https://product.tdk.com/system/files/dam/doc/product/sw_piezo/mic/mems-mic/data_sheet/inmp441.pdf).

<a name="reversed-microphone"></a>

### When microphone headers are soldered on the opposite side {#reversed-microphone}

“Reversed” here means a different physical soldering orientation, **not exchanging VDD and GND**. Identify which side faces upward and follow matching signal labels. The two board layouts are shown separately.

<figure class="source-figure wiring-figure">

[![44-pin board with the microphone reversed physically; WS/SCK/SD signal assignments remain the same.](../../public/images/zh/doc-05-image-022.jpg)](../../public/images/zh/doc-05-image-022.jpg)

<figcaption>44-pin board with the microphone reversed physically; WS/SCK/SD signal assignments remain the same. Click to view full size.</figcaption>
</figure>

<figure class="source-figure wiring-figure">

[![42-pin board with the microphone reversed physically. Do not guess supply pins by mirroring its appearance.](../../public/images/zh/doc-05-image-027.jpg)](../../public/images/zh/doc-05-image-027.jpg)

<figcaption>42-pin board with the microphone reversed physically. Do not guess supply pins by mirroring its appearance. Click to view full size.</figcaption>
</figure>

<a name="amplifier"></a>

## 3. Connect the amplifier and speaker {#amplifier}

| MAX98357A module pin | ESP32-S3 / load connection |
| --- | --- |
| VIN / VDD | The onboard 5V node specified above |
| GND | GND |
| DIN | GPIO7 |
| BCLK | GPIO15 |
| LRC / LRCLK | GPIO16 |
| SPK+ / OUTP | One speaker terminal |
| SPK− / OUTN | The other speaker terminal |

Handle `SD/MODE` and `GAIN` according to the module manufacturer's default operating setup. If a bare module needs resistors or an enable signal, provide that circuitry first; do not assume floating pins will work. MAX98357B is not a drop-in replacement for A. Do not connect headphones to speaker outputs; see [audio outputs](./audio-output.md).

<a name="audio-direct"></a>

### Direct microphone-to-amplifier wiring {#audio-direct}

Without a breadboard, this illustration helps identify the connections between the two audio modules. Signal assignments match the audio table above. Adjust the shown amplifier 3V3 supply and SD/GAIN links to this guide's chosen power scheme and the actual module's operating requirements.

<figure class="source-figure wiring-figure">

[![Direct microphone/MAX98357A wiring. Adjust the shown 3V3 amplifier branch and SD/GAIN links as explained in the text.](../../public/images/zh/doc-05-image-028.jpg)](../../public/images/zh/doc-05-image-028.jpg)

<figcaption>Direct microphone/MAX98357A wiring. Adjust the shown 3V3 amplifier branch and SD/GAIN links as explained in the text. Click to view full size.</figcaption>
</figure>

<a name="display"></a>

## 4. Connect the OLED {#display}

| OLED pin | ESP32-S3 connection |
| --- | --- |
| VCC | 3V3, using a module rated for that voltage |
| GND | GND |
| SDA | GPIO41 |
| SCL | GPIO42 |

<figure class="source-figure wiring-figure">

[![Four connections between ESP32-S3 and the SSD1306 OLED.](../../public/images/en/breadboard-s3-oled-v2.6.0.svg)](../../public/images/en/breadboard-s3-oled-v2.6.0.svg)

<figcaption>The OLED VCC, GND, SDA, and SCL connections. Click to view full size.</figcaption>
</figure>

This board uses I2C address `0x3C`. The 128×32 and 128×64 displays need different firmware variants. SH1106, SPI displays, and other addresses cannot be made equivalent merely by rewiring.

<a name="buttons"></a>

## Optional external buttons {#buttons}

Use onboard BOOT for the initial conversation test. External buttons connect GPIO0, GPIO40, and GPIO39 respectively to GND for this version's BOOT, volume up, and volume down. For a four-legged tactile switch, check which pins are internally connected, and do not place both switched sides in the same connected breadboard row.

Button behavior is defined by the [current board implementation](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/bread-compact-wifi/compact_wifi_board.cc), not by a “reset Wi-Fi” label in an older picture.

<a name="underside"></a>

## After wiring: check beneath the modules {#underside}

Short links can be hidden beneath the amplifier and microphone. Photograph and check power, GND, and signal connections before installing the modules, including any bridges across split power rails.

<figure class="source-figure">

[![Basic build with modules removed, revealing short wires underneath.](../../public/images/zh/doc-05-image-036.jpg)](../../public/images/zh/doc-05-image-036.jpg)

<figcaption>Basic build with modules removed, revealing short wires underneath. Click to view full size.</figcaption>
</figure>

<a name="start"></a>

## 5. Check, flash, and provision {#start}

1. With power disconnected, check every power and signal wire. Confirm there are no rail shorts, neither amplifier output is grounded, and no connection is one pin out.
2. Use the [online builder](../firmware/online-builder.md) with the board and display variant above, or obtain matching firmware from [downloads](../firmware/downloads.md).
3. Follow the [flashing guide](../firmware/flashing.md). Restart and check the display and startup sound. RGB pins differ between DevKit revisions, so LED color alone is not a success check.
4. Follow [network provisioning and binding](../getting-started/wifi-and-binding.md) to connect and enter the device code.
5. Start one conversation with BOOT before testing the wake word supported by the selected firmware.

<a name="assembly-results"></a>

## Assembly and finished builds {#assembly-results}

These photos show overall placement, soldered/Dupont connections, and a completed OLED build. Use them to recognize the finished shape. Follow the power scheme above for the amplifier and 4G; wire colors do not replace signal labels.

<div class="module-grid">

<figure class="source-figure">

[![Standard-board layout and relative module positions.](../../public/images/zh/doc-05-image-023.jpg)](../../public/images/zh/doc-05-image-023.jpg)

<figcaption>Standard-board layout and relative module positions. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![Standard-board wiring and module placement.](../../public/images/zh/doc-05-image-024.jpg)](../../public/images/zh/doc-05-image-024.jpg)

<figcaption>Standard-board wiring and module placement. Click to view full size.</figcaption>
</figure>

</div>

<div class="module-grid">

<figure class="source-figure">

[![GOOUUU board module placement.](../../public/images/zh/doc-05-image-029.webp)](../../public/images/zh/doc-05-image-029.webp)

<figcaption>GOOUUU board module placement. Click to view full size.</figcaption>
</figure>

<figure class="source-figure">

[![Another view of the GOOUUU assembly.](../../public/images/zh/doc-05-image-030.webp)](../../public/images/zh/doc-05-image-030.webp)

<figcaption>Another view of the GOOUUU assembly. Click to view full size.</figcaption>
</figure>

</div>

<a name="verify"></a>

## Check that it worked {#verify}

::: tip Success checks
The OLED displays correctly, the startup prompt is audible, and the device connects and appears in your Console. A button starts a conversation, the microphone hears you, and replies play without a restart.
:::

<a name="troubleshooting"></a>

## Troubleshooting {#troubleshooting}

| Symptom | Check first |
| --- | --- |
| OLED dark or partially displayed | Model, address, SDA/SCL, power, and 128×32/64 variant |
| You hear prompts but the device cannot hear you | INMP441 SD/WS/SCK, L/R, microphone opening, and input power |
| Speech is recognized but no reply is audible | Amplifier DIN/BCLK/LRC, enable, speaker terminals, and volume |
| Device restarts during playback | USB supply/cable, amplifier load, and shorts; lower the volume first |

<a name="variants"></a>

## Breadboard variants {#variants}

| Variant | Wiring and photos | Firmware difference |
| --- | --- | --- |
| Same basic setup with a 128×64 OLED | OLED and 44/42-pin layouts on this page | `bread-compact-wifi-128x64` |
| SPI color display | [44/42-pin display wiring and finished builds](./displays/st7789.md#wiring-diagrams) | `bread-compact-wifi-lcd`; also check display settings |
| Camera + color display | [Camera wiring and hardware](./breadboard-camera.md#wiring) | `bread-compact-wifi-s3cam`; audio GPIOs also differ |
| ML307R 4G | [44/42-pin ML307R layouts and builds](./breadboard-4g.md#ml307) | `bread-compact-ml307` |
| NT26K 4G | [44/42-pin NT26K layouts and builds](./breadboard-4g.md#nt26) | `bread-compact-nt26`; two additional handshake lines |
| ESP32-C3 + codec | [C3 wiring, OLED, and color-display builds](./breadboard-esp32-c3.md) | `xmini/c3`, not the S3 microphone/amplifier wiring |
| Classic ESP32 | [Classic ESP32 guide](./breadboard-esp32.md) | `bread-compact-esp32` |

A Duplex setup shares clocks. This page uses the source's default Simplex configuration. To use Duplex, first create your own build for the applicable configuration and recheck the clocks; do not join signal lines arbitrarily on default firmware.

<a name="next"></a>

## Next steps {#next}

See [battery power](./battery-power.md) for portable use. Before changing pins or adding peripherals, read [custom board support](../development/custom-board.md) and establish a separate firmware identity.
