import { inject, injectable } from "tsyringe";
import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { UserStatus } from "../../enums/User";
import { PrismaClientProvider } from "../../providers";
import {
  ILoginStatementRepository,
  ITokenMailRepository,
  IUserRepository,
} from "../../repositories";
import {
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories/prisma/implementations";
import { ApiError, AuthJwt, CryptoPassword, Token, UID } from "../../utils";
import IAuthUseCase from "./IAuthUseCase";
import IAuthUseCaseDTO from "./IAuthUseCaseDTO";

const MAX_ATTEMPT_LOGIN: number = 5;

@injectable()
export default class AuthUseCase implements AuthUseCase {
  constructor(
    @inject("LoginStatementRepository")
    private loginStatementRepository: ILoginStatementRepository,
    @inject("TokenMailRepository")
    private tokenMailRepository: ITokenMailRepository,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async run(data: IAuthUseCaseDTO) {
    const user = await this.userRepository.findByEmail(data.email);
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

      const maxAttempt = MAX_ATTEMPT_LOGIN;

      if (attemptLogin >= maxAttempt) {
        const token = Token.create(999999999);

        const transaction = await PrismaClientProvider.$transaction(
          async (conn) => {
            const blockUser = await this.userRepository.update(
              {
                where: {
                  id: user.id,
                },
                data: {
                  attempt_login: attemptLogin,
                  status: UserStatus.BLOCKED_ATTEMPT_LOGIN,
                },
              },
              conn
            );

            const tokenMail = await this.tokenMailRepository.create(
              {
                data: {
                  id: UID.create(),
                  email: user.email,
                  token: token.hash,
                  type: TokenMailType.BLOCKED_USER_ATTEMPT_LOGIN,
                  status: TokenMailStatus.OPEN,
                  token_expiration: token.expiration,
                  created_at: new Date(),
                },
              },
              conn
            );

            return [blockUser, tokenMail];
          }
        );

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

      const updateAttemptLoginUser = this.userRepository.update({
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

    const transaction = await PrismaClientProvider.$transaction(
      async (conn) => {
        const loginStatement = await this.loginStatementRepository.create(
          {
            data: {
              id: UID.create(),
              user: user.id,
              created_at: new Date(),
            },
          },
          conn
        );

        const updateAttemptLoginUser = await this.userRepository.update(
          {
            where: {
              id: user.id,
            },
            data: {
              attempt_login: 0,
            },
          },
          conn
        );

        return [loginStatement, updateAttemptLoginUser];
      }
    );

    if (!transaction) throw new ApiError(400, "Transaction fail");

    return xAccessToken;
  }
}
