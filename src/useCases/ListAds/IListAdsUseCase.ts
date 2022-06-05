import { Ads } from "@prisma/client";
import IListAdsUseCaseDTO from "./IListAdsUseCaseDTO";

export default interface IListAdsUseCase {
  run(data: IListAdsUseCaseDTO): Promise<Ads[]>;
}
