import { User } from "@prisma/client";
import { Request, Response } from "express";
import RegisterUserUseCase from "./RegisterUserUseCase";

class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      await this.registerUserUseCase.run({ email, password });

      return res.status(201).send({ message: "ok" });
    } catch (error: any) {
      return res.status(400).send({ error: error.message });
    }
  }
}
export default RegisterUserController;
