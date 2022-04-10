import {
  BaseRepository,
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { AuthJwt, CryptoPassword, Token, UID } from "../../utils";
import AuthController from "./AuthController";
import AuthUseCase from "./AuthUseCase";
import authRequestSchema from "./AuthRequestSchema";

const userRepository = new UserRepository();
const tokenMailRepository = new TokenMailRepository();
const loginStatementRepository = new LoginStatementRepository();
const baseRepository = new BaseRepository();
const tokenUtil = new Token();
const cryptoPassword = new CryptoPassword();
const authJwt = new AuthJwt();
const uid = new UID();

const authUseCase = new AuthUseCase(
  userRepository,
  tokenMailRepository,
  loginStatementRepository,
  baseRepository,
  tokenUtil,
  cryptoPassword,
  authJwt,
  uid
);

const authController = new AuthController(authUseCase);

export { authController, authRequestSchema };
