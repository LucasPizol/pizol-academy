import { z } from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  JSON_TOKEN: z.string(),
});

export const envSchema = envVariables.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JSON_TOKEN: process.env.JSON_TOKEN,
});
