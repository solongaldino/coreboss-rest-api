import { AuthJwt } from "../../utils";
import IsAuthenticatedController from "./IsAuthenticatedController";
import IsAuthenticatedUseCase from "./IsAuthenticatedUseCase";
import isAuthenticatedRequestSchema from "./IsAuthenticatedRequestSchema";

const authJwt = new AuthJwt();

const isAuthenticatedUseCase = new IsAuthenticatedUseCase(authJwt);

const isAuthenticatedController = new IsAuthenticatedController(
  isAuthenticatedUseCase
);

export { isAuthenticatedController, isAuthenticatedRequestSchema };
