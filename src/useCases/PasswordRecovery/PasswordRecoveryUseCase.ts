import { ITokenMailRepository, IUserRepository } from "@repositories/prisma";
import { inject, injectable } from "tsyringe";
import { TokenMailStatus, TokenMailType } from "@enums/TokenMail";
import { ApiError, Token, UID } from "@utils";
import IPasswordRecoveryUseCase from "./IPasswordRecoveryUseCase";
import IPasswordRecoveryUseCaseDTO from "./IPasswordRecoveryUseCaseDTO";

@injectable()
export default class PasswordRecoveryUseCase
  implements IPasswordRecoveryUseCase
{
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("TokenMailRepository")
    private tokenMailRepository: ITokenMailRepository
  ) {}

  async run(data: IPasswordRecoveryUseCaseDTO) {
    const { email } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!!!user) throw new ApiError(400, "E-mail não encontrado");

    const token = Token.create();

    const tokenMail = await this.tokenMailRepository.create({
      data: {
        id: UID.create(),
        email: email,
        token: token.hash,
        type: TokenMailType.PASSWORD_RECOVERY_REQUEST,
        status: TokenMailStatus.OPEN,
        token_expiration: token.expiration,
        created_at: new Date(),
      },
    });

    if (!tokenMail) throw new ApiError(400, "Error ao salvar informações");

    const url =
      process.env.BASE_URL_FRONT_END +
      "/update-password?token=" +
      tokenMail.token;
  }

  // Envia e-mail com instruções e link para formulario de nova senha}
}
