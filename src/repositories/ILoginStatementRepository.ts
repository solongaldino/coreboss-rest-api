import { LoginStatement, Prisma } from "@prisma/client";
import { Connection } from "../types";
import IMainRepository from "./IMainRepository";

interface ILoginStatementRepository
  extends IMainRepository<
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
  findById(
    param: LoginStatement["id"],
    conn: Connection
  ): Promise<LoginStatement | null>;
}

export default ILoginStatementRepository;
