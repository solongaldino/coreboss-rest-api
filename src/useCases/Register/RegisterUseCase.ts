import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { TokenMailRepository, UserRepository } from "../../repositories";
import { ApiError, CryptoPassword, Token, UID } from "../../utils";
import IRegisterUseCaseDTO from "./IRegisterUseCaseDTO";
class RegisterUseCase {
  async run(data: IRegisterUseCaseDTO) {
    const user = await UserRepository.findByEmail(data.email);

    if (!!user) throw new ApiError(401, "E-mail encontra-se em uso");

    const passwordEc = CryptoPassword.generationHash(data.password);

    const token = Token.create();

    const tokenMail = await TokenMailRepository.create({
      data: {
        id: UID.create(),
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

export default new RegisterUseCase();
