import { NetworkError, convertTime } from "@/helpers";
import { envVars } from "@/lib/env.server";
import { invariant } from "outvariant";

export const prerender = false;

export async function GET() {
  try {
    const fileId = envVars.GOOGLE_DRIVE_FILE_ID;
    const apiKey = envVars.GOOGLE_DRIVE_TOKEN;

    const params = new URLSearchParams({
      mimeType: "application/pdf",
      key: apiKey,
    });

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/export?${params.toString()}`,
    );

    invariant.as(NetworkError, response.ok, "Failed to fetch resource");

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    return new Response(pdfBuffer, {
      ...response,
      headers: {
        ...response.headers,
        "Cache-Control": `public, max-age=${convertTime(7).secs}, s-max-age=${convertTime(7).secs}, stale-while-revalidate=${convertTime(1).secs}`,
        "Content-Disposition": 'inline; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error exporting PDF:", error);
    return new Response(null, { status: 500 });
  }
}
