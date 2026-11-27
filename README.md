<p align="center">
  <img src="docs/public/logo_xiaozhi_dev.jpg" width="88" alt="XiaoZhi AI dev">
</p>

# XiaoZhi AI Tutorials

Practical guides for building, using, and extending [XiaoZhi AI](https://xiaozhi.me/) devices — from your first voice conversation to your own hardware and tools.

**[Read the documentation](https://docs.xiaozhi.me/)** · [XiaoZhi firmware](https://github.com/78/xiaozhi-esp32) · [Report a docs issue](https://github.com/78/xiaozhi-docs/issues/new?template=documentation.yml)

## Explore the guides

- **Getting started** — choose a device, connect it, and start a conversation.
- **Hardware and wiring** — build on a breadboard and connect microphones, speakers, displays, and power.
- **Firmware** — choose the right build, flash your device, and manage updates.
- **Console** — connect devices and configure agents, voices, and knowledge bases.
- **MCP and development** — add tools, customize firmware, and support new hardware.
- **Troubleshooting** — diagnose connection, audio, display, and build problems.

Browse the guides on [docs.xiaozhi.me](https://docs.xiaozhi.me/), or read the Markdown files in this repository. Images and article links work in both views. Each guide shows its review and translation status.

## Help maintain the tutorials

Help keep the guides accurate as devices, firmware, and the Console change. Verify instructions on real hardware, fix unclear steps, improve diagrams and photos, keep release instructions current, or translate reviewed guides.

For corrections, open a pull request with a short explanation of what changed and how you checked it. For a problem report, include the guide URL, device model, firmware version, and the step that failed.

See [Contributing](CONTRIBUTING.md) for the writing and review workflow, and [Maintaining the site](MAINTAINING.md) for publishing, media, and routine upkeep.

## Preview locally

Use Node.js 22:

```sh
npm ci
npm run dev
```

Before submitting changes, run:

```sh
npm run check
```

Approved changes on `main` are published automatically through GitHub Pages.

Original documentation text is licensed under [CC BY 4.0](LICENSE-DOCS). Third-party materials, code, and downloads retain their own terms.
