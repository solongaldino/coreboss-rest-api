import { TokenMailStatus } from "../../enums/TokenMail";
import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { ApiError, CryptoPassword, Token } from "../../utils";
import IConfirmPasswordRecoveryUseCaseDTO from "./IConfirmPasswordRecoveryUseCaseDTO";

class ConfirmPasswordRecoveryUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenMailRepository: TokenMailRepository,
    private baseRepository: BaseRepository,
    private cryptoPassword: CryptoPassword,
    private tokenUtil: Token
  ) {}
  async run(data: IConfirmPasswordRecoveryUseCaseDTO) {
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

    const passwordEc = this.cryptoPassword.generationHash(data.password);

    const updatePasswordUser = this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordEc,
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
      updatePasswordUser,
      updateTokenMail,
    ]);

    if (!transaction) throw new ApiError(400, "Transaction fail");
  }
}
export default ConfirmPasswordRecoveryUseCase;
