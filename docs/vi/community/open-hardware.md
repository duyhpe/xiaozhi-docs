---
id: open-hardware
title: Community open hardware
description: 'Find original circuits, enclosures, authors, and matching firmware support.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-37
translation:
  status: review
  sourceHash: 57c08d391701659fd545bd4150caa26ef56da4fb6ff0657ae485e05a4dfab189
  reviewedAt: '2026-11-15'
---
# Community open hardware

Use this directory to find original designers, circuits, and mechanical files. Inclusion does not mean every board has been retested here. Check [supported boards](../hardware/supported-boards.md) for matching firmware.

<a name="projects"></a>

## Projects and authors {#projects}

| Project | Original author / maintainer | Original project |
| --- | --- | --- |
| Xmini-C3 development board | Xia Ge (虾哥) / tenclass01 | [OSHWHub](https://oshwhub.com/tenclass01/xmini_c3) |
| ESP32-S3 AI voice board | netero | [Design files](https://oshwhub.com/netero/esp32-s3-ai) |
| xiaozhi_c3_hardware | Kevincoooool | [GitHub](https://github.com/Kevincoooool/xiaozhi_c3_hardware) |
| S3 44/42-pin expansion board | surfer | [Design files](https://oshwhub.com/surferlong/esp32s3-xiaozhi-ai-chat-robot-de) |
| Wi-Fi/ML307 power expansion | Fancheng (凡诚) / banana8 | [Design files](https://oshwhub.com/banana8/xia-ge-zhuan-yong) |
| Moji XiaoZhi derivative | Amuxi (阿慕希) / movecall | [Design files](https://oshwhub.com/movecall/moji-xiaozhi-ai-derivative-editi) |
| ESP-SparkBot | Espressif (乐鑫小铁匠) / esp-college | [Project](https://oshwhub.com/esp-college/esp-sparkbot) |
| C3 enclosure | Anbin | [Mechanical design](https://oshwhub.com/anbin/xiao-zhi-ai-yu-yin-dui-hua-kai-fa-ban-c3) |

<a name="scope"></a>

## Decide whether a build is reproducible {#scope}

Inspect the actual public files and versions rather than relying on an “open source” label:

1. Are schematics, PCB/manufacturing files, and enclosure files available?
2. Which hardware revision do they describe, and which parts/interfaces match yours?
3. What use and redistribution does the license allow? How should authors and third-party assets be credited?
4. Is matching firmware available, with build commands, known issues, and recovery instructions?

If files exist only in a chat group or expired cloud link, ask the maintainer for a public entry point. Do not describe incomplete material as a fully reproducible project. Old prices, stock, and group numbers are not selection criteria.

<a name="contribute"></a>

## Contribute a project {#contribute}

Provide the project URL, author, hardware revision, license, file inventory, matching firmware, and a test report. Photos help identify a board; circuit details and dimensions remain defined by design files.

<a name="next"></a>

## Next steps {#next}

See [JLC's SF32 through-hole tutorial](https://openkits-wiki.easyeda.com/zh-hans/hspi-sf32lb52/training/xiaozhi-ai/) and the [storyteller conversion](./projects/astronaut-storyteller.md). When selecting parts, also read [Choosing hardware](../hardware/choosing-hardware.md). Directory order is not a commercial ranking.
