import { logger } from "../helpers/logger";
import expressLoader from "./express";

export default ({ expressApp }: any) => {
  /**
   * Load express server
   */
  expressLoader({ app: expressApp });

  logger.info("Load server Successfully!");
};
