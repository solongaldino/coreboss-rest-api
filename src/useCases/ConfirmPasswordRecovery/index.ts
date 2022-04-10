import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { CryptoPassword, Token } from "../../utils";
import ConfirmPasswordRecoveryController from "./ConfirmPasswordRecoveryController";
import confirmPasswordRecoveryRequestSchema from "./ConfirmPasswordRecoveryRequestSchema";
import ConfirmPasswordRecoveryUseCase from "./ConfirmPasswordRecoveryUseCase";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const baseRepository = new BaseRepository();
const cryptoPassword = new CryptoPassword();
const tokenUtil = new Token();

const confirmPasswordRecoveryUseCase = new ConfirmPasswordRecoveryUseCase(
  userRepository,
  tokenMailRepository,
  baseRepository,
  cryptoPassword,
  tokenUtil
);

const confirmPasswordRecoveryController = new ConfirmPasswordRecoveryController(
  confirmPasswordRecoveryUseCase
);

export {
  confirmPasswordRecoveryController,
  confirmPasswordRecoveryRequestSchema,
};
