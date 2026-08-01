# FID (Fediverse-ID) v4 Protocol Architecture

> Source: blog/20260730-fid-ecosystem.md & tunecamp/fid
> Collected: 2026-08-01
> Published: 2026-07-30

FID (Fediverse-ID) is a generic, self-sovereign, zero-knowledge cryptographic identity and Single-Sign-On (SSO) protocol designed for any ActivityPub/Fediverse application, P2P web apps, and decentralized platforms (like TuneCamp).

Key properties:
- Master Key Source: Zen SEA (secp256k1) keypair derived deterministically from `alias:passphrase`.
- Zero-Knowledge Authentication: master private key never leaves the browser.
- v4 Breaking Change: WebAuthn/Passkey support removed because RP-bound passkeys broke Fediverse identity portability across multiple domains.
- ActivityPub Ed25519 Key Derivation: PBKDF2-SHA256 over salt `fid:activitypub:<domain>:<username>`. Domain-scoped to isolate compromised instances.
- 2-Step Instance Passport Handshake: nonce challenge signed with Zen SEA private key, yielding an HMAC-signed FidPassport badge.
- SSO Code Exchange Protocol: POST to `/api/auth/zen/sso` with `mode: "code"` delivering `fid_code` to prevent key exposure in URL query/fragment, with anti-replay `FidReplayStore`.
- Portal: Zero-dependency single-page application at `https://fid-portal.vercel.app/`.
