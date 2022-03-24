"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const lodash_1 = __importDefault(require("lodash"));
const path_1 = __importDefault(require("path"));
const graphql_type_datetime_1 = __importDefault(require("graphql-type-datetime"));
const morgan_1 = __importDefault(require("morgan"));
const configs_1 = require("../configs");
const utils_1 = require("../helpers/utils");
const schema_1 = require("@graphql-tools/schema");
const logger_1 = require("../helpers/logger");
const context_1 = require("./context");
exports.default = (app, httpServer) => {
    /**
     * Define base graphql
     * Mixed scalar is used as "any" type
     * Use Subscription to turn on websocket
     */
    const typeDefs = [
        (0, apollo_server_express_1.gql) `
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
        DateTime: graphql_type_datetime_1.default,
    };
    /**
     * Load all modules (schema, resolver and graphql) in src/graphql/modules
     * .schema is created for declaring schema of main model
     * .resolver is created for declaring resolver of main model
     * .graphql is created for declaring sub fileds of model or for add aditional features
     */
    const ModuleFiles = utils_1.UtilsHelper.walkSyncFiles(path_1.default.join(__dirname, "modules"));
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
    /**
     * Define Apollo server
     * onContext is called every request
     */
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: context_1.onContext,
    });
    /**
     * Log apollo server query for debuging
     */
    app.use("/graphql", (0, morgan_1.default)(":remote-addr :remote-user :method :url :gql-query HTTP/:http-version :status :res[content-length] - :response-time ms", {
        skip: (req) => (lodash_1.default.get(req, "body.query") || "").includes("IntrospectionQuery"),
    }));
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
        logger_1.logger.info(`\n Running Apollo Server on Path: ${configs_1.configs.domain}${server.graphqlPath}`);
    });
};
//# sourceMappingURL=index.js.map