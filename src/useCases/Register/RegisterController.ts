import { NextFunction, Request, Response } from "express";
import RegisterUseCase from "./RegisterUseCase";

class RegisterController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      await RegisterUseCase.run({ email, password });
      return res.status(201);
    } catch (error) {
      return next(error);
    }
  }
}
export default new RegisterController();
