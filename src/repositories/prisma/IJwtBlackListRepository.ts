import { JwtBlackList, Prisma } from "@prisma/client";
import { Connection } from "@types";
import IMainRepository from "./IMainRepository";

interface IJwtBlackListRepository
  extends IMainRepository<
    JwtBlackList,
    Prisma.JwtBlackListAggregateArgs,
    Prisma.JwtBlackListCountArgs,
    Prisma.JwtBlackListCreateArgs,
    Prisma.JwtBlackListCreateManyArgs,
    Prisma.JwtBlackListDeleteArgs,
    Prisma.JwtBlackListDeleteManyArgs,
    Prisma.JwtBlackListFindFirstArgs,
    Prisma.JwtBlackListFindManyArgs,
    Prisma.JwtBlackListFindUniqueArgs,
    Prisma.JwtBlackListGroupByArgs,
    Prisma.JwtBlackListUpdateArgs,
    Prisma.JwtBlackListUpdateManyArgs,
    Prisma.JwtBlackListUpsertArgs
  > {
  findByToken(
    param: JwtBlackList["id"],
    conn?: Connection
  ): Promise<JwtBlackList | null>;
}

export default IJwtBlackListRepository;
