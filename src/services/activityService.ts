import { prisma } from "../prisma";

export type ActivityCreationAttributes = {
  id?: number;
  title: string;
  resume: string | null;
  objectives: string;
  total_time: number;
  recurses: string;
  pdf_file_url: string;
  guide: string;
  abilities: number[];
  isActive: boolean;
  userId: number;
  classId: number;
};

export abstract class ActivityService {
  static async getByClass(classId: number) {
    const activities = await prisma.activity.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        abilities: true,
      },
      where: {
        class: {
          id: classId,
        },
      },
    });

    return activities;
  }

  static async create(activity: ActivityCreationAttributes) {
    const newActivity = await prisma.activity.create({
      data: {
        ...activity,
        abilities: {
          connect: Array.from(new Set(activity.abilities))?.map((id) => ({
            id,
          })),
        },
      },
      include: {
        abilities: true,
      },
    });

    return newActivity;
  }

  static async getById(id: number) {
    const activity = await prisma.activity.findUnique({
      where: {
        id,
      },
      include: {
        abilities: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return activity;
  }

  static async update(data: ActivityCreationAttributes) {
    const activity = await prisma.activity.update({
      data: {
        ...data,
        abilities: {
          connect: Array.from(new Set(data.abilities))?.map((id) => ({ id })),
        },
      },
      where: {
        id: data.id!,
      },
      include: {
        abilities: true,
      },
    });
    return activity;
  }

  static async deactivate(id: number) {
    const activity = await prisma.activity.update({
      data: {
        isActive: false,
      },
      where: {
        id,
      },
      include: {
        abilities: true,
      },
    });
    return activity;
  }

  static async activate(id: number) {
    const activity = await prisma.activity.update({
      data: {
        isActive: true,
      },
      where: {
        id,
      },
      include: {
        abilities: true,
      },
    });
    return activity;
  }
}
