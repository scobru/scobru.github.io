# Sidecamp: Il Desktop Companion P2P per TuneCamp (Soulseek, Torrents & E2EE Chat)

Quando si sviluppa una piattaforma di streaming musicale self-hosted come **TuneCamp**, ci si trova inevitabilmente di fronte a un dilemma di architettura e conformità: come consentire agli utenti di cercare, scaricare e condividere musica via P2P senza sovraccaricare il server web o esporlo a complicazioni legali?

La risposta che ho progettato è **Sidecamp** ([`scobru/sidecamp`](https://github.com/scobru/sidecamp)), un'applicazione desktop Electron autonoma che agisce da *companion app* per TuneCamp.

Sidecamp sposta tutto l'acquisizione di contenuti sul computer locale dell'utente, lasciando il server TuneCamp leggero, pulito e del tutto legale.

---

## 🏗️ Perché Sidecamp? L'Architettura a Tunnel WebSocket Outward

Molte funzionalità P2P (Soulseek, WebTorrent, ripping tramite `yt-dlp`) richiedono risorse di calcolo locali e traffico diretto.

Invece di costringere l'utente a configurare complessi port-forwarding sui propri router per pubblicare file, **Sidecamp** utilizza una connessione a tunnel WebSocket in uscita (*outward connection*) verso il proprio server TuneCamp:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                 SIDECAMP DESKTOP APP (Electron)                 │
  │                                                                 │
  │  • Unified Search (Soulseek, Torrents, Archive.org, SoundCloud) │
  │  • Local Library & ID3 Tagging                                  │
  │  • Encrypted Peer Chat (tweetnacl E2EE)                         │
  └────────────────────────────────┬────────────────────────────────┘
                                   │
                    Reverse WebSocket Tunnel (P2P Stream)
                                   │
                    ┌──────────────▼──────────────┐
                    │       TuneCamp Server       │
                    │  (Legitimate Cloud Stream)  │
                    └─────────────────────────────┘
```

Grazie a questa architettura:
1. **Il server rimane pulito**: Nessuna libreria P2P o binario di download sul server ospitato.
2. **Controllo totale**: L'utente scarica i file sul proprio PC e decide quali tracce caricare sul proprio account TuneCamp.
3. **Zero Configurazione di Rete**: La connessione in uscita supera NAT e firewall senza toccare la configurazione del router.

---

## 🚀 Le Caratteristiche Principali di Sidecamp

### 🔎 1. Ricerca Unificata (Unified Search)
Una barra di ricerca unica per trovare musica contemporaneamente da più fonti:
- **Soulseek Network**: Ricerca P2P diretta di tracce rare ed introvabili.
- **BitTorrent / WebTorrent**: Download e seeding integrati in-app di file torrent e magnet link.
- **Internet Archive (`archive.org`)**: Download diretto di registrazioni live e pubblico dominio.
- **yt-dlp Audio Ripping**: Estrazione audio al volo da YouTube, SoundCloud e Bandcamp.
- **Rete Peer TuneCamp**: Ricerca tra le librerie condivise dagli altri utenti della rete.

### 💬 2. Peer Chat Crittografata E2EE
Sidecamp include un sistema di messaggistica diretta tra peer stile Soulseek. 
Tutti i messaggi privati sono cifrati end-to-end tramite **Curve25519 / XSalsa20-Poly1305** (libreria `tweetnacl`). Il server di relay WebSocket non ha mai accesso al testo in chiaro.

### 📁 3. Gestione della Libreria Locale & Permessi Granulari
Un file manager e player audio integrato per gestire la libreria scaricata:
- Modifica dei tag ID3 (titolo, artista, album).
- Condivisione selettiva delle cartelle con permessi granulari regolabili in tempo reale.
- Caricamento con un solo click delle tracce selezionate sulla libreria cloud del proprio server TuneCamp.

---

## 🛠️ Stack Tecnologico

- **Runtime**: Electron + React 19 + Vite.
- **P2P Engines**: WebTorrent, protocollo Soulseek nativo, tesseract WebSocket tunnel.
- **Crittografia**: `tweetnacl` (Curve25519 / XSalsa20-Poly1305).
- **Cross-Platform**: Pacchetti nativi distribuiti per Windows (`.exe` NSIS), macOS (`.dmg`) e Linux (`.AppImage`, `.deb`).

---

## 🔗 Codice Sorgente e Repository

Sidecamp è open-source ed è disponibile su GitHub:

👉 **[github.com/scobru/sidecamp](https://github.com/scobru/sidecamp)**
