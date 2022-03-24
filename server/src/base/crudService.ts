import _ from "lodash";
import { Document, Model } from "mongoose";

import { configs } from "../configs";
import { ErrorHelper } from "../helpers";

export interface IParseQuery {
  page?: number;
  limit?: number;
  offset?: number;
  order?: any;
  filter?: any;
  select?: any;
  search?: string;
}

export abstract class CrudService<M extends Model<Document, {}>> {
  model: M;

  constructor(model: M) {
    this.model = model;
  }

  async fetch(queryInput: IParseQuery) {
    queryInput = { ...queryInput };
    const limit = queryInput.limit || configs.query.limit;
    const skip = queryInput.offset || (queryInput.page - 1) * limit || 0;
    const order = queryInput.order;
    const search = queryInput.search;
    const query = this.model.find();

    if (search) {
      if (search.includes(" ")) {
        _.set(queryInput, "filter.$text.$search", search);
        query.select({ _score: { $meta: "textScore" } });
        query.sort({ _score: { $meta: "textScore" } });
      } else {
        const textSearchIndex = this.model.schema
          .indexes()
          .filter((c: any) => _.values(c[0]!).some((d: any) => d == "text"));
        if (textSearchIndex.length > 0) {
          const or: any[] = [];
          textSearchIndex.forEach((index) => {
            Object.keys(index[0]!).forEach((key) => {
              or.push({ [key]: { $regex: search, $options: "i" } });
            });
          });
          _.set(queryInput, "filter.$or", or);
        }
      }
    }

    if (order) {
      query.sort(order);
    }
    if (queryInput.filter) {
      const filter = JSON.parse(
        JSON.stringify(queryInput.filter).replace(
          /\"(\_\_)(\w+)\"\:/g,
          `"$$$2":`
        )
      );
      query.setQuery({ ...filter });
    }
    const countQuery = this.model.find().merge(query);
    query.limit(limit);
    query.skip(skip);
    if (queryInput.select) {
      query.select(queryInput.select);
    }
    return await Promise.all([
      query.exec().then((res) => {
        // console.timeEnd("Fetch");
        return res;
      }),
      countQuery.count().then((res) => {
        // console.timeEnd("Count");
        return res;
      }),
    ]).then((res) => {
      return {
        data: res[0],
        total: res[1],
        pagination: {
          page: queryInput.page || 1,
          limit: limit,
          offset: skip,
          total: res[1],
        },
      };
    });
  }

  async findAll(options: IParseQuery) {
    const query = this.model.find(options.filter || {});
    if (options.select) {
      query.select(options.select);
    }
    if (options.order) {
      query.sort(options.order);
    }
    query.limit(options.limit || configs.query.limit);
    if (options.offset) {
      query.skip(options.offset);
    }
    return await query.exec();
  }

  async findOne(filter: any) {
    return await this.model.findOne(filter);
  }

  async create(data: any) {
    return await this.model.create(data);
  }

  async updateOne(id: string, data: any) {
    await this.model.updateOne({ _id: id }, data);
    let record = await this.model.findOne({ _id: id });
    if (!record) throw ErrorHelper.mgRecoredNotFound();
    return record;
  }

  async deleteOne(id: string) {
    let record = await this.model.findOne({ _id: id });
    if (!record) throw ErrorHelper.mgRecoredNotFound();
    await record.remove();
    return record;
  }

  async deleteMany(ids: string[]) {
    let result = await this.model.deleteMany({ _id: { $in: ids } });
    return result.deletedCount;
  }
}
