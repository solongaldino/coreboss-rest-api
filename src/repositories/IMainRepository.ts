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
  aggregate?(obj: AggregateArgs): Promise<Entity | null>;

  count?(obj: CountArgs): Promise<number | null>;

  create?(obj: CreateArgs): Promise<Entity | null>;

  createMany?(obj: CreateManyArgs): Promise<Entity[] | null>;

  delete?(obj: DeleteArgs): Promise<Entity | null>;

  deleteMany?(obj: DeleteManyArgs): Promise<Entity[] | null>;

  findFirst?(obj: FindFirstArgs): Promise<Entity | null>;

  findMany?(obj: FindManyArgs): Promise<Entity[] | null>;

  findUnique?(obj: FindUniqueArgs): Promise<Entity | null>;

  groupBy?(obj: GroupByArgs): any;

  update?(obj: UpdateArgs): Promise<Entity | null>;

  updateMany?(obj: UpdateManyArgs): Promise<Entity[] | null>;

  upsert?(obj: UpsertArgs): Promise<Entity | null>;
}
