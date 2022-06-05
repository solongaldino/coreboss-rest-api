import { LoginStatement, Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { PrismaClientProvider } from "../../providers";
import ILoginStatementRepository from "../ILoginStatementRepository";
import MainReporitory from "./MainRepository";
@injectable()
class LoginStatementRepository
  extends MainReporitory<
    LoginStatement,
    Prisma.LoginStatementAggregateArgs,
    Prisma.LoginStatementCountArgs,
    Prisma.LoginStatementCreateArgs,
    Prisma.LoginStatementCreateManyArgs,
    Prisma.LoginStatementDeleteArgs,
    Prisma.LoginStatementDeleteManyArgs,
    Prisma.LoginStatementFindFirstArgs,
    Prisma.LoginStatementFindManyArgs,
    Prisma.LoginStatementFindUniqueArgs,
    Prisma.LoginStatementGroupByArgs,
    Prisma.LoginStatementUpdateArgs,
    Prisma.LoginStatementUpdateManyArgs,
    Prisma.LoginStatementUpsertArgs
  >
  implements ILoginStatementRepository
{
  constructor(conn = PrismaClientProvider) {
    super("loginStatement", conn);
  }

  findById(param: LoginStatement["id"], conn = this.conn) {
    return conn.loginStatement.findUnique({
      where: {
        id: param,
      },
    });
  }
}

export default LoginStatementRepository;
