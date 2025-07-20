import { deepStrictEqual } from "node:assert";
import {
	Base64Decoder,
	Base64Encoder,
	Base64EncoderStream
} from "./mod.ts";
Deno.test("Text Standard 1", { permissions: "none" }, () => {
	const sampleText = "Many hands make light work.";
	const sampleEncoded = "TWFueSBoYW5kcyBtYWtlIGxpZ2h0IHdvcmsu";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
});
Deno.test("Text Standard 2", { permissions: "none" }, () => {
	const sampleText = "light work.";
	const sampleEncoded = "bGlnaHQgd29yay4=";
	const sampleEncodedNoPadding = "bGlnaHQgd29yay4";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
	deepStrictEqual(new Base64Encoder({ padding: false }).encodeToText(sampleText), sampleEncodedNoPadding);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncodedNoPadding), sampleText);
});
Deno.test("Text Standard 3", { permissions: "none" }, () => {
	const sampleText = "light work";
	const sampleEncoded = "bGlnaHQgd29yaw==";
	const sampleEncodedNoPadding = "bGlnaHQgd29yaw";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
	deepStrictEqual(new Base64Encoder({ padding: false }).encodeToText(sampleText), sampleEncodedNoPadding);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncodedNoPadding), sampleText);
});
Deno.test("Text Standard 4", { permissions: "none" }, () => {
	const sampleText = "light wor";
	const sampleEncoded = "bGlnaHQgd29y";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
});
Deno.test("Text Standard 5", { permissions: "none" }, () => {
	const sampleText = "light wo";
	const sampleEncoded = "bGlnaHQgd28=";
	const sampleEncodedNoPadding = "bGlnaHQgd28";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
	deepStrictEqual(new Base64Encoder({ padding: false }).encodeToText(sampleText), sampleEncodedNoPadding);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncodedNoPadding), sampleText);
});
Deno.test("Text Standard 6", { permissions: "none" }, () => {
	const sampleText = "light w";
	const sampleEncoded = "bGlnaHQgdw==";
	const sampleEncodedNoPadding = "bGlnaHQgdw";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
	deepStrictEqual(new Base64Encoder({ padding: false }).encodeToText(sampleText), sampleEncodedNoPadding);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncodedNoPadding), sampleText);
});
Deno.test("Text Standard 7", { permissions: "none" }, () => {
	const sampleText = "a";
	const sampleEncoded = "YQ==";
	const sampleEncodedNoPadding = "YQ";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
	deepStrictEqual(new Base64Encoder({ padding: false }).encodeToText(sampleText), sampleEncodedNoPadding);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncodedNoPadding), sampleText);
});
Deno.test("Text Standard 8", { permissions: "none" }, () => {
	const sampleText = "a Ā 𐀀 文 🦄";
	const sampleEncoded = "YSDEgCDwkICAIOaWhyDwn6aE";
	deepStrictEqual(new Base64Encoder().encodeToText(sampleText), sampleEncoded);
	deepStrictEqual(new Base64Decoder().decodeToText(sampleEncoded), sampleText);
});
Deno.test("Stream 1", {
	permissions: {
		read: true
	}
}, async () => {
	const sampleText = await Deno.readTextFile("./README.md");
	const encodedDirect = new Base64Encoder().encodeToText(sampleText);
	await using file = await Deno.open("./README.md");
	const encodedStream = (await Array.fromAsync(file.readable.pipeThrough(new Base64EncoderStream()).pipeThrough(new TextDecoderStream()).values())).join("");
	deepStrictEqual(encodedDirect, encodedStream);
});
