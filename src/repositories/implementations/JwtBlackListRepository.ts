import { JwtBlackList, Prisma } from "@prisma/client";
import { PrismaClientProvider } from "../../providers";
import MainReporitory from "./MainRepository";

class JwtBlackListRepository extends MainReporitory<
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
  constructor(conn = PrismaClientProvider) {
    super("jwtBlackList", conn);
  }

  findByToken(param: JwtBlackList["token"], conn = this.conn) {
    return conn.jwtBlackList.findFirst({
      where: {
        token: param,
      },
    });
  }
}

export default JwtBlackListRepository;
