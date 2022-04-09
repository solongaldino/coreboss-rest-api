import jwt from "jsonwebtoken";

export interface AuthJwtPayload {
  id: string;
  userType?: AuthJwtUserType.USER;
}

export enum AuthJwtUserType {
  USER = "USER",
  ADMIN = "ADMIN",
}

const secretJwt =
  process.env.SECRET_JWT || "df287dfc1406ed2b692e1c2c783bb5ce783bb5cec97ea";
const expiresJwtTokenInSeconds =
  process.env.EXPIRES_JWT_TOKEN_IN_SECONDS || 60 * 10;

class AuthJwt {
  private generationToken(params = {}) {
    return jwt.sign(params, secretJwt, {
      expiresIn: expiresJwtTokenInSeconds,
    });
  }

  public login(params: AuthJwtPayload) {
    return this.generationToken(params);
  }

  public isAuthenticated(token: string) {
    return jwt.verify(token, secretJwt);
  }
}
export default AuthJwt;
