import { ApolloServer, gql } from "apollo-server-express";
import { Express } from "express";
import _ from "lodash";
import path from "path";
import GraphQLDateTime from "graphql-type-datetime";
import morgan from "morgan";
import { Server } from "http";
import { configs } from "../configs";
import { UtilsHelper } from "../helpers/utils";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { logger } from "../helpers/logger";
import { onContext } from "./context";
export default (app: Express, httpServer: Server) => {
  /**
   * Define base graphql
   * Mixed scalar is used as "any" type
   * Use Subscription to turn on websocket
   */
  const typeDefs = [
    gql`
      scalar Mixed
      scalar DateTime

      type Query {
        _empty: String
      }
      type Mutation {
        _empty: String
      }
      type Subscription {
        _empty: String
      }
      input QueryGetListInput {
        limit: Int
        offset: Int
        page: Int
        order: Mixed
        filter: Mixed
        search: String
      }

      type Pagination {
        limit: Int
        offset: Int
        page: Int
        total: Int
      }
    `,
  ];
  let resolvers = {
    DateTime: GraphQLDateTime,
  };

  /**
   * Load all modules (schema, resolver and graphql) in src/graphql/modules
   * .schema is created for declaring schema of main model
   * .resolver is created for declaring resolver of main model
   * .graphql is created for declaring sub fileds of model or for add aditional features
   */
  const ModuleFiles = UtilsHelper.walkSyncFiles(
    path.join(__dirname, "modules")
  );
  ModuleFiles.filter((f: any) => /(.*).schema.js$/.test(f)).map((f: any) => {
    const { default: schema } = require(f);
    typeDefs.push(schema);
  });
  ModuleFiles.filter((f: any) => /(.*).resolver.js$/.test(f)).map((f: any) => {
    const { default: resolver } = require(f);
    resolvers = _.merge(resolvers, resolver);
  });
  ModuleFiles.filter((f: any) => /(.*).graphql.js$/.test(f)).map((f: any) => {
    const {
      default: { resolver, schema },
    } = require(f);
    if (schema) typeDefs.push(schema);
    if (resolver) resolvers = _.merge(resolvers, resolver);
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  /**
   * Define Apollo server
   * onContext is called every request
   */
  const server = new ApolloServer({
    schema,
    context: onContext,
  });

  /**
   * Log apollo server query for debuging
   */
  app.use(
    "/graphql",
    morgan(
      ":remote-addr :remote-user :method :url :gql-query HTTP/:http-version :status :res[content-length] - :response-time ms",
      {
        skip: (req: Request) =>
          (_.get(req, "body.query") || "").includes("IntrospectionQuery"),
      }
    )
  );

  /**
   * Run GraphQL server
   */
  server.start().then(() => {
    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: (origin, callback) => {
          callback(null, true);
        },
      },
    });
    logger.info(
      `\n Running Apollo Server on Path: ${configs.domain}${server.graphqlPath}`
    );
  });
};
