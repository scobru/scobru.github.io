# FID (Fediverse-ID): Identità Crittografica Auto-Sovrana e Protocollo SSO Zero-Knowledge per il Fediverse

Nei social network federati basati su ActivityPub e nelle applicazioni web decentralizzate, uno dei problemi più complessi è la gestione dell'identità. Nel modello tradizionale del Fediverse (es. Mastodon o Lemmy), l'identità dell'utente è strettamente legata alla singola istanza (`@user@instance.tld`). Se l'istanza chiude o l'utente vuole spostarsi su un altro nodo, trasferire la propria reputazione e le proprie chiavi crittografiche risulta macchinoso e spesso frammentato.

È da questa esigenza che nasce **FID (Fediverse-ID)**: un protocollo generico di **Self-Sovereign Identity (SSI)** e **Single-Sign-On (SSO)** a conoscenza zero (zero-knowledge) sviluppato per l'ecosistema **TuneCamp** e applicabile a qualsiasi applicazione ActivityPub o P2P.

---

## 🏛️ L'Architettura Cryptographic Master Key (Zen SEA)

A differenza dei sistemi di autenticazione basati su server OAuth2 centralizzati o database di password per-istanza, FID si basa interamente sulla crittografia ad albero di chiavi deterministiche.

```
                                ┌───────────────────────────┐
                                │   fid-portal.vercel.app   │
                                │  (Zen SEA Global Portal)  │
                                └─────────────┬─────────────┘
                                              │  WSS (Zen Graph)
                                ┌─────────────▼─────────────┐
                                │   wss://delay.scobrudot.dev│
                                │     Zen P2P Relay         │
                                └─────────────┬─────────────┘
                                              │
                        ┌─────────────────────┴─────────────────────┐
                        │                                           │
           ┌────────────▼────────────┐                 ┌────────────▼────────────┐
           │   Fediverse App /       │                 │   Fediverse App /       │
           │   TuneCamp Instance A   │                 │   TuneCamp Instance B   │
           └─────────────────────────┘                 └─────────────────────────┘
```

La base del protocollo è la **Master Key Source**, basata sul motore crittografico **Zen SEA** (curva ellittica `secp256k1`):

1. **Derivazione da Alias + Passphrase**: L'identità master dell'utente è una funzione pura `f(alias, passphrase)`. Digitando la stessa combinazione di alias e passphrase in qualsiasi portale o browser, il sistema calcola la medesima coppia di chiavi master. Non esistono file `.pem` o chiavi private da scaricare, salvare su pennette USB o rischiare di smarrire.
2. **`zenPubKey` (Identificativo Pubblico Globale)**: È l'impronta crittografica pubblica e immutabile dell'utente. Viene inclusa in ogni token SSO ed è pubblica per natura.
3. **`masterPrivKey` (Chiave Privata Master)**: Viene ricavata al volo nel browser e **non viene mai trasmessa in rete**, né memorizzata su alcun server o istanza centralizzata.

---

## ⚠️ L'Evoluzione v4: Perché WebAuthn / Passkey è stato Rimosso

Nelle prime versioni di FID (v3), il protocollo supportava le Passkey (WebAuthn) come fonte per la chiave master. Tuttavia, nella **versione 4.0.0** la dipendenza da WebAuthn è stata intenzionalmente eliminata.

