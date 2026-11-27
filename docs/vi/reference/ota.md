---
id: ota-reference
title: 'OTA configuration, activation, and updates'
description: 'Use versioned firmware references to distinguish configuration, binding, and downloads.'
status: review
reviewedAt: '2026-11-15'
reviewNote: Applies to firmware v2.6.0. The firmware repository owns the full specification and implementation.
sourceArticles:
  - DOC-40
translation:
  status: review
  sourceHash: 085c401beb16cf42386e8b7dfd5bdf339b92a4a5e4bdc9bcdb23c95d4376e9f1
  reviewedAt: '2026-11-15'
---
# OTA configuration, activation, and updates

At startup, XiaoZhi queries the OTA service for connection configuration, activation information, and available firmware. OTA here includes more than downloading an update. The **matching xiaozhi-esp32 version** owns the full contract.

<a name="scope"></a>

## Compare the same version {#scope}

This page applies to v2.6.0 / `4de00aed740595a8713b01f8332b9b2cf30685bc`.

| Topic | Authoritative firmware reference |
| --- | --- |
| Address, request identity, capabilities, configuration response | [OTA documentation](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/ota.md) |
| Activation challenge, download, and version decisions | [Device main/ota.cc](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/ota.cc) |
| Startup, binding, and update transitions | [Application implementation](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/application.cc) |

When debugging another version, switch both documentation and code. A service implementation should follow the client versions it supports, rather than mixing paths and request formats from different versions.

<a name="flows"></a>

## Distinguish four operations {#flows}

- **Initial installation:** use the correct board and complete image; see [Flashing](../firmware/flashing.md).
- **Fetching connection configuration:** the device requests its own connection/capability settings. Check the actual URL, identity, and HTTP result.
- **Activation and binding:** follow the response and device state. A challenge, six-digit code, and serial number have different roles.
- **Version update:** check firmware version, target board, and layout before downloading a matching artifact.

HTTP request-layout version, activation-proof version, transport-envelope version, MCP version, and `application.version` are distinct concepts. Consult the same-version specification for fields, headers, and valid examples.

<a name="debug"></a>

## Troubleshooting order {#debug}

Check device networking and time first, then configuration requests, activation, conversation connections, and finally matching updates. Distinguish an unreachable service, unbound device, no selected update, and download failure. One fixed update URL does not replace every device's configuration endpoint.

Paths such as historical `/api/ota/` and device-visible `/xiaozhi/ota/` may belong to different deployment layers. Use your deployment documentation and client implementation to identify the actual requested endpoint and routing.

<a name="verify"></a>

## Verify the result {#verify}

In a controlled environment, test unbound/bound devices, update/no-update cases, and failure recovery separately. Record client version and server configuration. Layout changes also require complete-install and data-retention tests. One HTTP 200 does not establish successful activation or updates.

<a name="next"></a>

## Next steps {#next}

For everyday use, see [Firmware selection](../firmware/downloads.md) and [Provisioning and binding](../getting-started/wifi-and-binding.md). Server developers should maintain contracts and tests in the firmware repository, verifying fields and partitions against supported client versions.
