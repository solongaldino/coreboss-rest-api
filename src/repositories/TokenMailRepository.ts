import { TokenMail, Prisma } from "@prisma/client";
import { prisma } from "../providers";

class TokenMailRepository {
  findById(param: TokenMail["id"]) {
    return prisma.tokenMail.findUnique({
      where: {
        id: param,
      },
    });
  }

  update(obj: Prisma.TokenMailUpdateArgs) {
    obj.data.updated_at = new Date();
    return prisma.tokenMail.update(obj);
  }

  create(obj: Prisma.TokenMailCreateArgs) {
    return prisma.tokenMail.create(obj);
  }

  delete(obj: Prisma.TokenMailDeleteArgs) {
    return prisma.tokenMail.delete(obj);
  }
}

export default TokenMailRepository;
