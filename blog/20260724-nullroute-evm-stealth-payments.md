# Nullroute: Pagamenti Stealth Anonimi e Privacy-Preserving su Blockchain EVM

Uno dei limiti più evidenti delle blockchain pubbliche basate su Ethereum e architettura EVM è la totale trasparenza del registro delle transazioni. Quando si condivide un indirizzo pubblico o si riceve un pagamento, l'intero registro storico delle transazioni, i saldi di wallet e la rete di relazioni finanziarie diventano immediatamente visibili a chiunque su block explorer come Etherscan.

Per risolvere questo problema salvaguardando la riservatezza senza richiedere mixer complessi o contratti rischiosi, ho creato **Nullroute** ([`scobru/nullroute`](https://github.com/scobru/nullroute) / [nullroute.scobrudot.dev](https://nullroute.scobrudot.dev/)), un hub per **pagamenti stealth su reti EVM**.

---

## 🥷 Come funzionano i Pagamenti Stealth (Stealth Addresses)

I pagamenti stealth consentono a un destinatario di pubblicare un unico metameta-indirizzo pubblico o identificativo di ricezione, ma di **ricevere ciascun pagamento su un indirizzo on-chain diverso e non correlabile**.

```
  SENDER                                                     RECEIVER
  ┌─────────────────────────────────┐                        ┌─────────────────────────────────┐
  │ 1. Legge lo Stealth Meta-Address│                        │ 1. Possiede la Master Key       │
  │ 2. Calcola indirizzo monouso    ├────── Transazione ────►│ 2. Scansiona il registro via   │
  │    con curva Ellittica (ECDH)   │       On-Chain         │    scambio di chiavi ECDH       │
  └─────────────────────────────────┘                        │ 3. Sblocca ed estrae i fondi    │
                                                             └─────────────────────────────────┘
```

1. **Generazione dell'Indirizzo Monouso**: Il mittente prende lo *Stealth Meta-Address* del destinatario e calcola matematicamente un nuovo indirizzo pubblico EVM monouso (*ephemeral stealth address*) tramite uno scambio di chiavi Diffie-Hellman sulla curva ellittica (secp256k1).
2. **Invio dei Fondi**: I fondi (ETH, MATIC, stablecoin USDT/USDC) vengono inviati a questo nuovo indirizzo appena creato.
3. **Scansione e Riscatto dei Fondi**: Il destinatario scansiona la blockchain; solo la sua chiave privata è in grado di riconoscere l'indirizzo stealth generato e derivare la relativa chiave privata monouso per sbloccare ed utilizzare i fondi.

---

## 🚀 Le Caratteristiche di Nullroute

- 🔒 **Privacy Nativa On-Chain**: Nessuno sviluppatore, explorer o osservatore di rete può collegare l'indirizzo stealth all'identità o al wallet principale del destinatario.
- 🌐 **Compatibilità Multi-Chain EVM**: Funziona su tutte le reti EVM-compatibili (Ethereum, Polygon, Arbitrum, Optimism, BNB Chain).
- ⚡ **Interfaccia Web Serverless**: App web static ad altissima velocità integrata direttamente con Web3 wallet (MetaMask, WalletConnect, Rabby).
- 🔑 **Self-Custody Totale**: Le chiavi private non lasciano mai il browser del destinatario. La derivazione avviene interamente via WebCrypto e librerie cripto locali.

---

## 🔗 Codice Sorgente e Link

- 🌐 **Web App Live**: [nullroute.scobrudot.dev](https://nullroute.scobrudot.dev/)
- 👉 **GitHub Repository**: [github.com/scobru/nullroute](https://github.com/scobru/nullroute)
