import express from "express";
import AdsController from "./controllers/AdsController";
import UserController from "./controllers/UserController";
import AuthMiddleware from "./middlewares/AuthMiddleware";

class Router {
  constructor(express: express.Application) {
    this.routes(express);
  }

  private routes(express: express.Application) {
    /* AdsController */
    express.route("/ads/getById").post(AdsController.getById);

    /* UserController */

    express
      .route("/user/passwordRecoveryRequest")
      .post(UserController.passwordRecoveryRequest);

    express
      .route("/user/confirmPasswordRecovery")
      .post(UserController.confirmPasswordRecovery);

    express.route("/user/unlockLogin").post(UserController.unlockLogin);

    express
      .route("/user/updatePasswordById")
      .post(AuthMiddleware.isAuthenticated, UserController.updatePasswordById);

    express
      .route("/user/cancelAccountRequest")
      .post(
        AuthMiddleware.isAuthenticated,
        UserController.cancelAccountRequest
      );

    express.route("/user/isAuthenticated").post(UserController.isAuthenticated);
  }
}
export default Router;
