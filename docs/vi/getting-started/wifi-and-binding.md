---
id: wifi-and-binding
title: Connect and bind your device
description: Connect the device to a network and bind it to your XiaoZhi Console account using its six-digit code.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Hotspot/BluFi provisioning and the six-digit code were checked against the source. Different phones, boards, and the
  live binding flow still need community testing.
translation:
  status: review
  sourceHash: 59da7afeee7126ddfc6b19bd2aa7772c14f3bb06ffba5dad51a2fa3353e30f04
  reviewedAt: '2026-11-15'
---
# Connect and bind your device

First connect the device to a network, then enter its device code in your XiaoZhi Console account. You can start your first conversation after both steps are complete.

<a name="scope"></a>

## Before you begin {#scope}

- A device with matching firmware and a stable power supply. If unsure, start with the [flashing guide](../firmware/flashing.md).
- An available network. The basic ESP32-S3 Wi-Fi build in this guide uses 2.4 GHz Wi-Fi or a phone hotspot, not a campus or guest network that requires a second login through a web page.
- A phone or computer that can open the [XiaoZhi Console](https://xiaozhi.me/console/).

Check whether the firmware was built for **hotspot provisioning** or **BluFi**. These are separate paths, not necessarily two buttons you can switch between after installation. For 4G or SF32 Bluetooth PAN devices, follow the board's networking instructions.

<a name="enter-mode"></a>

## 1. Enter provisioning mode {#enter-mode}

A device with no saved Wi-Fi credentials normally enters provisioning mode on startup. Follow its display and spoken prompts; one LED color does not mean the same thing on every device.

For the [basic S3 board in this guide](../hardware/breadboard-esp32-s3.md), a configured device can request provisioning with a **short press of BOOT during startup after a restart**. Release the button once provisioning starts. Other boards may use a long press, double press, or menu; consult their instructions.

You do not need to hold BOOT while pressing RESET here. That combination enters the ROM download mode used for flashing.

<a name="hotspot"></a>

## 2A. Provision through the device hotspot {#hotspot}

1. Find and connect to the Wi-Fi hotspot announced by the device. Its name normally starts with Xiaozhi; use the exact name shown or spoken by your device.
2. If the phone reports “no internet,” keep the connection instead of immediately switching to another Wi-Fi network.
3. In the provisioning page that opens automatically, select the target router or phone hotspot, enter its password, and save.
4. If the page does not open automatically, enter the address announced by the device in the browser's address bar. For this version, the default hotspot address is `http://192.168.4.1`. This is a local device page, not the XiaoZhi website.
5. Wait for the device to join the target network. Then switch your phone back to a network with internet access and open the Console.

Automatic network switching, a VPN, or a proxy may interfere with the local device address. First check that the phone is still connected to the device hotspot, then check those settings. The local hotspot does not need to be forced to use HTTPS.

<figure class="source-figure">

[![After saving the hotspot settings, wait for the device to restart and join the target network. Account binding is not complete yet.](../../public/images/zh/doc-09-image-006.webp)](../../public/images/zh/doc-09-image-006.webp)

<figcaption>After saving the hotspot settings, wait for the device to restart and join the target network. Account binding is not complete yet.</figcaption>
</figure>

For a phone hotspot used as a test network, check that it uses 2.4 GHz. On iPhone, enable **Maximize Compatibility** under Settings → Personal Hotspot; on other phones, select 2.4 GHz in the hotspot settings.

<a name="blufi"></a>

## 2B. Provision with BluFi {#blufi}

Use this path only if BluFi is enabled in the firmware and supported by the board:

1. Install EspBlufi from an official Espressif channel. Enable Bluetooth on the phone and grant the scanning/connection permissions requested by the operating system.
2. Scan in the client and select the advertised name for your board.
3. Follow the client prompts to select the target Wi-Fi network, enter its password, and submit. Observe the connection result.
4. Once the device is online, return to an internet-connected network and continue binding.

Pairing in the phone's system Bluetooth list alone does not complete Wi-Fi provisioning. Advertised names and client screens can change with the firmware or SDK. See the [firmware BluFi guide](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/blufi.md) for details.

<a name="bind"></a>

## 3. Enter the six-digit device code {#bind}

1. Wait for the device to obtain its online configuration and display or announce a **six-digit device code**. If no code appears, press its conversation button once to trigger an interaction, then watch the display or logs.
2. Open the [Console](https://xiaozhi.me/console/) and sign in using the available phone or Google option. For an unregistered international phone number, follow the page's Google sign-in guidance rather than repeatedly waiting for an SMS.
3. On the agent page, select **Add device**, enter the six-digit code currently shown by the device, and submit.
4. To add it to an existing agent, follow the prompts in that agent's device management. Limits may vary by device type; follow the dialog.
5. After binding succeeds, wait for activation to finish. If needed, briefly press the conversation button or restart the device, then start a conversation.

The device code is not an SMS code, MAC address, or product serial number. Do not post it publicly for someone else to bind the device for you.

<figure class="source-figure">

[![Network connection and account binding are separate steps.](../../public/images/en/device-binding-flow.svg)](../../public/images/en/device-binding-flow.svg)

<figcaption>Network connection and account binding are separate steps. Click to view full size.</figcaption>
</figure>

<a name="verify"></a>

## Check that it worked {#verify}

::: tip Success checks
The Console lists your device, the device stops repeatedly requesting a code, and the button or configured wake word starts a conversation with an audible reply.
:::

<a name="troubleshooting"></a>

## Troubleshooting {#troubleshooting}

| Symptom | What to check |
| --- | --- |
| No device hotspot | Check whether this is a BluFi/4G build, whether provisioning mode is active, the power supply, and startup logs. Do not try to fix it by wrapping or touching the antenna |
| Cannot open 192.168.4.1 | Check that the phone is still on the device hotspot, the address was not entered as a search query, and automatic network switching/VPN settings |
| Home Wi-Fi is missing | For the basic S3 build, first test a 2.4 GHz network that accepts a password directly |
| Wi-Fi connected but no device code | Check internet access, device time and OTA requests; save the relevant logs |
| Invalid or expired device code | Use the newly displayed code, not a code from an old photo |
| Device belongs to another account | Ask the previous owner to [unbind it](../faq/account-and-binding.md#unbind); if unreachable, [email an unbinding request](../faq/account-and-binding.md#ownership) instead of repeatedly reflashing |

<a name="next"></a>

## Next steps {#next}

Choose the agent's language, role, and voice in the Console. Continue with [MCP quick start](../mcp/quickstart.md) for tools, or use [troubleshooting](../faq/index.md) if something fails.

Firmware provisioning behavior is defined by the [v2.6.0 Wi-Fi implementation](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/boards/common/wifi_board.cc).
