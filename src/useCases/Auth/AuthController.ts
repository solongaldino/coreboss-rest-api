import { NextFunction, Request, Response } from "express";
import IAuthResponseDTO from "./IAuthResponseDTO";
import { inject, singleton } from "tsyringe";
import IAuthUseCase from "./IAuthUseCase";
@singleton()
export default class AuthController {
  constructor(@inject("AuthUseCase") private authUseCase: IAuthUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const dataAuth = await this.authUseCase.run({
        email,
        password,
      });

      const response: IAuthResponseDTO = { xAccessToken: dataAuth };

      return res.status(200).send(response);
    } catch (error) {
      return next(error);
    }
  }
}
