import { connectionService } from "./connection.service";
import { AuthHelper, ErrorHelper } from "../../../helpers";
import { Context } from "../../context";
import { IConnection } from "./connection.model";
import { conversationService } from "../conversation/conversation.service";
import { ConversationModel } from "../conversation/conversation.model";
import { participationService } from "../participation/participation.service";

const Query = {
  getAllConnection: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);

    return await connectionService.findAll();
  },
  getOneConnection: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);

    return await connectionService.findOne({ _id: id });
  },
};

const Mutation = {
  createConnection: async (root: any, args: any, context: Context) => {
    const { data } = args;
    // Authorization
    AuthHelper.authorize(context); // validate token
    // Only sender can create new connection
    if (!(context.tokenData.userId === data.senderId)) {
      throw ErrorHelper.unauthorized();
    }
    // Any old connection is exist, dont create new one
    const connection1Exist = await connectionService.findOne({
      senderId: data.senderId,
      recieverId: data.receiverId,
    });
    const connection2Exist = await connectionService.findOne({
      senderId: data.receiverId,
      recieverId: data.senderId,
    });
    if (connection1Exist || connection2Exist) {
      throw ErrorHelper.connectionExisted();
    }

    // save to db
    return await connectionService.create(data);
  },
  updateConnection: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);
    // Update Connection
    const { id, data } = args;
    switch (data.status) {
      case "PENDING": {
        const initialConnection = (await connectionService.findOne({
          _id: id,
        })) as IConnection;
        // only sender/receiver can edit this status
        if (
          context.tokenData.userId !== initialConnection.senderId &&
          context.tokenData.userId !== initialConnection.receiverId
        ) {
          throw ErrorHelper.permissionDeny();
        }
        break;
      }
      //
      case "SUCCESS": {
        // Account must be the receiver
        const initialConnection = (await connectionService.findOne({
          _id: id,
        })) as IConnection;
        if (initialConnection === null) {
          throw ErrorHelper.connectionNotExisted();
        }
        if (context.tokenData.userId !== initialConnection.receiverId) {
          throw ErrorHelper.permissionDeny();
        }
        const conversation = await ConversationModel.find({
          hostIdArr: {
            $all: [initialConnection.senderId, initialConnection.receiverId],
          },
        });
        if (!conversation.length) {
          const conversationData = {
            title: "Let say something with your friend",
            type: "PERSONAL",
            avatarUrl: "",
            hostIdArr: [
              initialConnection.senderId,
              initialConnection.receiverId,
            ],
          };
          const newConversation = await conversationService.create(
            conversationData
          );
          // Create participation for both
          await participationService.create({
            userId: initialConnection.senderId,
            conversationId: newConversation._id,
            status: "CONNECT",
          });
          await participationService.create({
            userId: initialConnection.receiverId,
            conversationId: newConversation._id,
            status: "CONNECT",
          });
        }

        break;
      }
      case "FAIL": {
        const initialConnection = (await connectionService.findOne({
          _id: id,
        })) as IConnection;
        if (initialConnection === null) {
          throw ErrorHelper.connectionNotExisted();
        }
        if (context.tokenData.userId !== initialConnection.receiverId) {
          throw ErrorHelper.permissionDeny();
        }
        break;
      }
      case "CLOSE": {
        break;
      }
      default: {
        break;
      }
    }
    return await connectionService.updateOne(id, data);
  },
  deleteOneConnection: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);
    // Delete Connection
    return await connectionService.deleteOne(id);
  },
};

export default {
  Query,
  Mutation,
};
