import { LoginStatement, Prisma } from "@prisma/client";
import { prisma } from "../providers";

class LoginStatementRepository {
  findById(param: LoginStatement["id"]) {
    return prisma.loginStatement.findUnique({
      where: {
        id: param,
      },
    });
  }

  create(obj: Prisma.LoginStatementCreateArgs) {
    return prisma.loginStatement.create(obj);
  }

  delete(obj: Prisma.LoginStatementDeleteArgs) {
    return prisma.loginStatement.delete(obj);
  }
}

export default new LoginStatementRepository();
