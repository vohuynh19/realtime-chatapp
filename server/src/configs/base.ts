import path from "path";
import fs from "fs";
import dotenv from "dotenv";
const packageJson = require("../../package.json");

/**
 * Process dotenv
 */
if (fs.existsSync(path.join(__dirname, "../../.env"))) {
  console.log(".env exists");
  dotenv.config({ path: path.join(__dirname, "../../.env") });
} else {
  throw new Error(".env.example not exists");
}
/**
 * Define configs base class
 */
export default {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET || "MYSCRET",
  timezone: "Asia/Ho_Chi_Minh",
  query: {
    limit: 10,
  },
  domain: process.env.DOMAIN || `http://localhost:4000`,
};
