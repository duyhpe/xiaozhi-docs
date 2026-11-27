---
id: custom-prompts
title: Customize device prompt sounds
description: Replace prompts through the locale and OGG/Opus resource pipeline.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-42
translation:
  status: review
  sourceHash: 892f462117a1d13caf9104e572a5b5f3885b051cd73612c71dced7501ca15b5b
  reviewedAt: '2026-11-15'
---
# Customize device prompt sounds

Startup and provisioning sounds are firmware resources. They differ from the server-synthesized answer voice, and changing a file extension does not replace them correctly.

<a name="scope"></a>

## Version baseline {#scope}

This guide covers firmware v2.6.0 `main/assets/locales/` and [gen_lang.py](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/scripts/gen_lang.py). Default resources read OGG. For the older P3 workflow, see [Legacy P3 prompts](./archive/p3-prompts.md).

<a name="audio"></a>

## 1. Prepare source audio {#audio}

Keep the original recording. Listen for clipping, noise, and excessive silence. Identify the target locale and existing sound name. UI translations, wake models, and prompt sounds are separate resources.

<a name="convert"></a>

## 2. Convert the format {#convert}

Use the Opus parameters in the [same-version conversion script](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/scripts/mp3_to_ogg.sh), for example:

```sh
ffmpeg -i input.wav -c:a libopus -b:a 16k -ac 1 -ar 16000 -frame_duration 60 output.ogg
```

These are parameters used by this firmware version, not universal requirements for every Opus player. Listen again after conversion and check duration, sample rate, channels, and decoding.

<a name="build"></a>

## 3. Use the resource-generation pipeline {#build}

Replace one existing prompt first rather than changing event names and call sites at the same time. For a Simplified Chinese provisioning prompt, on your firmware working branch:

1. Back up `main/assets/locales/zh-CN/wificonfig.ogg` and confirm it represents the intended provisioning event.
2. Put converted `output.ogg` at that path, keeping the name `wificonfig.ogg`.
3. Follow [Local builds](./build-firmware.md), select your board, and rebuild with `--language zh-CN`. The build collects that locale's `.ogg` files, generates language headers, and embeds audio.
4. Install this build, enter provisioning on the device, and listen to the actual event. Then replace other sounds one at a time.

For English prompts, use the matching file in `main/assets/locales/en-US/` and build with `--language en-US` instead.

Replacing existing audio does not require changing UI text in `language.json`. This version falls back to `en-US` for missing locale audio. New events or filenames require corresponding call-site and generation changes; consult the same-version implementation.

Do not edit only generated files such as `main/assets/lang_config.h`; regeneration can overwrite them. Resource packaging, partition capacity, and playback interfaces remain defined by the firmware implementation.

<a name="verify"></a>

## Verify the result {#verify}

Generate firmware from a clean build and test that the actual event plays the right sound for the target locale. Check that other locales, wake behavior, and conversation audio were not changed accidentally. Keep source audio, conversion commands, and build version rather than only a generated binary.
