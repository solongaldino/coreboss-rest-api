import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IRegisterUseCase from "./IRegisterUseCase";

@singleton()
export default class RegisterController {
  constructor(
    @inject("RegisterUseCase")
    private registerUseCase: IRegisterUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      await this.registerUseCase.run({ email, password });
      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  }
}
