import EventEmitter from "events";
import _ from "lodash";
import { Document, Model } from "mongoose";

export abstract class CrudService<
  M extends Model<Document, {}>
> extends EventEmitter {
  model: M;

  constructor(model: M) {
    super();
    this.model = model;
  }
  async findAll() {
    const query = this.model.find({});
    return await query.exec().then((res) => {
      this.emit("findAll", res);
      return res;
    });
  }

  async findOne(filter: any) {
    return await this.model.findOne(filter).then((res) => {
      this.emit("findOne", res, filter);
      return res;
    });
  }

  async create(data: any) {
    return await this.model.create(data).then((res) => {
      this.emit("create", res, data);
      return res;
    });
  }

  async updateOne(id: string, data: any) {
    await this.model.updateOne({ _id: id }, data);
    const record = await this.model.findOne({ _id: id });
    this.emit("updateOne", record, data);
    return record;
  }

  async deleteOne(id: string) {
    const record = await this.model.findOne({ _id: id });
    await record.remove();
    this.emit("deleteOne", record);
    return record;
  }

  async deleteMany(ids: string[]) {
    const result = await this.model.deleteMany({ _id: { $in: ids } });
    this.emit("deleteMany", result.deletedCount, ids);
    return result.deletedCount;
  }
}
