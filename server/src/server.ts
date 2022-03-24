import app from "./app";
import graphQLServer from "./graphql";
import { logger } from "./helpers";

let server;

const PORT = app.get("port");
const ENV = app.get("env");

server = app.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server is running at http://localhost:${PORT} in ${ENV} mode`);
});

graphQLServer(app, server);
