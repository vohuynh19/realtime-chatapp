"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const participation_service_1 = require("./participation.service");
const helpers_1 = require("../../../helpers");
const Query = {
    getAllParticipation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield participation_service_1.participationService.findAll();
    }),
    getOneParticipation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield participation_service_1.participationService.findOne({ _id: id });
    }),
};
const Mutation = {
    createParticipation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // save to db
        return yield participation_service_1.participationService.create(data);
    }),
    updateParticipation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Update Participation
        const { id, data } = args;
        return yield participation_service_1.participationService.updateOne(id, data);
    }),
    deleteOneParticipation: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Delete Participation
        return yield participation_service_1.participationService.deleteOne(id);
    }),
};
exports.default = {
    Query,
    Mutation,
};
//# sourceMappingURL=participation.resolver.js.map