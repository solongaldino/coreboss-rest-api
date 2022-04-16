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
  async run(data: IAuthUseCaseDTO) {
    const user = await UserRepository.findByEmail(data.email);
    if (!!!user) throw new ApiError(404, "E-mail não encontrado");
    if (user.status == UserStatus.BLOCKED_ATTEMPT_LOGIN)
      throw new ApiError(
        400,
        "Usuário bloqueado devido as varias tentativas de login com senha incorreta, verifique sua caixa de e-mail."
      );

    const isValidPassword = CryptoPassword.comparePassword(
      data.password,
      user.password
    );

    if (!isValidPassword) {
      const attemptLogin = user.attempt_login + 1;

      const maxAttempt = 5;

      if (attemptLogin >= maxAttempt) {
        const blockUser = UserRepository.update({
          where: {
            id: user.id,
          },
          data: {
            attempt_login: attemptLogin,
            status: UserStatus.BLOCKED_ATTEMPT_LOGIN,
          },
        });

        const token = Token.create(999999999);

        const tokenMail = TokenMailRepository.create({
          data: {
            id: UID.create(),
            email: user.email,
            token: token.hash,
            type: TokenMailType.BLOCKED_USER_ATTEMPT_LOGIN,
            status: TokenMailStatus.OPEN,
            token_expiration: token.expiration,
            created_at: new Date(),
          },
        });

        const transaction = await BaseRepository.transaction([
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

      const updateAttemptLoginUser = UserRepository.update({
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

    const xAccessToken = AuthJwt.login({
      id: user.id,
    });

    const loginStatement = LoginStatementRepository.create({
      data: {
        id: UID.create(),
        user: user.id,
        created_at: new Date(),
      },
    });

    const updateAttemptLoginUser = UserRepository.update({
      where: {
        id: user.id,
      },
      data: {
        attempt_login: 0,
      },
    });

    const transaction = await BaseRepository.transaction([
      updateAttemptLoginUser,
      loginStatement,
    ]);

    if (!transaction) throw new ApiError(400, "Transaction fail");

    return xAccessToken;
  }
}

export default new AuthUseCase();
