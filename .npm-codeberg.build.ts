import {
	readManifest,
	transform
} from "DNT";
const manifest = await readManifest("jsr.jsonc");
await transform({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: manifest.exports,
	generateDeclarationMap: true,
	metadata: {
		//@ts-ignore Lazy type.
		name: manifest.name,
		//@ts-ignore Lazy type.
		version: manifest.version,
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
