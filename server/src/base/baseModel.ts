import mongoose from "mongoose";
import _ from "lodash";

export type BaseDocument = mongoose.Document & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type Model<T extends BaseDocument> = mongoose.Model<T>;
