import { NextFunction, Request, Response } from "express";
import RegisterUseCase from "./RegisterUseCase";

class RegisterController {
  constructor(private registerUseCase: RegisterUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      await this.registerUseCase.run({ email, password });
      return res.status(201);
    } catch (error) {
      return next(error);
    }
  }
}
export default RegisterController;
