import { messageService } from "./message.service";
import { AuthHelper, ErrorHelper } from "../../../helpers";
import { Context } from "../../context";
import { ParticipationModel } from "../participation/participation.model";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

const Query = {
  getAllMessage: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);

    return await messageService.findAll();
  },
  getOneMessage: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);

    return await messageService.findOne({ _id: id });
  },
};

const Mutation = {
  createMessage: async (root: any, args: any, context: Context) => {
    const { data } = args;
    // Authorization
    AuthHelper.authorize(context);

    data.senderId = context.tokenData.userId;
    // If user joined in conversation, Set status of message SUCCESS.
    // Otherwise,  the status of message is PEDNING as default
    const participation = await ParticipationModel.find({
      conversationId: data.conversationId,
      userId: context.tokenData.userId,
    });
    if (participation.length) {
      data.status = "SUCCESS";
    }

    // save to db
    const message = await messageService.create(data);
    // notifiy to listener
    pubsub.publish(data.conversationId, {
      messages: message,
    });

    return message;
  },
  updateMessage: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);
    // Update Message
    const { id, data } = args;
    return await messageService.updateOne(id, data);
  },
  deleteOneMessage: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);
    // Delete Message
    return await messageService.deleteOne(id);
  },
};
const Subscription = {
  messages: {
    subscribe: (root: any, args: any, context: Context) => {
      const { id } = args;
      return pubsub.asyncIterator(id);
    },
  },
};

export default {
  Query,
  Mutation,
  Subscription,
};
