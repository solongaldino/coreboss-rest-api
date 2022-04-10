import { JwtBlackListRepository, UserRepository } from "../../repositories";
import { UID } from "../../utils";
import UserLogoutController from "./UserLogoutController";
import UserLogoutUseCase from "./UserLogoutUseCase";
import userLogoutRequestSchema from "./UserLogoutRequestSchema";

const userRepository = new UserRepository();
const jwtBlackListRepository = new JwtBlackListRepository();
const uid = new UID();

const userLogoutUseCase = new UserLogoutUseCase(
  userRepository,
  jwtBlackListRepository,
  uid
);

const userLogoutController = new UserLogoutController(userLogoutUseCase);

export { userLogoutController, userLogoutRequestSchema };
