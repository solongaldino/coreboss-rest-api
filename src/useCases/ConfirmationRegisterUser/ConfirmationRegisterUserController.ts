import { NextFunction, Request, Response } from "express";
import ConfirmationRegisterUserUseCase from "./ConfirmationRegisterUserUseCase";

class ConfirmationRegisterUserController {
  constructor(
    private confirmationRegisterUserUseCase: ConfirmationRegisterUserUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
      await this.confirmationRegisterUserUseCase.run({ token });
      return res.status(201);
    } catch (error) {
      return next(error);
    }
  }
}
export default ConfirmationRegisterUserController;
