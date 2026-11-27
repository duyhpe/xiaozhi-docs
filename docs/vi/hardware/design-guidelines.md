---
id: hardware-design-guidelines
title: Hardware design considerations
description: 'Evaluate power, acoustics, mechanics, and testability alongside the MCU.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-11
translation:
  status: review
  sourceHash: 396f8ff508ee315103b3e6c9639136ac81bd1cc46d339f1347e5f6144d42bc9a
  reviewedAt: '2026-11-15'
---
# Hardware design considerations

Hardware design combines chip resources, power, audio, and mechanics. Define the required functions first, then check the design against component documentation and test results.

<a name="scope"></a>

## 1. Select for signals and loads {#scope}

Define voice, display, camera, network, low-power, and update requirements before choosing the chip, Flash/PSRAM, Codec, and peripherals. Cross-check models, AFE, and wake capabilities with [firmware support](./supported-boards.md).

<figure class="source-figure">

[![Chip and voice-capability selection chart. Consider microphone count, wake detection, audio processing, and display together; check support against the firmware version used.](../../public/images/zh/doc-11-image-001.webp)](../../public/images/zh/doc-11-image-001.webp)

<figcaption>Chip and voice-capability selection chart. Consider microphone count, wake detection, audio processing, and display together; check support against the firmware version used.</figcaption>
</figure>

<a name="power"></a>

## 2. Power and noise {#power}

Evaluate peak loads from Wi-Fi/cellular transmission, playback, and backlight rather than idle current alone. Check regulator headroom, return paths, decoupling, connectors, and power switching. Distinguish supply ripple, digital coupling, grounding, and mechanical causes of audio noise.

Battery protection, charging, boost conversion, and operation while charging are separate functions. Define the path using [Battery power](./battery-power.md); a USB port does not imply all these capabilities.

<a name="acoustics"></a>

## 3. Microphone capture and playback {#acoustics}

Record microphone sensitivity, signal-to-noise ratio, power, and interface requirements. Check the acoustic opening, cavity, and orientation. Design the speaker together with its enclosure, limiting direct coupling into the microphone and feedback from enclosure vibration.

[AEC](../development/audio-and-aec.md) needs a real reference signal and appropriate isolation. More microphones or a software checkbox do not guarantee results. Design headphone/line outputs separately from speaker amplification; see [Audio output](./audio-output.md).

### Quantitative references for two microphones and the enclosure

These starting points come from the [AI product acoustic design reference (Chinese)](https://icnynnzcwou8.feishu.cn/docx/KCotdF4KgocDm0xqXcycBtGLnWe). They concern two-microphone arrays, echo references, and enclosure acoustics; they do not guarantee features on every breadboard. Check component data sheets, measurement conditions, and your product requirements together.

| Item | Reference condition |
| --- | --- |
| Two-microphone signal-to-noise ratio | At least 62 dB; preferably above 64 dB |
| Microphone sensitivity matching | Within ±2 dB; preferably ±1 dB for arrays |
| Microphone spacing | 4–6.5 cm, with similar mechanical and acoustic paths |
| Frequency response | Within ±3 dB over 50 Hz–16 kHz |
| MEMS microphone power-supply rejection | PSRR above 55 dB |
| Microphone opening | Diameter/width preferably above 1 mm; keep the path short and depth-to-diameter ratio below 4:1 |
| Echo-reference voltage | Within the ADC input range, without saturation or clipping at the maximum intended playback volume |

The reference test records at least 10 seconds with a fixed source roughly 0.5 m away at a 90 dB test sound level, aiming for no more than 3 dB amplitude difference between channels. Record the sound-level measurement position, instrument settings, and recording gain so runs can be compared. Compare spectra over 100 Hz–8 kHz before and after sealing the enclosure under the same conditions; the reference attenuation target is 25 dB, preferably 30 dB. These are that design reference's targets; product acceptance criteria must be defined for the actual product.

Isolate the microphone and speaker cavities and use suitable seals, foam, or vibration isolation to reduce internal leakage and mechanical coupling. See the measurement sequence below.

<a name="test"></a>

## 4. Design for production and maintenance {#test}

Provide an identifiable hardware revision, programming/debug interfaces, fault logs, and recovery path. Test conversation, playback, camera, peak network activity, and extended operation. Sleep, reconnection, and low battery require more than one startup test.

Record the test environment, volume, distance, enclosure revision, and pass criteria in the board README. After circuit changes, rerun previously passed tests. Another board with the same chip is not a substitute.

### Keep repeatable acoustic tests

Use the [Espressif Korvo-2 design information](https://docs.espressif.com/projects/esp-adf/en/latest/design-guide/dev-boards/user-guide-esp32-s3-korvo-2.html) and [ESP-ADF audio algorithm example](https://github.com/espressif/esp-adf/tree/master/examples/advanced_examples/algorithm) to inspect components and reference paths. Define pass conditions for your hardware and keep measurements:

1. **Array consistency:** fix the sound-source position and level, for example 0.5 m directly above the array. Play the same test signal and record every microphone for at least 10 seconds. Compare amplitude, sample rate, phase, and dropped frames.
2. **Enclosure isolation:** record a baseline, then temporarily seal the microphone opening and record again using the same source and gain. Compare spectra and attenuation in a tool such as Audacity. Repeat under the same conditions after changes to seals or vibration isolation.
3. **AEC reference:** keep microphone, playback-reference, and processed audio together. Check clipping, dropped frames, and channel/time alignment. Increase from low volume to the intended maximum while recording echo and interruption behavior.

These demonstrate a test sequence; reference-board values are not universal product pass criteria. Set voltage, sound-pressure, and microphone specifications from the chosen components and product requirements.

<a name="verify"></a>

## Verify the result {#verify}

A design review should trace every promised capability to the circuit, component documentation, and specific tests. A selection chart does not replace firmware compatibility checks, electrical specifications, or actual testing.

<a name="next"></a>

## Next steps {#next}

For parts, see [Choosing hardware](./choosing-hardware.md). To integrate firmware, see [Custom boards](../development/custom-board.md).
