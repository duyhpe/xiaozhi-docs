---
id: mcp-quickstart
title: 'MCP quickstart: connect a calculator'
description: 'Install, discover, and invoke a verifiable local addition tool through your agent.'
status: review
reviewedAt: '2026-11-15'
reviewNote: >-
  The example passed local MCP protocol and WebSocket bridge tests. A real endpoint, Console discovery, and device voice
  invocation still require validation with your own account.
translation:
  status: review
  sourceHash: ddbb2753d70b63db0f2ed268e646907670a288405d10ee7599aa712a072bc902
  reviewedAt: '2026-11-15'
---
# MCP quickstart: connect a calculator

Make a local addition tool available to your XiaoZhi agent. Verify startup → connection → discovery → invocation before adding files, search, or smart-home control.

<a name="scope"></a>

## Preparation {#scope}

- A working XiaoZhi conversation device and the Console account that owns it.
- A computer that can keep Python running; this guide uses Python 3.12 and Git.
- Network access to GitHub, Python dependencies, and the XiaoZhi MCP endpoint.

The tool runs on the computer; **it is not flashed into ESP32 firmware**. It becomes unavailable when the computer or bridge process stops. After development, move it to an always-on service if needed.

<figure class="source-figure">

[![Stages in one addition-tool call.](../../public/images/en/mcp-calculator-flow.svg)](../../public/images/en/mcp-calculator-flow.svg)

<figcaption>Stages in one addition-tool call. Click to view full size.</figcaption>
</figure>

<a name="endpoint"></a>

## 1. Get the agent's endpoint {#endpoint}

1. Sign in to the [XiaoZhi Console](https://xiaozhi.me/console/) and find the agent used by the device.
2. Open its configuration, enter **extension capabilities**, and expand **MCP endpoint**.
3. Copy the agent's WebSocket address for use only in your own terminal environment.

The endpoint is a credential. Do not include it in tutorial screenshots, Git repositories, or public logs. Expanding the section again may generate a new address but does not establish that the old address is invalid. If exposed, use the service's current credential-management or support process.

<a name="install"></a>

## 2. Create a separate Python environment {#install}

Use this fixed commit of the [official bridge example](https://github.com/78/mcp-calculator) to reproduce the guide:

```sh
git clone https://github.com/78/mcp-calculator.git
cd mcp-calculator
git checkout c537f71d61fd73b47d6c8955b5df6d3721acf4e4
```

Create and activate an environment. If your Python command differs, use the command that points to Python 3.12:

::: code-group

```powershell [Windows PowerShell]
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

```sh [macOS / Linux]
python3.12 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
```

:::

If PowerShell policy blocks activation, use `.\.venv\Scripts\python.exe` instead of later `python` commands without changing global policy. For dependency failures, check the interpreter and first error. An old minimum Python version in an upstream README does not guarantee compatibility with every current dependency.

<a name="tool"></a>

## 3. Create a minimal tool {#tool}

Create **`safe_calculator.py`** beside `mcp_pipe.py` with this complete code:

```python
import logging
from mcp.server.fastmcp import FastMCP

logging.basicConfig(level=logging.INFO)  # Logs go to stderr by default.
mcp = FastMCP("XiaoZhiSafeCalculator")

@mcp.tool()
def add_numbers(a: int, b: int) -> dict:
    """Add two integers exactly. Each input must be between -1000000 and 1000000."""
    if not (-1_000_000 <= a <= 1_000_000 and -1_000_000 <= b <= 1_000_000):
        raise ValueError("Each input must be between -1000000 and 1000000")
    return {"sum": a + b}

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

The tool only adds two integers; it does not execute Python expressions from the model. Keep stdout for MCP protocol traffic, and do not use `print()` for debugging.

<a name="connect"></a>

## 4. Set the endpoint and start the bridge {#connect}

Replace the placeholder with your endpoint. **Do not run the placeholder unchanged.**

::: code-group

```powershell [Windows PowerShell]
$env:MCP_ENDPOINT = 'PASTE_YOUR_COMPLETE_ENDPOINT_HERE'
python mcp_pipe.py safe_calculator.py
```

```sh [macOS / Linux]
export MCP_ENDPOINT='PASTE_YOUR_COMPLETE_ENDPOINT_HERE'
python mcp_pipe.py safe_calculator.py
```

:::

Keep the terminal running. Logs should show the WebSocket connection followed by startup of `safe_calculator.py`. Discovery produces a tool-list request. Process startup alone does not establish that the agent discovered the tool.

Press Ctrl+C to stop. A new terminal needs the environment activated and endpoint set again. Configure these separately when moving the process to a server.

<a name="verify"></a>

## 5. Verify discovery and invocation {#verify}

1. Return to the same agent's MCP endpoint section and refresh connection status/tool lists.
2. Confirm **`add_numbers`** appears. If missing, use the troubleshooting table before changing conversation prompts.
3. Ask the device: “Use the addition tool to calculate 37 plus 58.”
4. Check arguments 37 and 58, tool result `sum: 95`, and an answer consistent with that result. Use Console conversation records and local logs to establish that the tool was actually invoked.

::: tip Completion check
The bridge stays online, the Console discovers `add_numbers`, and a real conversation invokes it and returns 95. The model calculating 95 itself does not verify tool integration.
:::

<a name="troubleshooting"></a>

## Troubleshooting {#troubleshooting}

| Symptom | Check in this order |
| --- | --- |
| `ModuleNotFoundError` | Python comes from `.venv`, and requirements were installed into that environment |
| `MCP_ENDPOINT` is missing | Set it in the terminal that starts the process, not another window |
| WebSocket connection/authentication failure | Complete endpoint, correct agent, network, and address validity; redact endpoints before sharing logs |
| Connected but no tools | Child-process errors, filename/path, logs accidentally written to stdout; refresh the Console tool list |
| Tool visible but not invoked | Make an explicit request to the same agent; inspect descriptions, parameters, and conversation call records |
| Goes offline later | Computer sleep, process exit, and network changes; do not rely only on initial connection logs |
| Input out of range | This example deliberately rejects it; test integers within the specified range |

Tool-count, message, and connection limits depend on the current service.

<a name="next"></a>

## Next steps {#next}

Give each new tool a clear name, parameter types, purpose, and error results. For tools with side effects, define scope and authentication first. Develop device GPIO tools using the [firmware MCP guide](https://github.com/78/xiaozhi-esp32/blob/v2.6.0/docs/mcp-usage.md).

Bridge implementation and dependencies: [the upstream commit used here](https://github.com/78/mcp-calculator/tree/c537f71d61fd73b47d6c8955b5df6d3721acf4e4).
