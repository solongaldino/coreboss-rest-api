import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

class BaseRepository {
  async transaction() {
    return prisma.$transaction;
  }
}

export default new BaseRepository();
