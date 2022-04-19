import { NextFunction, Request, Response } from "express";
import ListAdsUseCase from "./ListAdsUseCase";

class ListAdsController {
  public async handle(req: Request, res: Response, next: NextFunction) {
    const { offset, size } = req.query;

    try {
      await ListAdsUseCase.run({ offset: Number(offset), size: Number(size) });
      return res.status(200);
    } catch (error) {
      return next(error);
    }
  }
}
export default new ListAdsController();
