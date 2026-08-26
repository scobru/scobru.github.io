# LINDA Messenger

> Sources: Scobru, 2026-08-26
> Raw: [20260724-linda-p2p-messenger.md](../../raw/sources/20260724-linda-p2p-messenger.md)
> Updated: 2026-08-26

## Overview

LINDA is a serverless, end-to-end encrypted peer-to-peer messenger built on the **Holepunch stack** (`autobase`, `hyperbee`, `hyperswarm`, `hyperdrive`, `corestore`).

## Architecture & Primitives

- **Autobase**: Multi-writer causal consensus for decentralized room logs without a central coordinator.
- **Hyperbee**: Embedded B-Tree indexing chat messages and linearized room states.
- **Hyperswarm**: Distributed DHT for global peer discovery and direct end-to-end connections.
- **Hyperdrive**: Distributed P2P filesystem for encrypted attachment replication.
- **Corestore**: Local storage managing Hypercore feeds.

## Key Features

- **Zero Relay Dependency**: Operates with 100% serverless peer-to-peer primitives. Deliberately omits real-time video/voice calling to eliminate dependencies on corporate TURN relays or third-party servers.
- **Room Files (One Store, Two Views)**: The Files tab is a deterministically derived Hyperbee index over the chat stream. Files are replicated multi-seeder over Hyperswarm directly from the sender's Hyperdrive.
- **Cross-Platform Shared Core**: Desktop (Electron) and Mobile (Expo / React Native with `react-native-bare-kit` worklet) share one TypeScript core in `src/`.
- **Pear Distribution**: Distributed and self-updated over the Pear P2P protocol (`pear://...`) and native MSIX packaging.

## See Also

- [FID Protocol](fid-protocol.md)
- [TuneCamp Ecosystem](tunecamp-ecosystem.md)
