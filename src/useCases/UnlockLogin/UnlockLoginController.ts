import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IUnlockLoginUseCase from "./IUnlockLoginUseCase";

@singleton()
export default class UnlockLoginController {
  constructor(
    @inject("UnlockLoginUseCase")
    private unlockLoginUseCase: IUnlockLoginUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
      await this.unlockLoginUseCase.run({ token });
      return res.status(204).send();
    } catch (error) {
      return next(error);
    }
  }
}
