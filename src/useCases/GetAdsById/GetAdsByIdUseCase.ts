import { IAdsRepository } from "@repositories/prisma";
import { ApiError } from "@utils";
import { inject, injectable } from "tsyringe";
import IGetAdsByIdUseCase from "./IGetAdsByIdUseCase";
import IGetAdsByIdUseCaseDTO from "./IGetAdsByIdUseCaseDTO";

@injectable()
export default class GetAdsByIdUseCase implements IGetAdsByIdUseCase {
  constructor(
    @inject("AdsRepository")
    private adsRepository: IAdsRepository
  ) {}

  async run(data: IGetAdsByIdUseCaseDTO) {
    const ads = this.adsRepository.findById(data.id);
    if (!ads) throw new ApiError(400, "Anúncio não encontrado");
    return ads;
  }
}
