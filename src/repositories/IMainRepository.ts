import { Connection } from "../types";

export default interface IMainRepository<
  Entity,
  AggregateArgs,
  CountArgs,
  CreateArgs,
  CreateManyArgs,
  DeleteArgs,
  DeleteManyArgs,
  FindFirstArgs,
  FindManyArgs,
  FindUniqueArgs,
  GroupByArgs,
  UpdateArgs,
  UpdateManyArgs,
  UpsertArgs
> {
  aggregate?(obj: AggregateArgs, conn: Connection): Promise<Entity | null>;

  count?(obj: CountArgs, conn: Connection): Promise<number | null>;

  create?(obj: CreateArgs, conn: Connection): Promise<Entity | null>;

  createMany?(obj: CreateManyArgs, conn: Connection): Promise<Entity[] | null>;

  delete?(obj: DeleteArgs, conn: Connection): Promise<Entity | null>;

  deleteMany?(obj: DeleteManyArgs, conn: Connection): Promise<Entity[] | null>;

  findFirst?(obj: FindFirstArgs, conn: Connection): Promise<Entity | null>;

  findMany?(obj: FindManyArgs, conn: Connection): Promise<Entity[] | null>;

  findUnique?(obj: FindUniqueArgs, conn: Connection): Promise<Entity | null>;

  groupBy?(obj: GroupByArgs, conn: Connection): Promise<any>;

  update?(obj: UpdateArgs, conn: Connection): Promise<Entity | null>;

  updateMany?(obj: UpdateManyArgs, conn: Connection): Promise<Entity[] | null>;

  upsert?(obj: UpsertArgs, conn: Connection): Promise<Entity | null>;
}
