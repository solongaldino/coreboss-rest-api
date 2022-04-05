import { TokenMail, Prisma } from "@prisma/client";
import { prisma } from "./BaseRepository";

class TokenMailRepository {
  findById(param: TokenMail["id"]) {
    return prisma.tokenMail.findUnique({
      where: {
        id: param,
      },
    });
  }

  update(data: Prisma.TokenMailUpdateArgs) {
    return prisma.tokenMail.update(data);
  }

  create(data: Prisma.TokenMailCreateArgs) {
    return prisma.tokenMail.create(data);
  }

  delete(data: Prisma.TokenMailDeleteArgs) {
    return prisma.tokenMail.delete(data);
  }
}

export default TokenMailRepository;
