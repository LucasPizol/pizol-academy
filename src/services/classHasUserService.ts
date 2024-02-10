import { prisma } from "../prisma";

export abstract class ClassHasUserService {
  static async joinClass(userId: number, classId: number, role: string) {
    const classHasUser = await prisma.classHasUser.create({
      data: {
        userId,
        classId,
        role,
      },
    });

    return classHasUser;
  }

  static async leaveClass(userId: number, classId: number) {
    await prisma.classHasUser.deleteMany({
      where: {
        userId,
        classId,
      },
    });
  }

  static async updateUserRole(userId: number, classId: number, role: string) {
    await prisma.classHasUser.updateMany({
      data: {
        role,
      },
      where: {
        userId,
        classId,
      },
    });
  }

  static async getAll(userId: number) {
    const classes = await prisma.classHasUser.findMany({
      where: {
        userId,
      },
      include: {
        class: {
          include: {
            owner: true,
          },
        },
      },
    });

    return classes;
  }
}
