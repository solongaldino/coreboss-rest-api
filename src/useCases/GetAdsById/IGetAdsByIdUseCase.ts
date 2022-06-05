import { Ads } from "@prisma/client";
import IGetAdsByIdUseCaseDTO from "./IGetAdsByIdUseCaseDTO";

export default interface IGetAdsByIdUseCase {
  run(data: IGetAdsByIdUseCaseDTO): Promise<Ads>;
}
