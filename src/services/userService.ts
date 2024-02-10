import { prisma } from "../prisma";

export abstract class UserService {
  static async getByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }

  static async create(username: string, name: string, password: string) {
    const user = await prisma.user.create({
      data: {
        username,
        name,
        password,
      },
    });

    return user;
  }

  static async getByClass(classId: number) {
    const user = await prisma.classHasUser.findMany({
      where: {
        classId,
      },
    });

    return user;
  }
}
