import { TokenMail, Prisma } from "@prisma/client";
import { PrismaClientProvider } from "../../providers";
import MainReporitory from "./MainRepository";

class TokenMailRepository extends MainReporitory<
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
  constructor(conn = PrismaClientProvider) {
    super("tokenMail", conn);
  }

  findById(param: TokenMail["id"]) {
    return super.conn.tokenMail.findUnique({
      where: {
        id: param,
      },
    });
  }

  findByToken(param: TokenMail["token"]) {
    return super.conn.tokenMail.findUnique({
      where: {
        token: param,
      },
    });
  }
}

export default TokenMailRepository;
