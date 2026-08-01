# L'Ecosistema Zen Apps: Costruire una suite di Web App Serverless, E2EE e P2P senza backend

Siamo così abituati all'idea che ogni Web App debba richiedere un backend pesante, un database relazionale gestito in cloud, server di autenticazione OAuth e abbonamenti SaaS che a volte dimentichiamo quanto siano potenti i browser moderni.

Cosa succederebbe se potessimo costruire un vault di note e dati sensibili — **100% serverless, zero-knowledge, decentralizzato e sincronizzato in tempo reale via P2P**?

È da questa sfida che è nato l'ecosistema delle **Zen Apps**: applicazioni web autonome costruite sul motore grafico decentralizzato **ZEN** ([`@akaoio/zen`](https://github.com/akaoio/zen)).

---

## 🧠 La Filosofia Architetturale: Zero Backend, Zero Knowledge

Tutte le Zen Apps condividono tre regole fondamentali di progettazione:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                    BROWSER CLIENT (HTML/JS)                     │
  │                                                                 │
  │  1. WebCrypto API ────────► 2. Local Storage ───► 3. ZEN Node   │
  │     (E2EE AES-GCM / TOTP)     (Radisk / Cache)   (P2P Graph Engine)
  └────────────────────────────────────────────────────────┬────────┘
                                                           │
                                             WebSocket / HTTP P2P Sync
                                                           │
                                            ┌──────────────▼──────────────┐
                                            │      Zen Relay Peers        │
                                            │ (delay.scobrudot.dev/zen)   │
                                            └─────────────────────────────┘
```

1. **Client-Side First & Serverless**: Le app sono composte da file statici (HTML/CSS/JS). Non c'è alcun codice lato server, nessun database SQL gestito centralmente e nessuna dipendenza di build pesante. Puoi lanciarle direttamente su GitHub Pages, Vercel o aprirle dal tuo disco locale.
2. **Crittografia End-to-End (E2EE / Zero-Knowledge)**: Tutti i dati sensibili vengono cifrati nel browser dell'utente tramite la **Web Crypto API** (AES-GCM 256-bit con derivazione di chiave PBKDF2 da master passphrase) *prima* di toccare la rete. I nodi di relay vedono soltanto dati cifrati incomprensibili.
3. **Sincronizzazione P2P via ZEN**: Il motore **ZEN** gestisce la topologia a rete, la convergenza dello stato tramite algoritmi HAM/CRDT e la propagazione automatica dei dati in tempo reale tra tutti i dispositivi collegati.

---

## 🔒 ZenVault & ZEN Engine

Ecco i componenti dell'ecosistema:

### 🔒 1. ZenVault (`scobru/zenvault`)
**Private Encrypted Secrets & Note Vault**
Un caveau digitale per conservare note riservate, chiavi di ripristino e informazioni sensibili.
- Cifratura in-browser AES-GCM 256-bit.
- Nessuna registrazione o account centralizzato: la master passphrase controlla le tue chiavi di decifratura.
- Sincronizzazione P2P e salvataggio locale offline-first.

### ⚡ 2. ZEN Engine & Fork (`scobru/zen`)
**Decentralized P2P Graph Engine & Network Base**
Il motore grafico decentralizzato P2P offline-first e il fork di base su cui si poggia l'architettura.
- Database grafico decentralizzato P2P.
- Algoritmo HAM/CRDT per la risoluzione dei conflitti.
- Zero dipendenze lato server.

---

## ⚡ Il Cuore Pulsante: ZEN Graph Engine

Tutte queste applicazioni non avrebbero la sincronizzazione in tempo reale senza **ZEN** ([`@akaoio/zen`](https://github.com/akaoio/zen)).

ZEN è un motore di database grafico decentralizzato P2P offline-first. Le sue caratteristiche chiave sono:
- **Nessun server centrale**: I nodi sono simmetrici. Chiunque può agire da relay.
- **Risoluzione dei conflitti HAM/CRDT**: Ogni scrittura include un vettore di stato temporale (*Hypothetical Amnesia Machine*); i nodi convergono automaticamente senza bisogno di un coordinatore centrale.
- **Funziona ovunque**: Zero dipendenze nel browser, eseguibile sia in ambienti Node.js che in browser moderni.

---

## 🎯 Conclusione e Prospettive

L'ecosistema delle **Zen Apps** dimostra che è possibile realizzare applicazioni web moderne, veloci, piacevoli da usare e prive di dipendenze dai giganti del Cloud. La combinazione di **WebCrypto API** per la privacy e **ZEN** per la sincronizzazione P2P permette di restituire agli utenti la piena sovranità sui propri dati.

Tutte le Zen Apps sono progetti open-source ed esplorabili su GitHub:
👉 **[github.com/scobru](https://github.com/scobru)**
