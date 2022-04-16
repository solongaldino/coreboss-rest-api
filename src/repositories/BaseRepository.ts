import { PrismaPromise } from "@prisma/client";
import { prisma } from "../providers";

class BaseRepository {
  async transaction(data: PrismaPromise<any>[]) {
    return prisma.$transaction(data);
  }
}

export default new BaseRepository();
