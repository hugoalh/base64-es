/**
 * Variant type of the Base64.
 */
export type Base64Variant =
	| "rfc1421"
	| "rfc2045"
	| "rfc2152"
	| "rfc3501"
	| "rfc4648-4"
	| "rfc4648-5"
	| "rfc9580"
	| "standard"
	| "url";
interface Base64Specification {
	padding?: boolean | null;
	replace62?: string | null;
	replace63?: string | null;
}
const specificationNoPadding: Base64Specification = {
	padding: false
};
const specificationPadding: Base64Specification = {
	padding: true
};
const specificationURL: Base64Specification = {
	replace62: "-",
	replace63: "_"
};
const specifications: Readonly<Record<Base64Variant, Base64Specification>> = {
	rfc1421: specificationPadding,
	rfc2045: specificationPadding,
	rfc2152: specificationNoPadding,
	rfc3501: {
		padding: false,
		replace63: ","
	},
	"rfc4648-4": specificationPadding,
	"rfc4648-5": specificationURL,
	rfc9580: specificationPadding,
	standard: specificationPadding,
	url: specificationURL
};
/**
 * Base64 basic options.
 */
export interface Base64BasicOptions {
	/**
	 * Which Base64 variant to use.
	 * @default {"standard"}
	 */
	variant?: Base64Variant;
}
/**
 * Base64 decode options.
 */
export interface Base64DecodeOptions extends Base64BasicOptions {
}
/**
 * Base64 encode options.
 */
export interface Base64EncodeOptions extends Base64BasicOptions {
	/**
	 * Whether allow to have padding (`=`).
	 * 
	 * When this property is not defined as type of boolean, padding will according to the specification of the defined {@linkcode variant}.
	 * @default {null}
	 */
	padding?: boolean | null;
}
/**
 * Base64 decoder.
 */
