import { NextFunction, Request, Response } from "express";
import ConfirmationRegisterUseCase from "./ConfirmationRegisterUseCase";

class ConfirmationRegisterController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;
    try {
      await ConfirmationRegisterUseCase.run({ token });
      return res.status(201);
    } catch (error) {
      return next(error);
    }
  }
}
export default new ConfirmationRegisterController();
