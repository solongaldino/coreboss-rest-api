import { Prisma } from "@prisma/client";
import { prisma } from "./BaseRepository";

class JwtBlackListRepository {
  create(data: Prisma.JwtBlackListCreateArgs) {
    return prisma.jwtBlackList.create(data);
  }
}

export default new JwtBlackListRepository;
