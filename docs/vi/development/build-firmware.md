---
id: build-firmware
title: Set up a local firmware build
description: 'Match ESP-IDF and firmware, select a board, build, flash, and inspect logs.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Commands and board arguments were compared with v2.6.0. ESP-IDF was not installed and a complete cross-compilation was
  not run on this machine; platform test results are welcome.
translation:
  status: review
  sourceHash: b70a50c29d9166e5c8b27eda4fd85a2d8d50f163c375b4353dfe8166026febb2
  reviewedAt: '2026-11-15'
---
# Set up a local firmware build

Set up locally when changing source code, pins, or hardware support. For an existing board, start with the [online builder](../firmware/online-builder.md).

<a name="scope"></a>

## Versions and preparation {#scope}

This guide uses **XiaoZhi firmware v2.6.0**. Its [versioned README](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/README.md) requires ESP-IDF 6.0.1 or later and recommends the **`release/v6.1` branch**. Use that branch rather than the `v6.1` release tag because of a known C3 issue.

Prepare Git, a Python version supported by ESP-IDF, and system build dependencies. Windows, Linux, and macOS prerequisites differ; follow [Espressif's installation guide](https://docs.espressif.com/projects/esp-idf/en/stable/esp32s3/get-started/index.html) for your platform first. The examples below target ESP32-S3.

<figure class="source-figure">

[![Local build directories and workflow.](../../public/images/en/firmware-build-flow.svg)](../../public/images/en/firmware-build-flow.svg)

<figcaption>Local build directories and workflow. Click to view full size.</figcaption>
</figure>

<a name="install"></a>

## 1. Install and activate ESP-IDF {#install}

Clone the SDK in a workspace of your choice. If a directory already exists with that name, check it before proceeding rather than overwriting it.

```sh
git clone --branch release/v6.1 --recursive https://github.com/espressif/esp-idf.git
cd esp-idf
```

Install tools for the target and activate the environment:

::: code-group

```powershell [Windows PowerShell]
.\install.ps1 esp32s3
.\export.ps1
```

```sh [macOS / Linux]
./install.sh esp32s3
. ./export.sh
```

:::

Activate the appropriate SDK in every new terminal. With an installation manager or IDE, open that installation's ESP-IDF terminal and confirm the selected branch rather than an older SDK.

```sh
idf.py --version
git rev-parse HEAD
```

Run the second command in the SDK directory to record its exact commit. Branches advance; the commit makes a problem reproducible. Install the relevant toolchain when changing to C3 or another target.

<a name="source"></a>

## 2. Get firmware source {#source}

Return to your project workspace and use the fixed release tag:

```sh
git clone --branch v2.6.0 https://github.com/78/xiaozhi-esp32.git
cd xiaozhi-esp32
git describe --tags --always
```

Checking out tag `v2.6.0` normally leaves a detached HEAD. Create your own working branch before saving source changes.

<a name="build"></a>

## 3. List boards and build {#build}

In the firmware repository root, with ESP-IDF activated, run:

```sh
python scripts/build.py --list-boards
python scripts/build.py --list-languages
```

Identify your board directory and build variant. This command applies only to the [basic S3 with a 128×32 OLED](../hardware/breadboard-esp32-s3.md):

```sh
python scripts/build.py bread-compact-wifi --name bread-compact-wifi --language zh-CN
```

This example builds Simplified Chinese device resources. For English resources, select `en-US` from the language list and use `--language en-US` instead. Website language and device firmware language are separate choices.

The script uses the board's `config.json` to select the target and variant, then generates artifacts. For another board, use its directory and variant. Do not change a sample board's pins while retaining its standard firmware identity.

To choose a wake phrase, resolve components and list available models first:

```sh
idf.py reconfigure
python scripts/build.py --list-wake-words
```

`--wake-word` accepts compatible model names, `nihaoxiaozhi`, or `disabled`. The model must match chip and memory resources. See the [versioned custom-board guide](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/custom-board.md) for full arguments and capabilities.

<a name="flash"></a>

## 4. Check artifacts and flash {#flash}

After a successful build, record version and variant. The default complete image is `build/merged-binary.bin`. Add `--zip` to the build command for a distribution package in `releases/`.

With the matching device connected, flash and monitor using this build's configuration. Replace the example port with your own:

```sh
idf.py -p COM5 flash monitor
```

On macOS/Linux, use your `/dev/…` port. Exit the monitor with **Ctrl+]** and release the port before reflashing. When distributing an image for another tool, follow [image-type instructions](../firmware/flashing.md#image-types); do not guess application offsets.

<a name="troubleshooting"></a>

## SDK changes and Windows troubleshooting {#troubleshooting}

**After changing the SDK commit:** update SDK submodules and rerun the relevant install/activation scripts. In the firmware directory, clean the build and reselect the board. `fullclean` cleans build output; it does not fix the wrong board or mixed SDK terminals.

```sh
# In the SDK directory
git submodule update --init --recursive
# Reactivate the SDK, then return to the firmware directory
idf.py fullclean
```

**Windows command line too long:** in the failing project and ESP-IDF terminal, enable response files and rebuild:

```powershell
idf.py -D CMAKE_NINJA_FORCE_RESPONSE_FILE=ON reconfigure
idf.py build
```

Enable it again after clearing CMake's cache. A shorter project path may help path problems, but the system's long-path option does not directly increase the whole command-line length limit. Do not disable security software to hide an undiagnosed build error.

<a name="verify"></a>

## Verify the result {#verify}

::: tip Completion check
The build succeeds, startup logs show the intended firmware and board, and display, audio, provisioning, and a conversation work. Generating a `.bin` alone does not verify hardware support.
:::

<a name="next"></a>

## Next steps {#next}

Before changing pins, read [Custom boards](./custom-board.md). For runtime problems, collect details using [Troubleshooting](../faq/index.md), then report firmware and SDK commits and the first actual error.
