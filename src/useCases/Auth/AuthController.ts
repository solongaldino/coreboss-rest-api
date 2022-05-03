import { NextFunction, Request, Response } from "express";
import AuthResponseDTO from "./AuthResponseDTO";
import AuthUseCase from "./AuthUseCase";
class AuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const dataAuth = await AuthUseCase.run({
        email,
        password,
      });

      const response: AuthResponseDTO = { xAccessToken: dataAuth };

      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
}
export default new AuthController();
