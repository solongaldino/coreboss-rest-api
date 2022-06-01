import { User, Prisma } from "@prisma/client";
import { Connection } from "../types";
import IMainRepository from "./IMainRepository";

interface IUserRepository
  extends IMainRepository<
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
  findById(param: User["id"], conn: Connection): Promise<User | null>;

  findByEmail(param: User["email"], conn: Connection): Promise<User | null>;
}

export default IUserRepository;
