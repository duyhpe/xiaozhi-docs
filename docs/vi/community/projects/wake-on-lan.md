---
id: wake-on-lan
title: Wake a computer over the network
description: 'Check WoL prerequisites, third-party dependencies, and local tests before voice control.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Third-party projects and prototypes have not all been tested. Check exact versions and hardware requirements before
  use.
sourceArticles:
  - DOC-36
translation:
  status: review
  sourceHash: 17efa582331ca99d4020ead7331b9613dee82ba119c2886ebf322e005db33d73
  reviewedAt: '2026-11-15'
---
# Wake a computer over the network

This example by **ZongZiTongXue (粽子同学)** uses ESP8266 to send Wake-on-LAN packets on a local network, triggered through a third-party MCP platform. It covers waking a computer; successful wake does not imply remote shutdown support.

<a name="scope"></a>

## Check prerequisites {#scope}

- The PC's network card, motherboard, and relevant power state support WoL, enabled according to hardware/OS instructions.
- The PC remains connected to power and uses wired networking as required by this design.
- The wake module remains powered and online, with a working network path to the PC. Check client isolation.
- Third-party platform, module firmware, and MCP bridge have identified versions and sources.

<figure class="source-figure">

[![Verify local-network wake before adding voice control.](../../../public/images/en/wake-on-lan-flow.svg)](../../../public/images/en/wake-on-lan-flow.svg)

<figcaption>Verify local-network wake before adding voice control. Click to view full size.</figcaption>
</figure>

<a name="local"></a>

## 1. Test locally first {#local}

Use a verifiable local WoL tool to confirm the PC wakes. Record its wired NIC MAC, target network, and power state. Voice integration will not fix a failed local wake.

MAC/IP addresses identify network configuration; they are not a platform account or module UUID. Do not put them in unrelated fields.

<a name="module"></a>

## 2. Module and platform {#module}

The ESP8266-specific binary and checksum are available below. It is not xiaozhi-esp32 firmware and cannot be replaced with an arbitrary main-firmware release. Source must be requested from the author; this is not a self-contained official open-source solution. Check provenance, then follow its documentation to flash, provision, and verify the module is online.

The workflow depends on external services such as `xiaozhimcp.top`. Before use, verify the current HTTPS address, operator, and credential purpose. Then configure an endpoint with your own account according to the platform's instructions.

<SourceMaterials article="DOC-36" />

### Enter the module and PC details

For full installation and firmware-specific flashing parameters, see the [author-maintained guide (Chinese)](https://kcn80f4hacgs.feishu.cn/docx/RxRXd8aMDomjUXxlUcCcOE48ndh) and [installation video (Chinese)](https://v.douyin.com/PvTrtOBS1n8/). Confirm the service's current entry supports HTTPS before configuring these fields:

| Field | Where to get it | Do not substitute |
| --- | --- | --- |
| Wake module UUID | Suffix of its `WLHX-XXXXXXXX` provisioning hotspot name; record it before provisioning | Not the ESP32 startup UUID or PC MAC |
| Target PC IPv4 | Windows Settings → Network & internet → Ethernet → current network properties | Not the Wi-Fi adapter's or phone's IP |
| Target PC MAC | Physical address of that same wired Ethernet connection | Not the wake module's MAC |
| XiaoZhi MCP endpoint | Full endpoint from the target agent's [extension settings](../../mcp/quickstart.md#endpoint) | Not the PC IP or module UUID field |

Alternatively, run `ipconfig /all` on Windows and locate the IPv4 and physical address under the actual wired Ethernet adapter. Check that both belong to the same adapter.

Follow the author's platform flow to add the module, enter the PC label, IPv4 and MAC, and save. Enable the relevant smart-hardware tool and start that agent's MCP service. Test the platform's wake button before voice control below. The module UUID and the PC's MAC/IP are different identifiers; correct the fields first if they were mixed up.

<a name="verify"></a>

## 3. From platform to voice {#verify}

1. Use the platform's test button first and confirm the PC wakes.
2. Connect your agent and confirm discovery of the corresponding wake tool.
3. Trigger it with an explicit device name, checking real call records and the PC's power state.
4. Test module power loss, router changes, and different PC sleep/shutdown states.

A successful tool response does not establish that the PC actually started. Successful wake also does not establish remote shutdown.

<a name="sources"></a>

## Next steps {#sources}

Learn the [MCP quickstart](../../mcp/quickstart.md), then choose a maintenance approach for your network.
