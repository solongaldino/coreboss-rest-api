import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import ILogoutUseCase from "./ILogoutUseCase";

@singleton()
export default class LogoutController {
  constructor(
    @inject("LogoutUseCase")
    private logoutUseCase: ILogoutUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { xAccessToken, userId } = req.body;
    try {
      await this.logoutUseCase.run({
        xAccessToken,
        userId,
      });
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  }
}
