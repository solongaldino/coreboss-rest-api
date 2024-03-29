import { inject, injectable } from "tsyringe";
import { TokenMailStatus, TokenMailType } from "@enums/TokenMail";
import { ITokenMailRepository, IUserRepository } from "@repositories/prisma";
import { ApiError, CryptoPassword, Token, UID } from "@utils";
import ICancelAccountUseCase from "./ICancelAccountUseCase";
import ICancelAccountUseCaseDTO from "./ICancelAccountUseCaseDTO";
@injectable()
export default class CancelAccountUseCase implements ICancelAccountUseCase {
  constructor(
    @inject("TokenMailRepository")
    private tokenMailRepository: ITokenMailRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async run(data: ICancelAccountUseCaseDTO) {
    const user = await this.userRepository.findById(data.userId);

    if (!!!user) throw new ApiError(400, "User not found");

    const isValidPassword = CryptoPassword.comparePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) throw new ApiError(400, "Senha incorreta");

    const token = Token.create();

    const tokenMail = await this.tokenMailRepository.create({
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
