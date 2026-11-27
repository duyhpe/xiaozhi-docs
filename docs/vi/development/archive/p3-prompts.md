---
id: legacy-p3-prompts
title: Legacy P3 prompt workflow
description: Maintain older P3 firmware and find the current resource workflow.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  Historical material only; not current-version instructions. Downloads must match an explicitly identified firmware
  version and hardware.
sourceArticles:
  - DOC-42
archive: true
translation:
  status: review
  sourceHash: 69fa88714014ee2a33bfc06b892c0b6d233df70a6e1adbd88e055b5824e8666b
  reviewedAt: '2026-11-15'
---
# Legacy P3 prompt workflow

This page describes historical usage. Older implementations placed P3 files in `main/assets/zh-CN` and modified generated `lang_config.h`. The current default locale workflow uses OGG; do not apply the old paths directly.

<a name="scope"></a>

## When to consult this page {#scope}

Use it only for a known older firmware version that actually uses P3. Check out its tag and inspect directories, generator, and player. Publication date alone does not determine compatibility.

The repository still contains [P3 tool instructions](https://github.com/78/xiaozhi-esp32/blob/4de00aed740595a8713b01f8332b9b2cf30685bc/scripts/p3_tools/README.md), so archiving this workflow does not mean those tools were removed.

<a name="legacy"></a>

## Limits of the older workflow {#legacy}

It involved preparing audio, running `convert_audio_to_p3.py`, adding files to the old resource directory, regenerating, and referencing sounds. Sample rate, frame format, and symbol names must match that firmware. One ffmpeg command is not a universal player specification.

A generated header is not the long-term source to maintain. Even if direct edits temporarily work in an old version, identify the real generation inputs and a reproducible build.

<a name="next"></a>

## Move to the current workflow {#next}

Use [Custom prompt sounds](../custom-prompts.md) for current locales, OGG/Opus, and resource generation. Keep the original recording before converting. Renaming a P3 extension does not convert it to OGG.
