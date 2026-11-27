---
id: wake-words
title: Choose and change wake words
description: 'Select preset, custom, or external wake detection for your chip, memory, and model.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-22
translation:
  status: review
  sourceHash: 746701523768c32240eda2a3073c2a323ce90f3a86d496aed8ba121888f0417b
  reviewedAt: '2026-11-15'
---
# Choose and change wake words

Make button-initiated conversation work before configuring wake detection. Changing the agent's name, a device prompt sound, and an offline wake phrase are separate operations.

<a name="scope"></a>

## Choose an approach {#scope}

| Path | Main firmware requirements |
| --- | --- |
| Preset WakeNet | Compatible target-specific model; C3/C5/C6 use lightweight models |
| AFE + WakeNet | Supported chip such as S3/P4/S31, plus PSRAM and build requirements |
| Onboard custom phrase | The current MultiNet custom path requires a supported chip and PSRAM |
| External ASR | Independent speech module, compatible levels/triggers, and board integration |

This is a starting point, not a complete model-support table. The [versioned Kconfig](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/Kconfig.projbuild) and resolved ESP-SR models determine actual support.

<figure class="source-figure">

[![Check requirements before choosing a wake-detection path.](../../public/images/en/wake-word-choice.svg)](../../public/images/en/wake-word-choice.svg)

<figcaption>Check requirements before choosing a wake-detection path. Click to view full size.</figcaption>
</figure>

<a name="online"></a>

## 1. Use the online builder {#online}

Open the [firmware builder](../firmware/online-builder.md), select the exact board, then an available wake phrase or disable it. The absence of arbitrary text entry does not indicate a failure; the service offers build options compatible with that board.

<a name="preset"></a>

## 2. List preset models locally {#preset}

Set up the [build environment](./build-firmware.md), configure the board, and resolve components before listing models:

```sh
idf.py reconfigure
python scripts/build.py --list-wake-words
```

`--wake-word` accepts compatible model names, `nihaoxiaozhi`, `hiesp`, or `disabled`. The script handles language/model defaults. Do not apply an S3 `wn9_*` model name directly to C3.

For example, the basic S3 / 128×32 OLED setup can explicitly select its default wake word. This is not a build command for other boards:

```sh
python scripts/build.py bread-compact-wifi --name bread-compact-wifi --language zh-CN --wake-word nihaoxiaozhi
idf.py -p COM5 flash monitor
```

Replace the serial port. This example builds Chinese-language firmware; change the supported language when needed. To select another word, use a compatible model name from the list above for `--wake-word`.

<a name="custom"></a>

## 3. Configure a custom phrase {#custom}

In the configured firmware directory, run `idf.py menuconfig` and open the wake options under `Xiaozhi Assistant`. Where supported, select `Multinet model (Custom Wake Word)`. `Custom Wake Word` uses space-separated Pinyin, such as `xiao tu dou`; set its display name separately. Establish a baseline with default thresholds before adjusting for false wakes and missed wakes.

A more sensitive threshold is not necessarily better. Compare quiet rooms, background noise, device playback, and repeated attempts. Check available resources and model compatibility as well.

After editing a custom word, press `S` to save and exit. Run `idf.py build` with the same build configuration, then install with `idf.py -p COM5 flash monitor` using your actual port. The change takes effect only after rebuilding and flashing.

<a name="verify"></a>

## 4. Install and test {#verify}

Restart after flashing and confirm the intended variant and phrase. Test buttons, near/far distances, normal volumes, after sleep, and during playback separately. Wake/interrupt behavior during conversation has separate configuration; one idle wake does not establish support in every state.

<a name="next"></a>

## Next steps {#next}

Available phrases and custom capabilities depend on chip, memory, and model. Query the configuration above first. Resource-constrained devices may use [External ASR](../hardware/external-wake-module.md); check existing onboard capabilities before buying another module.
