import { Prisma, User } from "@prisma/client";
import { PrismaClientProvider } from "../../providers";
import MainReporitory from "./MainRepository";

class UserRepository extends MainReporitory<
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
> {
  constructor(conn = PrismaClientProvider) {
    super("user", conn);
  }
  findById(param: User["id"], conn = super.conn) {
    return conn.user.findUnique({
      where: {
        id: param,
      },
    });
  }

  findByEmail(param: User["email"], conn = super.conn) {
    return conn.user.findUnique({
      where: {
        email: param,
      },
    });
  }
}

export default UserRepository;
