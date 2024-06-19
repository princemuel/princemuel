import { envVars } from "@/lib/config/environment";
import { NetworkError } from "@/shared/helpers/errors";
import { invariant } from "outvariant";

export async function GET() {
  try {
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
    );

    invariant.as(NetworkError, response.ok, "Failed to fetch resource");

    const buffer = Buffer.from(await response.arrayBuffer());

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=resume",
      },
    });
  } catch (error) {
    console.error("Error exporting PDF:", error);
    return new Response(null, { status: 500 });
  }
}
