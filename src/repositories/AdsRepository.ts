import { Ads, Prisma } from "@prisma/client";
import { prisma } from "./BaseRepository";

class AdsRepository {
  findById(param: Ads['id']) {
    return prisma.ads.findUnique({
      where: {
        id: param,
      },
    });
  }

  update(data: Prisma.AdsUpdateArgs) {
    return prisma.ads.update(data);
  }

  create(data: Prisma.AdsCreateArgs) {
    return prisma.ads.create(data);
  }

  delete(data: Prisma.AdsDeleteArgs) {
    return prisma.ads.delete(data);
  }
}

export default new AdsRepository;
