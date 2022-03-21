import { conversationService } from "./conversation.service";
import { AuthHelper, ErrorHelper } from "../../../helpers";
import { participationService } from "../participation/participation.service";
import { Context } from "../../context";

const Query = {
  getAllConversation: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);
    return await conversationService.findAll();
  },
  getOneConversation: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);

    return await conversationService.findOne({ _id: id });
  },
};

const Mutation = {
  createConversation: async (root: any, args: any, context: Context) => {
    const { data } = args;
    // Authorization
    AuthHelper.authorize(context);
    const hostIdArr = data.hostIdArr as [String];
    if (!hostIdArr.includes(context.tokenData.userId)) {
      throw ErrorHelper.unauthorized();
    }
    // save to db
    const conversation = await conversationService.create(data);
    // create participation object
    participationService.create({
      userId: context.tokenData.userId,
      conversationId: conversation._id,
      status: "CONNECT",
    });

    return conversation;
  },
  updateConversation: async (root: any, args: any, context: any) => {
    const { id, data } = args;
    // Authorization
    AuthHelper.authorize(context);
    const hostIdArr = data.hostIdArr as [String];
    if (!hostIdArr.includes(context.tokenData.userId)) {
      throw ErrorHelper.permissionDeny();
    }
    // Update Conversation

    return await conversationService.updateOne(id, data);
  },
  deleteOneConversation: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);
    // Delete Conversation
    return await conversationService.deleteOne(id);
  },
};

export default {
  Query,
  Mutation,
};
