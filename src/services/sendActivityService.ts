import { prisma } from "../prisma";

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
}
