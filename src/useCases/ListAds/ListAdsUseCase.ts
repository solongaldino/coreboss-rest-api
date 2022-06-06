import { IAdsRepository } from "@repositories/prisma";
import { ApiError } from "@utils";
import { inject, injectable } from "tsyringe";
import IListAdsUseCase from "./IListAdsUseCase";
import IListAdsUseCaseDTO from "./IListAdsUseCaseDTO";
@injectable()
export default class ListAdsUseCase implements IListAdsUseCase {
  constructor(
    @inject("AdsRepository")
    private adsRepository: IAdsRepository
  ) {}
  async run(data: IListAdsUseCaseDTO) {
    const { offset, size } = data;
    //precisa ajeitar consulta
    const list = this.adsRepository.findMany({});
    if (!list) throw new ApiError(400, "Nenhum dado a ser listado");
    return list;
  }
}
