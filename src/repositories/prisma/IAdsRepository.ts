import { Ads, Prisma } from "@prisma/client";
import { Connection } from "@types";
import IMainRepository from "./IMainRepository";

interface IAdsRepository
  extends IMainRepository<
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
  findById(param: Ads["id"], conn?: Connection): Promise<Ads | null>;
}

export default IAdsRepository;
