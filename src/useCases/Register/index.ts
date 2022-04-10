import { TokenMailRepository, UserRepository } from "../../repositories";
import { CryptoPassword, Token, UID } from "../../utils";
import RegisterController from "./RegisterController";
import RegisterUseCase from "./RegisterUseCase";
import registerRequestSchema from "./RegisterRequestSchema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const cryptoPassword = new CryptoPassword();
const tokenUtil = new Token();
const uid = new UID();

const registerUseCase = new RegisterUseCase(
  userRepository,
  tokenMailRepository,
  cryptoPassword,
  tokenUtil,
  uid
);

const registerController = new RegisterController(registerUseCase);

export { registerController, registerRequestSchema };
