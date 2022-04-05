import { BASE_URL_FRONT_END } from "../../configs/GlobalConfig";
import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import TokenMailRepository from "../../repositories/TokenMailRepository";
import UserRepository from "../../repositories/UserRepository";
import ApiError from "../../utils/ApiError";
import CryptoPassword from "../../utils/CryptoPassword";
import Token from "../../utils/Token";
import UID from "../../utils/UID";
import { IRegisterUserUseCaseDTO } from "./IRegisterUserUseCaseDTO";

class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenMailRepository: TokenMailRepository
  ) {}
  async run(data: IRegisterUserUseCaseDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!!user) new ApiError(401, "E-mail encontra-se em uso");

    const passwordEc = CryptoPassword.generationHash(data.password);

    const token = Token.create();

    const tokenMail = await this.tokenMailRepository.create({
      data: {
        id: UID.createDefault(),
        email: data.email,
        token: token.hash,
        type: TokenMailType.REGISTER_USER,
        status: TokenMailStatus.OPEN,
        details: JSON.stringify({ password: passwordEc }),
        token_expiration: token.expiration,
        created_at: new Date(),
      },
    });

    if (!tokenMail) new ApiError(400, "Error ao salvar informações");

    const url =
      BASE_URL_FRONT_END + "/confirmationRegister?token=" + tokenMail.token;

    // Envia e-mail para confirmação do cadastro
  }
}

export default RegisterUserUseCase;
