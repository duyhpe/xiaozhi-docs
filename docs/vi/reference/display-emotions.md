---
id: display-emotions
title: Emotion fields and display resources
description: 'Check semantics, resource mappings, and fallback against the firmware version.'
status: review
reviewedAt: '2026-11-15'
reviewNote: Applies to firmware v2.6.0. The firmware repository owns the full specification and implementation.
sourceArticles:
  - DOC-39
translation:
  status: review
  sourceHash: cf931d7d2b13c6a44c2f86a819af6cb3804eff828563a9a181faad1395f12050
  reviewedAt: '2026-11-15'
---
# Emotion fields and display resources

Server emotion semantics, Unicode emoji, and screen graphics are different objects. The matching firmware repository defines message protocols and resource mappings.

<a name="scope"></a>

## Identify the layer {#scope}

| Layer | Check |
| --- | --- |
| Protocol | Message types and emotion fields in the [versioned WebSocket documentation](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/docs/websocket.md) |
| Display implementation | Actual SetEmotion paths in [main/display](https://github.com/78/xiaozhi-esp32/tree/4de00aed740595a8713b01f8332b9b2cf30685bc/main/display) |
| Fonts, animations, images | This build's resource package and name mappings |

<a name="message-and-names"></a>

## Message example and name lookup {#message-and-names}

The WebSocket document for this version gives this emotion message example:

```json
{"session_id":"example-session","type":"llm","emotion":"happy","text":"😀"}
```

`emotion` names a display resource; the Unicode glyph in `text` is not automatically its filename. For default names such as `neutral`, `happy`, and `thinking`, open the [font resource 2.0.0 mapping table with 21 entries](https://github.com/78/xiaozhi-fonts/blob/d45dbc64052d57048f20ab1770074172ce9eb53b/mappings/emoji.json). Firmware v2.6.0's [dependency declaration](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/idf_component.yml) uses this font-version line. Custom resource packs and specialized displays may define their own names and mappings; check the actual build.

Unknown values do not have one universal fallback. The v2.6.0 [OLED implementation](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/display/oled_display.cc) checks Emoji and then the icon font; if neither has a glyph, it displays a neutral placeholder and reports failure. The [LCD implementation](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/main/display/lcd_display.cc) also checks image resources; if neither font has a matching glyph either, it reports failure rather than guaranteeing that the requested emotion was displayed.

<a name="verify"></a>

## Troubleshooting order {#verify}

1. Confirm firmware and theme/resource-package versions.
2. Observe the actual received emotion value, then check whether the display implementation can find its resource.
3. Test common and unknown values. Record whether it falls back, retains the previous image, or errors.
4. Check on the target screen. A screenshot from another OLED or LCD is not a substitute.

Tokenizers differ, so an emoji is not guaranteed to be one token in every model. Similar-looking graphics do not make resource names interchangeable.

<a name="next"></a>

## Updating resources {#next}

Add emotion values or mappings together with implementation, resources, and tests in the firmware/resource repository, then update this site's versioned links. For sound resources, see [Custom prompt sounds](../development/custom-prompts.md).
