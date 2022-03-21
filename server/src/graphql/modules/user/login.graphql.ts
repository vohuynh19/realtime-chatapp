import { gql } from "apollo-server-express";
import { AuthHelper, TokenHelper, TokenType } from "../../../helpers";
import { Context } from "../../context";
import { UserModel } from "./user.model";

export default {
  schema: gql`
    extend type Query {
      login(email: String!, password: String!): LoginData
    }
    type LoginData {
      user: User
      token: String
    }
  `,
  resolver: {
    Query: {
      login: async (root: any, args: any, context: Context) => {
        const { email, password } = args;
        const user = await UserModel.findOne({ email: email });
        // Check password
        await AuthHelper.comparePassword(password, user.password);
        console.log(user._id.toString());
        // Generate token
        return {
          user: await user.save(),
          token: TokenHelper.generateToken({
            type: TokenType.USER,
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
          }),
        };
      },
    },
  },
};
