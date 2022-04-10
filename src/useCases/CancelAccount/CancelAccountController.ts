import { NextFunction, Request, Response } from "express";
import CancelAccountUseCase from "./CancelAccountUseCase";

class CancelAccountController {
  constructor(private cancelAccountUseCase: CancelAccountUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { password, userId } = req.body;
    try {
      await this.cancelAccountUseCase.run({
        password,
        userId,
      });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default CancelAccountController;
