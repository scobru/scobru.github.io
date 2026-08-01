# ZenVault

> Sources: Scobru, 2026-07-24
> Raw: [2026-08-01-zen-apps-and-engine.md](../../raw/sources/2026-08-01-zen-apps-and-engine.md); [2026-08-01-scobru-portfolio-projects.md](../../raw/sources/2026-08-01-scobru-portfolio-projects.md)
> Updated: 2026-08-01

## Overview

ZenVault (`scobru/zenvault`) is a serverless, zero-knowledge digital vault for storing private notes, recovery keys, and sensitive secrets directly in the browser.

## Architecture & Security

- **In-Browser Encryption**: All secret data is encrypted client-side using `AES-GCM` 256-bit encryption with key derivation via `PBKDF2` from a user-controlled master passphrase.
- **Zero Knowledge**: No accounts, central databases, or server-side data storage. The master passphrase controls decryption keys locally.
- **Offline-First & P2P Sync**: Synchronizes across user devices via the ZEN P2P Graph Engine and peer relay nodes without central server reliance.

## See Also

- [Zen P2P Engine](../concepts/zen-p2p-engine.md)
