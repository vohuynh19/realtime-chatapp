import { gql } from "@apollo/client";
import { ApiService } from "./api.repo";
import { IMessage } from "../../lib/models/message";
export class MessageRepository {
  public async getAllMessage(token: string, conversationId: string) {
    const MESSAGE_QUERY = `
      query GetAllConversationMesssage($getAllConversationMesssageId: ID!) {
        getAllConversationMesssage(id: $getAllConversationMesssageId) {
          videoLink
          updatedAt
          textContent
          status
          senderId
          imageLink
          id
          createdAt
          conversationId
          contentType
        }
      }
    `;
    const variables = {
      getAllConversationMesssageId: conversationId,
    };
    const response = await ApiService.fetchApi(MESSAGE_QUERY, variables, token);
    return response.data.getAllConversationMesssage;
  }

  public async sendMessage(token: string, message: IMessage) {
    const MESSAGE_QUERY = `
      mutation CreateMessage($data: CreateMessageInput!) {
        createMessage(data: $data) {
          videoLink
          updatedAt
          textContent
          status
          senderId
          imageLink
          id
          createdAt
          conversationId
          contentType
        }
      }
    `;
    const variables = {
      data: {
        textContent: message.textContent,
        conversationId: message.conversationId,
        contentType: message.contentType,
        imageLink: message.imageLink,
        videoLink: message.videoLink,
      },
    };

    const response = await ApiService.fetchApi(MESSAGE_QUERY, variables, token);
    return response.data.createMessage;
  }
}

export const MessageService = new MessageRepository();
