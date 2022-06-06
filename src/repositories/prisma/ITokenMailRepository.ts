import { TokenMail, Prisma } from "@prisma/client";
import { Connection } from "@types";
import IMainRepository from "./IMainRepository";

interface ITokenMailRepository
  extends IMainRepository<
    TokenMail,
    Prisma.TokenMailAggregateArgs,
    Prisma.TokenMailCountArgs,
    Prisma.TokenMailCreateArgs,
    Prisma.TokenMailCreateManyArgs,
    Prisma.TokenMailDeleteArgs,
    Prisma.TokenMailDeleteManyArgs,
    Prisma.TokenMailFindFirstArgs,
    Prisma.TokenMailFindManyArgs,
    Prisma.TokenMailFindUniqueArgs,
    Prisma.TokenMailGroupByArgs,
    Prisma.TokenMailUpdateArgs,
    Prisma.TokenMailUpdateManyArgs,
    Prisma.TokenMailUpsertArgs
  > {
  findById(
    param: TokenMail["id"],
    conn?: Connection
  ): Promise<TokenMail | null>;

  findByToken(
    param: TokenMail["token"],
    conn?: Connection
  ): Promise<TokenMail | null>;
}

export default ITokenMailRepository;
