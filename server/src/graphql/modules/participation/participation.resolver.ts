import { participationService } from "./participation.service";
import { AuthHelper } from "../../../helpers";

const Query = {
  getAllParticipation: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);

    return await participationService.findAll();
  },
  getOneParticipation: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);

    return await participationService.findOne({ _id: id });
  },
};

const Mutation = {
  createParticipation: async (root: any, args: any, context: any) => {
    const { data } = args;
    // Authorization
    AuthHelper.authorize(context);
    // save to db
    return await participationService.create(data);
  },
  updateParticipation: async (root: any, args: any, context: any) => {
    // Authorization
    AuthHelper.authorize(context);
    // Update Participation
    const { id, data } = args;
    return await participationService.updateOne(id, data);
  },
  deleteOneParticipation: async (root: any, args: any, context: any) => {
    const { id } = args;
    // Authorization
    AuthHelper.authorize(context);
    // Delete Participation
    return await participationService.deleteOne(id);
  },
};

export default {
  Query,
  Mutation,
};
