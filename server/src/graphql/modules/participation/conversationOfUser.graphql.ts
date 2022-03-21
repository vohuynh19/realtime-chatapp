import { gql } from "apollo-server-express";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { conversationService } from "../conversation/conversation.service";
import { ParticipationModel } from "./participation.model";

export default {
  schema: gql`
    extend type Query {
      conversationOfUser: [Conversation]
    }
  `,
  resolver: {
    Query: {
      conversationOfUser: async (root: any, args: any, context: Context) => {
        // Authorization
        AuthHelper.authorize(context);

        // Find all conversation of user
        const participationList = await ParticipationModel.find({
          userId: { $in: [context.tokenData.userId] },
        });

        const conversationList = participationList.map(async (value) => {
          return await conversationService.findOne({
            id: value.conversationId,
          });
        });
        return conversationList;
      },
    },
  },
};
