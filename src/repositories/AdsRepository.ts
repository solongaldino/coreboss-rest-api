import { Ads, Prisma } from "@prisma/client";
import { prisma } from "../providers";

class AdsRepository {
  findById(param: Ads["id"]) {
    return prisma.ads.findUnique({
      where: {
        id: param,
      },
    });
  }

  update(obj: Prisma.AdsUpdateArgs) {
    obj.data.updated_at = new Date();
    return prisma.ads.update(obj);
  }

  create(obj: Prisma.AdsCreateArgs) {
    return prisma.ads.create(obj);
  }

  delete(obj: Prisma.AdsDeleteArgs) {
    return prisma.ads.delete(obj);
  }
}

export default AdsRepository;
