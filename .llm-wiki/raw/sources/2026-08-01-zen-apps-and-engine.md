# Zen Apps Ecosystem & ZEN Engine

> Source: blog/20260724-zen-apps-ecosystem.md & index.html
> Collected: 2026-08-01
> Published: 2026-07-24

The Zen Apps ecosystem focuses on serverless, zero-knowledge, E2EE, and P2P web applications built on the ZEN Graph Engine (`@akaoio/zen`).

Key components:
- **Zenvault** (`scobru/zenvault`): Private Encrypted Secrets & Note Vault using in-browser AES-GCM 256-bit encryption with PBKDF2 master passphrase key derivation and P2P sync.
- **ZEN Engine & Fork** (`scobru/zen`): Decentralized P2P graph database engine. Features symmetrical peer nodes, HAM/CRDT state convergence vector resolution, zero server-side code requirement.
- **Delay Relay** (`delay.scobrudot.dev/zen`): Peer-to-peer WebSocket/HTTP relay node for offline-first state synchronization.
