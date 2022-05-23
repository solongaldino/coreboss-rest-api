import { Ads, Prisma } from "@prisma/client";
import { PrismaClientProvider } from "../../providers";
import MainReporitory from "./MainRepository";

class AdsRepository extends MainReporitory<
  Ads,
  Prisma.AdsAggregateArgs,
  Prisma.AdsCountArgs,
  Prisma.AdsCreateArgs,
  Prisma.AdsCreateManyArgs,
  Prisma.AdsDeleteArgs,
  Prisma.AdsDeleteManyArgs,
  Prisma.AdsFindFirstArgs,
  Prisma.AdsFindManyArgs,
  Prisma.AdsFindUniqueArgs,
  Prisma.AdsGroupByArgs,
  Prisma.AdsUpdateArgs,
  Prisma.AdsUpdateManyArgs,
  Prisma.AdsUpsertArgs
> {
  constructor(conn = PrismaClientProvider) {
    super("ads", conn);
  }

  findById(param: Ads["id"]) {
    return super.conn.ads.findUnique({
      where: {
        id: param,
      },
    });
  }
}

export default AdsRepository;
