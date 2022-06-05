import { TokenMailStatus, TokenMailType } from "@enums/TokenMail";
import { UserStatus, UserType } from "@enums/User";
import { PrismaClientProvider } from "@providers";
import { ITokenMailRepository, IUserRepository } from "@repositories/prisma";
import { ApiError, Token, UID } from "@utils";
import { inject, injectable } from "tsyringe";
import IConfirmationRegisterUseCase from "./IConfirmationRegisterUseCase";
import IConfirmationRegisterUseCaseDTO from "./IConfirmationRegisterUseCaseDTO";

@injectable()
export default class ConfirmationRegisterUseCase
  implements IConfirmationRegisterUseCase
{
  constructor(
    @inject("TokenMailRepository")
    private tokenMailRepository: ITokenMailRepository,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async run(obj: IConfirmationRegisterUseCaseDTO) {
    const tokenMail = await this.tokenMailRepository.findByToken(obj.token);

    if (!tokenMail) throw new ApiError(400, "Token não existe");

    if (tokenMail.status == TokenMailStatus.EXPIRED)
      throw new ApiError(400, "Token expirado");

    if (Token.isExpired(tokenMail.token_expiration)) {
      await this.tokenMailRepository.update({
        where: {
          id: tokenMail.id,
        },
        data: {
          status: TokenMailStatus.EXPIRED,
        },
      });

      throw new ApiError(400, "Token expirado");
    }

    const userType = (expression: TokenMailType) => {
      switch (expression) {
        case TokenMailType.REGISTER_USER:
          return UserType.CUSTOMER;

        case TokenMailType.REGISTER_ADMIN:
          return UserType.ADMIN;

        default:
          throw new ApiError(400, "Type not found");
      }
    };

    if (!tokenMail.details) throw new ApiError(400, "Password not found");

    try {
      await PrismaClientProvider.$transaction(async (conn) => {
        await this.userRepository.create(
          {
            data: {
              id: UID.create(),
              email: tokenMail.email,
              password: JSON.parse(tokenMail.details).password,
              status: UserStatus.ACTIVE,
              type: userType(tokenMail.type as TokenMailType),
              genre: "",
              attempt_login: 0,
              created_at: new Date(),
            },
          },
          conn
        );

        await this.tokenMailRepository.update(
          {
            where: {
              id: tokenMail.id,
            },
            data: {
              status: TokenMailStatus.FINISHED,
            },
          },
          conn
        );
      });
    } catch (error) {
      throw new ApiError(400, error.message);
    }
  }
}
