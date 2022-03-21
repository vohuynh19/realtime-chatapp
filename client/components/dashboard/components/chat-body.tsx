import ChatListPannel from "./chat-list-pannel";
import DetailChatPannel from "./detail-chat-pannel";
import { useEffect, useState } from "react";
import { IConversation } from "../../../lib/models/conversation";
import { useAuth } from "../../../lib/providers/auth";
import { ConversationService } from "../../../lib/repositories/conversation.repo";

export default function ChatBody() {
  const [conversations, setConversations] = useState<[IConversation]>();
  const [currentConversation, setCurrentConversation] =
    useState<IConversation>();

  const { token } = useAuth();

  useEffect(() => {
    async function fetchAllConversation() {
      const conversationArr: [IConversation] =
        await ConversationService.getAllConversation(`${token}`);
      setConversations(conversationArr);
    }
    fetchAllConversation();
  }, []);

  useEffect(() => {
    setCurrentConversation(conversations?.[0]);
  }, [conversations]);

  const changeChatDetail = (index: number) => {
    setCurrentConversation(conversations?.[index]);
  };

  return (
    <div className="flex flex-row flex-1">
      <ChatListPannel
        conversations={conversations as [IConversation]}
        changeChatDetail={changeChatDetail}
      />
      {currentConversation !== undefined ? (
        <DetailChatPannel conversation={currentConversation as IConversation} />
      ) : undefined}
    </div>
  );
}
