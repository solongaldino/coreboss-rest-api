import { TokenMail, Prisma } from "@prisma/client";
import { injectable } from "tsyringe";
import { PrismaClientProvider } from "../../providers";
import ITokenMailRepository from "../ITokenMailRepository";
import MainReporitory from "./MainRepository";
@injectable()
class TokenMailRepository
  extends MainReporitory<
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
  >
  implements ITokenMailRepository
{
  constructor(conn = PrismaClientProvider) {
    super("tokenMail", conn);
  }

  findById(param: TokenMail["id"], conn = this.conn) {
    return conn.tokenMail.findUnique({
      where: {
        id: param,
      },
    });
  }

  findByToken(param: TokenMail["token"], conn = this.conn) {
    return conn.tokenMail.findUnique({
      where: {
        token: param,
      },
    });
  }
}

export default TokenMailRepository;
