# Demo ROFL App

This is a demo ROFL app that runs in TDX using Podman containers defined in a
`compose.yaml` file. It implements a simple price oracle in a shell script!

## Documentation

See [the ROFL documentation] for more details about ROFL-specific features
available to ROFL apps and on how to deploy the apps. See [the tutorial] on how
to create your own version of this app.

[the ROFL documentation]: https://docs.oasis.io/build/rofl
[the tutorial]: https://docs.oasis.io/build/rofl/app

## Oracle Smart Contract

The `/oracle` directory contains the smart contract code for the oracle implementation, sourced from the [Oasis SDK rofl-oracle example](https://github.com/oasisprotocol/oasis-sdk/tree/main/examples/runtime-sdk/rofl-oracle/oracle). It includes:

- Solidity smart contract (`contracts/Oracle.sol`)
- Hardhat configuration and deployment scripts

To update this contract code with the latest version:

```bash
# Run from the root directory of this repository
./scripts/update-oracle.sh
```

## Existing Deployment

The `rofl.yaml` in this repository defines an existing deployment named `test`
that is used for testing of the demo ROFL app. If you want to modify any of the
application aspects, you need to create your own deployment.
