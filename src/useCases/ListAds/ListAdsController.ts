import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IListAdsUseCase from "./IListAdsUseCase";

@singleton()
export default class ListAdsController {
  constructor(
    @inject("ListAdsUseCase")
    private listAdsUseCase: IListAdsUseCase
  ) {}

  public async handle(req: Request, res: Response, next: NextFunction) {
    const { offset, size } = req.query;
    try {
      const list = await this.listAdsUseCase.run({
        offset: Number(offset),
        size: Number(size),
      });
      return res.status(200).send(list);
    } catch (error) {
      return next(error);
    }
  }
}
