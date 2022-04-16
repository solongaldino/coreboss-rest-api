import { NextFunction, Request, Response } from "express";
import UnlockLoginUseCase from "./UnlockLoginUseCase";

class UnlockLoginController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await UnlockLoginUseCase.run(req.body.token);
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default new UnlockLoginController();
