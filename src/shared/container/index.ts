import { container } from "tsyringe";
import {
  IAdsRepository,
  IJwtBlackListRepository,
  ILoginStatementRepository,
  IMainRepository,
  ITokenMailRepository,
  IUserRepository,
} from "../../repositories";
import {
  AdsRepository,
  JwtBlackListRepository,
  LoginStatementRepository,
  MainRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories/implementations";
import AuthUseCase from "../../useCases/Auth/AuthUseCase";
import IAuthUseCase from "../../useCases/Auth/IAuthUseCase";

container.registerSingleton("AuthUseCase", AuthUseCase);

container.registerSingleton<IAdsRepository>("AdsRepository", AdsRepository);
container.registerSingleton<IJwtBlackListRepository>(
  "JwtBlackListRepository",
  JwtBlackListRepository
);
container.registerSingleton<ILoginStatementRepository>(
  "LoginStatementRepository",
  LoginStatementRepository
);
container.registerSingleton<ITokenMailRepository>(
  "TokenMailRepository",
  TokenMailRepository
);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton("MainRepository", MainRepository);
