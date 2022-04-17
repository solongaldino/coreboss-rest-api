import { NextFunction, Request, Response } from "express";
import GetAdsByIdUseCase from "./GetAdsByIdUseCase";
class GetAdsByIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const data = await GetAdsByIdUseCase.run({
        id,
      });
      return res.send({ ads: data });
    } catch (error) {
      return next(error);
    }
  }
}
export default new GetAdsByIdController();
