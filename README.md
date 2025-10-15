# Demo ROFL App

This is a demo ROFL app that runs in TDX using Podman containers defined in a
`compose.yaml` file. It implements a simple price oracle in a shell script!

## Documentation

See [the ROFL documentation] for more details about ROFL-specific features
available to ROFL apps and on how to deploy the apps. See [the tutorial] on how
to create your own version of this app.

[the ROFL documentation]: https://docs.oasis.io/build/rofl
[the tutorial]: https://docs.oasis.io/build/rofl/app

## Getting Started

### Installation

```bash
bun install
cp .env.example .env
# Edit .env and add your PRIVATE_KEY
```

## Oracle Smart Contract

The smart contract code is sourced from the [Oasis SDK rofl-oracle example](https://github.com/oasisprotocol/oasis-sdk/tree/main/examples/runtime-sdk/rofl-oracle/oracle).

### Deploy Oracle Contract

```bash
bunx hardhat deploy \
  --rofl-app-id rofl1qp55evqls4qg6cjw5fnlv4al9ptc0fsakvxvd9uw \
  --network sapphire-testnet
```

### Query Oracle Contract

```bash
bunx hardhat oracle-query \
  --contract-address 0x... \
  --network sapphire-testnet
```
