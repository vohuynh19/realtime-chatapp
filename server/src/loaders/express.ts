import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { configs } from "../configs";
import router from "../routers";
import path from "path";
export default ({ app }: { app: express.Application }) => {
  app.use(cors());

  app.set("port", configs.port);
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
  app.use("/public", express.static(path.join(__dirname, "../../public")));
  app.use("/", router);
};
