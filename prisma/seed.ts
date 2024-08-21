import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const main = async () => {};

main().then(async () => {
  await prisma.$disconnect();
});
