import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "../prisma";
import { s3 } from "../s3client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { envSchema } from "../lib/zod";

export abstract class SendActivityService {
  static async create(userId: number, activityId: number) {
    const sendActivity = await prisma.sendActivity.createMany({
      data: {
        activityId,
        userId,
      },
    });

    return sendActivity;
  }

  static async saveImage(path: string, file: string, filename: string) {
    const buffer = Buffer.from(
      file.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    await s3.send(
      new PutObjectCommand({
        Bucket: envSchema.BUCKET_NAME,
        Key: path + "/" + filename + ".png",
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: "image/png",
      })
    );
  }

  static async getByActivity(activityId: number) {
    const acitivities = await prisma.sendActivity.findMany({
      where: {
        activityId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        activity: true,
      },
    });

    return acitivities;
  }

  static async getById(sendActivityId: number) {
    const sendActivity = await prisma.sendActivity.findUnique({
      where: {
        id: sendActivityId,
      },
      include: {
        activity: {
          include: {
            class: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return sendActivity;
  }
}
