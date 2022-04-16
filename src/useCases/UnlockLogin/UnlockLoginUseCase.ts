import { TokenMailStatus } from "../../enums/TokenMail";
import { UserStatus } from "../../enums/User";
import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { ApiError, Token } from "../../utils";
import IUnlockLoginUseCaseDTO from "./IUnlockLoginUseCaseDTO";

class UnlockLoginUseCase {
  async run(data: IUnlockLoginUseCaseDTO) {
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

    const updateUser = UserRepository.update({
      where: {
        id: user.id,
      },
      data: {
        attempt_login: 0,
        status: UserStatus.ACTIVE,
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
      updateUser,
      updateTokenMail,
    ]);

    if (!transaction) throw new ApiError(400, "Transaction fail");
  }
}
export default new UnlockLoginUseCase();
