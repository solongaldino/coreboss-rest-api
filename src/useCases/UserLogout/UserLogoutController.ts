import { NextFunction, Request, Response } from "express";
import UserLogoutUseCase from "./UserLogoutUseCase";

class UserLogoutController {
  constructor(private userLogoutUseCase: UserLogoutUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { xAccessToken, userId } = req.body;
    try {
      await this.userLogoutUseCase.run({
        xAccessToken,
        userId,
      });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default UserLogoutController;
