import { Prisma, User } from "@prisma/client";
import { prisma } from "../providers";

class UserRepository {
  findById(param: User["id"]) {
    return prisma.user.findUnique({
      where: {
        id: param,
      },
    });
  }

  findByEmail(param: User["email"]) {
    return prisma.user.findUnique({
      where: {
        email: param,
      },
    });
  }

  update(obj: Prisma.UserUpdateArgs) {
    obj.data.updated_at = new Date();
    return prisma.user.update(obj);
  }

  create(obj: Prisma.UserCreateArgs) {
    return prisma.user.create(obj);
  }

  delete(obj: Prisma.UserDeleteArgs) {
    return prisma.user.delete(obj);
  }
}

export default new UserRepository();
