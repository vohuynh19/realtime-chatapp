import { gql } from "@apollo/client";
import { ApiService } from "./api.repo";

export class ConversationRepository {
  public async getAllConversation(token: string) {
    const CONVERSATION_QUERY = `
      query ConversationOfUser {
        conversationOfUser {
          id
          createdAt
          updatedAt
          title
          type
          avatarUrl
          hostIdArr
        }
      }
    `;
    const variables = {};
    const response = await ApiService.fetchApi(
      CONVERSATION_QUERY,
      variables,
      token
    );
    console.log(response.data);
    return response.data.conversationOfUser;
  }
}

export const ConversationService = new ConversationRepository();
