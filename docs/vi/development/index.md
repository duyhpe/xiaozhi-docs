---
id: development
title: Development guides
description: Start with a reproducible build and give custom hardware its own firmware identity.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
translation:
  status: review
  sourceHash: 26f1f1ecc6c3dcd85145fc155c130b4cc7c83640ea78c7a5da9159cc0ae2d9f6
  reviewedAt: '2026-11-15'
---
# Development guides

Pin firmware and SDK versions, complete a basic build, then customize boards, audio, or tools. The firmware repository maintains code contracts and full technical specifications by version.

<a name="guides"></a>

## Choose a guide {#guides}

| Guide | What it covers |
| --- | --- |
| [Local build environment](./build-firmware.md) | Match ESP-IDF and firmware, list boards, build, flash, and read logs. |
| [Custom boards and pins](./custom-board.md) | Give custom wiring its own board and build identity to avoid standard-firmware replacement. |
| [Audio processing and AEC](./audio-and-aec.md) | Distinguish device/server processing and reference audio, then test conversation. |
| [Wake words](./wake-words.md) | Choose preset, custom, or external recognition for your chip, memory, and model. |
| [Control GPIO with MCP](./mcp-gpio.md) | Reuse LampController and verify device-tool discovery and output levels. |
| [Prompt sounds and language resources](./custom-prompts.md) | Replace sounds through the locale and OGG/Opus generation pipeline. |
| [Legacy P3 prompts](./archive/p3-prompts.md) | Maintain older firmware; this is not the current default resource workflow. |

<a name="next"></a>

## Reading and feedback {#next}

These guides are open for community review. Report problems through the feedback link at the end of a page, including firmware version, board, and reproducible steps.
