import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IConfirmPasswordRecoveryUseCase from "./IConfirmPasswordRecoveryUseCase";

@singleton()
export default class ConfirmPasswordRecoveryController {
  constructor(
    @inject("ConfirmPasswordRecoveryUseCase")
    private confirmPasswordRecoveryUseCase: IConfirmPasswordRecoveryUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { password, token } = req.body;
    try {
      await this.confirmPasswordRecoveryUseCase.run({
        password,
        token,
      });
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  }
}
