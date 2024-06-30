import { defineConfig } from "drizzle-kit";

import { env } from "@/env.mjs";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

export default defineConfig({
  schema: "src/supabase/db/schema/*",
  out: "./src/supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
  },
});
