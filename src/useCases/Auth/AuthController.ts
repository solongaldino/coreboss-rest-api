import { NextFunction, Request, Response } from "express";
import AuthUseCase from "./AuthUseCase";
class AuthController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const dataAuth = await AuthUseCase.run({
        email,
        password,
      });
      return res.send({ xAccessToken: dataAuth, message: "ok" });
    } catch (error) {
      return next(error);
    }
  }
}
export default new AuthController();
