import { Router } from "express";
import TokenMailRepository from "../../repositories/TokenMailRepository";
import UserRepository from "../../repositories/UserRepository";
import { JoiValidator } from "../../utils/JoiValidator";
import RegisterUserController from "./RegisterUserController";
import RegisterUserUseCase from "./RegisterUserUseCase";
import { schema } from "./schema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();

const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  tokenMailRepository
);

const registerUserController = new RegisterUserController(registerUserUseCase);

const registerUserRoute = Router();

registerUserRoute.post(
  "/register",
  JoiValidator(schema),
  registerUserController.handle
);

export { registerUserRoute };
