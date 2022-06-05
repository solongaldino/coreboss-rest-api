import { TokenMailStatus } from "@enums/TokenMail";
import { ApiError, CryptoPassword, Token } from "@utils";
import IConfirmPasswordRecoveryUseCaseDTO from "./IConfirmPasswordRecoveryUseCaseDTO";
import IConfirmPasswordRecoveryUseCase from "./IConfirmPasswordRecoveryUseCase";
import { inject } from "tsyringe";
import { ITokenMailRepository, IUserRepository } from "@repositories/prisma";
import { PrismaClientProvider } from "@providers";

export default class ConfirmPasswordRecoveryUseCase
  implements IConfirmPasswordRecoveryUseCase
{
  constructor(
    @inject("TokenMailRepository")
    private tokenMailRepository: ITokenMailRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async run(data: IConfirmPasswordRecoveryUseCaseDTO) {
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

    const passwordEc = CryptoPassword.generationHash(data.password);

    try {
      await PrismaClientProvider.$transaction(async (conn) => {
        await this.userRepository.update(
          {
            where: {
              id: user.id,
            },
            data: {
              password: passwordEc,
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
