import { UserRepository } from "../../repositories";
import { CryptoPassword } from "../../utils";
import UpdatePasswordController from "./UpdatePasswordController";
import UpdatePasswordUseCase from "./UpdatePasswordUseCase";
import updatePasswordRequestSchema from "./UpdatePasswordRequestSchema";

const userRepository = new UserRepository();
const cryptoPassword = new CryptoPassword();

const updatePasswordUseCase = new UpdatePasswordUseCase(
  userRepository,
  cryptoPassword
);

const updatePasswordController = new UpdatePasswordController(
  updatePasswordUseCase
);

export { updatePasswordController, updatePasswordRequestSchema };
