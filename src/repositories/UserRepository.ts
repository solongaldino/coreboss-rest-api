import { Prisma, User } from "@prisma/client";
import { prisma } from "./BaseRepository";

class UserRepository {
  findById(param: User['id']) {
    return prisma.user.findUnique({
      where: {
        id: param,
      },
    });
  }

  findByEmail(param: User['email']) {
    return prisma.user.findUnique({
      where: {
        email: param,
      },
    });
  }

  update(data: Prisma.UserUpdateArgs) {
    return prisma.user.update(data);
  }

  create(data: Prisma.UserCreateArgs) {
    return prisma.user.create(data);
  }

  delete(data: Prisma.UserDeleteArgs) {
    return prisma.user.delete(data);
  }
}

export default new UserRepository;
