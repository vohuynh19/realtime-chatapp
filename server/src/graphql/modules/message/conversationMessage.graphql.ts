import { gql } from "apollo-server-express";
import { AuthHelper, ErrorHelper } from "../../../helpers";
import { Context } from "../../context";
import { ParticipationModel } from "../participation/participation.model";
import { MessageModel } from "./message.model";

export default {
  schema: gql`
    extend type Query {
      getAllConversationMesssage(id: ID!): [Message]
    }
  `,
  resolver: {
    Query: {
      getAllConversationMesssage: async (
        root: any,
        args: any,
        context: Context
      ) => {
        const { id } = args;
        // Authorization
        AuthHelper.authorize(context);
        // Check whether user participated in conversation or not
        const participation = await ParticipationModel.find({
          conversationId: id,
          userId: context.tokenData.userId,
        });
        if (!participation.length) {
          throw ErrorHelper.permissionDeny();
        }
        // Return message order by timestamp //
        return await MessageModel.find({
          conversationId: id,
        }).sort({
          createdAt: -1,
        });
      },
    },
  },
};
