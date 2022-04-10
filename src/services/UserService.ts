import { BASE_URL_FRONT_END } from "../configs/GlobalConfig";
import {
  AuthDto,
  CancelAccountRequestDto,
  ConfirmationRegisterDto,
  ConfirmPasswordRecoveryDto,
  LogoutDto,
  RegisterDto,
  UpdatePasswordDto,
} from "../dtos/services/UserServiceDto";
import { TokenMailStatus, TokenMailType } from "../enums/TokenMail";
import { UserStatus, UserType } from "../enums/User";
import JwtBlackListRepository from "../repositories/JwtBlackListRepository";
import CryptoPassword from "../utils/CryptoPassword";
import Token from "../utils/Token";
import UID from "../utils/UID";
import AuthJwtService from "./AuthJwtService";
import prisma from "./PrismaService";

class UserService {
  async isAuthenticated(token: string) {
    return AuthJwtService.isAuthenticated(token);
  }

  async confirmCancelAccount(token: string) {}
}
export default new UserService();
