import { JwtBlackList, Prisma } from "@prisma/client";
import { prisma } from "../providers";

class JwtBlackListRepository {
  findByToken(param: JwtBlackList["token"]) {
    return prisma.jwtBlackList.findFirst({
      where: {
        token: param,
      },
    });
  }
  create(obj: Prisma.JwtBlackListCreateArgs) {
    return prisma.jwtBlackList.create(obj);
  }
}

export default new JwtBlackListRepository();
