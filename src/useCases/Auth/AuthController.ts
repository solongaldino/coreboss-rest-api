import { NextFunction, Request, Response } from "express";
import IAuthResponseDTO from "./IAuthResponseDTO";
import { container, inject, singleton } from "tsyringe";
import IAuthUseCase from "./IAuthUseCase";
@singleton()
class AuthController {
  constructor(@inject("AuthUseCase") private authUseCase: IAuthUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const dataAuth = await this.authUseCase.run({
        email,
        password,
      });

      const response: IAuthResponseDTO = { xAccessToken: dataAuth };

      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
}

export default container.resolve(AuthController);
