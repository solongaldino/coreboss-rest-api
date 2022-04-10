import { JwtBlackListRepository, UserRepository } from "../../repositories";
import { UID } from "../../utils";
import LogoutController from "./LogoutController";
import LogoutUseCase from "./LogoutUseCase";
import logoutRequestSchema from "./LogoutRequestSchema";

const userRepository = new UserRepository();
const jwtBlackListRepository = new JwtBlackListRepository();
const uid = new UID();

const logoutUseCase = new LogoutUseCase(
  userRepository,
  jwtBlackListRepository,
  uid
);

const logoutController = new LogoutController(logoutUseCase);

export { logoutController, logoutRequestSchema };
