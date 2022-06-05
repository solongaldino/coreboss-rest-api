import { TokenMailStatus, TokenMailType } from "../../enums/TokenMail";
import { UserStatus, UserType } from "../../enums/User";
import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { ApiError, Token, UID } from "../../utils";
import IConfirmationRegisterUseCaseDTO from "./IConfirmationRegisterUseCaseDTO";

class ConfirmationRegisterUseCase {
  async run(obj: IConfirmationRegisterUseCaseDTO) {
    const tokenMail = await TokenMailRepository.findByToken(obj.token);

    if (!tokenMail) throw new ApiError(400, "Token não existe");

    if (tokenMail.status == TokenMailStatus.EXPIRED)
      throw new ApiError(400, "Token expirado");

    if (Token.isExpired(tokenMail.token_expiration)) {
      await TokenMailRepository.update({
        where: {
          id: tokenMail.id,
        },
        data: {
          status: TokenMailStatus.EXPIRED,
        },
      });

      throw new ApiError(400, "Token expirado");
    }

    const userType = (expression: TokenMailType) => {
      switch (expression) {
        case TokenMailType.REGISTER_USER:
          return UserType.CUSTOMER;

        case TokenMailType.REGISTER_ADMIN:
          return UserType.ADMIN;

        default:
          throw new ApiError(400, "Type not found");
      }
    };

    if (!tokenMail.details) throw new ApiError(400, "Password not found");

    const createUser = UserRepository.create({
      data: {
        id: UID.create(),
        email: tokenMail.email,
        password: JSON.parse(tokenMail.details).password,
        status: UserStatus.ACTIVE,
        type: userType(tokenMail.type as TokenMailType),
        genre: "",
        attempt_login: 0,
        created_at: new Date(),
      },
    });

    const updateTokenMail = TokenMailRepository.update({
      where: {
        id: tokenMail.id,
      },
      data: {
        status: TokenMailStatus.FINISHED,
      },
    });

    const transaction = await BaseRepository.transaction([
      createUser,
      updateTokenMail,
    ]);

    if (!transaction) throw new ApiError(400, "Transaction fail");
  }
}
export default new ConfirmationRegisterUseCase();
