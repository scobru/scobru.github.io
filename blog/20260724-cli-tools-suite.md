# CLI-Tools: La mia collezione di utility essenziali da terminale (con Sync P2P Zen)

Per chi lavora ogni giorno nel terminale, l'efficienza non è un lusso: è una necessità. Troppe volte mi sono ritrovato a ripetere le stesse operazioni manuali — organizzare file disordinati in `Downloads`, memorizzare snippet di codice al volo, generare password sicure ma memorabili o scambiare brevi messaggi crittografati — finché non ho preso la decisione più naturale per uno sviluppatore: **costruirmi la mia suite personalizzata di CLI tools**.

Nasce così la raccolta open-source **`cli-tools`** ([github.com/scobru/cli-tools](https://github.com/scobru/cli-tools)). Una suite minimale, modulare e pensata per l'uso quotidiano su Windows, Linux e macOS.

In questo articolo vi racconto come sono strutturati questi strumenti e, in particolare, come ho realizzato **`dnote`**, il mio developer notebook con sincronizzazione offline-first basato sul motore P2P **Zen**.

---

## 🚀 Il Pezzo Forte: `dnote` (Developer Notebook con Sync P2P Zen)

Tutti prendiamo appunti mentre programmiamo: un comando `git` complesso che dimentichiamo sempre, una syntax speciale di JavaScript o un parametro Docker.

Ho voluto riprogettare il concetto di **dnote** integrando la rete decentralizzata **Zen** (`@akaoio/zen`) e collegandolo al mio relay di sincronizzazione personale `https://delay.scobrudot.dev/zen`.

```
 ┌─────────────────────────────────────────────────────────┐
 │                   dnote CLI (Node.js)                   │
 └────────────────────────────┬────────────────────────────┘
                              │
               ┌──────────────┴──────────────┐
               │                             │
    ┌──────────▼──────────┐       ┌──────────▼──────────┐
    │ Radisk Storage      │       │  Zen Relay Node     │
    │ (Offline-first local)│       │  (delay.scobrudot.dev)│
    └─────────────────────┘       └─────────────────────┘
```

### Caratteristiche principali di `dnote`:
- 📚 **Organizzazione in Taccuini (Books)**: Salva note in categorie tematiche (`js`, `git`, `python`, `devops`).
- ⚡ **Offline-First Nativo**: Le note vengono scritte e lette istantaneamente dal database grafico locale `Radisk` in `~/.dnote/data`.
- 🔄 **Sincronizzazione P2P Decentralizzata**: Grazie al protocollo HAM/CRDT di Zen, i dati si sincronizzano in background appena c'è connessione con il relay `delay.scobrudot.dev/zen`.
- 🔑 **Identità Crittografica**: Genera automaticamente una coppia di chiavi `ZEN.pair()` in `~/.dnote/keypair.json` assicurando che il tuo namespace sul grafo sia autenticato.
- 🔍 **Ricerca Full-Text**: Cerca keyword in millisecondi in tutto il tuo archivio con `dnote find <query>`.

#### Esempi di utilizzo:
```bash
# Aggiungi una nota al taccuino 'git'
dnote add git "git commit --amend --no-edit"

# Aggiungi una nota con il flag -c o via prompt multiriga
dnote add js -c "Array.from({length: 5}) crea un array di 5 elementi"

# Elenca tutti i tuoi taccuini
dnote view

# Cerca una parola chiave in tutte le note
dnote find commit

# Sincronizza subito con il relay remoto
dnote sync
```

---

## 🛠️ La Galassia `cli-tools`: Tutti gli altri strumenti

Oltre a `dnote`, la suite raccoglie una serie di utility focalizzate ciascuna su un singolo problema pratico:

```
  cli-tools/
  ├── dnote/          📝 Developer Notebook + P2P Sync (Node.js / Zen)
  ├── opass/          🔑 Organic Password Generator (Python CLI)
  ├── clip/           📋 Clipboard History Manager (Python CLI)
  ├── cryptoclip/     🔐 Clipboard Encryption & Monitor (Python + Fernet + Tray)
  ├── cryptomessage/  💬 End-to-End Encrypted Messaging (Python RSA+AES GUI/CLI)
  └── foldx/          📁 Automatic Folder Organizer (Python CLI)
```

### 1. `opass` — Organic Password Generator
Genera password ed entropie mnemoniche basate su eventi culturali, storici o personali con combinazioni di trasformazioni (`leet`, `reverse`, `caps`, `alnum`) e simboli dedicati. Produce sia la password in chiaro, sia le istruzioni mnemoniche per ricordarla, sia l'hash SHA-256.

```bash
opass holidays Christmas secret -t leet
```

### 2. `clip` (`clipmgr`) — Clipboard History Manager
Gestore di cronologia della clipboard da terminale. Mantiene una cronologia persistente in `~/clipboard_history.json` permettendoti di salvare il contenuto corrente, aggiungere testi direttamente, elencare la cronologia e ricopiare al volo qualsiasi elemento passato tramite il suo indice.

```bash
clipmgr save
clipmgr list
clipmgr get 2
```

### 3. `cryptoclip` — Clipboard Encryption & Monitor
Per chi necessita di crittografia al volo. Gira in background con un'icona nella system tray e ascolta hotkey globali (`Ctrl+Shift+E` per cifrare, `Ctrl+Shift+D` per decifrare) cifrando il contenuto della clipboard con la libreria Fernet.

### 4. `cryptomessage` — Encrypted Messaging (GUI & CLI)
Un'applicazione per inviare messaggi crittografati end-to-end tramite qualsiasi canale (Telegram, WhatsApp, Email). Combina la crittografia ibrida RSA-2048 e AES-256 con firma digitale dei messaggi e gestione dei contatti.

### 5. `foldx` — Automatic Folder Organizer
Stanco della cartella `Downloads` o `Desktop` incasinata? `foldx` analizza qualsiasi directory e riorganizza automaticamente i file spostandoli in sottocartelle ordinate in base all'estensione (`.pdf`, `.jpg`, `.mp4`, `.zip`...).

---

## 📦 Installazione e Integrazione Sistema

Ogni strumento Python della suite è impacchettato con `setup.py` e launcher `.cmd` per Windows. Può essere installato globalmente in modalità editable:

```bash
cd cli-tools
pip install -e .\clip -e .\cryptoclip -e .\cryptomessage -e .\foldx -e .\opass
cd dnote && npm install -g
```

Una volta aggiunta la cartella degli eseguibili al PATH, tutti i comandi (`dnote`, `opass`, `clipmgr`, `foldx`, `cryptomessage`) diventano comandi nativi del terminale su qualsiasi sistema operativo.

---

## 🔗 Codice Sorgente e Repository

Il progetto è interamente open-source ed esplorabile su GitHub:
👉 **[github.com/scobru/cli-tools](https://github.com/scobru/cli-tools)**

Se avete idee per nuovi tool da terminale o volete contribuire, le Pull Request sono sempre benvenute!
