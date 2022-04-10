import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { TokenMailRepository, UserRepository } from "../../repositories";
import { ApiError, Token, UID } from "../../utils";
import IPasswordRecoveryUseCaseDTO from "./IPasswordRecoveryUseCaseDTO";

class PasswordRecoveryUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenMailRepository: TokenMailRepository,
    private tokenUtil: Token,
    private uidUtil: UID
  ) {}

  async run(data: IPasswordRecoveryUseCaseDTO) {
    const { email } = data;

    const user = await this.userRepository.findByEmail(email);

    if (!!!user) throw new ApiError(400, "E-mail não encontrado");

    const token = this.tokenUtil.create();

    const tokenMail = await this.tokenMailRepository.create({
      data: {
        id: this.uidUtil.create(),
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
export default PasswordRecoveryUseCase;
