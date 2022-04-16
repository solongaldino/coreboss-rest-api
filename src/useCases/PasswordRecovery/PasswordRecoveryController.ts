import { NextFunction, Request, Response } from "express";
import PasswordRecoveryUseCase from "./PasswordRecoveryUseCase";

class PassworRecoveryController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      await PasswordRecoveryUseCase.run(email);
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default new PassworRecoveryController();
