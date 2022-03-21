import app from "./app";
import { configs } from "./configs";
import grapqhQLServer from "./graphql";

const server = app.listen(app.get("port"), () => {
  console.log(`App is running at ${configs.domain} in %s mode`, app.get("env"));
  console.log("Press CTRL-C to stop\n");
});

grapqhQLServer(app, server);
export default server;
