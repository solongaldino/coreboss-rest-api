import { Ads } from "@prisma/client";

export default interface IGetAdsByIdResponseDTO {
  ads: Ads;
}
