import jwt from "jsonwebtoken";
import {
  EXPIRES_JWT_TOKEN_IN_SECONDS,
  SECRET_JWT,
} from "../configs/GlobalConfig";
import { prisma } from "../providers/PrismaProvider";

export interface AuthJwtPayload {
  id: string;
  userType?: AuthJwtUserType.USER;
}

export enum AuthJwtUserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

class AuthJwtService {
  private generationToken(params = {}) {
    return jwt.sign(params, SECRET_JWT, {
      expiresIn: EXPIRES_JWT_TOKEN_IN_SECONDS,
    });
  }

  public login(params: AuthJwtPayload) {
    return this.generationToken(params);
  }

  public isAuthenticated(token: string) {
    return jwt.verify(token, SECRET_JWT);
  }

  public async isBlackList(token: string) {
    const result = await prisma.jwtBlackList.findFirst({
      where: {
        token: token,
      },
    });
    return !!result ? true : false;
  }
}
export default AuthJwtService;
