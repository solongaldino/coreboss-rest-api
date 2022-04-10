import { NextFunction, Request, Response } from "express";
import LogoutUseCase from "./LogoutUseCase";

class LogoutController {
  constructor(private logoutUseCase: LogoutUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { xAccessToken, userId } = req.body;
    try {
      await this.logoutUseCase.run({
        xAccessToken,
        userId,
      });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default LogoutController;
