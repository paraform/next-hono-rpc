import { hc } from "hono/client";
import { type AppType } from ".";
import { env } from "@/env";

export const hono = hc<AppType>(env.NEXT_PUBLIC_API_BASE_URL);
