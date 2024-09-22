import { envVars } from "@/config/environment";
import { handler } from "@/helpers/api-handler";
import { RequestError } from "@/helpers/errors";

export const GET = handler(async () => {
  const fileId = envVars.GOOGLE_DRIVE_FILE_ID;
  const searchParams = new URLSearchParams([
    ["mimeType", "application/pdf"],
    ["key", envVars.GOOGLE_DRIVE_TOKEN],
  ]);

  const response = await fetch(
    new URL(
      `export?${searchParams.toString()}`,
      `https://www.googleapis.com/drive/v3/files/${fileId}/`,
    ),
    { signal: AbortSignal.timeout(5000) },
  );

  if (!response.ok) throw RequestError.unavailable("Failed to fetch resource");

  const buffer = Buffer.from(await response.arrayBuffer());

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=resume",
    },
  });
});
