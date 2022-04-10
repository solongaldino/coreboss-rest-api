import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { Token } from "../../utils";
import UnlockLoginController from "./UnlockLoginController";
import UnlockLoginUseCase from "./UnlockLoginUseCase";
import unlockLoginRequestSchema from "./UnlockLoginRequestSchema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const baseRepository = new BaseRepository();
const tokenUtil = new Token();

const unlockLoginUseCase = new UnlockLoginUseCase(
  userRepository,
  tokenMailRepository,
  baseRepository,
  tokenUtil
);

const unlockLoginController = new UnlockLoginController(unlockLoginUseCase);

export { unlockLoginController, unlockLoginRequestSchema };
