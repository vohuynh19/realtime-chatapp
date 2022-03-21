import { userService } from "./user.service";
import { AuthHelper } from "../../../helpers";

const Query = {
  getAllUser: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);
    return await userService.findAll();
  },
  getOneUser: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);

    return await userService.findOne({ _id: id });
  },
};

const Mutation = {
  createUser: async (root: any, args: any, context: any) => {
    const { data } = args;
    // Validate email
    await AuthHelper.validateEmail(data.email);
    // Encode password
    data.password = await AuthHelper.encodePassword(data.password);
    // save to db
    return await userService.create(data);
  },
  updateUser: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);
    // Update User
    const { id, data } = args;
    return await userService.updateOne(id, data);
  },
  deleteOneUser: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);
    // Delete user
    return await userService.deleteOne(id);
  },
};

export default {
  Query,
  Mutation,
};
