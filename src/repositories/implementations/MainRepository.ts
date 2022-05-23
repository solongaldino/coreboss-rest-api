//@ts-nocheck
import { Connection, ModelsUncapitalize } from "../types";

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
> {
  constructor(private model: ModelsUncapitalize, protected conn: Connection) {}

  aggregate(obj: AggregateArgs) {
    return this.conn[this.model].aggregate(obj);
  }

  count(obj: CountArgs) {
    return this.conn[this.model].count(obj);
  }

  create(obj: CreateArgs) {
    return this.conn[this.model].create(obj);
  }

  createMany(obj: CreateManyArgs) {
    return this.conn[this.model].createMany(obj);
  }

  delete(obj: DeleteArgs) {
    return this.conn[this.model].delete(obj);
  }

  deleteMany(obj: DeleteManyArgs) {
    return this.conn[this.model].deleteMany(obj);
  }

  findFirst(obj: FindFirstArgs) {
    return this.conn[this.model].findFirst(obj);
  }

  findMany(obj: FindManyArgs) {
    return this.conn[this.model].findMany(obj);
  }

  findUnique(obj: FindUniqueArgs) {
    return this.conn[this.model].findUnique(obj);
  }

  groupBy(obj: GroupByArgs) {
    return this.conn[this.model].groupBy(obj);
  }

  update(obj: UpdateArgs) {
    return this.conn[this.model].update(obj);
  }

  updateMany(obj: UpdateManyArgs) {
    return this.conn[this.model].updateMany(obj);
  }

  upsert(obj: UpsertArgs) {
    return this.conn[this.model].upsert(obj);
  }
}

export default MainReporitory;
