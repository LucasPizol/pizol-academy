import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const main = async () => {
  await prisma.ability.createMany({
    data: [
      { name: "Conviver" },
      { name: "Conviver" },
      { name: "Participar" },
      { name: "Explorar" },
      { name: "Expressar" },
      { name: "Conhecer-se" },
    ],
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
