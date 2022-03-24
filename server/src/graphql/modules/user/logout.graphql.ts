import { gql } from "apollo-server-express";
import { Context } from "../../context";
import { UserModel } from "./user.model";

export default {
  schema: gql`
    extend type Mutation {
      logout: String
    }
  `,
  resolver: {
    Mutation: {
      logout: async (root: any, args: any, context: Context) => {
        await UserModel.updateOne(
          { id: context.tokenData.userId },
          { isOnline: false }
        );
        return "Success";
      },
    },
  },
};
