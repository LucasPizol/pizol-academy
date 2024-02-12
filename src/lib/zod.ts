import { z } from "zod";

const envVariables = z.object({
  DATABASE_URL: z.string(),
  JSON_TOKEN: z.string(),
  BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_DEFAULT_REGION: z.string(),
});

export const envSchema = envVariables.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JSON_TOKEN: process.env.JSON_TOKEN,
  BUCKET_NAME: process.env.BUCKET_NAME,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
});
