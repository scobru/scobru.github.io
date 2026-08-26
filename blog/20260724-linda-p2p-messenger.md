# LINDA: Messenger P2P Serverless & Encrypted su Stack Holepunch (Autobase & Pear)

Nel panorama attuale della messaggistica istantanea, persino le applicazioni protette da crittografia end-to-end come Signal o WhatsApp condividono una vulnerabilità fondamentale: **dipendono da server centralizzati**. I server centrali gestiscono le rubriche contatti, collezionano metadati di connessione (chi parla con chi, quando e da dove) e richiedono un numero di telefono personale per la registrazione.

Per superare radicalmente queste limitazioni ho ricostruito **LINDA** ([`scobru/linda`](https://github.com/scobru/linda)): un messenger P2P crittografato, 100% serverless, ad alte prestazioni, sviluppato sullo stack decentralizzato **Holepunch** ([`autobase`](https://github.com/holepunchto/autobase), [`hyperbee`](https://github.com/holepunchto/hyperbee), [`hyperswarm`](https://github.com/holepunchto/hyperswarm), [`hyperdrive`](https://github.com/holepunchto/hyperdrive) e [`corestore`](https://github.com/holepunchto/corestore)).

LINDA è progettata per operare nativamente sia su **Desktop (Electron)** che su **Mobile (Expo + `react-native-bare-kit`)**, condividendo un unico core applicativo in `src/`.

---

## 🏗️ L'Architettura: Lo Stack Holepunch & Zero Server

La filosofia alla base di LINDA è rigorosa: **la tua identità è la tua chiave crittografica autonoma** generata da mnemonic BIP-39. Non serve inserire numeri di telefono, email o creare account su infrastrutture cloud.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LINDA CLIENT INTERFACE                          │
│               Electron (Desktop)  │  Expo + BareKit (Mobile)           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────▼───────────────────────────────┐
    │                        SHARED CORE (src/)                     │
    ├───────────────────────────────────────────────────────────────┤
    │ • Autobase: Multi-writer linearized log & causal consensus    │
    │ • Hyperbee: B-Tree indexing over state & room metadata        │
    │ • Hyperswarm: Distributed DHT peer discovery & direct RPC     │
    │ • Hyperdrive: Distributed P2P filesystem for encrypted files  │
    │ • Corestore: Compact storage & hypercore feed management      │
    │ • Sodium-Universal: Cryptographic signatures & keys           │
    └───────────────────────────────────────────────────────────────┘
```

### Come comunicano i peer senza server centrale?

1. **Discovery & Swarming (`hyperswarm`)**: I nodi si trovano nella rete P2P globale interrogando la DHT distribuita di Hyperswarm sul topic della stanza o del contatto.
2. **Consenso causale multi-writer (`autobase`)**: I messaggi delle stanze vengono scritti su feed Hypercore individuali e unificati in modo deterministico e ordinato da Autobase, garantendo consistenza tra tutti i partecipanti senza alcun coordinatore centrale.
3. **Index di stato (`hyperbee`)**: Lo stato linearizzato delle stanze, lo storico messaggi e i metadati dei file vengono indicizzati in un database Hyperbee locale.

---

## 🛡️ Filosofia di Prodotto: "Zero Relay Dependency"

LINDA è concepita per individui sovrani che rifiutano qualsiasi dipendenza da intermediari.

### Perché non ci sono chiamate audio o video?
Questa è una **scelta di design deliberata**, non una feature mancante:
- **Nessun relay di terze parti (TURN)**: Lo streaming multimediale in tempo reale su reti mobili (dietro CGNAT e firewall simmetrici) richiede obbligatoriamente server di relay TURN per inoltrare i pacchetti UDP.
- **Vera indipendenza**: Mantenere server TURN dedicati comporta costi continuativi di hosting e infrastrutture corporate. LINDA è un progetto indipendente e sovrano.
- **Zero Trust & Metadati**: Affidarsi a relay terzi espone a rischi di logging dei metadati di connessione o blocchi improvvisi.

Eliminando lo streaming real-time di chiamate, LINDA garantisce che tutte le funzionalità — chat testuale, condivisione file pesanti e discovery dei contatti — funzionino **esclusivamente su primitive P2P pure** con zero infrastrutture intermedie.

---

## 📁 Room Files: Un unico store, due viste (Chat & Files)

Nelle applicazioni tradizionali, i file inviati vivono in cartelle remote o bucket S3 separati. In LINDA, la scheda **Files** è un indice trasparente e deterministico generato direttamente sopra il flusso della chat:

- **One store, two views**: Quando invii un file (`sendFile`), i byte vengono scritti nel tuo **Hyperdrive** locale e viene appeso un messaggio nella chat. La funzione deterministica `apply()` di Autobase inserisce un record (`name`, `size`, `mimeType`, `authorId`, `timestamp`, `driveKey`) nel log linearizzato di Hyperbee sotto `file/${messageId}`.
- **Sincronia perfetta**: La chat e la scheda Files non possono mai trovarsi in disaccordo sul contenuto della stanza, perché leggono la stessa sequenza di log.
- **Replica P2P Multi-Seeder**: I file viaggiano sulle connessioni Hyperswarm già attive nella stanza. Ogni peer che scarica un file ne diventa automaticamente seeder locale per gli altri nodi.
- **Gestione permessi e rimozione onesta**: L'autore o gli amministratori della stanza possono cancellare un record; i byte vengono rimossi dal proprio drive locale, mentre i peer che hanno già replicato il file conservano la propria copia locale (come è onesto e naturale che sia in una rete P2P).

---

## 📱 Cross-Platform: Desktop & Mobile con `react-native-bare-kit`

La stessa identica architettura che alimenta **Keet** (l'applicazione flagship di Holepunch) viene impiegata in LINDA:

- **Desktop (Electron)**: Un wrapper leggero che ospita il frontend e avvia il core TypeScript in ambiente Node.js.
- **Mobile (Expo / React Native)**: Il core `src/` viene compilato ed eseguito all'interno di un worklet runtime Bare dedicato tramite **`react-native-bare-kit`**, garantendo le medesime primitive P2P native e prestazioni crittografiche su Android e iOS.
- **Contact Links**: Link diretti deterministici per permettere a due nodi di avviare immediatamente una conversazione cifrata privata.

---

## 🍐 Distribuzione Pear & Packaging Nativo

LINDA supporta il self-updating e la distribuzione P2P tramite la piattaforma **Pear**:

- **Pear P2P Staging & Seeding**:
  ```bash
  pear stage pear://fe1g7q7wqqjundb7t3pdz93tz7n9cm7sakr46mdg6ipg4tk15xno .
  pear seed pear://fe1g7q7wqqjundb7t3pdz93tz7n9cm7sakr46mdg6ipg4tk15xno
  ```
- **Installer Nativi (MSIX & Zip)**: Compilazione automatizzata via Electron Forge per installazione su Windows e distribuzioni desktop.

---

## 🔗 Codice Sorgente e Repository

LINDA è un progetto completamente open-source:

- 🛡️ **LINDA Repository**: [github.com/scobru/linda](https://github.com/scobru/linda)
- 🕳️ **Holepunch Primitives**: [holepunch.to](https://holepunch.to)
