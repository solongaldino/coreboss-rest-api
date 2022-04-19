import { AdsRepository } from "../../repositories";
import IListAdsUseCase from "./IListAdsUseCaseDTO";

class ListAdsUseCase {
  async run(data: IListAdsUseCase) {
    const { offset, size } = data;

    AdsRepository.findMany({});
  }
}
export default new ListAdsUseCase();
