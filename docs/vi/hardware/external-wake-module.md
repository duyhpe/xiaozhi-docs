---
id: external-wake-module
title: External ASR wake modules
description: 'Choose onboard or external wake detection and verify module power, triggering, and configuration.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-32
translation:
  status: review
  sourceHash: 9bde2d94b9aa57be43de11443fa1c6df568bdfc68d053533eb1cfb3d52d8a723
  reviewedAt: '2026-11-15'
---
# External ASR wake modules

An external speech-recognition module recognizes offline commands, then notifies XiaoZhi through GPIO or another signal. It can suit resource-constrained devices or independent recognition requirements. It is not required for everyone who wants a different wake phrase.

<a name="scope"></a>

## Decide whether you need a module {#scope}

First check [Onboard wake words](../development/wake-words.md), your chip, PSRAM, and model. If existing hardware meets the need, you can avoid an extra module, supply, and trigger line.

<a name="identify"></a>

## 1. Distinguish the module and programmer {#identify}

<figure class="source-figure">

[![ASR CORE module.](../../public/images/zh/doc-32-image-006.jpg)](../../public/images/zh/doc-32-image-006.jpg)

<figcaption>ASR CORE module.</figcaption>
</figure>

<figure class="source-figure">

[![ASR-LINK programmer and its interfaces.](../../public/images/zh/doc-32-image-007.jpg)](../../public/images/zh/doc-32-image-007.jpg)

<figcaption>ASR-LINK programmer and its interfaces.</figcaption>
</figure>

<figure class="source-figure">

[![Microphone supplied with the module.](../../public/images/zh/doc-32-image-008.webp)](../../public/images/zh/doc-32-image-008.webp)

<figcaption>Microphone supplied with the module.</figcaption>
</figure>

An ASR PRO core board, a development board with peripherals, and an ASR-LINK programmer are different hardware. Power, startup, and pins differ. Record the full model and PCB revision, then obtain its manufacturer-provided tools and pin documentation.

| Interface | What to establish |
| --- | --- |
| Power input | Whether this model requires 5V or 3.3V; do not mix pin tables from different boards |
| Signal output | Active-high/low, pulse or sustained level, and whether the MCU tolerates the voltage |
| Programming UART | RX/TX direction, programming mode, and logic voltage |
| Microphone | Integrated or external, polarity, and acoustic placement |

<figure class="source-figure">

[![Example ASR PRO V2.0 development board with USB and peripherals. It differs from a core board with solder pads only.](../../public/images/zh/doc-32-image-051.webp)](../../public/images/zh/doc-32-image-051.webp)

<figcaption>Example ASR PRO V2.0 development board with USB and peripherals. It differs from a core board with solder pads only.</figcaption>
</figure>

<figure class="source-figure">

[![Example ASR PRO 4M core board. Check storage, programming, and pins for its revision.](../../public/images/zh/doc-32-image-052.webp)](../../public/images/zh/doc-32-image-052.webp)

<figcaption>Example ASR PRO 4M core board. Check storage, programming, and pins for its revision.</figcaption>
</figure>

<a name="configure"></a>

## 2. Configure commands on the module {#configure}

1. Obtain Tianwen Block with ASRPRO support from the [official Tianwen page](https://www.twen51.com/new/art_show.php?id=230). Choose the matching board using the [official instructions](https://www.twen51.com/new/learning_show.php?id=559).
2. Define offline recognition entries, wake phrases, commands, and actions. Specify the output GPIO, active level, and pulse duration. Do not combine a core-board PA4 example with a development-board PA2 example into one program.
3. Compile and upload using the matching programmer. For tool errors, check the model and wiring first; bypassing operating-system protection is not a default step.
4. Test recognition and output pulses independently before connecting XiaoZhi. A successful PC compile does not establish correct electrical signals.

<figure class="source-figure">

[![Tianwen Block recognition entries and GPIO actions. Match output pin, polarity, and pulse duration to the actual board input.](../../public/images/zh/doc-32-image-023.webp)](../../public/images/zh/doc-32-image-023.webp)

<figcaption>Tianwen Block recognition entries and GPIO actions. Match output pin, polarity, and pulse duration to the actual board input.</figcaption>
</figure>

<figure class="source-figure">

[![Example ASRPRO programming tool. Select the programmer port, chip, and newly generated module program; a XiaoZhi main-firmware package is not a substitute.](../../public/images/zh/doc-32-image-029.webp)](../../public/images/zh/doc-32-image-029.webp)

<figcaption>Example ASRPRO programming tool. Select the programmer port, chip, and newly generated module program; a XiaoZhi main-firmware package is not a substitute.</figcaption>
</figure>

### Regenerate the model after changing a phrase

After editing recognition phrases and GPIO actions in Tianwen Block, sign in if the tool requires it, select **Generate model**, wait for completion, then **Compile and download**. Repeat both actions after every wake-word change. Editing text or downloading an older program does not update the recognition model.

Distinguish examples within the same family: the core-board example uses PA4, while some development boards with an indicator LED use PA2 instead. Change the programmed output pin and wiring together, after checking that board's schematic and logic levels. Verify the RX/TX connections using the matching ASR-LINK/module instructions rather than the XiaoZhi controller's download settings.

<a name="connect"></a>

## 3. Connect to XiaoZhi {#connect}

With power disconnected, check module power, common GND, logic output, and the target board's input one by one. PA4/PA2, BOOT, and similar interfaces have module- and firmware-specific roles.

If triggering a button input, first check whether it is active-low, can be externally driven, and affects boot strapping. Download mode and runtime conversation triggering are different. For firmware changes, use a [custom board](../development/custom-board.md) and define debounce and active edges explicitly in initialization code.

<a name="prototype"></a>

### Breadboard installation example {#prototype}

This prototype places an ASR core beside the basic breadboard. Green lines illustrate recognition output reaching a controller button input. **The picture is not a universal ASR wiring table.** A module powered at 5V does not necessarily output 5V logic. Measure the output and check both sides' specifications before connecting ESP32; use appropriate level conversion if needed. BOOT/GPIO0 also affects startup mode.

<figure class="source-figure">

[![Core-board placement on the breadboard. Check header direction and adjacent contacts to avoid bridging power rails.](../../public/images/zh/doc-32-image-033.webp)](../../public/images/zh/doc-32-image-033.webp)

<figcaption>Core-board placement on the breadboard. Check header direction and adjacent contacts to avoid bridging power rails.</figcaption>
</figure>

<figure class="source-figure">

[![Prototype ASR output to an S3 button input. This illustrates the signal relationship; verify power, voltage levels, polarity, and boot behavior for the module.](../../public/images/zh/doc-32-image-034.webp)](../../public/images/zh/doc-32-image-034.webp)

<figcaption>Prototype ASR output to an S3 button input. This illustrates the signal relationship; verify power, voltage levels, polarity, and boot behavior for the module.</figcaption>
</figure>

<a name="verify"></a>

## Verify the result {#verify}

First observe recognition at the module, then the controller's received event, then a successful conversation. Also test false triggers, repeated triggers, sleep, and power cycling. One successful wake does not establish voltage or startup compatibility.

<a name="sources"></a>

## Next steps {#sources}

Select tools and configuration for the exact module. For constrained hardware, see [Classic ESP32](./breadboard-esp32.md). Where resources permit, start with [Onboard wake words](../development/wake-words.md).
