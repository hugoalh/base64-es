import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: configJSR.getExports(),
	fixInjectedImports: true,
	generateDeclarationMap: true,
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
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
		scripts: {
		},
		engines: {
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm",
	outputDirectoryPreEmpty: true
});
