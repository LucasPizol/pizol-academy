import { prisma } from "../prisma";

export abstract class AbilityService {
  static async get() {
    const abilities = await prisma.ability.findMany();
    return abilities;
  }
}
