import { container, delay } from "tsyringe";
import {
  IAdsRepository,
  IJwtBlackListRepository,
  ILoginStatementRepository,
  ITokenMailRepository,
  IUserRepository,
} from "../../repositories";
import {
  AdsRepository,
  JwtBlackListRepository,
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories/implementations";
import AuthUseCase from "../../useCases/Auth/AuthUseCase";
import IAuthUseCase from "../../useCases/Auth/IAuthUseCase";

//Repositories
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

//UseCases
container.registerSingleton<IAuthUseCase>(
  "AuthUseCase",
  delay(() => AuthUseCase)
);
