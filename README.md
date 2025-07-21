# Base64 (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/base64-es](https://img.shields.io/github/v/release/hugoalh/base64-es?label=hugoalh/base64-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/base64-es")](https://github.com/hugoalh/base64-es)
[![JSR: @hugoalh/base64](https://img.shields.io/jsr/v/@hugoalh/base64?label=@hugoalh/base64&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/base64")](https://jsr.io/@hugoalh/base64)
[![NPM: @hugoalh/base64](https://img.shields.io/npm/v/@hugoalh/base64?label=@hugoalh/base64&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/base64")](https://www.npmjs.com/package/@hugoalh/base64)

An ECMAScript (JavaScript & TypeScript) module for Base64 encode and decode.

## 🌟 Features

- Support encode and decode in stream.
- Support these variants alphabet and padding:
  - [RFC 1421](https://datatracker.ietf.org/doc/html/rfc1421): Base64 for privacy enhanced mail (Deprecated)
  - [RFC 2045](https://datatracker.ietf.org/doc/html/rfc2045): Base64 transfer encoding for MIME
  - [RFC 2152](https://datatracker.ietf.org/doc/html/rfc2152): Base64 for UTF-7
  - [RFC 3501](https://datatracker.ietf.org/doc/html/rfc3501#section-5.1.3): Base64 encoding for IMAP mailbox names
  - [RFC 4648 §4](https://datatracker.ietf.org/doc/html/rfc4648#section-4): Base64 (Standard)
  - [RFC 4648 §5](https://datatracker.ietf.org/doc/html/rfc4648#section-5): Base64URL (URL-safe & filename-safe standard)
  - [RFC 9580](https://datatracker.ietf.org/doc/html/rfc9580): ASCII armor for OpenPGP

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/base64-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/base64[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/base64[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/base64)

## ✍️ Examples

- ```ts
  new Base64Encoder().encodeToText("Many hands make light work.");
  //=> "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu"
  ```
