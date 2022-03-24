import { gql } from "apollo-server-express";
import { AuthHelper, TokenHelper, TokenType } from "../../../helpers";
import { UserModel } from "./user.model";

export default {
  schema: gql`
    extend type Mutation {
      login(email: String!, password: String!): LoginData
    }
  `,
  resolver: {
    Mutation: {
      login: async (root: any, args: any) => {
        const { email, password } = args;
        const user = await UserModel.findOneAndUpdate(
          { email: email },
          { isOnline: true }
        );

        /**
         * Compare password
         */
        await AuthHelper.comparePassword(password, user.password);

        /**
         * Generate and send token to client
         * Token will be expired in 30 days.
         */
        return {
          user: user.save(),
          token: TokenHelper.generateToken({
            type: TokenType.USER,
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
          }),
        };
      },
    },
  },
};
