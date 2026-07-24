# Linda & Wormhole: Comunicazione P2P e Trasferimento File Cifrato senza Server Centrali

Quando inviamo un messaggio o trasferiamo un file tramite i servizi cloud tradizionali (WhatsApp, Telegram, WeTransfer, Google Drive), siamo costretti ad accettare un compromesso: i nostri dati transitano su server centralizzati che conservano metadati, tracciano connessioni e mantengono il controllo sulle chiavi di rete.

Ma cosa succede se eliminiamo del tutto il server centrale dall'equazione?

È questa la visione dietro due dei progetti più ambiziosi del mio ecosistema: **LINDA** ([`scobru/linda`](https://github.com/scobru/linda)), un messenger P2P cifrato end-to-end multi-piattaforma, e **WORMHOLE** ([`scobru/wormhole`](https://github.com/scobru/wormhole)), uno strumento per il trasferimento sicuro di file e chat istantanee da terminale e web.

In questo articolo vi racconto l'architettura, le scelte tecnologiche e la sinergia tra questi due progetti.

---

## 🛡️ LINDA: Il P2P Encrypted Messenger Multi-Piattaforma

**LINDA** nasce con un obiettivo preciso: creare una piattaforma di messaggistica istantanea ad alte prestazioni, totalmente decentralizzata e crittografata end-to-end, capace di girare nativamente su **Desktop (Electron)**, **Mobile (Android via Capacitor)** e **Web (React/Vite)**.

```
                   ┌──────────────────────────────────────┐
                   │          LINDA Core Client           │
                   │       (React, TypeScript, Vite)      │
                   └──────────┬────────────────┬──────────┘
                              │                │
          ┌───────────────────┴──┐          ┌──┴───────────────────┐
          │  Desktop (Electron)  │          │  Android (Capacitor) │
          └───────────┬──────────┘          └───────────┬──────────┘
                      │                                 │
                      └────────────────┬────────────────┘
                                       │
                 ┌──────────────────────┴──────────────────────┐
                 │          Motore P2P & Crittografia          │
                 ├─────────────────────────────────────────────┤
                 │ • Zen P2P Graph Database (Signaling & Sync) │
                 │ • libsodium (sodium-universal / Javascript) │
                 │ • WebRTC Data Channels (Direct P2P Stream)  │
                 │ • WebCrypto / AES-GCM (Symmetric E2EE)      │
                 └─────────────────────────────────────────────┘
```

### Caratteristiche chiave di LINDA:
- 🔐 **Crittografia E2EE con libsodium**: Tutte le conversazioni (1:1 e di gruppo) e le chiavi pubbliche sono gestite dal motore `linda-core` con **libsodium** (`sodium-universal` / `sodium-javascript`) per una sicurezza crittografica ad altissime prestazioni.
- 🔑 **Identità Sovrana (@username)**: Nessun numero di telefono o email richiesti. La tua identità è la tua chiave pubblica crittografica. I nomi utente unici vengono risolti tramite un indice di scoperta decentralizzato sul grafo **Zen**.
- 🚀 **Trasferimento File Diretto via WebRTC**: Invio di immagini e file di qualsiasi dimensione direttamente tra peer tramite WebRTC Data Channels.
- 🤖 **Agenti AI Integrati**: Supporto nativo per Bot AI (Gemini/TypeScript) capaci di partecipare alle conversazioni come peer decentralizzati.

---

## 🌌 WORMHOLE: Trasferimento File Cifrato CLI & Web

Mentre LINDA gestisce la comunicazione quotidiana e la messaggistica, **WORMHOLE** è lo strumento specializzato per lo scambio rapido e sicuro di file di grandi dimensioni e messaggi cifrati al volo.

Ispirato al concetto di *Magic Wormhole*, consente di collegare due macchine ovunque nel mondo o in rete locale mediante un semplice codice mnemonico temporaneo (es. `5-brave-fire`).

```
  CLI Client  ───► [ Cifratura Locale AES-GCM ] ───►  IPFS / Zen P2P Relay  ───► Web Client
  (npx wormhole)       (Chiave = Codice Mnemonico)                             (Browser Dashboard)
```

### Come funziona WORMHOLE:
1. **Codici Mnemonici Umani**: Genera codici semplici come `5-brave-fire`. Questo codice funge direttamente da chiave segreta per la cifratura client-side.
2. **Architettura Ibrida**: Usa **ZEN Protocol** per il signaling e la sincronizzazione dello stato, combinato con **IPFS Relay** e canali P2P per lo streaming dei blocchi cifrati.
3. **Scoperta LAN tramite Multicast UDP**: Se le due macchine si trovano nella stessa rete locale, WORMHOLE le scopre automaticamente via UDP Multicast, garantendo velocità di trasferimento a banda massima di rete locale.
4. **Core Condiviso CLI & Web**: Sia la CLI Node.js (`wormhole send <file>`) che la dashboard Web utilizzano il medesimo modulo di logica e crittografia (`wormhole-core.js`).

#### Utilizzo da Riga di Comando:
```bash
# Inviare un file generandone il codice mnemonico
npx wormhole send documento.pdf

# Ricevere il file su un'altra macchina o terminale
npx wormhole receive 5-brave-fire

# Avviare una chat cifrata temporanea sul codice
npx wormhole msg 5-brave-fire
```

---

## 🔗 La Sinergia nell'Ecosistema Shogun

LINDA e WORMHOLE non vivono in isolamento, ma collaborano a livello di architettura:
- **`linda-core`**: Fornisce i moduli condivisi di crittografia e gestione delle identità P2P.
- **Integrazione File Async**: Quando LINDA necessita di inviare file a contatti offline, sfrutta i relay binari temporanei di WORMHOLE.
- **ZEN Protocol**: Entrambi i progetti utilizzano il grafo decentralizzato `@akaoio/zen` come colonna vertebrale per lo scambio di metadati e la sincronizzazione dello stato.

---

## 📄 Conclusione e Repository Open Source

Con LINDA e WORMHOLE dimostriamo che è possibile comunicare e scambiare file a massima velocità mantenendo il 100% della privacy, senza tracciamento e senza intermediari centralizzati.

Esplora il codice sorgente sui repository GitHub:
- 🛡️ **LINDA Messenger**: [github.com/scobru/linda](https://github.com/scobru/linda)
- 🌌 **WORMHOLE File Transfer**: [github.com/scobru/wormhole](https://github.com/scobru/wormhole)
- ⚙️ **LINDA Core**: [github.com/scobru/linda-core](https://github.com/scobru/linda-core)
