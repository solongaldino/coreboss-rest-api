import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { UserStatus } from "../../enums/User";
import {
  BaseRepository,
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { ApiError, AuthJwt, CryptoPassword, Token, UID } from "../../utils";
import IAuthUseCaseDTO from "./IAuthUseCaseDTO";

class AuthUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenMailRepository: TokenMailRepository,
    private loginStatementRepository: LoginStatementRepository,
    private baseRepository: BaseRepository,
    private tokenUtil: Token,
    private cryptoPassword: CryptoPassword,
    private authJwt: AuthJwt,
    private uid: UID
  ) {}

  async run(data: IAuthUseCaseDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!!!user) throw new ApiError(404, "E-mail não encontrado");
    if (user.status == UserStatus.BLOCKED_ATTEMPT_LOGIN)
      throw new ApiError(
        400,
        "Usuário bloqueado devido as varias tentativas de login com senha incorreta, verifique sua caixa de e-mail."
      );

    const isValidPassword = this.cryptoPassword.comparePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      const attemptLogin = user.attempt_login + 1;

      const maxAttempt = 5;

      if (attemptLogin >= maxAttempt) {
        const blockUser = this.userRepository.update({
          where: {
            id: user.id,
          },
          data: {
            attempt_login: attemptLogin,
            status: UserStatus.BLOCKED_ATTEMPT_LOGIN,
          },
        });

        const token = this.tokenUtil.create(999999999);

        const tokenMail = this.tokenMailRepository.create({
          data: {
            id: this.uid.create(),
            email: user.email,
            token: token.hash,
            type: TokenMailType.BLOCKED_USER_ATTEMPT_LOGIN,
            status: TokenMailStatus.OPEN,
            token_expiration: token.expiration,
            created_at: new Date(),
          },
        });

        const transaction = await this.baseRepository.transaction([
          blockUser,
          tokenMail,
        ]);
        if (!transaction)
          throw new ApiError(400, "Error ao salvar informações");

        const url =
          process.env.BASE_URL_FRONT_END +
          "/confirmationRegister?token=" +
          token.hash;

        //Enviar e-mail

        throw new ApiError(
          400,
          "Usuário bloqueado, mais de " +
            maxAttempt +
            " tentativas de acessos com senha incorreta, verifique sua caixa de e-mail"
        );
      }

      const updateAttemptLoginUser = await this.userRepository.update({
        where: {
          id: user.id,
        },
        data: {
          attempt_login: attemptLogin,
        },
      });

      if (!updateAttemptLoginUser)
        throw new ApiError(400, "Error ao salvar informações");

      throw new ApiError(
        400,
        "Senha incorreta, restam apenas " +
          (maxAttempt - attemptLogin) +
          " tentativas para sua conta ser bloqueada."
      );
    }

    const xAccessToken = this.authJwt.login({
      id: user.id,
    });

    const loginStatement = this.loginStatementRepository.create({
      data: {
        id: this.uid.create(),
        user: user.id,
        created_at: new Date(),
      },
    });

    const updateAttemptLoginUser = this.userRepository.update({
      where: {
        id: user.id,
      },
      data: {
        attempt_login: 0,
      },
    });

    const transaction = await this.baseRepository.transaction([
      updateAttemptLoginUser,
      loginStatement,
    ]);

    if (!transaction) throw new ApiError(400, "Transaction fail");

    return xAccessToken;
  }
}

export default AuthUseCase;
