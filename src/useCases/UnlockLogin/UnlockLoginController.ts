import { NextFunction, Request, Response } from "express";
import UnlockLoginUseCase from "./UnlockLoginUseCase";

class UnlockLoginController {
  constructor(private unlockLoginUseCase: UnlockLoginUseCase) {}
  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.unlockLoginUseCase.run(req.body.token);
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default UnlockLoginController;
