# TuneCamp e il suo Ecosistema: La mia visione (e il mio folle progetto) per la musica self-hosted e federata

Negli ultimi anni ho assistito, come tanti appassionati di musica e sviluppatori, alla solita triste storia: piattaforme di streaming che decidono cosa devi ascoltare in base a un algoritmo progettato per venderti materassi, commissioni che lasciano agli artisti indipendenti gli spicci per un caffè a fine mese, e una totale mancanza di controllo sulla propria libreria. Persino il caro vecchio Bandcamp, nostra fortezza di speranza, è stato acquistato più volte di quante vorrei ricordare.

Ad un certo punto mi sono detto: *ma perché non farmi male da solo e costruirmi il mio server musicale decentralizzato?* 

Ed è così che — tra una tazza di caffè e parecchie ore di codice — è nato **TuneCamp**.

L'obiettivo è semplice ma ambizioso (o forse un po' folle): creare una piattaforma self-hosted, federata e modulare che restituisca il controllo totale a chi la musica la suona, la produce o semplicemente la colleziona. In questo articolo vi racconto com'è nato **TuneCamp Core**, le scelte d'architettura che ho preso (evitando di impazzire) e la galassia di applicazioni satellite che gli girano attorno.

---

## Cos'è TuneCamp? (In parole povere)

**TuneCamp** è il server musicale open-source su cui sto sprecando... ops, *investendo* le mie serate. Combina la semplicità di un negozio/player musicale stile Bandcamp con la magia del **Fediverso** grazie al protocollo **ActivityPub**.

Quando ho iniziato a progettarlo, avevo una regola d'oro: **deve girare anche su quel vecchio Raspberry Pi che accumula polvere sulla scrivania**. Niente server spaziali da 50€ al mese. 

Per questo ho scelto uno stack leggero e scattante: **Node.js/Express**, **SQLite** (con `better-sqlite3`, perché SQLite è un piccolo miracolo della tecnologia) e un frontend reattivo in **React/Vite**.

Risultato? In pochi minuti puoi lanciare la tua istanza, sparare musica in streaming ad alta fedeltà, collegare la tua app mobile preferita via **API Subsonic** (Symfonium, Navidrome, DSub...) e persino fare due chiacchiere con agenti AI via **MCP (Model Context Protocol)** per farti consigliare brani dalla tua stessa libreria.

---

## L'Ecosistema: Una Galassia di Strumenti (Modulare per davvero)

Invece di creare un "monolito mostruoso" che se tocchi una riga di codice crolla tutto, ho preferito dividere il lavoro in una galassia di strumenti specializzati:

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
Il quartier generale. Gestisce la libreria musicale, l'interfaccia web di ascolto, i pagamenti diretti (Stripe per chi ama i contanti digitali, crypto/on-chain per i più coraggiosi), ospita le *Lab Apps* e chiacchiera con le altre istanze via ActivityPub. Grazie al supporto Subsonic, posso ascoltare i miei brani dallo smartphone anche mentre vado a fare la spesa.

### 2. Sidecamp (`scobru/sidecamp`)
Volevo il supporto P2P (Soulseek e Torrent), ma non volevo che il server principale prendesse fuoco o attirasse l'attenzione degli avvocati sbagliati. La soluzione? **Sidecamp**, un'app companion desktop su misura in Electron. Il P2P vive al sicuro sul tuo computer locale, lasciando il server TuneCamp leggero, pulito e del tutto legale.

### 3. Graphofone (`apps/graphofone` in Sidecamp)
Questo è il mio giocattolo preferito. Nelle sere in cui mi sento un DJ sperimentale, Graphofone mi permette di caricare cartelle di tracce e disporle sullo schermo come nodi di un grafo interattivo. Posso fare transizioni, *crossfade beat-matched* automatici e creare mappe visuali della musica. L'ho isolato dentro Sidecamp su uno stack Web Audio dedicato per assicurarmi che il suono non "glitchi" nemmeno se la rete sta collassando.

### 4. Le "Lab Apps" (Perché i moduli web sono fantastici)
Perché limitarsi ad ascoltare musica quando puoi giocarci direttamente nel browser? Tramite un sistema di iFrame integrato nel database (`lab_apps`), ho aggiunto due chicche:
- **Audiofabric**: Un visualizzatore 3D in tempo reale (Three.js/WebGL) che trasforma la musica in forme ipnotiche in streaming.
- **4-Track Recorder**: Uno studio di registrazione a 4 tracce in stile retrò nel browser (SvelteKit + Web Audio API) per registrare idee al volo o salvare file `.4trk` prima che la scimmia creativa svanisca.

### 5. TuneCamp Website & Community Player (`scobru/tunecamp-website`)
La solitudine del self-hoster è reale! Per questo ho creato un portale statico con **Community Directory** e **Community Player**: un punto di ritrovo per aggregare e riprodurre i brani di tutte le istanze TuneCamp sparse in giro per il pianeta.

---

## Le Mie Scelte d'Architettura (O come mantenere la sanità mentale)

1. **SQLite ovunque, viva la semplicità**: Niente cluster Postgres o container Docker da 4GB di RAM solo per servire tre file mp3. SQLite in single-writer è una scheggia, fa il backup semplicemente copiando un file e non ti tradisce mai.
2. **Federazione reale senza "Big Brother"**: Nessun login centralizzato o server padrone. Ogni istanza ha la sua autenticazione locale e indipendente, ma tutte possono fare "gossip" e condividere musica tramite ActivityPub, proprio come su Mastodon.
3. **Agenti AI che lavorano per te (MCP)**: Ho aggiunto il Model Context Protocol non per seguire l'hype dell'AI, ma perché è fantastico poter dire a un agente: *"trovami quel pezzo synthwave nascosto nella mia libreria e crea una playlist"*, senza regalare le proprie abitudini d'ascolto a corporazioni esterne.

---

## E Adesso? (Il Futuro)

Il cantiere è apertissimo! Prossime tappe: integrazione automatica con MusicBrainz (perché i metadati disordinati mi fanno salire il disturbo ossessivo-compulsivo) e l'espansione del **TuneCamp Design System** per fare in modo che tutto l'ecosistema sia bellissimo da vedere.

Se sei un artista in cerca di indipendenza, uno sviluppatore curioso o semplicemente un nerd della musica come me, provalo, rompilo, fammi sapere cosa ne pensi o vieni a fare un saluto sul Fediverso! TuneCamp è nato per divertirsi e per rimettere la musica nelle mani di chi la ama davvero.
