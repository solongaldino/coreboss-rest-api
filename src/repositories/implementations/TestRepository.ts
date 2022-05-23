import { Ads, Prisma } from "@prisma/client";
import { PrismaClientProvider } from "../../providers";
import IAdsRepository from "../IAdsRepository";

export class TestRepository implements IAdsRepository {
  findById(param: string): Promise<Ads | null> {
    return PrismaClientProvider.ads.findUnique({
      where: {
        id: "ldsfhj",
      },
    });
  }

  create(param: Prisma.AdsCreateArgs) {
    return PrismaClientProvider.ads.create({
      data: {
        status: "sdf",
      },
    });
  }
}
