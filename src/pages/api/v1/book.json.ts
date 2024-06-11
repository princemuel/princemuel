import { parseError } from "@/helpers";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    return Response.json({
      status: "success",
      data: "Subscribed!",
    });
  } catch (e) {
    return Response.json(
      { status: "error", error: parseError(e) },
      { status: 404 },
    );
  }
};
