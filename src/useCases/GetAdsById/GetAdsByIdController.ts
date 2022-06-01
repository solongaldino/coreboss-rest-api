import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils";
import GetAdsByIdUseCase from "./GetAdsByIdUseCase";
import IGetAdsByIdResponseDTO from "./IGetAdsByIdResponseDTO";
class GetAdsByIdController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const data = await GetAdsByIdUseCase.run({
        id,
      });

      if (!data) throw new ApiError(400, "Anúncio não encontrado");

      const response: IGetAdsByIdResponseDTO = { ads: data };

      return res.send(response);
    } catch (error) {
      return next(error);
    }
  }
}
export default new GetAdsByIdController();
