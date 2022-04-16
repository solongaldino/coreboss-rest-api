import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { TokenMailRepository, UserRepository } from "../../repositories";
import { ApiError, CryptoPassword, Token, UID } from "../../utils";
import ICancelAccountUseCase from "./ICancelAccountUseCaseDTO";

class CancelAccountUseCase {
  async run(data: ICancelAccountUseCase) {
    const user = await UserRepository.findById(data.userId);

    if (!!!user) throw new ApiError(400, "User not found");

    const isValidPassword = CryptoPassword.comparePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) throw new ApiError(400, "Senha incorreta");

    const token = Token.create();

    const tokenMail = await TokenMailRepository.create({
      data: {
        id: UID.create(),
        email: user.email,
        token: token.hash,
        type: TokenMailType.CANCEL_ACCOUNT_REQUEST,
        status: TokenMailStatus.OPEN,
        token_expiration: token.expiration,
        created_at: new Date(),
      },
    });

    if (!tokenMail) throw new ApiError(400, "Error ao salvar informações");

    const url =
      process.env.BASE_URL_FRONT_END +
      "/confirm-cancel-account?token=" +
      tokenMail.token;

    // Envia e-mail com instruções e link para formulario de nova senha
  }
}
export default new CancelAccountUseCase();
