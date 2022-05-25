import { LoginStatement, Prisma } from "@prisma/client";
import { PrismaClientProvider } from "../../providers";
import MainReporitory from "./MainRepository";

class LoginStatementRepository extends MainReporitory<
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
> {
  constructor(conn = PrismaClientProvider) {
    super("loginStatement", conn);
  }

  findById(param: LoginStatement["id"], conn = super.conn) {
    return conn.loginStatement.findUnique({
      where: {
        id: param,
      },
    });
  }
}

export default LoginStatementRepository;
