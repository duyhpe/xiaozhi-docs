---
id: faq
title: Troubleshooting by symptom
description: 'Isolate serial, boot, network, account, audio, display, and build problems with useful logs.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Troubleshooting paths were compared with v2.6.0 and the current Console implementation. Resolution of individual
  faults still requires device tests and community feedback.
translation:
  status: review
  sourceHash: 7e50176d1429c3a645f922f65cfe0c008c680825c33a4569f12d7810a669c585
  reviewedAt: '2026-11-15'
---
# Troubleshooting by symptom

Change one condition at a time. Identify where the failure occurs before changing configuration. Repeatedly flashing different board builds can turn one problem into several.

<a name="scope"></a>

## Find the failing stage {#scope}

| Where you are stuck | Start here |
| --- | --- |
| Computer cannot find the device or flashing fails | [Serial and flashing](#serial) |
| Flashing completes but the device does not boot or keeps restarting | [Startup and power](#boot) |
| No hotspot or network connection | [Provisioning and networking](#network) |
| Device code exists but binding fails | [Accounts and ownership](#account) |
| No sound, microphone input, or wake response | [Audio and wake words](#audio) |
| Blank, corrupted, or incomplete display | [Display](#display) |
| Local compilation fails | [Build environment](#build) |
| MCP tool missing or invocation fails | [MCP](#mcp) |

<a name="serial"></a>

## Serial and flashing {#serial}

**No serial port:** use a known data-capable cable and connect directly to the computer. Compare device lists before/after connection. Check USB-UART versus native USB and drivers against the board documentation. Then try [manual download mode](../firmware/flashing.md#download-mode).

**Port exists but connection fails:** close IDE monitors, serial tools, and other flashing pages, then reenter download mode. Two tools must not occupy the same port.

**Browser connection button missing or unsupported:** use desktop Chrome/Edge and HTTPS. Loading an ordinary page does not establish Web Serial support. Alternatively use [offline flashing](../firmware/flashing.md#offline).

<a name="boot"></a>

## Startup and power {#boot}

1. Disconnect power and check supply wiring, shorts between adjacent headers, and speaker outputs. Do not reverse polarity as a diagnostic test.
2. Use a reliable USB supply and short cable. Remove new battery/4G extensions and return to the basic setup first.
3. Capture startup logs with version, chip, Flash/PSRAM initialization, and the first error.
4. If resets occur only during playback or networking, check power, volume, and load first, especially for brownout logs.
5. For PSRAM, partition, or display-driver initialization failures, verify hardware against [Choosing firmware](../firmware/downloads.md#identify).

Use `idf.py -p <PORT> monitor` in a local development environment or a serial tool. The basic board generally uses 115200 baud; check other boards' instructions. Release the flashing port before monitoring, and redact Wi-Fi passwords, tokens, and personal identifiers before sharing logs.

<a name="network"></a>

## Provisioning and networking {#network}

**No Xiaozhi hotspot:** first check whether the build uses BluFi or another network method, then confirm provisioning mode. A missing hotspot alone does not establish antenna failure. Do not wrap wires around or touch the antenna to “improve” reception.

**Connected to the device hotspot but its page will not open:** confirm the phone is still on that hotspot, enter `http://192.168.4.1` directly, and check automatic network switching and VPN/proxy settings. See [Hotspot provisioning](../getting-started/wifi-and-binding.md#hotspot).

**Wi-Fi connected but conversation fails:** Wi-Fi association does not establish access to OTA/conversation services. Check router internet, DNS, and captive portals. Compare with a directly connected 2.4GHz phone hotspot.

**Changing networks:** use the board's reprovisioning procedure. Do not assume every version stores only one network or use a full-chip erase as the default fix.

<a name="account"></a>

## Accounts and ownership {#account}

| Problem | First action |
| --- | --- |
| SMS not received | Check country code, existing account, and page notices; new international accounts should follow the Google sign-in prompt |
| Incorrect code | Distinguish SMS codes from six-digit device codes; use the current code on the device |
| Device already bound | Ask the previous owner to [unbind it](./account-and-binding.md#unbind); if unreachable, [email an unbinding request](./account-and-binding.md#ownership) with device information |
| Cannot add to an existing agent | Read current device type/count limits and confirm the entry point and account |

Do not publish device codes, full MAC addresses, account phone numbers, or identity documents in public issues. If the previous owner is unreachable, follow the [email request steps](./account-and-binding.md#ownership); use the [batch spreadsheet](./account-and-binding.md#batch) for multiple devices. Reflashing does not remove server ownership.

<a name="audio"></a>

## Audio and wake words {#audio}

- **Prompts play but the device cannot hear you:** start with a button-initiated conversation. Check microphone power, data direction, L/R, and acoustic opening. See [Microphone wiring](../hardware/breadboard-esp32-s3.md#microphone).
- **Speech is recognized but there is no playback:** check volume, amplifier enable, DIN/BCLK/LRC, and load. Do not connect speaker outputs to common-ground headphones; see [Audio output](../hardware/audio-output.md).
- **Button conversation works but wake detection fails:** check whether wake detection is disabled and whether the model matches chip/memory. C3 and S3 use different models; not all C3 devices lack wake support.
- **Want to change the wake phrase:** first check compatible options in the [online builder](../firmware/online-builder.md#configure). Custom phrases also depend on chip, PSRAM, and configuration; arbitrary text entry is not available for every board.
- **Echo remains with AEC enabled:** check reference audio and the supported hardware path. A compile option does not replace circuit and acoustic design; see [firmware audio configuration](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/Kconfig.projbuild).

BluFi provisions Wi-Fi; it does not imply Bluetooth-headphone support.

### Change the persona, voice, or recognized speaker

- Change the assistant name, voice, or language model using the [Console steps](../console/index.md#role-and-voice), save, then start a new conversation.
- Help the agent recognize family members or other speakers using the [speaker recognition steps](../console/index.md#speaker-recognition): select a recording and enter a name and description.
- Change the offline wake word using [Wake words](../development/wake-words.md). Changing the persona name does not change the wake word.

<a name="display"></a>

## Display {#display}

For a blank display, check model/driver → power → I2C/SPI pins → address/resolution → firmware variant. SSD1306 128×32, 128×64, SH1106, and SPI LCDs require different configurations.

If sound works but display does not, save logs before assuming MCU damage. Onboard RGB pins can differ by hardware revision, so one color is not a universal error code.

<a name="build"></a>

## Build environment {#build}

For XiaoZhi v2.6.0, ESP-IDF 6.0.1 is the minimum and `release/v6.1` is recommended. Do not mix IDF 5.x environments, old `sdkconfig`, and new source. After switching SDKs, clean and reconfigure using [Local builds](../development/build-firmware.md).

For Windows Ninja `CreateProcess` errors caused by command-line length, use the build guide's response-file procedure. Disabling security software is not a general fix.

<a name="mcp"></a>

## MCP tools {#mcp}

Check local tool startup → bridge endpoint connection → Console discovery → actual conversation invocation. Wrong agent endpoints, process exits, and logs mixed into stdout can break integration. See [MCP troubleshooting](../mcp/quickstart.md#troubleshooting).

See [Serial logs](./serial-logs.md) for full capture steps and [Sign-in and unbinding](./account-and-binding.md) for ownership problems.

<a name="verify"></a>

## Record these details before reporting {#verify}

Include the page URL, actual steps, expected/actual results, chip and board variant, firmware version, power arrangement, and redacted error logs. For wiring, include clear silkscreen photos taken with power disconnected.

<a name="next"></a>

## Next steps {#next}

Return to [Getting started](../getting-started/index.md) and repeat the relevant stage. If still unresolved, use the page's feedback link and explain which step cannot be reproduced.
