import { container, delay } from "tsyringe";
import {
  IAdsRepository,
  IJwtBlackListRepository,
  ILoginStatementRepository,
  ITokenMailRepository,
  IUserRepository,
} from "@repositories/prisma";
import {
  AdsRepository,
  JwtBlackListRepository,
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "@repositories/prisma/implementations";
import AuthUseCase from "@useCases/Auth/AuthUseCase";
import IAuthUseCase from "@useCases/Auth/IAuthUseCase";
import CancelAccountUseCase from "@useCases/CancelAccount/CancelAccountUseCase";
import ICancelAccountUseCase from "@useCases/CancelAccount/ICancelAccountUseCase";
import ConfirmationRegisterUseCase from "@useCases/ConfirmationRegister/ConfirmationRegisterUseCase";
import IConfirmationRegisterUseCase from "@useCases/ConfirmationRegister/IConfirmationRegisterUseCase";
import ConfirmPasswordRecoveryUseCase from "@useCases/ConfirmPasswordRecovery/ConfirmPasswordRecoveryUseCase";
import IConfirmPasswordRecoveryUseCase from "@useCases/ConfirmPasswordRecovery/IConfirmPasswordRecoveryUseCase";
import IGetAdsByIdUseCase from "@useCases/GetAdsById/IGetAdsByIdUseCase";
import GetAdsByIdUseCase from "@useCases/GetAdsById/GetAdsByIdUseCase";
import IIsAuthenticatedUseCase from "@useCases/IsAuthenticated/IIsAuthenticatedUseCase";
import IsAuthenticatedUseCase from "@useCases/IsAuthenticated/IsAuthenticatedUseCase";
import IIsRegisteredEmailUseCase from "@useCases/IsRegisteredEmail/IIsRegisteredEmailUseCase";
import IsRegisteredEmailUseCase from "@useCases/IsRegisteredEmail/IsRegisteredEmailUseCase";
import IListAdsUseCase from "@useCases/ListAds/IListAdsUseCase";
import ListAdsUseCase from "@useCases/ListAds/ListAdsUseCase";
import ILogoutUseCase from "@useCases/Logout/ILogoutUseCase";
import LogoutUseCase from "@useCases/Logout/LogoutUseCase";
import IPasswordRecoveryUseCase from "@useCases/PasswordRecovery/IPasswordRecoveryUseCase";
import PasswordRecoveryUseCase from "@useCases/PasswordRecovery/PasswordRecoveryUseCase";
import IRegisterUseCase from "@useCases/Register/IRegisterUseCase";
import RegisterUseCase from "@useCases/Register/RegisterUseCase";
import IUnlockLoginUseCase from "@useCases/UnlockLogin/IUnlockLoginUseCase";
import UnlockLoginUseCase from "@useCases/UnlockLogin/UnlockLoginUseCase";
import IUpdatePasswordUseCase from "@useCases/UpdatePassword/IUpdatePasswordUseCase";
import UpdatePasswordUseCase from "@useCases/UpdatePassword/UpdatePasswordUseCase";

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
container.registerSingleton<IAuthUseCase>("AuthUseCase", AuthUseCase);
container.registerSingleton<ICancelAccountUseCase>(
  "CancelAccountUseCase",
  CancelAccountUseCase
);
container.registerSingleton<IConfirmationRegisterUseCase>(
  "ConfirmationRegisterUseCase",
  ConfirmationRegisterUseCase
);
container.registerSingleton<IConfirmPasswordRecoveryUseCase>(
  "ConfirmPasswordRecoveryUseCase",
  ConfirmPasswordRecoveryUseCase
);
container.registerSingleton<IGetAdsByIdUseCase>(
  "GetAdsByIdUseCase",
  GetAdsByIdUseCase
);
container.registerSingleton<IIsAuthenticatedUseCase>(
  "IsAuthenticatedUseCase",
  IsAuthenticatedUseCase
);
container.registerSingleton<IIsRegisteredEmailUseCase>(
  "IsRegisteredEmailUseCase",
  IsRegisteredEmailUseCase
);
container.registerSingleton<IListAdsUseCase>("ListAdsUseCase", ListAdsUseCase);
container.registerSingleton<ILogoutUseCase>("LogoutUseCase", LogoutUseCase);
container.registerSingleton<IPasswordRecoveryUseCase>(
  "PasswordRecoveryUseCase",
  PasswordRecoveryUseCase
);
container.registerSingleton<IRegisterUseCase>(
  "RegisterUseCase",
  RegisterUseCase
);
container.registerSingleton<IUnlockLoginUseCase>(
  "UnlockLoginUseCase",
  UnlockLoginUseCase
);
container.registerSingleton<IUpdatePasswordUseCase>(
  "UpdatePasswordUseCase",
  UpdatePasswordUseCase
);
