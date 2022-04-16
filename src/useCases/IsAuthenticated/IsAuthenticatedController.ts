import { NextFunction, Request, Response } from "express";
import IsAuthenticatedUseCase from "./IsAuthenticatedUseCase";

class IsAuthenticatedController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const { xAccessToken } = req.body;

    try {
      await IsAuthenticatedUseCase.run({ xAccessToken });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default new IsAuthenticatedController();
