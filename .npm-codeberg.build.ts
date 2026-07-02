import { invokeDenoNodeJSTransformer } from "DNT";
import { parse as parseJSONC } from "STD_JSONC";
const jsrManifest = parseJSONC(await Deno.readTextFile(new URL(import.meta.resolve("./jsr.jsonc"))));
await invokeDenoNodeJSTransformer({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: jsrManifest.exports,
	generateDeclarationMap: true,
	metadata: {
		//@ts-ignore Lazy type.
		name: jsrManifest.name,
		//@ts-ignore Lazy type.
		version: jsrManifest.version,
		description: "A module for Base64 encode and decode.",
		keywords: [
			"base64",
			"base64url",
			"rfc1421",
			"rfc2045",
			"rfc2152",
			"rfc3501",
			"rfc4648-4",
			"rfc4648-5",
			"rfc9580"
		],
		homepage: "https://codeberg.org/hugoalh/base64-es#readme",
		bugs: {
			url: "https://codeberg.org/hugoalh/base64-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://codeberg.org/hugoalh/base64-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-codeberg",
	outputDirectoryPreEmpty: true
});