export class Base64Decoder {
	get [Symbol.toStringTag](): string {
		return "Base64Decoder";
	}
	#variant: Base64Variant;
	/**
	 * Initialize.
	 * @param {Base64DecodeOptions} [options={}] Base64 decode options.
	 */
	constructor(options: Base64DecodeOptions = {}) {
		const { variant = "standard" }: Base64DecodeOptions = options;
		if (typeof specifications[variant] === "undefined") {
			throw new RangeError(`\`${variant}\` is not a valid Base64 variant type! Only accept these values: ${Object.keys(specifications).sort().join(", ")}`);
		}
		this.#variant = variant;
	}
	/**
	 * Variant of the Base64 decoder.
	 * @returns {Base64Variant}
	 */
	get variant(): Base64Variant {
		return this.#variant;
	}
	/**
	 * Decode from Base64 to bytes.
	 * @param {string | Uint8Array} item Item that need to decode.
	 * @returns {Uint8Array} A decoded bytes.
	 */
	decodeToBytes(item: string | Uint8Array): Uint8Array {
		const {
			replace62 = null,
			replace63 = null
		}: Base64Specification = specifications[this.#variant];
		let itemFmt: string = (typeof item === "string") ? item : new TextDecoder().decode(item);
		if (replace62 !== null) {
			itemFmt = itemFmt.replaceAll(replace62, "+");
		}
		if (replace63 !== null) {
			itemFmt = itemFmt.replaceAll(replace63, "/");
		}
		return Uint8Array.from(atob(itemFmt).split(""), (character: string): number => {
			return character.codePointAt(0)!;
		});
	}
	/**
	 * Decode from Base64 to text.
	 * @param {string | Uint8Array} item Item that need to decode.
	 * @returns {string} A decoded text.
	 */
	decodeToText(item: string | Uint8Array): string {
		return new TextDecoder().decode(this.decodeToBytes(item));
	}
}
/**
 * Base64 encoder.
 */
export class Base64Encoder {
	get [Symbol.toStringTag](): string {
		return "Base64Encoder";
	}
	#padding: boolean;
	#variant: Base64Variant;
	/**
	 * Initialize.
	 * @param {Base64EncodeOptions} [options={}] Base64 encode options.
	 */
	constructor(options: Base64EncodeOptions = {}) {
		const {
			padding = null,
			variant = "standard"
		}: Base64EncodeOptions = options;
		const specification: Base64Specification | undefined = specifications[variant];
		if (typeof specification === "undefined") {
			throw new RangeError(`\`${variant}\` is not a valid Base64 variant type! Only accept these values: ${Object.keys(specifications).sort().join(", ")}`);
		}
		this.#padding = (padding === null) ? (specification.padding ?? true) : padding;
		this.#variant = variant;
	}
	/**
	 * Whether padding in the Base64 encoder.
	 * @returns {boolean}
	 */
	get padding(): boolean {
		return this.#padding;
	}
	/**
	 * Variant of the Base64 encoder.
	 * @returns {Base64Variant}
	 */
	get variant(): Base64Variant {
		return this.#variant;
	}
	/**
	 * Encode to Base64 bytes.
	 * @param {string | Uint8Array} item Item that need to encode.
	 * @returns {Uint8Array} A Base64 encoded bytes.
	 */
	encodeToBytes(item: string | Uint8Array): Uint8Array {
		return new TextEncoder().encode(this.encodeToText(item));
	}
	/**
	 * Encode to Base64 text.
	 * @param {string | Uint8Array} item Item that need to encode.
	 * @returns {string} A Base64 encoded text.
	 */
	encodeToText(item: string | Uint8Array): string {
		const {
			replace62 = null,
			replace63 = null
		}: Base64Specification = specifications[this.#variant];
		const itemFmt: Uint8Array = (typeof item === "string") ? new TextEncoder().encode(item) : item;
		let result: string = btoa(Array.from(itemFmt, (byte: number): string => {
			return String.fromCodePoint(byte);
		}).join(""));
		if (replace62 !== null) {
			result = result.replaceAll("+", replace62);
		}
		if (replace63 !== null) {
			result = result.replaceAll("/", replace63);
		}
		return (this.#padding ? result : result.replaceAll("=", ""));
	}
}
/**
 * Transform from Base64 encoded bytes stream to bytes stream.
 */
export class Base64DecoderStream extends TransformStream<Uint8Array, Uint8Array> {
	get [Symbol.toStringTag](): string {
		return "Base64DecoderStream";
	}
	#base64Decoder: Base64Decoder;
	#bin: number[] = [];
	/**
	 * Initialize.
	 * @param {Base64DecodeOptions} [options={}] Base64 decode options.
	 */
	constructor(options?: Base64DecodeOptions) {
		super({
			transform: (chunkStream: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>): void => {
				this.#bin.push(...Array.from(chunkStream));
				if (this.#bin.length >= 4) {
					try {
						controller.enqueue(this.#base64Decoder.decodeToBytes(Uint8Array.from(this.#bin.splice(0, Math.floor(this.#bin.length / 4) * 4))));
					} catch (error) {
						controller.error(error);
					}
				}
			},
			flush: (controller: TransformStreamDefaultController<Uint8Array>): void => {
				try {
					controller.enqueue(this.#base64Decoder.decodeToBytes(Uint8Array.from(this.#bin.splice(0, this.#bin.length))));
				} catch (error) {
					controller.error(error);
				}
			}
		});
		this.#base64Decoder = new Base64Decoder(options);
	}
}
/**
 * Transform from bytes stream to Base64 encoded bytes stream.
 */
export class Base64EncoderStream extends TransformStream<Uint8Array, Uint8Array> {
	get [Symbol.toStringTag](): string {
		return "Base64EncoderStream";
	}
	#base64Encoder: Base64Encoder;
	#base64EncoderForceNoPadding: Base64Encoder;
	#bin: number[] = [];
	/**
	 * Initialize.
	 * @param {Base64EncodeOptions} [options={}] Base64 encode options.
	 */
	constructor(options: Base64EncodeOptions = {}) {
		super({
			transform: (chunkStream: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>): void => {
				this.#bin.push(...Array.from(chunkStream));
				if (this.#bin.length >= 3) {
					try {
						controller.enqueue(this.#base64EncoderForceNoPadding.encodeToBytes(Uint8Array.from(this.#bin.splice(0, Math.floor(this.#bin.length / 3) * 3))));
					} catch (error) {
						controller.error(error);
					}
				}
			},
			flush: (controller: TransformStreamDefaultController<Uint8Array>): void => {
				try {
					controller.enqueue(this.#base64Encoder.encodeToBytes(Uint8Array.from(this.#bin.splice(0, this.#bin.length))));
				} catch (error) {
					controller.error(error);
				}
			}
		});
		this.#base64EncoderForceNoPadding = new Base64Encoder({
			...options,
			padding: false
		});
		this.#base64Encoder = new Base64Encoder(options);
	}
}
