# Designer Contracts

Designer is a e-signature based on Gear blockchain.

## Prebuilt Binaries

Raw, optimized, and meta WASM binaries can be found in the [Releases section](https://github.com/gear-dapps/designer/releases).

## Building Locally

### ⚙️ Install Rust

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### ⚒️ Add specific toolchains

```shell
rustup toolchain add nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

... or ...

```shell
make init
```

### 🏗️ Build

```shell
cargo build --release
```

... or ...

```shell
make build
```

### ✅ Run tests

```shell
cargo test --release
```

... or ...

```shell
make test
```

### 🚀 Run everything with one command

```shell
make all
```

... or just ...

```shell
make
```

### Interface

- `createContractWithAgree` with no resource

```json
{
"createContractWithAgree": {
            "name": "test1.0",
            "signers": [
                "0x98aa72dae1620f0ec6f24af905620e21662c19cf4846ad36cdcaa7725e341707"
            ],
            "file": {
                "digest": {
                     "SHA256": "0x98aa72dae1620f0ec6f24af905620e21662c19cf4846ad36cdcaa7725e341707"
                },
                "url": "-",
                "memo":  null
            },
            "resource": null,
            "expire": "1686187807000"
        }
}
```

- `createContractWithAgree` with resource

```json
{
"createContractWithAgree": {
            "name": "test1.0",
            "signers": [
                "0x98aa72dae1620f0ec6f24af905620e21662c19cf4846ad36cdcaa7725e341707"
            ],
            "file": {
                "digest": {
                     "SHA256": "0x98aa72dae1620f0ec6f24af905620e21662c19cf4846ad36cdcaa7725e341707"
                },
                "url": "-",
                "memo":  "-"
            },
            "resource": {
                        "digest": {
                                "SHA256": "0x98aa72dae1620f0ec6f24af905620e21662c19cf4846ad36cdcaa7725e341707"
                        },
                        "url": "-",
                        "memo": "-"
            },
            "expire": "1686187807000"
        }
}
```
