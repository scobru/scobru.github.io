# FID (Fediverse-ID) Protocol

> Sources: Scobru, 2026-07-30; TuneCamp, 2026-07-28
> Raw: [2026-08-01-fid-ecosystem-v4.md](../../raw/sources/2026-08-01-fid-ecosystem-v4.md)
> Updated: 2026-08-01

## Overview

FID (Fediverse-ID) is a zero-knowledge Self-Sovereign Identity (SSI) and Single-Sign-On (SSO) protocol designed for ActivityPub applications, P2P web apps, and federated ecosystems like TuneCamp. It enables deterministic, portable key generation without central OAuth servers or database passwords.

## Cryptographic Architecture

### Master Key Source (Zen SEA)
User identity is deterministically derived from `alias:passphrase` using the **Zen SEA** engine (`secp256k1`). 
- **`zenPubKey`**: Immutable global public key included in SSO tokens.
- **`masterPrivKey`**: Private key re-derived client-side in the browser; never sent over the network or saved on servers.

### Removal of WebAuthn / Passkey in v4
In version 4.0.0, WebAuthn/Passkey support was removed. Passkeys are bound to a Relying Party ID (`eTLD+1`), creating distinct credentials when authenticating across different origins (e.g. `fid-portal.vercel.app` vs `tunecamp.org`). Replacing Passkeys with pure Zen SEA restored 100% domain-independent identity portability.

### Deterministic ActivityPub Key Derivation & Domain Scoping
ActivityPub Ed25519 signing keys are derived deterministically via `PBKDF2-SHA256` with 10,000 iterations over salt `fid:activitypub:<domain>:<username>`. The salt includes the target domain, so each instance gets a distinct Ed25519 keypair. If a specific instance is compromised, the attacker cannot impersonate the user on other domains or deduce the Zen SEA master key.

### SSO Code Exchange & Anti-Replay
The SSO flow generates an `FidSsoToken` signed by the master key. To prevent key leakage via URL query strings or hash fragments, FID utilizes a POST code exchange flow (`mode: "code"`) returning a single-use `fid_code`. Nonces are invalidated upon consumption using `FidReplayStore` to eliminate replay attacks.

## See Also

- [Zen P2P Engine](../concepts/zen-p2p-engine.md)
- [TuneCamp Ecosystem](tunecamp-ecosystem.md)
