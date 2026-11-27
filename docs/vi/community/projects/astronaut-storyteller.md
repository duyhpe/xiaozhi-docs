---
id: astronaut-storyteller
title: Astronaut storyteller conversion
description: 'Identify PCB, power, and firmware limits using teardown and wiring photos.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Third-party projects and prototypes have not all been tested. Check exact versions and hardware requirements before
  use.
sourceArticles:
  - DOC-44
translation:
  status: review
  sourceHash: 8122ddafa4a969eae48ef325e15847ec38c04735e67516214055951fd2307bd1
  reviewedAt: '2026-11-15'
---
# Astronaut storyteller conversion

This example combines a particular storyteller enclosure, buttons, and parts of its original PCB with an S3 voice module. Products with the same name may have different PCBs. Identify the revision and power path before attempting a reproduction.

<figure class="source-figure">

[![Astronaut storyteller and conversion target.](../../../public/images/zh/doc-44-image-001.webp)](../../../public/images/zh/doc-44-image-001.webp)

<figcaption>Astronaut storyteller and conversion target.</figcaption>
</figure>

<a name="scope"></a>

## 1. Disassemble and identify {#scope}

Disconnect power and the battery, then photograph both PCB sides, every connector, and battery specifications. Record the speaker, buttons, switch, charger IC, and regulators, and identify which circuits you will retain.

<figure class="source-figure">

[![Example PCB teardown, applicable only to this board revision.](../../../public/images/zh/doc-44-image-003.jpg)](../../../public/images/zh/doc-44-image-003.jpg)

<figcaption>Example PCB teardown, applicable only to this board revision.</figcaption>
</figure>

<figure class="source-figure">

[![Another PCB view; identify the circuit before removing components.](../../../public/images/zh/doc-44-image-004.webp)](../../../public/images/zh/doc-44-image-004.webp)

<figcaption>Another PCB view; identify the circuit before removing components.</figcaption>
</figure>

The example removes components from the original PCB. Identify their functions and your board revision first. A red box in a photo is not removal guidance for another production batch.

<a name="audio"></a>

## 2. Build the voice section {#audio}

These audio connections match the basic S3 board in `xiaozhi-esp32 v2.6.0`. Storyteller PCBs from other batches still need separate checks.

| Module | Module pin | ESP32-S3 GPIO |
| --- | --- | --- |
| INMP441 | WS | 4 |
| INMP441 | SCK | 5 |
| INMP441 | SD (output to MCU) | 6 |
| MAX98357A | DIN (MCU output) | 7 |
| MAX98357A | BCLK | 15 |
| MAX98357A | LRC | 16 |

The prototype connects INMP441 VDD to 3V3 and GND/L/R to GND. Amplifier VCC/SD connects to 3V3, GND/GAIN to GND, and the speaker to the positive and negative amplifier outputs.

**This describes the prototype's 3V3 amplifier branch.** Regulator headroom, amplifier revision, and channel/gain settings still require verification. Do not copy it without checking power. For a new independent voice section, prefer the complete, consistent power arrangement in the [basic breadboard guide](../../hardware/breadboard-esp32-s3.md), and do not mix supply wires from the two designs.

Use photos to identify modules and solder points, then check signals, power, and firmware separately. Reusing the existing amplifier, speaker, or microphone needs circuit evidence. Amplifier speaker outputs must not feed common-ground headphones.

<figure class="source-figure">

[![INMP441 microphone module.](../../../public/images/zh/doc-44-image-005.webp)](../../../public/images/zh/doc-44-image-005.webp)

<figcaption>INMP441 microphone module.</figcaption>
</figure>

<figure class="source-figure">

[![MAX98357A amplifier module.](../../../public/images/zh/doc-44-image-006.webp)](../../../public/images/zh/doc-44-image-006.webp)

<figcaption>MAX98357A amplifier module.</figcaption>
</figure>

<figure class="source-figure">

[![Prototype amplifier wiring.](../../../public/images/zh/doc-44-image-007.webp)](../../../public/images/zh/doc-44-image-007.webp)

