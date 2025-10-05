import { invokeDenoNodeJSTransformer } from "DNT";
import { parse as parseJSONC } from "STD_JSONC";
const jsrManifest = parseJSONC(await Deno.readTextFile("./jsr.jsonc"));
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
		homepage: "https://github.com/hugoalh/base64-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/base64-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/base64-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm",
	outputDirectoryPreEmpty: true
});
