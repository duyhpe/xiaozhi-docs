---
id: mcp-web-search
title: Add web search to an agent
description: 'Return page titles, links, summaries, and dates through an MCP search tool.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  English translation checked against the current source. Technical and hardware verification limits are stated in the
  guide.
sourceArticles:
  - DOC-25
translation:
  status: review
  sourceHash: 53a3875595ff5ac87d8acecee8874d48ad990b2e1b3962d1878bf812cc6cb629
  reviewedAt: '2026-11-15'
---
# Add web search to an agent

Connect a minimal MCP tool before adding a search provider. A search tool should return titles, source links, and summaries. Search results still need evaluation before being treated as facts.

<a name="scope"></a>

## Preparation {#scope}

Complete the [MCP quickstart](../quickstart.md) and reuse its Python environment and bridge directory. Prepare a search-service account you are authorized to use, and check current pricing and quotas.

This example uses Zhipu's Web Search API. Follow the [provider's official documentation](https://docs.bigmodel.cn/cn/guide/tools/web-search) for the interface and parameters. Calls may incur charges; check account pricing and quotas before use.

<figure class="source-figure">

[![Search-tool flow and its two separate credentials.](../../../public/images/en/mcp-web-search-flow.svg)](../../../public/images/en/mcp-web-search-flow.svg)

<figcaption>Search-tool flow and its two separate credentials. Click to view full size.</figcaption>
</figure>

<a name="code"></a>

## 1. Save the example {#code}

Create `web_search.py` with the following code, also available in the [documentation repository](https://github.com/78/xiaozhi-docs/blob/main/examples/mcp/web_search.py).

<<< ../../../../examples/mcp/web_search.py

### Create a search-service API key first

Sign in to the [Zhipu API Keys page](https://bigmodel.cn/usercenter/proj-mgmt/apikeys), create an API key in your project, and follow the provider's instructions to enable the search capability used here and check credit/quota. Copy the key into your own terminal only, not the XiaoZhi MCP endpoint field. Obtain the MCP endpoint separately from the [agent configuration](../quickstart.md#endpoint).

<a name="credentials"></a>

## 2. Set provider credentials {#credentials}

In the same terminal that will start the bridge, replace the placeholder with your own key:

::: code-group

```powershell [PowerShell]
$env:ZHIPU_API_KEY = 'YOUR_SEARCH_SERVICE_KEY'
```

```sh [macOS / Linux]
export ZHIPU_API_KEY='YOUR_SEARCH_SERVICE_KEY'
```

:::

Reuse dependencies such as `mcp` and `httpx` from the quickstart; install any missing ones in the same virtual environment. The MCP endpoint and search-provider key are different credentials and are not interchangeable.

<a name="verify"></a>

## 3. Start and verify {#verify}

Set your own `MCP_ENDPOINT`, then run:

```sh
python mcp_pipe.py web_search.py
```

Refresh the same agent's tool list and confirm `web_search` appears. Ask it to search a specific question online and provide sources. Check the actual invocation, titles, URLs, summaries, and result dates. A direct model answer does not establish that search occurred.

Treat returned web content as reference material, not instructions to execute commands, change permissions, or expose credentials. For 401/403, quota, timeout, or empty-result errors, distinguish provider responses from MCP connection problems.

<a name="materials"></a>

## Other options {#materials}

For desktop launchers or hosted search, see [Community tools](../../community/mcp-tools.md). The Python GUI attachment below is historical code. The maintained minimal example for this guide is `web_search.py` above.

<SourceMaterials article="DOC-25" />

<a name="next"></a>

## Next steps {#next}

For an existing remote MCP service, see [Connect existing services](../connect-existing-servers.md). For any provider, limit queries and response sizes, track cost and sources, then expand use.
