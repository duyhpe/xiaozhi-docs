---
id: mcp-gpio
title: Control a GPIO indicator with MCP
description: Reuse LampController and verify device-tool discovery and real output levels.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-33
translation:
  status: review
  sourceHash: 5a1c8a1dae664a931200baa5564943d60418a2b08599fba5eb28c382b3b96f74
  reviewedAt: '2026-11-15'
---
# Control a GPIO indicator with MCP

This example implements a **tool inside device firmware**, unlike a Python MCP service running on a computer. Start with a low-voltage indicator before controlling more complex peripherals.

<a name="scope"></a>

## Preparation {#scope}

Prepare a [custom board](./custom-board.md), an available output-capable GPIO, and an LED with suitable current limiting within GPIO voltage/current specifications. Do not drive a motor, high-power lamp, or relay coil directly from a GPIO.

Check boot strapping, USB, storage, and other peripheral assignments first. The example uses the v2.6.0 basic S3 assignment `LAMP_GPIO = GPIO_NUM_18`, only where no other extension uses GPIO18.

<a name="implementation"></a>

## 1. Reuse the existing example {#implementation}

Firmware provides [LampController](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/boards/common/lamp_controller.h), with corresponding registration in the basic breadboard. Read board initialization first to avoid registering duplicate tool names.

It initializes the output low and provides:

| Tool | Purpose |
| --- | --- |
| `self.lamp.get_state` | Read the maintained software lamp state |
| `self.lamp.turn_on` | Drive the output high |
| `self.lamp.turn_off` | Drive the output low |

Choose a verified pin in your board and keep the controller object alive for the tool callbacks. An active-low module needs a polarity adaptation; changing its display name is insufficient.

<a name="led-wiring"></a>

### Wire a low-current LED {#led-wiring}

Disconnect power, then connect **GPIO18 → 330Ω resistor → LED anode; LED cathode → GND**. A typical red LED's longer lead is usually positive and the flat package edge usually marks negative, but follow its datasheet. Do not omit the resistor.

<figure class="source-figure">

[![Basic S3 GPIO18 indicator wiring.](../../public/images/en/gpio-led-wiring.svg)](../../public/images/en/gpio-led-wiring.svg)

<figcaption>Basic S3 GPIO18 indicator wiring. Click to view full size.</figcaption>
</figure>

<a name="materials"></a>

### Board-code navigation demonstration {#materials}

Expand the recording to see directory navigation. It uses another IDE version and directory layout; locate current changes using the v2.6.0 links above.

<SourceMaterials article="DOC-33" />

<a name="tools"></a>

## 2. Register additional tools {#tools}

Follow the [firmware MCP guide](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/mcp-usage.md) for clear names, purposes, and bool/int/string parameters. Distinguish `AddTool` from `AddUserOnlyTool`: ordinary model-callable tools differ from privileged operations initiated by a user.

The firmware project maintains GPIO types, board registration, and protocol definitions. Use its versioned implementation rather than a separate copied C++ patch.

<a name="verify"></a>

## 3. Build, discover, and measure {#verify}

1. Build your board variant, inspect startup logs, and verify basic conversation first.
2. Confirm the tools in the service's device-tool discovery or conversation records. Device tools do not necessarily appear in the external Python MCP endpoint's list.
3. Explicitly request indicator on and off, observing both call results and actual output voltage/LED state.
4. Restart and check the default state. Repeated switching should not affect audio, display, or boot.

The example's returned software state is not physical load feedback. An independent sensing path is needed to establish whether a lamp actually lit.

<a name="next"></a>

## Next steps {#next}

For new wiring or hardware, return to [Custom boards](./custom-board.md). For computer/server tools, use the [MCP quickstart](../mcp/quickstart.md).
