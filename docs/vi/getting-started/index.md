---
id: getting-started
title: Getting started with XiaoZhi
description: Choose a path from powering on your device to your first conversation.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
translation:
  status: review
  sourceHash: d0dc0c635cb61171a1cd6a755aea835a7cba5568daa7be6413f7e5223f851774
  reviewedAt: '2026-11-15'
---
# Getting started with XiaoZhi

The goal is simple: connect the device to the internet, bind it to your account in the Console, and hear its first reply.

<a name="choose-path"></a>

## Start with your device {#choose-path}

| What you have | First step |
| --- | --- |
| A finished device with firmware installed | Power it on as instructed by the board maker, then [connect and bind it](./wifi-and-binding.md) |
| A blank development board with compatible peripherals | Confirm the model, then [build and flash online](../firmware/online-builder.md) |
| A build you want to wire from scratch | Gather the parts for the [basic ESP32-S3 breadboard build](../hardware/breadboard-esp32-s3.md) |
| Custom pins or your own PCB | Create a separate adaptation using [custom board support](../development/custom-board.md) |

<a name="first-conversation"></a>

## Four steps to your first conversation {#first-conversation}

1. **Identify the hardware:** confirm the chip, board model, display, and audio specifications.
2. **Prepare the firmware:** for most devices, use the [official online builder and flasher](https://xiaozhi.me/console/firmware-builder), following the [online guide](../firmware/online-builder.md). Boards without an exposed USB download interface need their board-specific method; see the [exceptions](../firmware/flashing.md#prepare).
3. **Connect to a network:** complete [hotspot or BluFi provisioning](./wifi-and-binding.md).
4. **Bind and talk:** enter the six-digit device code in the Console, then press the conversation button or use the configured wake word.

::: tip Already having conversations?
Try the [MCP calculator](../mcp/quickstart.md), or power the device from a [USB power bank](../hardware/battery-power.md) for portable use.
:::

<a name="troubleshooting"></a>

## If something goes wrong {#troubleshooting}

Use [troubleshooting](../faq/index.md) to isolate serial, power, network, binding, or audio problems. Report the exact step where you got stuck; that is easier to diagnose than “it does not work.”

The guides are open for community review. Use the feedback link at the bottom of a guide to suggest a correction.
