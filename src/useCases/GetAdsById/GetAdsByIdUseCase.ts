import { AdsRepository } from "../../repositories";
import { ApiError } from "../../utils";
import IGetAdsByIdUseCaseDTO from "./IGetAdsByIdUseCaseDTO";

class GetAdsByIdUseCase {
  async run(data: IGetAdsByIdUseCaseDTO) {
    const ads = AdsRepository.findById(data.id);
    if (!ads) throw new ApiError(400, "Anúncio não encontrado");
    return ads;
  }
}
export default new GetAdsByIdUseCase();
