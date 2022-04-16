import { NextFunction, Request, Response } from "express";
import ConfirmPasswordRecoveryUseCase from "./ConfirmPasswordRecoveryUseCase";

class ConfirmPasswordRecoveryController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const { password, token } = req.body;
    try {
      await ConfirmPasswordRecoveryUseCase.run({
        password,
        token,
      });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default new ConfirmPasswordRecoveryController();
