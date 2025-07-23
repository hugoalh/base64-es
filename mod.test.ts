import { deepStrictEqual } from "node:assert";
import {
	Base64Decoder,
	Base64Encoder,
	Base64EncoderStream,
	type Base64Variant
} from "./mod.ts";
async function testerDirect(t: Deno.TestContext, decoded: string | Uint8Array, expects: Partial<Record<Base64Variant, string>>): Promise<void> {
	for (const [variant, encoded] of Object.entries(expects)) {
		await t.step(`${variant} Encode`, () => {
			deepStrictEqual(new Base64Encoder({
				padding: (
					variant === "rfc4648-5" ||
					variant === "url"
				) ? false : null,
				variant: variant as Base64Variant,
			}).encodeToText(decoded), encoded);
		});
		await t.step(`${variant} Decode`, () => {
			deepStrictEqual(new Base64Decoder({ variant: variant as Base64Variant }).decodeToText(encoded), (typeof decoded === "string") ? decoded : new TextDecoder().decode(decoded));
		});
	}
}
Deno.test("Direct 1", { permissions: "none" }, async (t) => {
	await testerDirect(t, "Many hands make light work.", {
		standard: "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu"
	});
});
Deno.test("Direct 2", { permissions: "none" }, async (t) => {
	await testerDirect(t, "light work.", {
		standard: "bGlnaHQgd29yay4=",
		url: "bGlnaHQgd29yay4"
	});
});
Deno.test("Direct 3", { permissions: "none" }, async (t) => {
	await testerDirect(t, "light work", {
		standard: "bGlnaHQgd29yaw==",
		url: "bGlnaHQgd29yaw"
	});
});
Deno.test("Direct 4", { permissions: "none" }, async (t) => {
	await testerDirect(t, "light wor", {
		standard: "bGlnaHQgd29y"
	});
});
Deno.test("Direct 5", { permissions: "none" }, async (t) => {
	await testerDirect(t, "light wo", {
		standard: "bGlnaHQgd28=",
		url: "bGlnaHQgd28"
	});
});
Deno.test("Direct 6", { permissions: "none" }, async (t) => {
	await testerDirect(t, "light w", {
		standard: "bGlnaHQgdw==",
		url: "bGlnaHQgdw"
	});
});
Deno.test("Direct 7", { permissions: "none" }, async (t) => {
	await testerDirect(t, "a", {
		standard: "YQ==",
		url: "YQ"
	});
});
Deno.test("Direct 8", { permissions: "none" }, async (t) => {
	await testerDirect(t, "a Ā 𐀀 文 🦄", {
		standard: "YSDEgCDwkICAIOaWhyDwn6aE"
	});
});
Deno.test("Direct 9", { permissions: "none" }, async (t) => {
	await testerDirect(t, "", {
		standard: ""
	});
});
Deno.test("Direct 10", { permissions: "none" }, async (t) => {
	await testerDirect(t, "ß", {
		standard: "w58=",
		url: "w58"
	});
});
Deno.test("Direct 11", { permissions: "none" }, async (t) => {
	await testerDirect(t, "f", {
		standard: "Zg==",
		url: "Zg"
	});
});
Deno.test("Direct 12", { permissions: "none" }, async (t) => {
	await testerDirect(t, "fo", {
		standard: "Zm8=",
		url: "Zm8"
	});
});
Deno.test("Direct 13", { permissions: "none" }, async (t) => {
	await testerDirect(t, "foo", {
		standard: "Zm9v"
	});
});
Deno.test("Direct 14", { permissions: "none" }, async (t) => {
	await testerDirect(t, "foob", {
		standard: "Zm9vYg==",
		url: "Zm9vYg"
	});
});
Deno.test("Direct 15", { permissions: "none" }, async (t) => {
	await testerDirect(t, "fooba", {
		standard: "Zm9vYmE=",
		url: "Zm9vYmE"
	});
});
Deno.test("Direct 16", { permissions: "none" }, async (t) => {
	await testerDirect(t, "foobar", {
		standard: "Zm9vYmFy"
	});
});
Deno.test("Direct 17", { permissions: "none" }, async (t) => {
	await testerDirect(t, "A", {
		standard: "QQ==",
		url: "QQ"
	});
});
Deno.test("Direct 18", { permissions: "none" }, async (t) => {
	await testerDirect(t, "AA", {
		standard: "QUE=",
		url: "QUE"
	});
});
Deno.test("Direct 19", { permissions: "none" }, async (t) => {
	await testerDirect(t, "AAA", {
		standard: "QUFB",
		url: "QUFB"
	});
});
Deno.test("Direct 20", { permissions: "none" }, async (t) => {
	await testerDirect(t, "AAAA", {
		standard: "QUFBQQ==",
		url: "QUFBQQ"
	});
});
Deno.test("Direct 21", { permissions: "none" }, async (t) => {
	await testerDirect(t, new Uint8Array(0).fill(255), {
		standard: "",
		url: ""
	});
});
Deno.test("Direct 22", { permissions: "none" }, async (t) => {
	await testerDirect(t, new Uint8Array(1).fill(255), {
		standard: "/w==",
		url: "_w"
	});
});
Deno.test("Direct 23", { permissions: "none" }, async (t) => {
	await testerDirect(t, new Uint8Array(2).fill(255), {
		standard: "//8=",
		url: "__8"
	});
});
Deno.test("Direct 24", { permissions: "none" }, async (t) => {
	await testerDirect(t, new Uint8Array(3).fill(255), {
		standard: "////",
		url: "____"
	});
});
Deno.test("Direct 25", { permissions: "none" }, async (t) => {
	await testerDirect(t, new Uint8Array(4).fill(255), {
		standard: "/////w==",
		url: "_____w"
	});
});
Deno.test("Direct 26", { permissions: "none" }, async (t) => {
	await testerDirect(t, ">?>d?ß", {
		url: "Pj8-ZD_Dnw"
	});
});
Deno.test("Direct 27", { permissions: "none" }, async (t) => {
	await testerDirect(t, "Hello world!", {
		standard: "SGVsbG8gd29ybGQh"
	});
});
Deno.test("Direct 28", { permissions: "none" }, async (t) => {
	await testerDirect(t, "ice creams", {
		standard: "aWNlIGNyZWFtcw==",
		url: "aWNlIGNyZWFtcw"
	});
});
Deno.test("Direct 29", { permissions: "none" }, async (t) => {
	await testerDirect(t, "subjects?", {
		standard: "c3ViamVjdHM/",
		url: "c3ViamVjdHM_"
	});
});
Deno.test("Direct 30", { permissions: "none" }, async (t) => {
	await testerDirect(t, Uint8Array.from([0xDE, 0xAD, 0xBE, 0xEF]), {
		standard: "3q2+7w==",
		url: "3q2-7w"
	});
});
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	const sampleFilePath = "./README.md";
	const sampleText = await Deno.readTextFile(sampleFilePath);
	const encodedDirect = new Base64Encoder().encodeToText(sampleText);
	await using file = await Deno.open(sampleFilePath);
	const encodedStream = (await Array.fromAsync(file.readable.pipeThrough(new Base64EncoderStream()).pipeThrough(new TextDecoderStream()).values())).join("");
	deepStrictEqual(encodedDirect, encodedStream);
});
