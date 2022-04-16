import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { TokenMailRepository, UserRepository } from "../../repositories";
import { ApiError, Token, UID } from "../../utils";
import IPasswordRecoveryUseCaseDTO from "./IPasswordRecoveryUseCaseDTO";

class PasswordRecoveryUseCase {
  async run(data: IPasswordRecoveryUseCaseDTO) {
    const { email } = data;

    const user = await UserRepository.findByEmail(email);

    if (!!!user) throw new ApiError(400, "E-mail não encontrado");

    const token = Token.create();

    const tokenMail = await TokenMailRepository.create({
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
export default new PasswordRecoveryUseCase();
