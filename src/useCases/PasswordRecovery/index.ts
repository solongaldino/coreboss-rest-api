import { TokenMailRepository, UserRepository } from "../../repositories";
import { Token, UID } from "../../utils";
import PassworRecoveryController from "./PasswordRecoveryController";
import passwordRecoveryRequestSchema from "./PasswordRecoveryRequestSchema";
import PasswordRecoveryUseCase from "./PasswordRecoveryUseCase";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const tokenUtil = new Token();
const uidUtil = new UID();

const passwordRecoveryUseCase = new PasswordRecoveryUseCase(
  userRepository,
  tokenMailRepository,
  tokenUtil,
  uidUtil
);

const passworRecoveryController = new PassworRecoveryController(
  passwordRecoveryUseCase
);

export { passworRecoveryController, passwordRecoveryRequestSchema };
