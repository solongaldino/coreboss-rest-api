import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IIsAuthenticatedUseCase from "./IIsAuthenticatedUseCase";

@singleton()
export default class IsAuthenticatedController {
  constructor(
    @inject("IsAuthenticatedUseCase")
    private isAuthenticatedUseCase: IIsAuthenticatedUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { xAccessToken } = req.body;

    try {
      await this.isAuthenticatedUseCase.run({ xAccessToken });
      return res.status(204);
    } catch (error) {
      return next(error);
    }
  }
}
