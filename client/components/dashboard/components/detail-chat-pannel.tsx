import Message from "../../shared/message";
import { IConversation } from "../../../lib/models/conversation";
import { IMessage } from "../../../lib/models/message";
import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/providers/auth";
import { MessageService } from "../../../lib/repositories/message.repo";
import TextField from "../../shared/fields/text-field";
import RouterButton from "../../shared/buttons/router-button";

export default function DetailChatPannel(data: {
  conversation: IConversation;
}) {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState<[IMessage]>();
  const [text, setText] = useState<string>();

  useEffect(() => {
    async function fetchAllMessage() {
      const loadMessages: [IMessage] = await MessageService.getAllMessage(
        `${token}`,
        data.conversation.id
      );
      setMessages(loadMessages);
      console.log(data.conversation.id);
    }
    fetchAllMessage();
  }, [token, data.conversation]);

  const sentMessage = async () => {
    const message: IMessage = {
      contentType: ["IMAGE", "TEXT", "VIDEO"],
      conversationId: data.conversation.id,
      textContent: `${text}`,
    };
    const res = await MessageService.sendMessage(`${token}`, message);
    console.log(res);
  };

  return (
    <div className="flex flex-auto flex-col ">
      <div className="w-full h-9 mb-3 flex-row flex items-center justify-between">
        <div className="pl-3 font-bold">{data.conversation.title}</div>
        <div>SETTING OPTIONS</div>
      </div>
      <div className="w-full flex flex-col h-[550px] overflow-y-auto">
        {messages
          ? messages.map((value) => {
              let isOther = true;
              if (value.senderId === user?.id) {
                isOther = false;
              }
              if (value.status === "PENDING") {
                return undefined;
              }
              return (
                <>
                  <Message
                    isOther={isOther}
                    avatarSrc="/assets/defaultAvatar.jpg"
                    content={value.textContent}
                  />
                </>
              );
            })
          : "loading"}
      </div>
      <div className="flex flex-row justify-between items-center flex-auto">
        <div className="w-full pr-[20px]">
          <TextField
            showLabel={false}
            type="text"
            placeholder="Type a message"
            onChange={setText}
          />
        </div>
        <div className="w-[150px] pr-[20px]">
          <RouterButton child={<>Send</>} onClick={() => sentMessage()} />
        </div>
      </div>
    </div>
  );
}
