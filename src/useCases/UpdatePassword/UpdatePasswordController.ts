import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IUpdatePasswordUseCase from "./IUpdatePasswordUseCase";
@singleton()
export default class UpdatePasswordController {
  constructor(
    @inject("UpdatePasswordUseCase")
    private updatePasswordUseCase: IUpdatePasswordUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { password, newPassword, userId } = req.body;
    try {
      await this.updatePasswordUseCase.run({
        password,
        newPassword,
        userId,
      });
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  }
}
