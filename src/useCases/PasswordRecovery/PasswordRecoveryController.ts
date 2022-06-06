import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IPasswordRecoveryUseCase from "./IPasswordRecoveryUseCase";

@singleton()
export default class PassworRecoveryController {
  constructor(
    @inject("PasswordRecoveryUseCase")
    private passwordRecoveryUseCase: IPasswordRecoveryUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      await this.passwordRecoveryUseCase.run(email);
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
