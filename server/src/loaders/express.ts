import bodyParser from "body-parser";
import cors from "cors";
import express, { Request } from "express";
import path from "path";
import morgan from "morgan";
import { configs } from "../configs";

export default ({ app }: { app: express.Application }) => {
  /**
   * Save port to server
   */
  app.set("port", configs.port);

  app.use(cors());

  /**
   * Parse request to json object
   */
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

  /**
   * Use morgan middleware to logs all request (except /(_ah\/health)|graphql/)
   */
  app.use(
    morgan("short", {
      skip: (req: Request) => /(_ah\/health)|graphql/.test(req.originalUrl),
    })
  );

  /**
   * Set views path for using static files in /public/views
   */
  app.set("views", path.join(__dirname, "/../../public/views"));

  /**
   * Public all static files in /public directory.
   */
  app.use("/public", express.static(path.join(__dirname, "../../public")));
};