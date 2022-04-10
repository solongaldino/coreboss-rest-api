import { NextFunction, Request, Response } from "express";
import IsAuthenticatedUseCase from "./IsAuthenticatedUseCase";

class IsAuthenticatedController {
  constructor(private isAuthenticatedUseCase: IsAuthenticatedUseCase) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { xAccessToken } = req.body;

    try {
      await this.isAuthenticatedUseCase.run({ xAccessToken });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default IsAuthenticatedController;
