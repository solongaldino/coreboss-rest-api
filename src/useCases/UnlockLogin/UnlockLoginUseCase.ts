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
  constructor(
    private userRepository: UserRepository,
    private tokenMailRepository: TokenMailRepository,
    private baseRepository: BaseRepository,
    private tokenUtil: Token
  ) {}
  async run(data: IUnlockLoginUseCaseDTO) {
    const tokenMail = await this.tokenMailRepository.findByToken(data.token);

    if (!tokenMail) throw new ApiError(400, "Token não existe");

    if (tokenMail.status == TokenMailStatus.EXPIRED)
      throw new ApiError(400, "Token expirado");

    if (this.tokenUtil.isExpired(tokenMail.token_expiration)) {
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

    const updateUser = this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        attempt_login: 0,
        status: UserStatus.ACTIVE,
      },
    });

    const updateTokenMail = this.tokenMailRepository.update({
      where: {
        id: tokenMail.id,
      },
      data: {
        status: TokenMailStatus.FINISHED,
      },
    });

    const transaction = await this.baseRepository.transaction([
      updateUser,
      updateTokenMail,
    ]);

    if (!transaction) throw new ApiError(400, "Transaction fail");
  }
}
export default UnlockLoginUseCase;
