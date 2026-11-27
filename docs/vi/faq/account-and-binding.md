---
id: account-and-binding
title: 'Sign in, recover an account, and unbind devices'
description: 'Recover your account, unbind your own device, or request help with a device bound to someone else.'
status: review
reviewedAt: '2026-11-15'
reviewNote: 'Account actions and request materials have been checked; support must review manual requests.'
sourceArticles:
  - DOC-16
translation:
  status: review
  sourceHash: 3dcead553505bc36bd7d34f9a97ce4e7fc9379a23155157f4e25bd706ad041bf
  reviewedAt: '2026-11-15'
---
# Sign in, recover an account, and unbind devices

Identify the account you originally used before changing the device. Signing in with another phone number, reflashing, or clearing Wi-Fi does not remove the server-side device binding.

<a name="scope"></a>

## Choose a path {#scope}

| Problem | Start here |
| --- | --- |
| SMS codes never arrive | [SMS sign-in](#sms) |
| Forgotten username or password | [Recover the original account](#recovery) |
| Change phone number or link Google | Sign in first, then use account settings |
| Transfer your device to someone else | [Unbind your device](#unbind) |
| A purchased device is bound to another account and you cannot reach its previous owner | [Request unbinding](#ownership) |
| You do not know the device ID or MAC address | [Get device information](#device-information) |
| Several devices need unbinding | [Batch request spreadsheet](#batch) |

<a name="sms"></a>

## 1. SMS and Google sign-in {#sms}

In the [official Console](https://xiaozhi.me/console/), check the country/region code and follow current CAPTCHA/SMS steps. Check the number, signal, blocked messages, and send interval rather than repeatedly pressing send.

The current implementation directs **unregistered numbers outside +86** to Google sign-in. Existing international-number accounts may have different conditions. Follow explicit page notices; waiting ten minutes is not a universal solution.

Google sign-in, phone sign-in, and GitHub verification are different features. GitHub provides [linking and benefit verification](../console/github-verification.md) after sign-in. A GitHub username does not recover a XiaoZhi account.

<a name="recovery"></a>

## 2. Recover the original account {#recovery}

1. Identify the original phone number, Google account, or username. An empty new account does not mean old data disappeared.
2. If SMS/Google still signs in to the original account, sign in first, then change the password or linked methods in account settings.
3. If self-service recovery fails, email **[xiaozhi.ai@tenclass.com](mailto:xiaozhi.ai@tenclass.com)** with the information below. Describe the failing step and how to reach you; do not send passwords or SMS codes.

| Situation | Email subject template | Information to provide |
| --- | --- | --- |
| You know the username but forgot the password and cannot use the linked sign-in method | `【找回密码，用户名 XXX，设备ID XXX】` | Original username and device ID |
| You forgot both username and password and cannot use the linked sign-in method | `【找回用户名，设备ID XXX，激活日期 XXX】` | Device ID and activation date; state an approximate date if uncertain |

These subjects mean “Recover password, username XXX, device ID XXX” and “Recover username, device ID XXX, activation date XXX.” Replace the placeholders with your own information. See [device information](#device-information) below. State when an item is unavailable rather than guessing; support may request further ownership checks. Sending a request does not mean the account has been recovered.

<a name="unbind"></a>

## 3. Unbind a device you own {#unbind}

1. Sign in to the [Console](https://xiaozhi.me/console/) and locate the agent that owns the device.
2. Open the agent's **Devices** list. Check the device name, board, and MAC address. If the MAC is masked, click it to copy the full address and compare it with your own record.
3. Find that device's **Unbind** action. On a phone, scroll down the device card if needed; do not delete the entire agent.
4. Read the confirmation: **unbinding also deletes this device's conversation history**. Check the selected device and keep any records you need before confirming.
5. Ask the recipient to restart the device, obtain a new six-digit verification code, and [bind it to their own account](../getting-started/wifi-and-binding.md#bind).

Unbinding a device differs from deleting an agent. You do not need to delete an entire agent to transfer one device. Wi-Fi needs reconfiguration only if the existing network is no longer usable.

<a name="ownership"></a>

## 4. A device bound to another account {#ownership}

A purchased kit, module, or used device may have been bound before sale, return, or recycling. **First ask the seller or previous owner to unbind it using the steps above.** If they cannot be reached, request manual assistance:

1. [Get the device information](#device-information): MAC address, device ID if available, board model, and firmware version.
2. Email **[xiaozhi.ai@tenclass.com](mailto:xiaozhi.ai@tenclass.com)**.
3. For one device, use the subject `【解绑设备，设备ID XXX，MAC地址 XXX】` (“Unbind device, device ID XXX, MAC address XXX”). Replace the placeholders. If the device ID is unavailable, write “unavailable” and explain why in the body; do not substitute the six-digit binding code.
4. Explain that the purchased device is bound to someone else's account and you cannot contact its previous owner. Include device details, the error message, and how you obtained it. Reply in the same email thread if support requests more information.
5. After support confirms completion, restart the device and [bind it with a new six-digit code](../getting-started/wifi-and-binding.md#bind). If it still fails, reply to that thread with the new error.

Copy and complete this message:

```text
Request: Remove the device's binding to its previous account
Reason: Device is bound to another account; previous owner cannot be reached
Device ID:
MAC address:
Board model and firmware version:
How the device was purchased/obtained:
Current error message:
```

Requests require manual review; sending an email does not guarantee immediate unbinding. Reflashing, clearing Wi-Fi, or a factory reset does not replace server-side unbinding. Send identifiers and supporting documents only to support, not public issues or group chats.

<a name="batch"></a>

### Request unbinding for several devices {#batch}

1. [Download the batch unbinding request spreadsheet (XLSX)](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/doc-16-file-001.xlsx).
2. Keep the original column headers: **设备ID** means **Device ID**; **MAC地址** means **MAC address**. Enter one device per row and verify both values refer to the same device. Explain unavailable items instead of inventing IDs.
3. Attach the completed spreadsheet to an email to the same support address with subject `【解绑设备】` (“Unbind devices”). Describe where the devices came from and why unbinding is needed.
4. Provide any additional information requested, then verify each device can be bound again after processing.

<SourceMaterials article="DOC-16" />

<a name="device-information"></a>

## 5. Get the device ID and MAC address {#device-information}

**The device ID, MAC address, startup UUID, and six-digit binding code are different fields.** The six-digit code adds a device; a MAC address looks like `02:00:00:00:00:01`. Do not assume the UUID in startup logs is the numeric device ID used by the backend.

### Device ID

If the device still supports normal conversation, try asking “What is my device ID?” and record the identifier it provides. If it cannot talk, gives no identifier, or only provides a UUID, describe that situation and give support the MAC and relevant logs. Do not erase or reflash the device just to obtain an ID.

### MAC address

- **You can sign in to the original account:** open the agent's device list and click the MAC field to copy the full address.
- **You cannot sign in to the original account:** read the device's startup logs on your own computer:

1. Connect a USB data cable to the device's logging port. Close web flashers, IDE monitors, and other serial tools using that port.
2. Follow the [serial log guide](./serial-logs.md#capture) to open the actual port. Basic ESP32 setups normally use **115200 baud, 8 data bits, no parity, 1 stop bit**. Disable HEX display.
3. With the port open, briefly press **RESET/EN** so the firmware boots normally. Do not hold BOOT to enter download mode here.
4. Search the text for `wifi:mode` or `sta (`. On a Wi-Fi device, copy the address **inside `sta (...)`**, not the following `softAP (...)` provisioning hotspot address.
5. If that line is absent, keep the relevant startup device information and `Board: UUID=...` line, and state the board and firmware version. 4G/Ethernet setups may have no Wi-Fi log; obtain their address according to the board guide or support instructions instead of applying this Wi-Fi example.

<figure class="source-figure">

[![Read the Wi-Fi STA MAC from a serial log; the softAP address belongs to the provisioning hotspot](../../public/images/en/device-identifiers.svg)](../../public/images/en/device-identifiers.svg)

<figcaption>Example log: copy the MAC inside sta. These are example addresses, not your device's addresses; timestamps and hotspot names vary. Click to enlarge.</figcaption>
</figure>

For an empty log, check the port, data cable, power, and normal boot mode. For garbled text, check baud rate, encoding, and HEX display. Do not send unknown commands. See [Capture startup and failure logs](./serial-logs.md) for full instructions.

<a name="verify"></a>

## Verify the result {#verify}

Account recovery restores access to the expected agents. After unbinding, the device is absent from the original account and its recipient can bind with a new six-digit code and start a conversation. Merely sending an email or spreadsheet is not completion.

<a name="next"></a>

## Next steps {#next}

Return to [Provisioning and binding](../getting-started/wifi-and-binding.md). For invalid device codes or a connected but inactive device, check [Troubleshooting](./index.md#account).
