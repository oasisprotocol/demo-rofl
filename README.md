# Demo ROFL App

This is a demo ROFL app that runs in TDX using Podman containers defined in a
`compose.yaml` file.

## Build

To build the ROFL app and reproduce the measurements, simply run:

```sh
oasis rofl build
```

You can verify the measurements against the policy specified in `rofl.yaml` and
published on chain by running:

```sh
oasis rofl build --verify
```

When making modifications to the application you can also automatically update
it by using:

```sh
oasis rofl build --update-manifest
```

## Update On-chain Configuration

To update the on-chain ROFL app configuration (assuming you are the admin), you
can run (after updating the manifest):

```sh
oasis rofl update
```

## Deploy

To deploy your ROFL app, you need a working bare metal instance with TDX
hardware running Oasis Core 25.0 or later synced to your desired network
(e.g. Testnet).

Then you need to configure the path to the desired ROFL app bundle in the node
configuration as follows:
```yaml
runtime:
    # ...
    paths:
        - /srv/node/runtime/demo-rofl.default.orc
```

_Easy deployment that doesn't require running a node coming soon!_

## Features

### Key Generation

Each registered ROFL app automatically gets access to a decentralized on-chain
key management system. This system is exposed to containers via a simple REST
API that is available via the `/run/rofl-appd.sock` UNIX socket.

These keys can only be generated inside properly attested ROFL app instances.

For example, to quickly generate a private key:

```sh
curl \
  --json '{"key_id": "demo key", "kind": "secp256k1"}' \
  --unix-socket /run/rofl-appd.sock \
  http://localhost/rofl/v1/keys/generate
```

The `key_id` is used for domain separation of different keys and `kind` can be
any of:

* `raw-256` to generate 256 bits of entropy.
* `raw-386` to generate 384 bits of entropy.
* `ed25519` to generate an Ed25519 private key.
* `secp256k1` to generate a Secp256k1 private key.

The result will be a JSON document like the following:

```json
{"key": "a54027bff15a8726b6d9f65383bff20db51c6f3ac5497143a8412a7f16dfdda9"}
```

### Secrets

Similar to key generation, each containerized ROFL app transparently has support
for securely configuring secrets. Each secret is end-to-end encrypted so that it
can only be decrypted inside a correctly attested ROFL app instance.

Secrets can be easily managed via the Oasis CLI, for example:

```sh
# Encrypt the secret and store it in the local manifest.
echo "my very secret value" | oasis rofl secret set mysecret -
# Push the encrypted secret to ROFL apps.
oasis rofl update
```

Then pass it in the container, either via environment variables or container
secrets.

#### Environment Variables

```yaml
services:
  test:
    image: docker.io/library/alpine:3.21.2@sha256:f3240395711384fc3c07daa46cbc8d73aa5ba25ad1deb97424992760f8cb2b94
    command: echo "Hello $MYSECRET!"
    environment:
      - MYSECRET
```

#### Container Secrets

```yaml
services:
  test:
    image: docker.io/library/alpine:3.21.2@sha256:f3240395711384fc3c07daa46cbc8d73aa5ba25ad1deb97424992760f8cb2b94
    command: echo "Hello $(cat /run/secrets/mysecret)!"
    secrets:
      - mysecret

secrets:
  mysecret:
    external: true
```
