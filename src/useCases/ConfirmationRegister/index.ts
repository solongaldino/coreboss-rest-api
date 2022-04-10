import {
  BaseRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { Token, UID } from "../../utils";
import ConfirmationRegisterController from "./ConfirmationRegisterController";
import ConfirmationRegisterUseCase from "./ConfirmationRegisterUseCase";
import confirmationRegisterRequestSchema from "./ConfirmationRegisterRequestSchema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const baseRepository = new BaseRepository();
const tokenUtil = new Token();
const uidUtil = new UID();

const confirmationRegisterUseCase = new ConfirmationRegisterUseCase(
  userRepository,
  tokenMailRepository,
  baseRepository,
  tokenUtil,
  uidUtil
);

const confirmationRegisterController = new ConfirmationRegisterController(
  confirmationRegisterUseCase
);

export { confirmationRegisterController, confirmationRegisterRequestSchema };
