import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IIsRegisteredEmailUseCase from "./IIsRegisteredEmailUseCase";

@singleton()
export default class IsRegisteredEmailController {
  constructor(
    @inject("IsRegisteredEmailUseCase")
    private isRegisteredEmailUseCase: IIsRegisteredEmailUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      await this.isRegisteredEmailUseCase.run({ email });
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  }
}
