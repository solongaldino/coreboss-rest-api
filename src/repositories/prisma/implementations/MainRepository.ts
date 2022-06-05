//@ts-nocheck
import { Connection, ModelsUncapitalize } from "@types";
class MainReporitory<
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
> implements IMainRepository
{
  constructor(private model: ModelsUncapitalize, protected conn: Connection) {}

  aggregate(obj: AggregateArgs, conn = this.conn): Promise<Entity | null> {
    return conn[this.model].aggregate(obj);
  }

  count(obj: CountArgs, conn = this.conn): Promise<number | null> {
    return conn[this.model].count(obj);
  }

  create(obj: CreateArgs, conn = this.conn): Promise<Entity | null> {
    return conn[this.model].create(obj);
  }

  createMany(obj: CreateManyArgs, conn = this.conn): Promise<Entity[] | null> {
    return conn[this.model].createMany(obj);
  }

  delete(obj: DeleteArgs, conn = this.conn): Promise<Entity | null> {
    return conn[this.model].delete(obj);
  }

  deleteMany(obj: DeleteManyArgs, conn = this.conn): Promise<Entity[] | null> {
    return conn[this.model].deleteMany(obj);
  }

  findFirst(obj: FindFirstArgs, conn = this.conn): Promise<Entity | null> {
    return conn[this.model].findFirst(obj);
  }

  findMany(obj: FindManyArgs, conn = this.conn): Promise<Entity[] | null> {
    return conn[this.model].findMany(obj);
  }

  findUnique(obj: FindUniqueArgs, conn = this.conn): Promise<Entity | null> {
    return conn[this.model].findUnique(obj);
  }

  groupBy(obj: GroupByArgs, conn = this.conn): Promise<any> {
    return conn[this.model].groupBy(obj);
  }

  update(obj: UpdateArgs, conn = this.conn): Promise<Entity | null> {
    return conn[this.model].update(obj);
  }

  updateMany(obj: UpdateManyArgs, conn = this.conn): Promise<Entity[] | null> {
    return conn[this.model].updateMany(obj);
  }

  upsert(obj: UpsertArgs, conn = this.conn): Promise<Entity | null> {
    return conn[this.model].upsert(obj);
  }
}

export default MainReporitory;
