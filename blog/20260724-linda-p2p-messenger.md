# LINDA: Il Messenger P2P Crittografato E2EE per Desktop e Mobile senza Server Centrali

Nel panorama attuale della messaggistica istantanea, persino le applicazioni protette da crittografia end-to-end come Signal o WhatsApp condividono una vulnerabilità fondamentale: **dipendono da server centralizzati**. I server centrali gestiscono le rubriche contatti, collezionano metadati di connessione (chi parla con chi, quando e da dove) e richiedono un numero di telefono personale per la registrazione.

Per superare queste limitazioni ho creato **LINDA** ([`scobru/linda`](https://github.com/scobru/linda)), una piattaforma di messaggistica istantanea ad alte prestazioni, totalmente decentralizzata, crittografata end-to-end e priva di server centrali.

LINDA è progettata per girare nativamente sia su **Desktop (Electron)** che su **Mobile (Android via Capacitor)** e sul **Web (React/Vite)**.

---

## 🏗️ L'Architettura: Nessun Server, Nessun Numero di Telefono

La filosofia alla base di LINDA è semplice: **la tua identità è la tua chiave crittografica pubblica**. Non serve inserire numeri di telefono, email o creare account su server di terze parti.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LINDA CLIENT INTERFACE                          │
│                React 19 + TypeScript + Vite + DaisyUI                  │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
      ┌─────────────┴─────────────┐    ┌─────────────┴─────────────┐
      │   Desktop (Electron App)  │    │  Android App (Capacitor)  │
      └─────────────┬─────────────┘    └─────────────┬─────────────┘
                    │                                │
                    └────────────────┬───────────────┘
                                     │
         ┌───────────────────────────▼───────────────────────────┐
         │                  `linda-core` ENGINE                  │
         ├───────────────────────────────────────────────────────┤
         │ • Zen P2P Graph Database (Signaling, Sync & Presence) │
         │ • Zen Crypto / SEA (pair, encrypt, sign, verify, ECDH)│
         │ • WASM Engine (pen.wasm / crypto.wasm acceleration)   │
         │ • WebRTC Data Channels (Direct Peer-to-Peer Stream)   │
         └───────────────────────────────────────────────────────┘
```

---

## 🔐 Crittografia Nativa e Accelerazione WASM

Il cuore della sicurezza di LINDA risiede nella libreria condivisa **`linda-core`** ([`scobru/linda-core`](https://github.com/scobru/linda-core)).

Tutte le operazioni crittografiche (generazione delle coppie di chiavi `ZEN.pair()`, cifratura simmetrica delle chat 1:1 e di gruppo, firma digitale dei messaggi e scambio di segreti ECDH tramite `ZEN.secret()`) vengono eseguite direttamente nel client tramite il motore **Zen Crypto / SEA**.

Per garantire prestazioni elevate anche su dispositivi mobili ed evitare blocchi del main thread UI durante la decifratura di grossi volumi di dati, LINDA integra l'accelerazione via WebAssembly:
- **`pen.wasm`**: Bytecode WASM per l'esecuzione ad alta velocità del motore delle policy e della verifica dei blocchi.
- **`crypto.wasm`**: Acceleratore WASM nativo per le primitive crittografiche.

---

## 🌐 Signaling Decentralizzato su Grafo P2P e WebRTC

Come fanno due utenti a trovarsi e scambiarsi messaggi senza un server centrale di signaling?

LINDA utilizza il database grafico decentralizzato **ZEN** ([`@akaoio/zen`](https://github.com/akaoio/zen)):

1. **Risoluzione Nomi Utente (@username)**: Ogni utente può associare un handle unico `@username` alla propria chiave pubblica. La mappa viene salvata sul grafo P2P decentralizzato tramite invii autenticati deterministici.
2. **Signaling & Presenza**: Le richieste di connessione e lo scambio di candidate ICE per le chiamate avvengono iscrivendosi a nodi del grafo P2P.
3. **P2P Direct Streaming via WebRTC**: Quando due utenti sono connessi contemporaneamente, le immagini e i file vengono inviati in streaming diretto da dispositivo a dispositivo tramite **WebRTC Data Channels**, senza toccare alcun server intermedio.

---

## 🤖 Agenti AI Integrati nella Rete P2P

Un'altra funzionalità distintiva di LINDA è la capacità di integrare **Agenti AI** direttamente come membri delle conversazioni.

Grazie al runner di bot integrato (`bot-runner-gemini.ts`), un agente basato su LLM (come Google Gemini) legge e risponde alle conversazioni P2P agendo a tutti gli effetti come un peer autenticato dotato della propria coppia di chiavi crittografiche.

---

## 📱 Cross-Platform: Dal Desktop al Dispositivo Mobile

LINDA è compilata in pacchetti nativi per le principali piattaforme:
- **Desktop (Windows / macOS / Linux)**: Pacchetti distribuiti tramite **Electron** (con installatori nativi NSIS per Windows).
- **Mobile (Android)**: Compilazione nativa Android tramite **Capacitor** per fotocamera (scansione QR code di invito), notifiche locali e gestione dello stato di rete.
- **Web App**: Versione web reattiva ad altissima velocità.

---

## 🔗 Codice Sorgente e Repository

LINDA è un progetto completamente open-source facente parte dell'ecosistema Shogun:

- 🛡️ **LINDA Client**: [github.com/scobru/linda](https://github.com/scobru/linda)
- ⚙️ **LINDA Core**: [github.com/scobru/linda-core](https://github.com/scobru/linda-core)
- 🕸️ **ZEN Graph Engine**: [github.com/akaoio/zen](https://github.com/akaoio/zen)
