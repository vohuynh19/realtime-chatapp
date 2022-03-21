import mongoose from "mongoose";
import { configs } from "../configs";

const connect = mongoose.createConnection(configs.maindb, {
  socketTimeoutMS: 30000,
  keepAlive: true,
});

export const MainConnection = connect;
