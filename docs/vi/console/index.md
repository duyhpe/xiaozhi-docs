---
id: console
title: Console guides
description: 'Configure agents, voices, knowledge bases, and devices in the XiaoZhi Console.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
translation:
  status: review
  sourceHash: 8e8c95f01888497de7a5da8614cd4d0723d2bfa6f7cfb96f482eaa67ba6a6ed7
  reviewedAt: '2026-11-15'
---
# Console guides

Use the Console to manage your account, voices, knowledge bases, and devices. Follow the guides below; available features, quotas, and prices are those shown for your account.

<a name="guides"></a>

## Choose a guide {#guides}

| Guide | What it covers |
| --- | --- |
| [Configure persona, model, and voice](#role-and-voice) | Change the nickname, persona, language model, and voice; save and verify. |
| [Speaker recognition](#speaker-recognition) | Select a voice record and add a speaker name and relationship description. |
| [GitHub verification and benefits](./github-verification.md) | Link GitHub to a signed-in XiaoZhi account and distinguish verification from the developer platform. |
| [Voice cloning](./voice-cloning.md) | Prepare suitable audio, train a voice, and test it with an agent. |
| [Knowledge bases](./knowledge-base.md) | Parse documents into searchable content, test retrieval, and connect the knowledge base to an agent. |

<a name="role-and-voice"></a>

## Change the name, voice, and language model {#role-and-voice}

1. Sign in to the [Console](https://xiaozhi.me/console/), find the agent that actually owns the device, and open **Configure**.
2. In the role and voice settings, change the assistant nickname and select the conversation language and voice. Preview the voice first; follow [Voice cloning](./voice-cloning.md) to use your own.
3. For a custom persona, enable a custom character description and specify its identity, tone, and task. The assistant nickname does not change the device's offline [wake word](../development/wake-words.md).
4. In the model and memory settings, select a language model available to your account. Read the eligibility or restriction notice for disabled options. Capabilities and charges depend on the current page.
5. **Save**, close, and reopen the configuration to check that the selections remain. Start a new conversation on the device to verify the persona and voice; a successful preview alone does not confirm the device is using it.

<a name="speaker-recognition"></a>

## Help an agent recognize speakers {#speaker-recognition}

Speaker recognition distinguishes who is speaking. Voice cloning changes the voice used for the device's answers; it is a different feature.

1. Speak clearly to the target device using the same agent, with only one person speaking, to create a selectable voice record.
2. Open the agent's **Configure → Speaker recognition** settings and add a speaker.
3. Select that person's recent voice record from the embedding/record dropdown. Preview it to avoid selecting another person or overlapping voices.
4. Enter the speaker's name and description, such as “I am Alex, a family member of the device owner.” Save and check that the speaker appears in the list.
5. Start a new conversation and test both registered and unregistered people. If recognition is unreliable, try a clearer recording and test again.

For an empty list, check the selected agent, whether user voice records exist, and whether audio plays correctly. Follow the page's speaker-count and description-length limits. Noise and recording quality affect recognition; do not use it as identity authentication or payment authorization.

<a name="next"></a>

## Reading and feedback {#next}

These guides are open for community review. Use the feedback link at the end of a page to report problems, including the firmware version, board, and steps to reproduce them.
