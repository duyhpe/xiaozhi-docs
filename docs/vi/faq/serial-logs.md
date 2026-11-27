---
id: serial-logs
title: Capture startup and fault logs
description: 'Use the correct port and record context before, during, and after a failure.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-23
translation:
  status: review
  sourceHash: 88dcd7c252f906b9cfe4ae231557e3a19a4e14db5afce4dfbce1165997ba1a4c
  reviewedAt: '2026-11-15'
---
# Capture startup and fault logs

Logs distinguish startup, networking, activation, and audio failures. Capture first, then change conditions. The last line alone often misses the cause.

<a name="scope"></a>

## Preparation {#scope}

Prepare a data cable and suitable serial tool. Identify native USB versus a USB-UART bridge. Obtain drivers from the board or chip manufacturer; a historical driver bundled with one tool is not required for every device.

<a name="port"></a>

## 1. Find the port {#port}

Compare port lists before and after connecting the device. Windows offers Device Manager; on macOS/Linux, use your tool's serial-port list. Identify the connection by USB/UART labels and manufacturer instructions rather than “left” or “right” port.

Ports can change between ROM download mode and application runtime. Capture the normal-startup port. A visible port alone does not establish running firmware.

<figure class="source-figure">

[![Finding a serial port in Windows Device Manager. COM numbers vary by computer.](../../public/images/zh/doc-23-image-001.webp)](../../public/images/zh/doc-23-image-001.webp)

<figcaption>Finding a serial port in Windows Device Manager. COM numbers vary by computer.</figcaption>
</figure>

<a name="capture"></a>

## 2. Connect and restart {#capture}

1. Close flashing pages, IDE monitors, and terminals occupying the port.
2. Select the port. The basic board generally uses **115200 baud, 8 data bits, no parity, 1 stop bit**; check other boards' configurations.
3. Open the port, briefly press RESET/EN, and capture from startup.
4. Reproduce the problem once and retain context before, during, and after it.
5. Export plain text with hardware, firmware version, and actual steps.

With ESP-IDF installed, use:

```sh
idf.py -p COM5 monitor
```

Replace `COM5` with your port and exit with Ctrl+]. You do not need to install a whole SDK just for logs. Alternatively, use [pySerial miniterm](https://pyserial.readthedocs.io/en/latest/tools.html#module-serial.tools.miniterm): install `pyserial` in a separate Python environment, then run `python -m serial.tools.miniterm COM5 115200` with your actual port. Exit with Ctrl+].

### No serial tool installed: install and run miniterm

Install Python 3 for your system from [python.org](https://www.python.org/downloads/). Create an empty directory and run one group of commands in its terminal. Windows uses `py -3`; macOS/Linux uses `python3`. Neither group requires activating a script:

::: code-group

```powershell [Windows PowerShell]
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install pyserial
.\.venv\Scripts\python.exe -m serial.tools.list_ports -v
.\.venv\Scripts\python.exe -m serial.tools.miniterm COM5 115200
```

```sh [macOS / Linux]
python3 -m venv .venv
.venv/bin/python -m pip install pyserial
.venv/bin/python -m serial.tools.list_ports -v
.venv/bin/python -m serial.tools.miniterm /dev/ttyACM0 115200
```

:::

Read the port list first, then replace `COM5` or `/dev/ttyACM0` in the final command with your port. macOS ports often resemble `/dev/cu.usbmodem…` or `/dev/cu.usbserial…`; these are examples only. Once connected, briefly press RESET/EN. Press **Ctrl+]** to exit and release the port.

- **No output:** check the logging port and normal running mode, then press RESET/EN; do not enter ROM download mode.
- **Garbled text:** check baud rate and encoding; disable HEX display in graphical tools.
- **Port busy:** close flashers, other serial tools, and IDE monitors, then reconnect.

For MAC lookup, follow [Get device information](./account-and-binding.md#device-information) to distinguish the STA address, hotspot address, UUID, and binding code.

<a name="read"></a>

## 3. What to inspect first {#read}

| Stage | Look for |
| --- | --- |
| Startup | Chip, version, board, Flash/PSRAM, partitions, and first initialization error |
| Network | Scans, connections, disconnects, repeated provisioning |
| Activation/OTA | HTTP status and activation state; keep credentials private |
| Conversation | Connection, recording, playback, tool calls, and where resets occur |

Keep unfamiliar errors verbatim. Do not discard the first failure while retaining only cascading errors.

<a name="verify"></a>

## Verify the result {#verify}

The text includes startup version and reproducible fault context, allowing another person to follow the sequence. Redact Wi-Fi passwords, endpoint tokens, phone numbers, and unnecessary device identifiers. Screenshots do not replace copyable error text.

<a name="materials"></a>

## Tools and next steps {#materials}

Download serial tools from their maintainers' official releases. For writing firmware, return to [Flashing](../firmware/flashing.md). Do not type random control commands into the serial window.
