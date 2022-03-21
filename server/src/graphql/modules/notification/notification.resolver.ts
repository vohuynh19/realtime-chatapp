import { notificationService } from "./notification.service";
import { AuthHelper } from "../../../helpers";

const Query = {
  getAllNotification: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);

    return await notificationService.findAll();
  },
  getOneNotification: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);

    return await notificationService.findOne({ _id: id });
  },
};

const Mutation = {
  createNotification: async (root: any, args: any, context: any) => {
    const { data } = args;
    // Authorization
    AuthHelper.authorize(context);
    // save to db
    return await notificationService.create(data);
  },
  updateNotification: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);
    // Update Notification
    const { id, data } = args;
    return await notificationService.updateOne(id, data);
  },
  deleteOneNotification: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);
    // Delete Notification
    return await notificationService.deleteOne(id);
  },
};

export default {
  Query,
  Mutation,
};
