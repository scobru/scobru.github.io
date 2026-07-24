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

## 🐇 Whiterabbit: Chat P2P Effimere senza Traccia

Basata sull'infrastruttura di **Delay**, **Whiterabbit** è un'applicazione web minimale progettata per quando si necessita di una stanza di chat istantanea per scambiare informazioni senza lasciare traccia.

### Caratteristiche principali:
- ⏱️ **Stanze Effimere Temporanee**: Le stanze di chat vivono esclusivamente finché i partecipanti sono connessi o per la durata impostata.
- 🔒 **Nessun Database o Registro**: I messaggi non vengono salvati su alcun disco rigido o database permanente. Esistono soltanto nella memoria RAM dei client connessi.
- 🌐 **100% Serverless**: Interfaccia static in-browser accessibile al volo da desktop o dispositivi mobili.

---

## 🔗 Link e Repository

- 🌐 **Whiterabbit App**: [whiterabbit.scobrudot.dev](https://whiterabbit.scobrudot.dev)
- 🌐 **Delay Relay Instance**: [delay.scobrudot.dev](https://delay.scobrudot.dev)
- 👉 **GitHub Whiterabbit**: [github.com/scobru/whiterabbit](https://github.com/scobru/whiterabbit)
- 👉 **GitHub Delay**: [github.com/scobru/delay](https://github.com/scobru/delay)
