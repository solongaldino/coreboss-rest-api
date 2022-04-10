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

    express.route("/user/isAuthenticated").post(UserController.isAuthenticated);
  }
}
export default Router;
