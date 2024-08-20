export async function hash(input: string) {
	//@ts-expect-error Edge environment or Browser
	if (typeof globalThis.EdgeRuntime !== "string") {
		const { createHash } = await import("node:crypto");
		return createHash("sha256").update(input).digest("hex");
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(input);
	const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
