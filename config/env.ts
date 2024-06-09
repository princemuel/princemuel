import { loadEnv } from "vite";

export const envVars = loadEnv(process.env.NODE_ENV!, process.cwd(), "");
