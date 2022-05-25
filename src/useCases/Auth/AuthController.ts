import { NextFunction, Request, Response } from "express";
import IAuthResponseDTO from "./IAuthResponseDTO";
import AuthUseCase from "./AuthUseCase";
import { container } from "tsyringe";
class AuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const authUseCase = container.resolve(AuthUseCase);

      const dataAuth = await authUseCase.run({
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
export default new AuthController();
