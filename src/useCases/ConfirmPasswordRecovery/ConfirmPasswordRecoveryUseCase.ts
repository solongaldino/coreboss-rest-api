import { TokenMailStatus } from "../../enums/TokenMail";
import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { ApiError, CryptoPassword, Token } from "../../utils";
import IConfirmPasswordRecoveryUseCaseDTO from "./IConfirmPasswordRecoveryUseCaseDTO";

class ConfirmPasswordRecoveryUseCase {
  async run(data: IConfirmPasswordRecoveryUseCaseDTO) {
    const tokenMail = await TokenMailRepository.findByToken(data.token);

    if (!tokenMail) throw new ApiError(400, "Token não existe");

    if (tokenMail.status == TokenMailStatus.EXPIRED)
      throw new ApiError(400, "Token expirado");

    if (Token.isExpired(tokenMail.token_expiration)) {
      await TokenMailRepository.update({
        where: {
          id: tokenMail.id,
        },
        data: {
          status: TokenMailStatus.EXPIRED,
        },
      });

      throw new ApiError(400, "Token expirado");
    }

    const user = await UserRepository.findByEmail(tokenMail.email);
    if (!!!user) throw new ApiError(400, "E-mail não encontrado");

    const passwordEc = CryptoPassword.generationHash(data.password);

    const updatePasswordUser = UserRepository.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordEc,
      },
    });

    const updateTokenMail = TokenMailRepository.update({
      where: {
        id: tokenMail.id,
      },
      data: {
        status: TokenMailStatus.FINISHED,
      },
    });

    const transaction = await BaseRepository.transaction([
      updatePasswordUser,
      updateTokenMail,
    ]);

    if (!transaction) throw new ApiError(400, "Transaction fail");
  }
}
export default new ConfirmPasswordRecoveryUseCase();
