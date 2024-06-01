import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SUPABASE_SECRET: z.string(),
  },
  shared: {
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
  },
  runtimeEnv: {
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
  },
});
