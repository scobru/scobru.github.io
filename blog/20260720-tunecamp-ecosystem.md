# TuneCamp e il suo Ecosistema: La Rivoluzione della Musica Self-Hosted e Federata

Negli ultimi anni, la fruizione e la distribuzione della musica online sono state dominate da piattaforme centralizzate che spesso soffocano la creatività degli artisti indipendenti e limitano la sovranità sui propri dati e contenuti. **TuneCamp** nasce per cambiare questa dinamica, offrendo una piattaforma self-hosted, federata e modulare che restituisce il controllo completo ad artisti, etichette indipendenti e collezionisti.

In questo articolo esploreremo in dettaglio **TuneCamp Core** e l'intero ecosistema di applicazioni satellite che lo circonda.

---

## Cos'è TuneCamp?

**TuneCamp** è un server musicale open-source self-hosted con funzionalità avanzate per la pubblicazione, lo streaming e la vendita diretta di musica (in stile Bandcamp), arricchito da una solida integrazione con il **Fediverso** tramite protocollo **ActivityPub**.

Costruito su uno stack leggero e performante (**Node.js/Express**, **SQLite** con `better-sqlite3`, e **React/Vite** per il frontend), TuneCamp permette a chiunque di lanciare la propria istanza musicale in pochi minuti, offrendo streaming ad alta fedeltà, un'API compatibile con **Subsonic**, e supporto nativo per agenti AI via **MCP (Model Context Protocol)**.

---

## Architettura e Componenti dell'Ecosistema

L'ecosistema TuneCamp non è un singolo blocco monolitico, ma una galassia di strumenti specializzati pensati per coprire ogni esigenza produttiva e di ascolto:

```
                     ┌─────────────────────┐
   Lab Apps (iFrame) │      TuneCamp        │  Federazione (ActivityPub)
   Audiofabric ──────►  core server + DB    │◄──── altre istanze TuneCamp
   4-Track Recorder   │  (Node/Express,      │      (HTTP gossip discovery)
                       │   SQLite, React)     │
                       └──────────┬───────────┘
                                  │ Subsonic API / REST
                                  │
                       ┌──────────▼───────────┐
                       │  Sidecamp (Electron)  │──── P2P (Soulseek/torrents)
                       │  desktop companion     │
                       │  ├── Graphofone        │  (live performance, audio engine
                       │  ├── audio-engine pkg   │   isolato su Web Audio)
                       │  └── graph-ui pkg       │
                       └───────────────────────┘
```

### 1. TuneCamp Core (`scobru/tunecamp`)
Il cuore dell'ecosistema. Gestisce la libreria musicale, l'interfaccia web di ascolto e vendita, le vendite dirette (via Stripe o smart contract crypto/on-chain), l'hosting delle Lab Apps e la rete federata ActivityPub. Grazie all'API Subsonic, consente di utilizzare qualsiasi client Subsonic desktop o mobile (come Symfonium, Navidrome, DSub).

### 2. Sidecamp (`scobru/sidecamp`)
L'applicazione companion desktop basata su Electron. Sidecamp si occupa del recupero e della condivisione di file via **P2P (Soulseek e Torrent)**. Mantenere le funzionalità P2P lato client isola il server principale, garantendone la legalità e la pulizia.

### 3. Graphofone (`apps/graphofone` in Sidecamp)
Un'applicazione per performance dal vivo e DJing sperimentale. Permette di importare cartelle di tracce, disporle visualmente come un grafo interattivo ed eseguire transizioni con *crossfade beat-matched* automatici o manuali. È stato separato da Sidecamp per garantire che l'audio engine a bassa latenza su Web Audio rimanga del tutto fluido e indipendente dall'I/O di rete.

### 4. Le "Lab Apps" (Applicazioni Web Embedded)
TuneCamp integra un sistema dinamico di moduli iFrame denominati *Lab Apps*, gestiti direttamente da database (`lab_apps`):
- **Audiofabric**: Un visualizzatore musicale 3D in tempo reale in WebGL (Three.js), integrato con le stream audio dell'API Subsonic.
- **4-Track Recorder**: Uno studio di registrazione a 4 tracce nel browser (SvelteKit + Web Audio API) con compensazione della latenza e salvataggio/caricamento di progetti `.4trk`.

### 5. TuneCamp Website & Community Player (`scobru/tunecamp-website`)
Il portale statico che ospita la **Community Directory** e il **Community Player**, in grado di aggregare e riprodurre brani da tutte le istanze pubbliche di TuneCamp sparse per la rete globale.

---

## Caratteristiche Uniche e Decisioni Architetturali

1. **Nessuna dipendenza pesante da database complessi**: TuneCamp utilizza esclusivamente **SQLite** in modalità single-writer per prestazioni estreme e facilità di backup/migrazione.
2. **Federazione sociale senza SSO centralizzato**: Ogni istanza mantiene l'autenticazione locale e indipendente (JWT/passwords). L'interazione tra istanze avviene via protocollo ActivityPub, in stile Funkwhale o Mastodon.
3. **Integrazione con Agenti AI via MCP**: TuneCamp supporta nativamente il Model Context Protocol, consentendo agli agenti AI di esplorare la libreria musicale, gestire i metadati e assistere l'utente nella fruizione musicale.

---

## Il Futuro dell'Ecosistema TuneCamp

L'ecosistema è in continua evoluzione. Tra i prossimi sviluppi chiave spiccano l'arricchimento dei metadati su MusicBrainz tramite contributi automatici e la continua espansione del **TuneCamp Design System** per una UI unificata su tutte le applicazioni della rete.

Se sei un artista, uno sviluppatore o un appassionato di musica self-hosted, TuneCamp offre il perfetto connubio tra sovranità dei dati, innovazione tecnologica e passione per il suono.
