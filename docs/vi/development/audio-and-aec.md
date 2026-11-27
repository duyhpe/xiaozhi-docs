---
id: audio-and-aec
title: Audio processing and echo cancellation
description: 'Identify device/server processing and reference audio, then test actual conversation.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-21
translation:
  status: review
  sourceHash: 44cd49754f837d982b007ca0cc5e946e4a35f0cd485f5d77e716aa3db2ee6c07
  reviewedAt: '2026-11-15'
---
# Audio processing and echo cancellation

AEC reduces the effect of a device's playback being picked up again by its microphone. Results depend on the signal path, reference audio, acoustics, and firmware/service support, beyond enabling an option.

<a name="scope"></a>

## Identify the path {#scope}

| Approach | Required checks |
| --- | --- |
| Device-side AEC | Chip/PSRAM, AFE, board support, and a clean playback reference |
| Server-side AEC | Firmware uplink processing and explicit server support; the current configuration is marked unstable |
| No AEC | First establish basic audio using buttons or another interaction mode |

This guide follows the [versioned repository Kconfig](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/Kconfig.projbuild). Support changes by version; check that version's dependencies first.

<figure class="source-figure">

[![The two audio paths compared by AEC.](../../public/images/en/aec-reference-path.svg)](../../public/images/en/aec-reference-path.svg)

<figcaption>The two audio paths compared by AEC. Click to view full size.</figcaption>
</figure>

This shows signal relationships, not a circuit for adding a microphone or wires. The board and Codec implementation determine the reference input's actual source.

<a name="baseline"></a>

## 1. Establish basic audio {#baseline}

Disable unnecessary custom processing. Starting at low volume, test prompt audio, recording, and conversation. Check for blocked microphones, a speaker aimed directly at the microphone opening, and mechanical vibration coupling. Record a baseline without AEC.

Two microphones do not automatically provide a playback reference. Another microphone alone cannot replace the reference circuit.

<a name="configure"></a>

## 2. Configure for the board {#configure}

In the [online builder](../firmware/online-builder.md), select only audio capabilities offered for that board. For local builds, choose the correct board before checking `Enable AFE Audio Processing` and device/server AEC dependencies.

Current device-side AEC requires a supported chip, PSRAM, AFE, and board, with reference audio supplied by the corresponding hardware. Do not remove Kconfig dependencies to force it on a board without a reference path.

See [Local builds](./build-firmware.md) for the environment and configuration process.

### Enable and install it locally

1. Complete a baseline build for the exact board using [Local builds](./build-firmware.md#build), then run `idf.py menuconfig` in that firmware directory.
2. Under **Xiaozhi Assistant**, check **Enable AFE Audio Processing**, then select **Enable Device-Side AEC**. You can press `/` to search for `USE_AUDIO_PROCESSOR` and `USE_DEVICE_AEC`. If an option is unavailable, inspect its dependencies instead of selecting a different board to expose it.
3. Press `S`, confirm the configuration filename, and exit. Build and flash with these commands, replacing `COM5` with your port:

```sh
idf.py build
idf.py -p COM5 flash monitor
```

4. After restart, check the running version and perform the comparison below. Selecting an option without rebuilding and flashing does not change the device firmware. For server-side AEC, first confirm server support and follow **Enable Server-Side AEC (Unstable)** verification requirements.

<a name="test"></a>

## 3. Compare under the same conditions {#test}

1. Record firmware, volume, distance, enclosure, and power supply.
2. In a quiet room, check whether playback causes false wakes or is recognized as user speech.
3. On supported hardware, enable the chosen AEC path and repeat without changing other conditions.
4. Add the intended background noise and volume, checking missed recognition, interruption, and sustained feedback.

Successful compilation or audible answers alone do not prove echo cancellation. AEC, VAD, and conversation interruption operate at different layers; observe them separately.

::: tip Completion check
Identify the actual reference/processing path and show before/after results under the same conditions. UI appearance and microphone count do not establish performance.
:::

<a name="next"></a>

## Next steps {#next}

For acoustics and hardware, see [Design considerations](../hardware/design-guidelines.md). For triggering behavior, see [Wake words](./wake-words.md). Check option locations and dependencies for your firmware and ESP-IDF versions.
