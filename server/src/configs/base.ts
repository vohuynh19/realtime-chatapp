import path from "path";
import fs from "fs";
import dotenv from "dotenv";
const pjson = require("../../../package.json");

if (fs.existsSync(path.join(__dirname, "../../../.env"))) {
  console.log(".env exists");
  dotenv.config({ path: path.join(__dirname, "../../../.env") });
} else {
  console.log(".env not exists");
}

export default {
  name: pjson.name,
  version: pjson.version,
  description: pjson.description,
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET,
  timezone: "Asia/Ho_Chi_Minh",
  domain: `${process.env.DOMAIN}` + process.env.PORT || 3000,
};
