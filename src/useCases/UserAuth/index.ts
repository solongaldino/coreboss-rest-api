import { Router } from "express";
import {
  BaseRepository,
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { AuthJwt, CryptoPassword, JoiValidator, Token, UID } from "../../utils";
import { schema } from "./schema";
import UserAuthController from "./UserAuthController";
import UserAuthUseCase from "./UserAuthUseCase";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const loginStatementRepository = new LoginStatementRepository();
const baseRepository = new BaseRepository();
const tokenUtil = new Token();
const cryptoPassword = new CryptoPassword();
const authJwt = new AuthJwt();
const uid = new UID();

const userAuthUseCase = new UserAuthUseCase(
  userRepository,
  tokenMailRepository,
  loginStatementRepository,
  baseRepository,
  tokenUtil,
  cryptoPassword,
  authJwt,
  uid
);

const userAuthController = new UserAuthController(userAuthUseCase);

const userAuthRoute = Router();

userAuthRoute.post("/auth", JoiValidator(schema), userAuthController.handle);

export { userAuthRoute };
