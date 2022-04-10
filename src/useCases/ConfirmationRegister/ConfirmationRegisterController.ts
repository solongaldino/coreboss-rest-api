import { NextFunction, Request, Response } from "express";
import ConfirmationRegisterUseCase from "./ConfirmationRegisterUseCase";

class ConfirmationRegisterController {
  constructor(
    private confirmationRegisterUseCase: ConfirmationRegisterUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
      await this.confirmationRegisterUseCase.run({ token });
      return res.status(201);
    } catch (error) {
      return next(error);
    }
  }
}
export default ConfirmationRegisterController;
