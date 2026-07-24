# Graphofone: Performare Musica e DJing Sperimentale tramite Grafi Interattivi

La maggior parte dei software di DJing o produzione musicale (DAW) organizza i brani in tracce orizzontali rigide o griglie a colonne. Ma la musica non è lineare: i brani hanno affinità di tonalità, bpm, atmosfera e transizioni che si sviluppano naturalmente come una rete.

È per esplorare questa visione che ho creato **Graphofone** ([`scobru/sidecamp/apps/graphofone`](https://github.com/scobru/sidecamp)): un'applicazione per live-performance e DJing sperimentale in cui la musica viene rappresentata e performata sotto forma di **grafo di nodi interattivi**.

---

## 🎧 Cos'è Graphofone?

Graphofone consente di importare una cartella di tracce musicali locali e disporle sullo schermo come nodi di un grafo visuale. Ogni connessione tra due nodi rappresenta una transizione armonica con **crossfade beat-matched** automatico.

A differenza di strumenti tradizionali, Graphofone è **100% offline e serverless**: gira interamente sul tuo computer senza dipendere da reti P2P o server remoti, concentrandosi esclusivamente sulle prestazioni audio in tempo reale.

```
                  ┌──────────────────────────────────────────────┐
                  │              GRAPHOFONE (App)                │
                  │       (React 19, TypeScript, Electron)       │
                  └──────────────┬────────────────┬──────────────┘
                                 │                │
            ┌────────────────────┴──┐          ┌──┴────────────────────┐
            │   `packages/graph-ui` │          │ `packages/audio-engine`│
            │   (Canvas Physics,    │          │ (Web Audio DSP,       │
            │    Waveform, Nodes)   │          │  Time-warp Worklets)  │
            └───────────────────────┘          └───────────────────────┘
```

---

## ⚡ L'Architettura Audio a Bassissima Latenza

Per evitare qualsiasi "glitch" o interruzione del suono durante le performance dal vivo, Graphofone separa rigorosamente la logica di interfaccia dal motore DSP di riproduzione attraverso un'architettura a moduli interni:

### 1. `packages/audio-engine` (Pure Web Audio DSP)
Il motore audio puro sviluppato su misura per l'elaborazione del segnale:
- **Crossfade Player**: Player multicanale per eseguire sfumature fluide e transizioni sincronizzate sul tempo.
- **Time-Warp & Pitch Shift**: Algoritmi di warping temporale per adattare i BPM delle tracce senza alterare la tonalità originale.
- **Audio Worklet Dedicati**: L'elaborazione del segnale avviene su thread audio isolati per garantire latenza zero anche in caso di carico grafico elevato.

### 2. `packages/graph-ui` (Interfaccia Grafico Dinamica)
L'interfaccia utente a grafo canvas:
- **Fisica dei Nodi 2D**: Posizionamento dinamico delle tracce con collegamenti visuali.
- **Waveform in Tempo Reale**: Visualizzazione dell'onda sonora di ogni brano direttamente sul nodo corrispondente.
- **Registrazione Live**: Cattura al volo del flusso audio performato per salvare i propri DJ set o mix sperimentali.

---

## 🎛️ Come si performa con Graphofone

1. **Importazione della Libreria**: Seleziona una cartella di file audio locali. Graphofone analizza la libreria e genera i nodi sul grafo.
2. **Creazione delle Mappe Sonore**: Collega i nodi tra loro per definire i percorsi di mixaggio preferiti o esplorare transizioni inaspettate.
3. **Performance dal Vivo**: Spostando il cursore o interagendo con i nodi, il motore `audio-engine` esegue automaticamente il crossfade sincronizzato e il pitch-matching tra i brani.

---

## 🛠️ Monorepo e Integrazione con Sidecamp

Graphofone condivide il monorepo di **Sidecamp** ([`scobru/sidecamp`](https://github.com/scobru/sidecamp)), sfruttando i pacchetti condivisi `graph-ui` e `audio-engine`. 

Mentre Sidecamp si occupa della gestione della libreria e della ricerca P2P, **Graphofone** rimane lo strumento focalizzato per le sessioni di mixaggio ed esplorazione sonora.

---

## 🔗 Codice Sorgente e Repository

Graphofone è un progetto open-source integrato nel monorepo Sidecamp:

👉 **[github.com/scobru/sidecamp](https://github.com/scobru/sidecamp)**
