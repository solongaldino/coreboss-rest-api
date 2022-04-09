import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import RegisterUserUseCase from "./RegisterUserUseCase";

class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      await this.registerUserUseCase.run({ email, password });
      return res.status(201);
    } catch (error) {
      return next(error);
    }
  }
}
export default RegisterUserController;
