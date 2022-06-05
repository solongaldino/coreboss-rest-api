import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import ICancelAccountUseCase from "./ICancelAccountUseCase";
@singleton()
export default class CancelAccountController {
  constructor(
    @inject("CancelAccountUseCase")
    private cancelAccountUseCase: ICancelAccountUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { password, userId } = req.body;
    try {
      await this.cancelAccountUseCase.run({
        password,
        userId,
      });
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  }
}
