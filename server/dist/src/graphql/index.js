"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const configs_1 = require("../configs");
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../helpers");
const graphql_iso_date_1 = require("graphql-iso-date");
const context_1 = require("./context");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("graphql-ws/lib/use/ws");
const ws_2 = require("ws");
const apollo_server_core_1 = require("apollo-server-core");
exports.default = (app, httpServer) => {
    // define base graphql
    const typeDefs = [
        (0, apollo_server_express_1.gql) `
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
        DateTime: graphql_iso_date_1.GraphQLDateTime,
    };
    // sync all modules (schema, resolver and graphql) in ./modules folder
    const ModuleFiles = helpers_1.UtilsHelper.walkSyncFiles(path_1.default.join(__dirname, "modules"));
    ModuleFiles.filter((f) => /(.*).schema.js$/.test(f)).map((f) => {
        const { default: schema } = require(f);
        typeDefs.push(schema);
    });
    ModuleFiles.filter((f) => /(.*).resolver.js$/.test(f)).map((f) => {
        const { default: resolver } = require(f);
        resolvers = lodash_1.default.merge(resolvers, resolver);
    });
    ModuleFiles.filter((f) => /(.*).graphql.js$/.test(f)).map((f) => {
        const { default: { resolver, schema }, } = require(f);
        if (schema)
            typeDefs.push(schema);
        if (resolver)
            resolvers = lodash_1.default.merge(resolvers, resolver);
    });
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
    const wsServer = new ws_2.WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });
    const serverCleanup = (0, ws_1.useServer)({ schema }, wsServer);
    // Create Apollo Server
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield serverCleanup.dispose();
                                });
                            },
                        };
                    });
                },
            },
        ],
        context: context_1.onContext,
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
        console.log(`\n Running Apollo Server on Path: ${configs_1.configs.domain}${server.graphqlPath}`);
    });
};
//# sourceMappingURL=index.js.map