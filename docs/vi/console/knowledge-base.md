---
id: knowledge-base
title: 'Knowledge bases: upload, retrieve, and connect'
description: 'Parse documents into searchable content, test retrieval, and connect a knowledge base to an agent.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-17
translation:
  status: review
  sourceHash: 1556006c8abb91205ac53f2a226851c9b979f475dc01d8bb68b42dd76afbdea0
  reviewedAt: '2026-11-15'
---
# Knowledge bases: upload, retrieve, and connect

Uploading is only the first step. Documents must be parsed, split into chunks, and searchable, then connected to the agent actually in use before they can help a conversation.

<a name="scope"></a>

## Preparation {#scope}

This guide covers [knowledge bases in the user Console](https://xiaozhi.me/console/knowledge-base), which are separate from enterprise knowledge bases in the commercial developer platform. Start with a small, clearly structured document that you are authorized to have the service process.

The upload interface currently accepts PDF, DOCX, XLSX/XLS, PPTX/PPT, Markdown, TXT, CSV, HTML, EPUB, and other formats. An accepted format does not guarantee correct parsing of images, complex tables, or scanned text. Follow the current limits and inspect the parsed result.

<figure class="source-figure">

[![Knowledge-base workflow: upload, inspect, retrieve, and connect.](../../public/images/en/knowledge-base-flow.svg)](../../public/images/en/knowledge-base-flow.svg)

<figcaption>Knowledge-base workflow: upload, inspect, retrieve, and connect. Click to view full size.</figcaption>
</figure>

<a name="upload"></a>

## 1. Create and upload {#upload}

Account type and GitHub verification affect the number of knowledge bases and documents per base. Check the limits shown for your account.

<a name="create"></a>

### Create a knowledge base {#create}

Click **New knowledge base** and enter a recognizable name and description. Explain which questions the documents cover and when to search them, rather than writing only “knowledge base.” For example:

```text
This library covers assembly, provisioning, and troubleshooting for the Starlight robot kit.
For questions about this kit's wiring, networking, or faults, search this library before answering from its results.
If no relevant answer is found, say so instead of inventing wiring or specifications.
```

Replace the product and scope with your own, save, and check the library appears in the list. A description helps the model choose a tool; it does not guarantee a call in every conversation.

<a name="upload-document"></a>

### Upload a document {#upload-document}

Open the base's document page, upload the file, give it a name, choose an available parsing method, and submit.

<a name="parse"></a>

### Wait for parsing {#parse}

Check parsing status and errors. After parsing completes, open the chunk view. A successful file upload alone does not mean the content is searchable.

<a name="chunks"></a>

## 2. Inspect chunks {#chunks}

On the document's chunk page, check that headings, paragraphs, tables, and numbers retain their meaning. In particular:

- Does a scanned PDF contain extracted text? Are image annotations missing?
- Are table rows/columns, units, dates, and negative statements split correctly?
- Do repeated headers, footers, contents pages, or irrelevant text interfere with retrieval?
- Is a key answer split across chunks? Should the document or chunks be edited?

Retest after corrections. More duplicate documents will not fix incorrect parsing.

<a name="recall"></a>

## 3. Test retrieval {#recall}

Use prepared questions for a retrieval test and inspect whether returned passages directly support the answer. Include a question the document can answer, a paraphrase, and a question it cannot answer.

For no results, check parsing, query wording, and whether the material actually contains the answer. For incorrect results, check document quality, chunking, and similar but irrelevant text. Do not assume the model is the first cause.

<a name="associate"></a>

## 4. Connect the agent {#associate}

1. Open the target agent's configuration and its extension capabilities.
2. Enable the knowledge-base capability under official services. When the selection field appears, choose the base you just tested.
3. Save, confirm the device belongs to this agent, and test the same questions in a real conversation.

If the selection field is missing, check that the capability is enabled, the current language supports the service, and the account has an available knowledge base.

### Confirm that this conversation searched the documents

Open the target agent's conversation history, locate your question, and expand the knowledge-related tool call. It may appear as `search_knowledge`; use the actual service's tool name. Check the query, returned document passages, and whether the answer follows those passages.

If no search appears, check the saved library association and description, then test a specific question from the documents. A plausible answer from the model's general knowledge does not prove the library is connected.

<a name="verify"></a>

## Verify the result {#verify}

Parsing succeeds, retrieval finds the correct passages, and the agent's association is saved. Real conversation answers should use the material without treating missing content as indexed knowledge. Check conversation tool-call records when needed.

<a name="materials"></a>

## Video and materials {#materials}

The video below demonstrates conversation using a knowledge base. Follow the steps above to create, parse, and connect your own.

<SourceMaterials article="DOC-17" />

<a name="next"></a>

## Next steps {#next}

For tool discovery and call-chain troubleshooting, see [MCP quickstart](../mcp/quickstart.md). After document changes, repeat parsing → chunk inspection → retrieval → real conversation rather than checking upload alone.
