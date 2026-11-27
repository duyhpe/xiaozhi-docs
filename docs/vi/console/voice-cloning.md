---
id: voice-cloning
title: 'Voice cloning: record, train, and use'
description: Train a voice from suitable audio and verify it with an agent.
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-14
translation:
  status: review
  sourceHash: 5d21003d488141bf92c973069fa86bafc2e92228044eae981dd814b5b83e4b69
  reviewedAt: '2026-11-15'
---
# Voice cloning: record, train, and use

Voice cloning involves activation, audio preparation, training submission, waiting for availability, and selecting the voice in an agent. Check account eligibility and current costs before recording.

<a name="scope"></a>

## Preparation {#scope}

- Sign in to the [voice-cloning page](https://xiaozhi.me/console/voice-clone) and complete identity verification as currently required. The current implementation restricts purchases and renewals by minors.
- Read the purchase terms, price, validity period, and training allowance. Use recordings you are authorized to provide.
- Prepare a quiet room, reliable microphone, and browser that can record/upload audio. Grant microphone permission when recording is needed.

Current page notices determine prices, allowances, and processing time.

<a name="purchase"></a>

## 1. Check activation {#purchase}

Follow the available purchase or renewal flow, then return to the voice list to check status. Payment, training status, and voice availability are different stages. Repeated purchases do not accelerate an order being processed.

<a name="audio"></a>

## 2. Prepare training audio {#audio}

Choose either recording or upload. The current source-file limit is **50MB**; select **8–60 seconds** in the browser before conversion to WAV and submission. Avoid background music, overlapping speakers, clipping, and obvious echo. Do not cut off speech at either end.

<figure class="source-figure">

[![Voice cloning: two audio inputs share the same training workflow.](../../public/images/en/voice-training-flow.svg)](../../public/images/en/voice-training-flow.svg)

<figcaption>Voice cloning: two audio inputs share the same training workflow. Click to view full size.</figcaption>
</figure>

<a name="record"></a>

### Record with a microphone {#record}

1. Select microphone recording and choose the language, style, and text you will actually read.
2. Allow microphone access when starting. If access fails, check microphone permissions and input selection in the browser's address-bar site settings.
3. Read clearly in a quiet room, stop, and listen back. Rerecord if the content or capture is unsuitable. Continue to audio editing, adjust the selection, and listen again.

<a name="upload"></a>

### Upload existing audio {#upload}

1. Choose a local file the browser can decode and confirm its language.
2. Continue to audio editing. Select a continuous, clear passage in the waveform and drag the boundaries to adjust it.
3. Listen to the selection and check language and duration against current requirements before training.

<figure class="source-figure">

[![Audio-selection illustration. Content outside the boundaries is not submitted; listen to the selected segment first.](../../public/images/en/voice-audio-selection.svg)](../../public/images/en/voice-audio-selection.svg)

<figcaption>Audio-selection illustration. Content outside the boundaries is not submitted; listen to the selected segment first. Click to view full size.</figcaption>
</figure>

The selection illustration explains trimming; it is not a screenshot. Listen to the actual selected segment before submitting either recorded or uploaded audio.

<a name="examples"></a>

### Three audio comparisons: what to trim {#examples}

Listen to each “before” example, identify the problem, then compare the trimmed “after” version. These are teaching samples, not templates for recording length or channel count.

**Example 1: background noise, excess length, and a cut-off ending**

The original has background noise and an abruptly cut-off ending. Do not simply take the first few seconds: select a continuous, clear middle passage containing complete sentences. If noise affects the whole recording, recording again is preferable.

[Play/download before](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-001.mp3) · [Play/download after](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-002.wav)

<SourceMaterials article="DOC-14" only="VOICE-PRACTICE-file-001,VOICE-PRACTICE-file-002" />

**Example 2: unusual sounds at the beginning**

Listen for swallowed sounds or lip smacks at the beginning. Move the selection start to just before the first clean, complete sentence, then preview to check that the first word has not been cut off.

[Play/download before](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-003.mp3) · [Play/download after](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-004.wav)

<SourceMaterials article="DOC-14" only="VOICE-PRACTICE-file-003,VOICE-PRACTICE-file-004" />

**Example 3: a poor-quality first sentence**

If the first sentence is poor, start from a later, stable, clear passage containing complete speech rather than discarding the entire recording. Adjust both selection edges, inspect the beginning and end, and preview the whole selection.

[Play/download before](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-005.wav) · [Play/download after](https://github.com/78/xiaozhi-docs/releases/download/tutorial-assets-2026-11-14/voice-practice-file-006.wav)

<SourceMaterials article="DOC-14" only="VOICE-PRACTICE-file-005,VOICE-PRACTICE-file-006" />

**An accepted upload is not necessarily a good reference.** The current page accepts 8–60 seconds. Start by selecting roughly **10–15 seconds** of clear, steady speech from one person in complete sentences, then adjust for the selected training method and the preview result. Prefer mono original recordings to avoid another speaker or accompaniment in a second channel. Some samples are stereo or have other lengths; they illustrate trimming rather than input requirements.

There is no requirement to convert every file to 24 kHz, nor a promise that one sample rate always best matches the current model. Follow the current upload UI; excessive denoising or repeated resampling can also damage speech.

<a name="training"></a>

## 3. Submit, wait, and handle failures {#training}

1. Confirm the audio, language, style, and duration. Read and accept the page's confirmation, then start cloning.
2. Watch the training state in the list, refreshing manually if needed. Keep the original audio for troubleshooting.
3. On failure, read the error and distinguish recording conditions, format/duration, allowance, and service state. Follow the available recovery options.
4. After successful training, preview the sample and set a recognizable alias.

There is no guaranteed five-minute completion time. Refreshing is not retraining. Retry, appeal, and refund options depend on the current status and service rules.

<a name="use"></a>

## 4. Select the voice in an agent {#use}

Open the target agent's configuration, select the available cloned voice under role/voice settings, and save. Confirm that the device uses this agent, then start a new conversation. A successful preview on the cloning page does not mean the device has selected that voice.

<a name="verify"></a>

## Verify the result {#verify}

The list shows the voice as available and its sample plays correctly. The agent has saved the intended voice, and the device actually uses it in an answer. If an available voice cannot be selected, check account, validity, and account-specific voice limits.

<a name="materials"></a>

## Troubleshooting {#materials}

- **No recorded sound:** check browser permission, input device, and system microphone settings, then test a short recording.
- **Upload cannot be decoded:** check for a damaged file, use a browser-decodable format, and select a valid segment. Renaming an extension does not convert the file.
- **Training fails or the voice is unavailable:** retain the error, check audio requirements, training allowance, account, and expiry, then follow the available options.

Report status and steps without publishing identity documents or another person's original recordings.

If these checks do not resolve the failure, email [xiaozhi.ai@tenclass.com](mailto:xiaozhi.ai@tenclass.com) with information support can use to identify your account, the voice name, failure time, page error, and steps tried. Include your order details for an order-related issue. Do not post identity documents or original recordings publicly; follow support's instructions if audio is needed.

### Missing words, misread words, or poor output quality

Test numbers, ordinary sentences, and your actual use case separately to distinguish an occasional synthesis error from a persistent voice-quality problem. Check the training selection for noise, cut-off speech, multiple speakers, or an unusual beginning. Re-record or trim and preview first, then retrain only as allowed by the page. Compare the same test sentences before and after; repeated training is not a guaranteed fix for an occasional omitted word. Give support the error and relevant test conditions if it persists.

<a name="next"></a>

## Next steps {#next}

To answer from your own material, continue with [Knowledge bases](./knowledge-base.md). For account ownership issues, see [Account troubleshooting](../faq/account-and-binding.md).
