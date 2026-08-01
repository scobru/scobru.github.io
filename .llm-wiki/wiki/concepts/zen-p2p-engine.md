# ZEN P2P Graph Engine

> Sources: Scobru, 2026-07-24
> Raw: [2026-08-01-zen-apps-and-engine.md](../../raw/sources/2026-08-01-zen-apps-and-engine.md)
> Updated: 2026-08-01

## Overview

The ZEN P2P Graph Engine (`@akaoio/zen`) is an offline-first, decentralized peer-to-peer graph database engine designed to run client-side in modern web browsers and Node.js environments.

## Core Features

- **Symmetrical Peer Topology**: Eliminates dedicated central backend database servers; any connected node can function as a peer or relay.
- **HAM / CRDT Conflict Resolution**: Uses state vectors (Hypothetical Amnesia Machine) and Conflict-free Replicated Data Types to merge state across network peers automatically without a central coordinator.
- **Zero Server Code**: Applications run as static client-side bundles (HTML/JS) interacting over WebSockets and P2P connections.
- **Relay Backbone**: Utilizes high-performance relay nodes like `Delay` (`delay.scobrudot.dev/zen`) for peer discovery and real-time state propagation.

## See Also

- [ZenVault](../entities/zenvault.md)
- [FID Protocol](../entities/fid-protocol.md)
