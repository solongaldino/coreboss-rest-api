import { TokenMailRepository, UserRepository } from "../../repositories";
import { CryptoPassword, Token, UID } from "../../utils";
import CancelAccountController from "./CancelAccountController";
import CancelAccountUseCase from "./CancelAccountUseCase";
import cancelAccountRequestSchema from "./CancelAccountRequestSchema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const cryptoPassword = new CryptoPassword();
const tokenUtil = new Token();
const uid = new UID();

const cancelAccountUseCase = new CancelAccountUseCase(
  userRepository,
  tokenMailRepository,
  cryptoPassword,
  tokenUtil,
  uid
);

const cancelAccountController = new CancelAccountController(
  cancelAccountUseCase
);

export { cancelAccountController, cancelAccountRequestSchema };
