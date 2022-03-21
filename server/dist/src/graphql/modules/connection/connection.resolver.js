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
const connection_service_1 = require("./connection.service");
const helpers_1 = require("../../../helpers");
const conversation_service_1 = require("../conversation/conversation.service");
const conversation_model_1 = require("../conversation/conversation.model");
const participation_service_1 = require("../participation/participation.service");
const Query = {
    getAllConnection: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield connection_service_1.connectionService.findAll();
    }),
    getOneConnection: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        return yield connection_service_1.connectionService.findOne({ _id: id });
    }),
};
const Mutation = {
    createConnection: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context); // validate token
        // Only sender can create new connection
        if (!(context.tokenData.userId === data.senderId)) {
            throw helpers_1.ErrorHelper.unauthorized();
        }
        // Any old connection is exist, dont create new one
        const connection1Exist = yield connection_service_1.connectionService.findOne({
            senderId: data.senderId,
            recieverId: data.receiverId,
        });
        const connection2Exist = yield connection_service_1.connectionService.findOne({
            senderId: data.receiverId,
            recieverId: data.senderId,
        });
        if (connection1Exist || connection2Exist) {
            throw helpers_1.ErrorHelper.connectionExisted();
        }
        // save to db
        return yield connection_service_1.connectionService.create(data);
    }),
    updateConnection: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Update Connection
        const { id, data } = args;
        switch (data.status) {
            case "PENDING": {
                const initialConnection = (yield connection_service_1.connectionService.findOne({
                    _id: id,
                }));
                // only sender/receiver can edit this status
                if (context.tokenData.userId !== initialConnection.senderId &&
                    context.tokenData.userId !== initialConnection.receiverId) {
                    throw helpers_1.ErrorHelper.permissionDeny();
                }
                break;
            }
            //
            case "SUCCESS": {
                // Account must be the receiver
                const initialConnection = (yield connection_service_1.connectionService.findOne({
                    _id: id,
                }));
                if (initialConnection === null) {
                    throw helpers_1.ErrorHelper.connectionNotExisted();
                }
                if (context.tokenData.userId !== initialConnection.receiverId) {
                    throw helpers_1.ErrorHelper.permissionDeny();
                }
                const conversation = yield conversation_model_1.ConversationModel.find({
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
                    const newConversation = yield conversation_service_1.conversationService.create(conversationData);
                    // Create participation for both
                    yield participation_service_1.participationService.create({
                        userId: initialConnection.senderId,
                        conversationId: newConversation._id,
                        status: "CONNECT",
                    });
                    yield participation_service_1.participationService.create({
                        userId: initialConnection.receiverId,
                        conversationId: newConversation._id,
                        status: "CONNECT",
                    });
                }
                break;
            }
            case "FAIL": {
                const initialConnection = (yield connection_service_1.connectionService.findOne({
                    _id: id,
                }));
                if (initialConnection === null) {
                    throw helpers_1.ErrorHelper.connectionNotExisted();
                }
                if (context.tokenData.userId !== initialConnection.receiverId) {
                    throw helpers_1.ErrorHelper.permissionDeny();
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
        return yield connection_service_1.connectionService.updateOne(id, data);
    }),
    deleteOneConnection: (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = args;
        // Authorization
        helpers_1.AuthHelper.authorize(context);
        // Delete Connection
        return yield connection_service_1.connectionService.deleteOne(id);
    }),
};
exports.default = {
    Query,
    Mutation,
};
//# sourceMappingURL=connection.resolver.js.map