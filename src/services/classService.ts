import { prisma } from "../prisma";

export abstract class ClassService {
  static async create(name: string, ownerId: number, invite_code: string) {
    const company = await prisma.class.create({
      data: {
        name,
        ownerId,
        invite_code,
      },
    });

    return company;
  }

  static async getById(id: number, userId: number) {
    const company = await prisma.class.findFirst({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
        activity: {
          select: {
            abilities: true,
            guide: true,
            id: true,
            isActive: true,
            objectives: true,
            pdf_file_url: true,
            recurses: true,
            resume: true,
            title: true,
            user: true,
            total_time: true,
          },
        },
        class: true,
      },
    });

    const checkPermission = company?.class.find(
      (user) => user.userId === userId
    );

    if (checkPermission?.role === "student") {
      return {
        ...company,
        activity: company?.activity.filter((activity) => activity.isActive),
      };
    }

    return company;
  }

  static async updateName(name: string, classId: number) {
    await prisma.class.update({
      where: {
        id: classId,
      },
      data: {
        name,
      },
    });
  }

  static async getByInviteCode(invite_code: string) {
    const myClass = await prisma.class.findFirst({
      where: {
        invite_code,
      },
      include: {
        class: {
          include: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return myClass;
  }
}
