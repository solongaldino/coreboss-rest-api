import { AdsRepository } from "../../repositories";
import IGetAdsByIdUseCaseDTO from "./IGetAdsByIdUseCaseDTO";

class GetAdsByIdUseCase {
  async run(data: IGetAdsByIdUseCaseDTO) {
    const ads = AdsRepository.findById(data.id);
    return ads;
  }
}
export default new GetAdsByIdUseCase();
