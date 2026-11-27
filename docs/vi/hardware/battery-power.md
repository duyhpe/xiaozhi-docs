---
id: battery-power
title: Battery power and charging
description: 'Use a USB power bank first, then decide whether your device needs a custom battery circuit.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  USB power requirements were compared with board documentation. Runtime, low-load keep-alive, and custom battery
  circuits still require tests on the actual hardware.
translation:
  status: review
  sourceHash: a77c7f081097951363efd623ef427bf81b6305eda37bbe1faa1deaede919c2a3
  reviewedAt: '2026-11-15'
---
# Battery power and charging

A commercial USB power bank is the easiest way to run a breadboard XiaoZhi away from a computer. If the development board has no battery management, do not connect a lithium battery directly to its power pins.

<a name="scope"></a>

## Preparation {#scope}

This guide uses a USB-powered ESP32-S3 board. Prepare a device with [wiring](./breadboard-esp32-s3.md) and [Wi-Fi provisioning](../getting-started/wifi-and-binding.md) complete, a reliable USB cable, and a power bank that supplies the board's required 5V USB output.

First confirm normal conversation using a computer or suitable USB supply. Then change the power source, so firmware problems can be distinguished from power problems.

<a name="usb-power"></a>

## 1. Use a USB power bank {#usb-power}

1. Record the working wiring and state, turn off the device, and disconnect the computer.
2. Keep the breadboard wiring unchanged. Connect the existing USB power cable to the power bank.
3. Turn on the power bank. Observe startup and wait for the device to join its saved Wi-Fi network.
4. Start a conversation at low volume, then test your usual volume. Check sustained network, playback, and idle operation.
5. Turn off the power bank when finished. Charge it according to its manufacturer's instructions.

Some power banks shut down automatically under low load. If XiaoZhi loses power while idle, check for a low-current mode and any time limit. One successful startup does not establish reliable long-term operation.

::: info Operating scope
Pass-through charging is not a default power-bank capability. To charge while running the device, confirm explicit manufacturer support and test whether switching power sources restarts the device.
:::

<figure class="source-figure">

[![A commercial USB power bank powering the basic S3 build.](../../public/images/en/usb-power-bank.svg)](../../public/images/en/usb-power-bank.svg)

<figcaption>A commercial USB power bank powering the basic S3 build. Click to view full size.</figcaption>
</figure>

<a name="battery-connector"></a>

## 2. If the device has a battery connector {#battery-connector}

Use it only when the board documentation specifies battery type, permitted voltage, connector polarity, and charging port.

| Check | What to confirm |
| --- | --- |
| Battery type | Cell count, chemistry, and permitted charge voltage match the charger IC |
| Connector | Actual positive and negative pins; identical connector housings can have opposite polarity |
| Protection | Where overcharge, overdischarge, overcurrent, and short-circuit protection are provided |
| Charging port | Which USB port charges, and which ports provide only power or data |
| Power switching | How USB and battery supplies switch, and whether simultaneous connection is allowed |

If no battery connector is documented, do not treat `3V3`, `5V`, or `GND` header pins as a charging interface.

<a name="custom-power"></a>

## 3. Bare cells and boost modules {#custom-power}

A custom design needs a complete path: battery protection → charging and power-path management → regulation/boost conversion → load. Labels such as `B+ / B−` identify battery connections; they do not prove that every required function is present.

Before implementation, identify exact modules and schematics, and verify:

- Polarity and output voltage meet requirements before connecting the board.
- Voltage and temperature remain within component limits during conversation, Wi-Fi transmission, and the highest planned volume.
- Connecting/disconnecting USB, low battery, and charging do not cause prohibited backfeeding or supply conflicts.
- Connectors and mechanical mounting prevent live terminals from touching or shorting.

The selected circuit needs engineering review. Do not guess polarity from wire colors, infer reverse polarity from a failure to light up, or cut battery leads for powered trial and error.

For ESP32-S3-DevKitC-1, the manufacturer lists USB, the 5V header, and the 3V3 header as mutually exclusive power options. This does not mean the board can charge a lithium battery. See the [development-board power instructions](https://documentation.espressif.com/esp-dev-kits/en/latest/esp32s3/esp32-s3-devkitc-1/user_guide_v1.1.html).

<figure class="source-figure">

[![Example battery with leads and connector. Check chemistry, voltage, and connector polarity against the specific battery documentation.](../../public/images/zh/doc-34-image-002.webp)](../../public/images/zh/doc-34-image-002.webp)

<figcaption>Example battery with leads and connector. Check chemistry, voltage, and connector polarity against the specific battery documentation.</figcaption>
</figure>

<figure class="source-figure">

[![Example B+, B−, and 5V solder pads on a power module. Check the module documentation for USB input/output roles, charging, and protection capabilities.](../../public/images/zh/doc-34-image-003.webp)](../../public/images/zh/doc-34-image-003.webp)

<figcaption>Example B+, B−, and 5V solder pads on a power module. Check the module documentation for USB input/output roles, charging, and protection capabilities.</figcaption>
</figure>

<a name="verify"></a>

## Verify the result {#verify}

::: tip Completion check
The device supports repeated conversations at the intended volume and still wakes after idling. Charging and use follow the power product's instructions. Measure runtime under the actual load; battery capacity alone does not justify a runtime promise.
:::

<a name="troubleshooting"></a>

## Troubleshooting {#troubleshooting}

| Symptom | Check in this order |
| --- | --- |
| Does not start | Disconnect the load; check the power-bank switch, cable, and output. Do not try reversing the leads |
| Restarts at high volume | Reduce volume, use a reliable cable/supply, and check amplifier load and contacts |
| Shuts off after a few idle minutes | Check the power bank's low-load shutdown |
| Restarts when a charger is connected | Check power switching and pass-through support; repeated restarts are not a circuit test |

<a name="next"></a>

## Next steps {#next}

Read [Audio output](./audio-output.md). If it also restarts repeatedly on USB power, continue with [Startup and power troubleshooting](../faq/index.md#boot).
