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
  async getById(val: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: val,
      },
    });
    if (!!!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async getByEmail(val: string) {
    return await prisma.user.findUnique({
      where: {
        email: val,
      },
    });
  }

  async isAuthenticated(token: string) {
    return AuthJwtService.isAuthenticated(token);
  }

  async confirmPasswordRecovery(obj: ConfirmPasswordRecoveryDto) {
    const tokenMail = await prisma.tokenMail.findUnique({
      where: {
        token: obj.token,
      },
    });

    if (!tokenMail) throw new Error("Token não existe");

    if (tokenMail.status == TokenMailStatus.EXPIRED)
      throw new Error("Token expirado");

    if (Token.isExpired(tokenMail.token_expiration)) {
      await prisma.tokenMail.update({
        where: {
          id: tokenMail.id,
        },
        data: {
          status: TokenMailStatus.EXPIRED,
        },
      });

      throw new Error("Token expirado");
    }

    const user = await this.getByEmail(tokenMail.email);
    if (!!!user) throw new Error("E-mail não encontrado");

    const passwordEc = CryptoPassword.generationHash(obj.password);

    const updatePasswordUser = prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordEc,
      },
    });

    const updateTokenMail = prisma.tokenMail.update({
      where: {
        id: tokenMail.id,
      },
      data: {
        status: TokenMailStatus.FINISHED,
      },
    });

    const transaction = await prisma.$transaction([
      updatePasswordUser,
      updateTokenMail,
    ]);

    if (!transaction) throw new Error("Transaction fail");
  }

  async unlockLogin(token: string) {
    const tokenMail = await prisma.tokenMail.findUnique({
      where: {
        token: token,
      },
    });

    if (!tokenMail) throw new Error("Token não existe");

    if (tokenMail.status == TokenMailStatus.EXPIRED)
      throw new Error("Token expirado");

    if (Token.isExpired(tokenMail.token_expiration)) {
      await prisma.tokenMail.update({
        where: {
          id: tokenMail.id,
        },
        data: {
          status: TokenMailStatus.EXPIRED,
        },
      });

      throw new Error("Token expirado");
    }

    const user = await this.getByEmail(tokenMail.email);
    if (!!!user) throw new Error("E-mail não encontrado");

    const updateUser = prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        attempt_login: 0,
        status: UserStatus.ACTIVE,
      },
    });

    const updateTokenMail = prisma.tokenMail.update({
      where: {
        id: tokenMail.id,
      },
      data: {
        status: TokenMailStatus.FINISHED,
      },
    });

    const transaction = await prisma.$transaction([
      updateUser,
      updateTokenMail,
    ]);

    if (!transaction) throw new Error("Transaction fail");
  }

  async updatePasswordById(obj: UpdatePasswordDto) {
    const user = await this.getById(obj.userId);

    const isValidPassword = CryptoPassword.comparePassword(
      obj.password,
      user.password
    );
    if (!isValidPassword) throw new Error("Senha incorreta");

    const passwordEc = CryptoPassword.generationHash(obj.newPassword);

    return await prisma.user.update({
      where: {
        id: obj.userId,
      },
      data: {
        password: passwordEc,
      },
    });
  }

  async cancelAccountRequest(obj: CancelAccountRequestDto) {
    const user = await this.getById(obj.userId);

    const isValidPassword = CryptoPassword.comparePassword(
      obj.password,
      user.password
    );
    if (!isValidPassword) throw new Error("Senha incorreta");

    const token = Token.create();

    const tokenMail = await prisma.tokenMail.create({
      data: {
        id: UID.createDefault(),
        email: user.email,
        token: token.hash,
        type: TokenMailType.CANCEL_ACCOUNT_REQUEST,
        status: TokenMailStatus.OPEN,
        token_expiration: token.expiration,
        created_at: new Date(),
      },
    });

    if (!tokenMail) throw new Error("Error ao salvar informações");

    const url =
      BASE_URL_FRONT_END + "/confirm-cancel-account?token=" + tokenMail.token;

    // Envia e-mail com instruções e link para formulario de nova senha
  }

  async confirmCancelAccount(token: string) {}
}
export default new UserService();
