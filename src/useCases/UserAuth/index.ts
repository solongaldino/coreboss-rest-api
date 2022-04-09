import {
  BaseRepository,
  LoginStatementRepository,
  TokenMailRepository,
  UserRepository,
} from "../../repositories";
import { AuthJwt, CryptoPassword, Token, UID } from "../../utils";
import UserAuthController from "./UserAuthController";
import UserAuthUseCase from "./UserAuthUseCase";
import userAuthRequestSchema from "./UserAuthRequestSchema";

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

export { userAuthController, userAuthRequestSchema };
