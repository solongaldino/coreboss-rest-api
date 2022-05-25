import { container } from "tsyringe";
import {
  AdsRepository,
  JwtBlackListRepository,
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories/implementations";

container.registerSingleton("AdsRepository", AdsRepository);
container.registerSingleton("JwtBlackListRepository", JwtBlackListRepository);
container.registerSingleton(
  "LoginStatementRepository",
  LoginStatementRepository
);
container.registerSingleton("TokenMailRepository", TokenMailRepository);
container.registerSingleton("UserRepository", UserRepository);
