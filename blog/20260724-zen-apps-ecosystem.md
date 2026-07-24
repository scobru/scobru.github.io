# L'Ecosistema Zen Apps: Costruire una suite di Web App Serverless, E2EE e P2P senza backend

Siamo così abituati all'idea che ogni Web App debba richiedere un backend pesante, un database relazionale gestito in cloud, server di autenticazione OAuth e abbonamenti SaaS che a volte dimentichiamo quanto siano potenti i browser moderni.

Cosa succederebbe se potessimo costruire un'intera suite di applicazioni web quotidiane — dai gestori 2FA ai Kanban board, dai vault di note in stile Obsidian ai calcolatori di spese condivise — **100% serverless, zero-knowledge, decentralizzate e sincronizzate in tempo reale via P2P**?

È da questa sfida che è nato l'ecosistema delle **Zen Apps**: una galassia di web app autonome costruite sul motore grafico decentralizzato **ZEN** ([`@akaoio/zen`](https://github.com/akaoio/zen)).

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

## 🌌 La Galassia delle Zen Apps

Ecco una panoramica degli strumenti che compongono l'ecosistema:

### 🔑 1. ZenAuth (`scobru/zenauth`)
**Decentralized E2EE 2FA Authenticator & Password Manager**
Un autenticatore 2FA (stile Google Authenticator / 1Password) e gestore di credenziali in-browser.
- **Generatore TOTP nativo**: Calcolo in-browser dei codici 2FA RFC 6238 con conto alla rovescia di 30 secondi.
- **Password Generator**: Generatore integrato di password ad alta entropia.
- **Sync E2EE**: Tutti i seed TOTP e le credenziali sono cifrati in locale e sincronizzati tra desktop e smartphone.

### 🕸️ 2. ZenBoard (`scobru/zenboard`)
**Obsidian-Style Knowledge Graph & Markdown Vault**
Un vault di note in stile Obsidian con visualizzazione del grafo di conoscenza interattivo.
- **Grafo Fisico 2D Canvas**: Visualizzazione fisica dinamica dei nodi interconnessi tramite `[[WikiLinks]]`.
- **Editor Markdown con Live Preview**: Supporto completo a `# intestazioni`, `#tag` e collegamenti bidirezionali (backlinks).
- **Zero Server Note Vault**: Le tue idee rimangono private e sincronizzate via P2P.

### 📋 3. ZenKanban (`scobru/zenkanban`)
**Decentralized Drag & Drop Project Board**
Un tabellone Kanban stile Trello per la gestione dei progetti e dei task.
- **Drag & Drop Reattivo**: Spostamento delle card tra colonne (*Backlog, To Do, In Progress, Done*).
- **Card Dettagliate**: Gestione delle priorità (*Urgent, High, Medium, Low*), checklist, tag e scadenze.
- **Collaborazione Realtime**: Aggiornamento istantaneo del tabellone tra tutti i membri connessi.

### 🔒 4. ZenVault (`scobru/zenvault`)
**Private Encrypted Secrets & Note Vault**
Un caveau digitale per conservare note riservate, chiavi di ripristino e informazioni sensibili.
- Cifratura in-browser AES-GCM.
- Nessuna registrazione o account centralizzato: la master passphrase controlla le tue chiavi di decifratura.

### 📝 5. ZenPaste (`scobru/zenpaste`)
**Encrypted P2P Code & Text Pastebin**
Un pastebin decentralizzato per condividere al volo snippet di codice o note cifrate.
- Evidenziazione della sintassi per i principali linguaggi.
- Scadenza e rimozione automatica delle note.

### 💸 6. ZenSplit (`scobru/zensplit`)
**Decentralized Group Expense Splitter**
Calcolatore di spese di gruppo in stile Splitwise senza server o traccianti.
- Divisione equa o personalizzata delle spese di viaggio/casa.
- Calcolo automatico dei saldi e delle compensazioni minimali tra partecipanti.

### 📊 7. ZenLedger (`scobru/zenledger`)
**Personal Finance & Decentralized Transaction Ledger**
Registro di contabilità e finanza personale offline-first. Traccia entrate, uscite e budget mantenendo il controllo totale sui dati finanziari.

### 📇 8. ZenContacts (`scobru/zencontacts`)
**Decentralized P2P Address Book**
Rubrica contatti decentralizzata per organizzare contatti, chiavi pubbliche e informazioni di rete.

### 📝 9. ZenForms (`scobru/zenforms`)
**Decentralized Survey & Form Builder**
Builder di moduli e sondaggi che raccoglie risposte sul grafo P2P senza intermediari o cookie di terze parti.

### 📅 10. ZenCal (`scobru/zencal`)
**Decentralized Event & Calendar Planner**
Calendario personale e condiviso per pianificare appuntamenti ed eventi in tempo reale.

### 📡 11. ZenRadar (`scobru/zenradar`)
**Peer Node Monitoring & Network Health Dashboard**
Una dashboard visuale di monitoraggio che mostra in tempo reale i peer della rete Zen, i tempi di latenza (RTT) e lo stato dei relay.

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
