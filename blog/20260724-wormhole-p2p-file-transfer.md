# WORMHOLE: Trasferire File Pesanti e Messaggi Cifrati da Terminale a Browser via P2P

Inviare un file pesante da un computer a un altro o da terminale a browser è un'operazione che nel 2026 non dovrebbe richiedere caricamenti su Google Drive, Wetransfer o server cloud di terze parti.

Per risolvere questo problema ho sviluppato **WORMHOLE** ([`scobru/wormhole`](https://github.com/scobru/wormhole)): uno strumento ad alte prestazioni per il trasferimento di file P2P e la messaggistica cifrata, accessibile sia da **riga di comando (CLI)** che da un'interfaccia **Web Dashboard**.

---

## 🚀 Il Concetto: Codici Mnemonici Umani e Cifratura Client-Side

WORMHOLE si ispira al paradigma di *Magic Wormhole*, ma lo estende per funzionare in modo ibrido su reti locali e su internet.

```
  SENDER (CLI o Web)                                   RECEIVER (CLI o Web)
  ┌───────────────────────┐                            ┌───────────────────────┐
  │ 1. Seleziona il file  │                            │ 1. Inserisce il codice│
  │ 2. Cifra in-browser   │                            │    "5-brave-fire"     │
  │    con AES-GCM (chiave│                            │ 2. Decifra i blocchi  │
  │    ="5-brave-fire")   │                            │    in locale          │
  └───────────┬───────────┘                            └───────────▲───────────┘
              │                                                    │
              └────────────────► [ IPFS / ZEN P2P ] ───────────────┘
                                 (o Multicast UDP LAN)
```

### Come funziona un trasferimento:
1. **Selezione del File**: L'utente lancia il comando `wormhole send <file>` da terminale o trascina un file nella Web Dashboard.
2. **Generazione del Codice Mnemonico**: WORMHOLE crea un codice semplice e facile da pronunciare a voce (ad esempio `5-brave-fire`).
3. **Crittografia E2EE nel Client**: Il codice mnemonico viene utilizzato immediatamente come chiave segreta per cifrare tutti i blocchi del file tramite **WebCrypto AES-GCM (256-bit)** prima della trasmissione.
4. **Trasferimento P2P**: Il destinatario inserisce il codice `wormhole receive 5-brave-fire` ed inizia il download decifrando i dati direttamente sul proprio dispositivo.

---

## 🛠️ Architettura Ibrida: LAN Multicast, ZEN Protocol e IPFS

WORMHOLE combina tre tecnologie di rete per garantire che i file arrivino a destinazione nel modo più veloce e sicuro possibile:

1. **Scoperta LAN via Multicast UDP**: Se mittente e destinatario si trovano sulla stessa rete locale (es. nella stessa casa o ufficio), WORMHOLE rileva la presenza del peer via UDP Multicast senza passare da internet, trasferendo i dati alla massima velocità consentita dalla rete locale (Gigabit LAN / Wi-Fi 6).
2. **Signaling & Presenza con ZEN Protocol**: Utilizza il protocollo decentralizzato **ZEN** ([`@akaoio/zen`](https://github.com/akaoio/zen)) per sincronizzare la presenza dei peer, lo stato dei trasferimenti e i metadati.
3. **IPFS Relay per File Asincroni**: Per consentire trasferimenti anche quando i peer non possono stabilire una connessione P2P diretta immediata, i blocchi cifrati vengono ospitati temporaneamente su un relay IPFS sicuro e rimossi automaticamente (unpinned) al completamento del download.

---

## 💻 CLI & Web Dashboard con Core Condiviso

Una delle scelte di progettazione di WORMHOLE è stata la creazione di una libreria core condivisa (**`wormhole-core.js`**) utilizzata sia dalla CLI che dalla Web App.

```
  wormhole/
  ├── src/
  │   ├── index.js              # CLI Binary Node.js (npx wormhole)
  │   └── core.js               # Adapter per CLI
  └── web/
      └── src/
          ├── shared/
          │   └── wormhole-core.js # LOGICA CONDIVISA (Crypto, ZEN, IPFS, WebCrypto)
          └── main.js           # Frontend Web Dashboard (Vite / React)
```

### Comandi da Terminale:
```bash
# Esecuzione istantanea senza installazione tramite npx
npx wormhole send video_4k.mp4

# Output: Codice generato: 5-brave-fire

# Su un'altra macchina o sul terminale di un amico:
npx wormhole receive 5-brave-fire

# Chat cifrata istantanea agganciata allo stesso codice:
npx wormhole msg 5-brave-fire "Messaggio segreto al volo"
```

---

## 🛡️ Privacy Nativa e Auto-Cleanup

- **Zero-Knowledge**: Nessun operatore di server o nodo di relay conosce il contenuto dei file o dei messaggi. Senza il codice mnemonico temporaneo, i blocchi sul relay sono indistinguibili da rumore casuale.
- **Pulizia Automatica**: Non appena il trasferimento è completato, i metadati vengono eliminati e i file sul relay temporaneo vengono rimossi ed eliminati dal sistema di storage.

---

## 🔗 Codice Sorgente e Repository Open Source

WORMHOLE è interamente open-source ed è disponibile su GitHub:

👉 **[github.com/scobru/wormhole](https://github.com/scobru/wormhole)**
