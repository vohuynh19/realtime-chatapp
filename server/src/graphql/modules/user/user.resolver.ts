import { Context } from "../../context";
import { AuthHelper, UserRole } from "../../../helpers/auth";
import { userService } from "./user.service";

const Query = {
  getOneUser: async (root: any, args: any, context: Context) => {
    /**
     * Authorization
     */
    AuthHelper.rolePermission(context, [UserRole.ADMIN]);

    const { id } = args;
    return await userService.findOne({ id: id });
  },
  getAllUsers: async (root: any, args: any, context: any) => {
    /**
     * Authorization
     */
    AuthHelper.rolePermission(context, [UserRole.ADMIN]);

    const { q } = args;
    return await userService.fetch(q);
  },
};

const Mutation = {
  createUser: async (root: any, args: any) => {
    const { data } = args;
    /**
     * Validate email
     */
    await AuthHelper.validateEmail(data.email);

    /**
     * Encode password
     */
    data.password = await AuthHelper.encodePassword(data.password);

    /**
     * Save to database
     */
    return await userService.create(data);
  },
  updateUser: async (root: any, args: any, context: any) => {
    /**
     * Authorization
     */
    AuthHelper.rolePermission(context, [UserRole.ADMIN]);

    /**
     * Update user
     */
    const { id, data } = args;
    return await userService.updateOne(id, data);
  },
  deleteOneUser: async (root: any, args: any, context: any) => {
    /**
     * Authorization
     */
    AuthHelper.rolePermission(context, [UserRole.ADMIN]);
    const { id } = args;

    /**
     * Delete user
     */
    return await userService.deleteOne(id);
  },
};

export default {
  Query,
  Mutation,
};
