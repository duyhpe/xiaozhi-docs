---
id: websocket-reference
title: WebSocket protocol versions
description: 'Find matching firmware documentation for transport, sessions, and audio.'
status: review
reviewedAt: '2026-11-15'
reviewNote: Applies to firmware v2.6.0. The firmware repository owns the full specification and implementation.
sourceArticles:
  - DOC-38
translation:
  status: review
  sourceHash: ed94cb41ea90d1dd1ead00ec6de909dc9ad7eb380f822efd87c5c67de6c51222
  reviewedAt: '2026-11-15'
---
# WebSocket protocol versions

The **xiaozhi-esp32 repository** maintains full message formats, binary envelopes, and state transitions. This page links documentation and implementation from the same version.

<a name="scope"></a>

## Choose a baseline {#scope}

This page applies to firmware **v2.6.0**, commit `4de00aed740595a8713b01f8332b9b2cf30685bc`. For another version, use its repository documentation rather than later fields.

| Question | Authoritative reference |
| --- | --- |
| Overall flow, headers, JSON, audio, and states | [Same-version WebSocket documentation](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/websocket.md) |
| Handshake, version headers, binary I/O, server hello parsing | [websocket_protocol.cc](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/main/protocols/websocket_protocol.cc) |
| Where the address and token originate | [OTA configuration and activation](./ota.md) |
| MCP carried over the connection | [Same-version MCP protocol](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/mcp-protocol.md) |

<a name="debug"></a>

## Check in order {#debug}

1. Identify firmware, board, and actual connection method from logs. Check the OTA-provided connection configuration first.
2. Compare headers and hello messages to establish envelope version, audio parameters, and capabilities.
3. Distinguish JSON control messages, binary audio, and tool calls. Versions at different protocol layers are not one shared version number.
4. Check session information, states, and errors, then use the actual send/receive sequence to locate failures.

The current implementation parses server `session_id` and supports multiple binary envelopes. Check both session details and the selected envelope version.

<a name="verify"></a>

## Maintenance and verification {#verify}

Correct protocol differences, fields, and parsing examples in the firmware repository first, then update this site's versioned links. State diagrams should match the firmware being debugged.

Interoperability verification needs both sides' versions and real messages, beyond a successful WebSocket connection. Remove authentication and device identifiers before sharing traces.

<a name="next"></a>

## Next steps {#next}

For display semantics, see [Emotions and resources](./display-emotions.md). Start a self-hosted implementation from the versioned references and tests above rather than an independent protocol copy.
