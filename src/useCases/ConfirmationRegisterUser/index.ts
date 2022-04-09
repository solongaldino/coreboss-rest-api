import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { Token, UID } from "../../utils";
import ConfirmationRegisterUserController from "./ConfirmationRegisterUserController";
import ConfirmationRegisterUserUseCase from "./ConfirmationRegisterUserUseCase";
import confirmationRegisterUserRequestSchema from "./ConfirmationRegisterUserRequestSchema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const baseRepository = new BaseRepository();
const tokenUtil = new Token();
const uidUtil = new UID();

const confirmationRegisterUserUseCase = new ConfirmationRegisterUserUseCase(
  userRepository,
  tokenMailRepository,
  baseRepository,
  tokenUtil,
  uidUtil
);

const confirmationRegisterUserController =
  new ConfirmationRegisterUserController(confirmationRegisterUserUseCase);

export {
  confirmationRegisterUserController,
  confirmationRegisterUserRequestSchema,
};
