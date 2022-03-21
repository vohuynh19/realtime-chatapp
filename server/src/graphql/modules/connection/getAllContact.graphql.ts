import { gql } from "apollo-server-express";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { ConnectionModel } from "./connection.model";

export default {
  schema: gql`
    extend type Query {
      getAllContact(type: String): [Connection]
    }
  `,
  resolver: {
    Query: {
      getAllContact: async (root: any, args: any, context: Context) => {
        // PENDING/SUCCESS/FAIL/CLOSE for dynamically filtering
        const { type } = args;
        // Authorization
        AuthHelper.authorize(context);

        return await ConnectionModel.find(
          { senderId: context.tokenData.userId },
          { status: type }
        );
      },
    },
  },
};
