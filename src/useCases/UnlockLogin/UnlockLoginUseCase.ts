import { TokenMailStatus } from "@enums/TokenMail";
import { UserStatus } from "@enums/User";
import { PrismaClientProvider } from "@providers";
import { ITokenMailRepository, IUserRepository } from "@repositories/prisma";
import { ApiError, Token } from "@utils";
import { inject, injectable } from "tsyringe";
import IUnlockLoginUseCase from "./IUnlockLoginUseCase";
import IUnlockLoginUseCaseDTO from "./IUnlockLoginUseCaseDTO";

@injectable()
export default class UnlockLoginUseCase implements IUnlockLoginUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("TokenMailRepository")
    private tokenMailRepository: ITokenMailRepository
  ) {}

  async run(data: IUnlockLoginUseCaseDTO) {
    const tokenMail = await this.tokenMailRepository.findByToken(data.token);

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

    const user = await this.userRepository.findByEmail(tokenMail.email);
    if (!!!user) throw new ApiError(400, "E-mail não encontrado");

    try {
      await PrismaClientProvider.$transaction(async (conn) => {
        await this.userRepository.update(
          {
            where: {
              id: user.id,
            },
            data: {
              attempt_login: 0,
              status: UserStatus.ACTIVE,
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
