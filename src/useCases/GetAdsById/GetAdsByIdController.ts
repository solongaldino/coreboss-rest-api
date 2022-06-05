import { NextFunction, Request, Response } from "express";
import { inject, singleton } from "tsyringe";
import IGetAdsByIdUseCase from "./IGetAdsByIdUseCase";
import IGetAdsByIdResponseDTO from "./IGetAdsByIdResponseDTO";

@singleton()
export default class GetAdsByIdController {
  constructor(
    @inject("GetAdsByIdUseCase")
    private getAdsByIdUseCase: IGetAdsByIdUseCase
  ) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const data = await this.getAdsByIdUseCase.run({ id });

      const response: IGetAdsByIdResponseDTO = { ads: data };

      return res.status(200).send(response);
    } catch (error) {
      return next(error);
    }
  }
}
