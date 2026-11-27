---
id: audio-output
title: 'Speakers, headphones, and powered audio'
description: 'Distinguish speaker, headphone, and line outputs before connecting an audio load.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Compared with the MAX98357 datasheet and firmware audio implementation. A new headphone circuit has not been
  bench-tested.
translation:
  status: review
  sourceHash: 11a652c79b9ef1da74c8b00d409d9f8e8c72b701814290137cecbf8b8e9a5634
  reviewedAt: '2026-11-15'
---
# Speakers, headphones, and powered audio

Identify the device's output signal before choosing a speaker, headphones, or powered speakers. A plug that fits does not establish electrical compatibility.

<a name="scope"></a>

## Choose the connection {#scope}

| What you want to connect | Required output | Next step |
| --- | --- | --- |
| Two-wire passive speaker | Speaker-amplifier output with matching impedance and power | Follow the MAX98357A instructions below |
| Ordinary 3.5mm headphones | Dedicated headphone output and driver circuit | Choose a firmware-supported board with a labeled Headphone output |
| Powered desktop speakers | Line Out, or an explicitly compatible headphone output, matching the speaker input | Check both devices' manuals |
| Bluetooth headphones/speakers | Bluetooth audio protocol and corresponding firmware support | BluFi provisioning support does not imply audio support |

![Three paths from digital audio to different loads](../../public/images/en/audio-output-paths.svg)

::: warning MAX98357 speaker terminals are not a headphone output
MAX98357A/B is a mono Class-D amplifier. Both `OUTP` and `OUTN` are driven outputs; neither is signal ground. Do not connect these terminals directly to a common-ground 3.5mm headphone or powered-speaker plug, or tie multiple amplifiers' negative outputs together.
:::

<a name="speaker"></a>

## Connect a passive speaker {#speaker}

These steps apply to the MAX98357A module in the [basic S3 breadboard build](./breadboard-esp32-s3.md). For another amplifier, use its own datasheet and wiring diagram.

1. Disconnect USB and external power. Check that speaker impedance and rated power meet the module's requirements. The basic build uses one 8Ω, 3W speaker.
2. Secure the two speaker wires to `SPK+ / OUTP` and `SPK− / OUTN`. Do not connect either to `GND`.
3. Check for stray wire strands and shorts, and make sure nothing presses on the speaker cone.
4. Complete module power and I2S wiring before powering on. Start with low volume and a prompt sound, then increase to the required volume.

`MAX98357A` and `MAX98357B` use different digital input formats: A uses I2S; B uses left-justified data. Firmware fixed to I2S cannot treat a changed suffix as a compatible replacement. See the [Analog Devices product information](https://www.analog.com/en/products/MAX98357A.html).

<a name="headphones"></a>

## Use headphones or powered speakers {#headphones}

If the board already has a dedicated audio socket:

1. Check the manual to identify **Headphone**, **Line Out**, or **Mic In**, including plug type and load requirements.
2. Use firmware for that board. An onboard audio chip still needs the correct Codec initialization and output routing.
3. Turn down both device and speaker volume, connect first, then play audio. Check headphone volume before putting them on.
4. Test prompt sounds and conversation audio. Confirm volume control works, with no persistent noise or obvious distortion.

If you only have the MAX98357A speaker terminals, **adding a three-pin socket does not make a headphone output**. Use a Codec, DAC, or headphone amplifier with specified headphone/line-output capabilities, and provide its required power, filtering, interface, and firmware support. Follow the chosen module's design documentation; this guide does not prescribe an untested adapter circuit.

<figure class="source-figure">

[![A three-pin 3.5mm socket. The socket alone provides neither a headphone driver nor level conversion, and must not be wired directly to MAX98357A outputs.](../../public/images/zh/doc-35-image-002.webp)](../../public/images/zh/doc-35-image-002.webp)

<figcaption>A three-pin 3.5mm socket. The socket alone provides neither a headphone driver nor level conversion, and must not be wired directly to MAX98357A outputs.</figcaption>
</figure>

<a name="verify"></a>

## Verify the result {#verify}

::: tip Completion check
The load matches the output type, and both prompt and conversation audio are audible. Volume control works, wiring and modules do not heat abnormally, and playback does not restart the device.
:::

<a name="troubleshooting"></a>

## Troubleshooting {#troubleshooting}

| Symptom | Check first |
| --- | --- |
| No sound | Volume, module enable, I2S pins, and selected board; see [Audio troubleshooting](../faq/index.md#audio) |
| Restarts during playback | Supply and cable, load impedance, and shorts; do not keep increasing volume |
| Distortion | Start at low volume; check speaker power rating, supply headroom, and secure connections |
| Want stereo | A mono amplifier has no two independent outputs; stereo requires matching hardware, pins, and firmware |

<a name="next"></a>

## Next steps {#next}

- Finish the [basic S3 wiring](./breadboard-esp32-s3.md) or read [Battery power](./battery-power.md).
- Electrical reference: [MAX98357A/B datasheet](https://www.analog.com/media/en/technical-documentation/data-sheets/max98357a-max98357b.pdf).
- For wiring reports, include the module model, front/back photos, power arrangement, and firmware version.