**La ragione è fondamentale per l'architettura SSI:**
Una Passkey WebAuthn è strutturalmente vincolata al *Relying Party ID* (ovvero al dominio `eTLD+1` del portale che l'ha emessa). Di conseguenza, se un utente si autenticava tramite `fid-portal.vercel.app` e successivamente tramite `tunecamp.org`, l'authenticator del sistema operativo generava due credenziali diverse, due segreti diversi e quindi **due identità distinte**.

Questo approccio infrangeva il principio cardine di FID (un'unica identità portabile per il Fediverse) e creava una dipendenza critica nei confronti del singolo dominio di portale. Passando a **Zen SEA puramente deterministico**, l'identità non dipende da alcun dominio o origin e non soffre di alcun lock-in.

---

## 🔑 Derivazione Deterministica delle Chiavi ActivityPub (Ed25519) & Domain Scoping

Le attività federate nel Fediverse richiedono firme HTTP W3C basate su chiavi **Ed25519** o RSA. FID risolve questo problema consentendo la generazione deterministica di chiavi ActivityPub senza costringere l'utente a gestire chiavi di signing per ogni server.

Tramite la funzione `deriveApIdentity()`, FID esegue la derivazione:

- **Algoritmo**: `PBKDF2-SHA256` con 10.000 iterazioni.
- **Salt Scopato per Dominio**: `fid:activitypub:<domain>:<username>` (es. `fid:activitypub:tunecamp.org:scobru`).
- **Inviluppo Ed25519 PKCS#8 DER**: Generazione automatica dell'attore ActivityPub (`actorUri`), dell'handle WebFinger (`@user@domain.org`) e delle chiavi PEM pubblica e privata.

### 🛡️ Isolamento delle Istanze (Domain Scoping)
Includere il dominio di destinazione all'interno del salt PBKDF2 è una scelta di sicurezza deliberata:
- Ogni istanza riceve una chiave privata Ed25519 **diversa e isolata**.
- Se un'istanza del Fediverse viene compromessa o agisce in modo malevolo, l'attaccante ottiene soltanto la chiave Ed25519 locale a quell'istanza. Non può in alcun modo risalire alla chiave master Zen SEA dell'utente, né impersonare l'utente su altre istanze o piattaforme.

---

## 🤝 Handshake a 2 Passaggi per l'Instance Passport

Per collegare un profilo locale (es. `@scobru` su `tunecamp.org`) a una `zenPubKey` globale, FID implementa un handshake in due passaggi:

```
Instance (Server)                     User / Portal (Client)
      │                                         │
      │ ─── 1. GET /api/auth/zen/challenge ───► │ (Genera nonce monouso)
      │                                         │
      │                                         │ ─── 2. Firma il challenge
      │                                         │      con chiave privata Zen SEA
      │                                         │
      │ ◄── 3. POST /api/auth/zen/link ──────── │ (Invia firma SEA)
      │                                         │
      │ ─── 4. Verifica e rilascia Passport ──► │ (Badge Passport firmato HMAC)
```

1. **Challenge Generation**: L'istanza genera un challenge temporaneo monouso `{ instanceDomain, username, nonce, timestamp }`.
2. **Firma Zen SEA**: Il client firma `${username}:${nonce}` nel browser utilizzando la chiave privata Zen SEA (`signPayload`).
3. **Verifica e Rilascio Passport**: L'istanza verifica la firma crittografica secp256k1 contro la `zenPubKey` fornita tramite `FidChallengeManager`, consuma il nonce e rilascia un **Instance Passport** (`FidPassport`) firmato con secret HMAC dall'istanza (`FidPassportIssuer`).

---

## 🔐 Protocollo SSO "Login con FID" e Code Exchange Anti-Replay

Per le applicazioni che integrano il pulsante **"Login with FID"**, il protocollo fornisce un flusso SSO sicuro a prova di intercettazione:

1. **Token SSO Firmato**: Il portale genera un `FidSsoToken` firmato con la chiave master dell'utente contenente i metadati di autenticazione e l' `apSeed` (la chiave ActivityPub scoppata per il dominio dell'app).
2. **Code Exchange (POST invece di Fragment URL)**: A differenza dei vecchi flussi OAuth/SSO che inserivano token e chiavi nel frammento URL (`#payload=...`), FID impiega il **Code Exchange Flow**. Il portale invia il token via `POST` direttamente a `https://<instanceDomain>/api/auth/zen/sso` con `mode: "code"`. L'istanza risponde con un `fid_code` monouso e il portale reindirizza l'utente trasportando solo il codice temporaneo. In questo modo nessuna chiave o seed crittografico finisce nella barra degli indirizzi, nella cronologia o nei log dei referrer.
3. **FidReplayStore (Protezione Replay Attack)**: Ogni nonce SSO viene masterizzato e consumato al primo utilizzo tramite `FidReplayStore`. Tentativi successivi di riutilizzare lo stesso token vengono immediatamente respinti.

---

## 🌐 Il Portale Centrale Zero-Dependency (`fid-portal.vercel.app`)

L'implementazione di riferimento del portale SSO e della dashboard di gestione identità è distribuita live su:  
👉 **[https://fid-portal.vercel.app/](https://fid-portal.vercel.app/)**

Il portale è realizzato in HTML5/JS nativo ed è completamente **statico e zero-dependency**:
- Non memorizza alcuna informazione o chiave su database centralizzati.
- Chiunque può ospitare il proprio `portal.html` o eseguirlo in locale: inserendo il medesimo alias e la stessa passphrase, si otterrà sempre la stessa identità crittografica.

---

## 🎯 Conclusione

Con il rilascio di **FID v4**, TuneCamp ed il Fediverse dispongono di uno standard di identità decentralizzata veramente auto-sovrana:
- **Zero Lock-in**: l'identità appartiene all'utente e si rigenera da `alias:passphrase`.
- **Zero-Knowledge**: le chiavi master non lasciano mai il browser.
- **Sicurezza Isolata**: ogni istanza riceve unicamente la chiave ActivityPub di propria competenza.
- **SSO Sicuro**: scambio codici monouso senza esposizione di token negli URL.

FID dimostra come sia possibile unire l'accessibilità del Single Sign-On moderno con i principi inviolabili della crittografia peer-to-peer e della sovranità digitale.