<figcaption>Prototype amplifier wiring.</figcaption>
</figure>

<figure class="source-figure">

[![Assembled prototype voice section.](../../../public/images/zh/doc-44-image-008.webp)](../../../public/images/zh/doc-44-image-008.webp)

<figcaption>Assembled prototype voice section.</figcaption>
</figure>

<figure class="source-figure">

[![Another view of the voice section.](../../../public/images/zh/doc-44-image-009.webp)](../../../public/images/zh/doc-44-image-009.webp)

<figcaption>Another view of the voice section.</figcaption>
</figure>

<a name="power"></a>

## 3. Battery, USB, and the original board {#power}

Draw the complete battery, protection, charging, boost, main-board, and USB path. Distinguish `BAT`, `VIN`, `OUT`, and `GND`. Pictured solder points apply only to the same PCB revision; matching wire colors or enclosures do not establish equivalent circuits.

Without a verified original charging path, first run the new voice section independently from reliable USB power. Review custom battery wiring using [Battery power](../../hardware/battery-power.md). A device lighting up does not establish that USB and battery may be connected simultaneously.

Original power, charging, and button circuits still need tests on the specific PCB. Reading a table and checking GPIOs does not establish that the full conversion passed electrical and hardware verification.

<figure class="source-figure">

[![Prototype power module labeled OUT 5V, BAT, VIN, and GND. Input, battery, and output are not interchangeable; check its schematic before wiring.](../../../public/images/zh/doc-44-image-012.webp)](../../../public/images/zh/doc-44-image-012.webp)

<figcaption>Prototype power module labeled OUT 5V, BAT, VIN, and GND. Input, battery, and output are not interchangeable; check its schematic before wiring.</figcaption>
</figure>

<a name="build"></a>

## 4. Buttons, firmware, and enclosure {#build}

1. Verify display/prompt audio, microphone, network, and conversation on the independent hardware first.
2. Measure the original button circuit, identify signal voltage and active polarity, then integrate it in a [custom board](../../development/custom-board.md).
3. Add power, buttons, and voice circuits one at a time, recording each result. Do not directly assume old v0.3/v0.5 behavior.
4. Secure wiring and check microphone openings, speaker, button travel, and USB clearance before closing the case.

<figure class="source-figure">

[![Completed conversion prototype.](../../../public/images/zh/doc-44-image-015.webp)](../../../public/images/zh/doc-44-image-015.webp)

<figcaption>Completed conversion prototype.</figcaption>
</figure>

<figure class="source-figure">

[![Assembled enclosure.](../../../public/images/zh/doc-44-image-016.webp)](../../../public/images/zh/doc-44-image-016.webp)

<figcaption>Assembled enclosure.</figcaption>
</figure>

<figure class="source-figure">

[![Signal breakout points on this prototype button board. Measure continuity, active level, and original-board power before connecting the MCU.](../../../public/images/zh/doc-44-image-013.webp)](../../../public/images/zh/doc-44-image-013.webp)

<figcaption>Signal breakout points on this prototype button board. Measure continuity, active level, and original-board power before connecting the MCU.</figcaption>
</figure>

<figure class="source-figure">

[![Prototype button signals routed near S3 interfaces and BOOT. Identify solder points from this photo, but do not copy them to another PCB revision.](../../../public/images/zh/doc-44-image-014.webp)](../../../public/images/zh/doc-44-image-014.webp)

<figcaption>Prototype button signals routed near S3 interfaces and BOOT. Identify solder points from this photo, but do not copy them to another PCB revision.</figcaption>
</figure>

<a name="verify"></a>

## Verify the result {#verify}

Verify power and charging for the exact PCB revision, and rebuild firmware from clean configuration. Conversation should work before and after enclosure assembly. Charging, sleep, and recovery should not cause abnormal levels or resets. Prototype photos illustrate this example; they do not establish verification across every batch.

<a name="sources"></a>

## Next steps {#sources}

Component removal and PCB reuse apply only to a checked revision. To start from scratch, use the [basic S3 build](../../hardware/breadboard-esp32-s3.md). See [Open hardware](../open-hardware.md) for other projects.
