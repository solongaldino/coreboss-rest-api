import { Router } from "express";
import { TokenMailRepository, UserRepository } from "../../repositories";
import { CryptoPassword, JoiValidator, Token, UID } from "../../utils";
import RegisterUserController from "./RegisterUserController";
import RegisterUserUseCase from "./RegisterUserUseCase";
import { schema } from "./schema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const cryptoPassword = new CryptoPassword();
const tokenUtil = new Token();
const uid = new UID();

const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  tokenMailRepository,
  cryptoPassword,
  tokenUtil,
  uid
);

const registerUserController = new RegisterUserController(registerUserUseCase);

const registerUserRoute = Router();

registerUserRoute.post(
  "/register",
  JoiValidator(schema),
  registerUserController.handle
);

export { registerUserRoute };
