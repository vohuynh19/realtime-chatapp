import { ApolloServer, gql } from "apollo-server-express";
import { Express } from "express";
import { Server } from "http";
import { configs } from "../configs";
import _ from "lodash";
import path from "path";
import { UtilsHelper } from "../helpers";
import { GraphQLDateTime } from "graphql-iso-date";
import { onContext } from "./context";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

export default (app: Express, httpServer: Server) => {
  // define base graphql
  const typeDefs = [
    gql`
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
    `,
  ];
  let resolvers = {
    DateTime: GraphQLDateTime,
  };

  // sync all modules (schema, resolver and graphql) in ./modules folder
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

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Create Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
    context: onContext,
  });

  // Start Server
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
    console.log(
      `\n Running Apollo Server on Path: ${configs.domain}${server.graphqlPath}`
    );
  });
};
