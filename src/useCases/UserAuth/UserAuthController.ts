import { NextFunction, Request, Response } from "express";
import UserAuthUseCase from "./UserAuthUseCase";

class UserAuthController {
  constructor(private userAuthUseCase: UserAuthUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const dataAuth = await this.userAuthUseCase.run({
        email,
        password,
      });

      return res.send({ xAccessToken: dataAuth, message: "ok" });
    } catch (error) {
      return next(error);
    }
  }
}
export default UserAuthController;
