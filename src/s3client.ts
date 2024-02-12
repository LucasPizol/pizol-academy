import { S3Client } from "@aws-sdk/client-s3";
import { envSchema } from "./lib/zod";

export const s3 = new S3Client({
  region: envSchema.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: envSchema.AWS_ACCESS_KEY_ID,
    secretAccessKey: envSchema.AWS_SECRET_ACCESS_KEY,
  },
});