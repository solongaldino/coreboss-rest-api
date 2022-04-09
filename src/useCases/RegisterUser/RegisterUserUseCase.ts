import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { TokenMailRepository, UserRepository } from "../../repositories";
import { ApiError, CryptoPassword, Token, UID } from "../../utils";
import { IRegisterUserUseCaseDTO } from "./IRegisterUserUseCaseDTO";
class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenMailRepository: TokenMailRepository,
    private cryptoPassword: CryptoPassword,
    private tokenUtil: Token,
    private uid: UID
  ) {}
  async run(data: IRegisterUserUseCaseDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!!user) throw new ApiError(401, "E-mail encontra-se em uso");

    const passwordEc = this.cryptoPassword.generationHash(data.password);

    const token = this.tokenUtil.create();

    const tokenMail = await this.tokenMailRepository.create({
      data: {
        id: this.uid.create(),
        email: data.email,
        token: token.hash,
        type: TokenMailType.REGISTER_USER,
        status: TokenMailStatus.OPEN,
        details: JSON.stringify({ password: passwordEc }),
        token_expiration: token.expiration,
        created_at: new Date(),
      },
    });

    if (!tokenMail) throw new ApiError(400, "Error ao salvar informações");

    const url =
      process.env.BASE_URL_FRONT_END +
      "/confirmationRegister?token=" +
      tokenMail.token;

    // Envia e-mail para confirmação do cadastro
  }
}

export default RegisterUserUseCase;
