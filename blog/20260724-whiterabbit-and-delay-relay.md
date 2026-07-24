# Whiterabbit & Delay: Messaggistica Effimera in Tempo Reale e l'Infrastruttura di Relay P2P

Per sostenere un ecosistema di applicazioni decentralizzate e offline-first come **ZEN**, **LINDA**, **WORMHOLE** e le **Zen Apps**, c'è bisogno di una colonna vertebrale di rete affidabile, veloce e orientata alla privacy.

Questa infrastruttura si compone di due elementi fondamentali: **Delay** ([`scobru/delay`](https://github.com/scobru/delay) / [delay.scobrudot.dev](https://delay.scobrudot.dev)), l'istanza di relay decentralizzato P2P, e **Whiterabbit** ([`scobru/whiterabbit`](https://github.com/scobru/whiterabbit) / [whiterabbit.scobrudot.dev](https://whiterabbit.scobrudot.dev)), un'applicazione per chat effimere e temporanee in tempo reale.

---

## ⚡ Delay: Il Relay Decentralizzato Zero-Log

**Delay** è un nodo di sincronizzazione e relay peer-to-peer ad alte prestazioni basato sull'engine **ZEN** ([`@akaoio/zen`](https://github.com/akaoio/zen)).

```
  CLIENT 1 (Browser/App)                                    CLIENT 2 (Browser/App)
  ┌───────────────────────┐                                 ┌───────────────────────┐
  │ Messaggio / Scrittura │                                 │ Ricezione / Sync      │
  │ Cifrata in-browser    │                                 │ Decifratura in-browser│
  └───────────┬───────────┘                                 └───────────▲───────────┘
              │                                                         │
              └───────────────► [ DELAY RELAY NODE ] ───────────────────┘
                                (delay.scobrudot.dev)
                                Zero-Log WebSocket Relay
```

### Principi di Delay:
- **Zero-Log e Zero-Knowledge**: Il nodo relay agisce semplicemente come ripetitore di pacchetti tra peer. Non memorizza né analizza il contenuto dei messaggi, che viaggiano cifrati client-side.
- **Topologia Mesh**: I nodi Delay si connettono automaticamente tra loro formando una rete *mesh* resiliente a interruzioni o blocchi di rete.
- **Supporto WebSocket & HTTP**: Consente connessioni istantanee da qualsiasi browser o ambiente Node.js senza richiedere configurazioni di rete complesse.

---

## 🐇 Whiterabbit: Chat P2P Effimera Standalone (Zero-Relay)

A differenza dell'ecosistema delle Zen Apps che sfrutta il relay `Delay`, **Whiterabbit** è una delle poche applicazioni completamente **standalone** basata su connessioni WebRTC P2P dirette tra i browser dei partecipanti.

È un'applicazione web minimale progettata per quando si necessita di una stanza di chat istantanea per scambiare informazioni al volo senza lasciare alcuna traccia su nessun server di relay o database.

### Caratteristiche principali:
- ⏱️ **Stanze Effimere Temporanee**: Le stanze di chat ed i canali vivono esclusivamente in memoria finché i partecipanti sono connessi.
- 🔒 **Zero Server & Nessun Database**: I messaggi viaggiano direttamente tra i browser via WebRTC Data Channels. Non vengono salvati su alcun disco rigido, database permanente o nodo di relay.
- 🌐 **100% Serverless & Client-Side**: Interfaccia static in-browser accessibile al volo da qualsiasi dispositivo.

---

## 🔗 Link e Repository

- 🌐 **Whiterabbit App**: [whiterabbit.scobrudot.dev](https://whiterabbit.scobrudot.dev)
- 🌐 **Delay Relay Instance**: [delay.scobrudot.dev](https://delay.scobrudot.dev)
- 👉 **GitHub Whiterabbit**: [github.com/scobru/whiterabbit](https://github.com/scobru/whiterabbit)
- 👉 **GitHub Delay**: [github.com/scobru/delay](https://github.com/scobru/delay)
