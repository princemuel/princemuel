export async function hash(input: string) {
  return import("node:crypto")
    .then((r) => r.createHash("sha256").update(input).digest("hex"))
    .catch(async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    });
}
