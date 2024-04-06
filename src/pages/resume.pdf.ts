import { invariant, NetworkError } from "@/helpers";
import { envVars } from "@/lib/env.server";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const fileId = envVars.GOOGLE_DRIVE_FILE_ID;
    const apiKey = envVars.GOOGLE_DRIVE_TOKEN;

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/pdf&key=${apiKey}`,
    );

    invariant.as(NetworkError, response.ok, "Failed to fetch resource");

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    return new Response(pdfBuffer, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...response.headers,
        "Content-Disposition": 'inline; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error exporting PDF:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
