import { loadEnv } from "vite";

const mode = process.env.NODE_ENV ?? "production";
export const envVars = loadEnv(mode, process.cwd(), "");
