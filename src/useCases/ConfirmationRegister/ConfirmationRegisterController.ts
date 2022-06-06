import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IConfirmationRegisterUseCase from "./IConfirmationRegisterUseCase";
@singleton()
export default class ConfirmationRegisterController {
  constructor(
    @inject("ConfirmationRegisterUseCase")
    private confirmationRegisterUseCase: IConfirmationRegisterUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
      await this.confirmationRegisterUseCase.run({ token });
      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  }
}
