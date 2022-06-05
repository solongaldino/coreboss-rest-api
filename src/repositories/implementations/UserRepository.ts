import { Prisma, User } from "@prisma/client";
import { PrismaClientProvider } from "../../providers";
import IUserRepository from "../IUserRepository";
import MainReporitory from "./MainRepository";
class UserRepository
  extends MainReporitory<
    User,
    Prisma.UserAggregateArgs,
    Prisma.UserCountArgs,
    Prisma.UserCreateArgs,
    Prisma.UserCreateManyArgs,
    Prisma.UserDeleteArgs,
    Prisma.UserDeleteManyArgs,
    Prisma.UserFindFirstArgs,
    Prisma.UserFindManyArgs,
    Prisma.UserFindUniqueArgs,
    Prisma.UserGroupByArgs,
    Prisma.UserUpdateArgs,
    Prisma.UserUpdateManyArgs,
    Prisma.UserUpsertArgs
  >
  implements IUserRepository
{
  constructor(conn = PrismaClientProvider) {
    super("user", conn);
  }
  findById(param: User["id"], conn = this.conn) {
    return conn.user.findUnique({
      where: {
        id: param,
      },
    });
  }

  findByEmail(param: User["email"], conn = this.conn) {
    return conn.user.findUnique({
      where: {
        email: param,
      },
    });
  }
}

export default UserRepository;
