---
id: custom-board
title: Custom boards and pin assignments
description: Give custom wiring its own board and build identity.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  The workflow was compared with the firmware custom-board guide. Configuration is a structural example; a new board
  still needs compilation and hardware tests.
translation:
  status: review
  sourceHash: 8e752fdfc94a59fa5cde5e0b63f558e36e3d578b3ba746ee08f78b581d2865ab
  reviewedAt: '2026-11-15'
---
# Custom boards and pin assignments

Changing pins involves more than GPIO numbers. Firmware must initialize audio, display, buttons, and power correctly, and identify the appropriate future update channel.

<a name="scope"></a>

## When to use a separate board {#scope}

| Change | Recommendation |
| --- | --- |
| Select an existing language, wake phrase, or display option | Use existing build arguments; no board copy needed |
| Use another already-defined configuration of the same circuit | Use its named variant in `config.json` |
| Change pins, Codec, display, power control, or PCB | Create a board or ask maintainers for a separately named variant |

::: warning Preserve a distinct firmware identity
Do not change a standard board's `config.h` while reporting the device as that board's standard firmware. A later OTA could select the original firmware and overwrite support for custom wiring. Identity is part of hardware integration.
:::

The [firmware v2.6.0 custom-board guide](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/custom-board.md) owns the complete code interfaces. This page describes the workflow rather than a separate board API specification.

<a name="hardware"></a>

## 1. Inventory the hardware {#hardware}

Record chip, Flash/PSRAM, schematic revision, display driver/address/size, audio Codec, power controls, buttons, and every GPIO. Check boot-strapping pins, Flash/PSRAM use, and USB assignments. An unused header position does not establish that a GPIO is available.

Check power and audio signals separately. GPIO voltage is not module supply voltage. MCU input/output directions must match the peripheral's opposite direction.

<a name="files"></a>

## 2. Choose a reference and create a directory {#files}

In your [local build environment](./build-firmware.md), check out the relevant firmware version and create a working branch. Choose a reference board with a similar chip, Codec, and display interface. Create an independent directory following the firmware guide.

| File | Responsibility |
| --- | --- |
| `config.h` | Pins, sample rates, and board constants |
| `*_board.cc` | Peripheral initialization, button behavior, and audio/display objects |
| `config.json` | Target chip, board type, and build variants |
| `README.md` | Schematic, hardware revision, wiring, build instructions, and test results |

Reuse appropriate code without compiling every board's files into the same target. Register the board in the version's Kconfig/CMake selection logic. A directory and JSON alone do not complete registration.

```text
main/boards/my-s3-prototype/
├── config.h                # Pins and constants
├── my_s3_prototype_board.cc # Initialization and board behavior
├── config.json             # Chip, board type, and variants
└── README.md               # Hardware revision, wiring, and tests
```

This is a directory example. Follow the corresponding version's board guide for Kconfig/CMake registration.

<a name="identity"></a>

## 3. Define a traceable identity {#identity}

Use stable names for your directory, board type, and variants. This `config.json` illustrates structure only, assuming code, registration, and drivers are already implemented:

```json
{
  "type": "my-s3-prototype",
  "target": "esp32s3",
  "builds": [
    {
      "name": "my-s3-prototype-oled32",
      "sdkconfig_append": ["CONFIG_OLED_SSD1306_128X32=y"]
    }
  ]
}
```

Variants in the same directory also need distinct `name` values and explicit configuration branches for their actual wiring/peripherals. A new name alone does not make mismatched initialization code suitable.

<figure class="source-figure">

[![From custom hardware to a distinct firmware identity.](../../public/images/en/custom-board-identity.svg)](../../public/images/en/custom-board-identity.svg)

<figcaption>From custom hardware to a distinct firmware identity. Click to view full size.</figcaption>
</figure>

<a name="build"></a>

## 4. Build and check partitions {#build}

After registration, confirm the board in the list and build your variant:

```sh
python scripts/build.py --list-boards
python scripts/build.py my-s3-prototype --name my-s3-prototype-oled32 --language zh-CN
```

Use `--language en-US` instead for English device resources. Check the generated chip, memory, board, and name. Choose a partition layout matching Flash capacity and firmware version. Do not simply delete `ota_0` or `ota_1` to make space. Partition changes affect resources, OTA, and NVS, and require a separate migration design.

See the [versioned OTA documentation](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/ota.md) for device reporting, update matching, and activation. Do not assign standard-board OTA to a custom device before confirming matching behavior.

<a name="verify"></a>

## 5. Test in stages {#verify}

1. Recheck wiring and power while disconnected, then verify startup, Flash, and PSRAM.
2. Test display, buttons, prompt audio, and microphone separately so failures can be isolated.
3. Test network, binding, and a full conversation, then selected wake and AEC features.
4. Check board and variant names in logs/task information. Confirm the update system can distinguish your device.
5. Test updates and recovery. Record layout, build arguments, and a recoverable complete image.

::: tip Completion check
Source rebuilds from clean configuration, the device reports its own identity, and hardware functions pass actual tests. The README identifies the applicable circuit, build command, and update limits.
:::

<a name="next"></a>

## Next steps {#next}

Submit the circuit, board description, and verification results with firmware contributions. The online builder supports a board after it enters the current option catalog. Until then, build locally.
