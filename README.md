# Base64 (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/base64-es](https://img.shields.io/github/v/release/hugoalh/base64-es?label=hugoalh/base64-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/base64-es")](https://github.com/hugoalh/base64-es)
[![JSR: @hugoalh/base64](https://img.shields.io/jsr/v/@hugoalh/base64?label=@hugoalh/base64&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/base64")](https://jsr.io/@hugoalh/base64)
[![NPM: @hugoalh/base64](https://img.shields.io/npm/v/@hugoalh/base64?label=@hugoalh/base64&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/base64")](https://www.npmjs.com/package/@hugoalh/base64)

An ECMAScript module for Base64 encode and decode.

## 🌟 Features

- Support multiple variants alphabet and padding:
  - [RFC 1421: Base64 encoding for privacy enhanced mail](https://datatracker.ietf.org/doc/html/rfc1421) (Deprecated)
  - [RFC 2045: Base64 transfer encoding for MIME](https://datatracker.ietf.org/doc/html/rfc2045)
  - [RFC 2152: Base64 encoding for UTF-7](https://datatracker.ietf.org/doc/html/rfc2152)
  - [RFC 3501: Base64 encoding for IMAP mailbox names](https://datatracker.ietf.org/doc/html/rfc3501#section-5.1.3)
  - [RFC 4648 §4: Base64 encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-4) (Standard)
  - [RFC 4648 §5: Base64 encoding with URL and filename safe alphabet](https://datatracker.ietf.org/doc/html/rfc4648#section-5) (Base64URL)
  - [RFC 9580: ASCII armor encoding for OpenPGP](https://datatracker.ietf.org/doc/html/rfc9580)
- Support stream encode and decode.

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/base64-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/base64[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/base64[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  class Base64Decoder {
    constructor(options?: Base64DecodeOptions);
    get variant(): Base64Variant;
    decodeToBytes(item: string | Uint8Array): Uint8Array;
    decodeToText(item: string | Uint8Array): string;
  }
  ```
- ```ts
  class Base64Encoder {
    constructor(options?: Base64EncodeOptions);
    get padding(): boolean;
    get variant(): Base64Variant;
    encodeToBytes(item: string | Uint8Array): Uint8Array;
    encodeToText(item: string | Uint8Array): string;
  }
  ```
- ```ts
  class Base64DecoderStream extends TransformStream<Uint8Array, Uint8Array> {
    constructor(options?: Base64DecodeOptions);
  }
  ```
- ```ts
  class Base64EncoderStream extends TransformStream<Uint8Array, Uint8Array> {
    constructor(options?: Base64EncodeOptions);
  }
  ```
- ```ts
  type Base64Variant =
    | "rfc1421"
    | "rfc2045"
    | "rfc2152"
    | "rfc3501"
    | "rfc4648-4"
    | "rfc4648-5"
    | "rfc9580"
    | "standard"
    | "url";
  ```
- ```ts
  interface Base64BasicOptions {
    variant?: Base64Variant;
  }
  ```
- ```ts
  interface Base64DecodeOptions extends Base64BasicOptions {
  }
  ```
- ```ts
  interface Base64EncodeOptions extends Base64BasicOptions {
    padding?: boolean | null;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/base64)

## ✍️ Examples

- ```ts
  new Base64Encoder().encodeToText("Many hands make light work.");
  //=> "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu"
  ```
