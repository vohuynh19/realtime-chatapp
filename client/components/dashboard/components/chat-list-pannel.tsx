import { IConversation } from "../../../lib/models/conversation";
import ContactPannel, { IContactPannel } from "../../shared/contact-pannel";
import TextField from "../../shared/fields/text-field";

export default function ChatListPannel(data: {
  conversations: [IConversation];
  changeChatDetail: any;
}) {
  return (
    <div className="flex flex-col w-72">
      <TextField
        showLabel={false}
        type="Search"
        onChange={() => {}}
        placeholder="Search"
      />
      <div className="flex flex-col space-y-5 h-full overflow-y-auto">
        {data.conversations
          ? data.conversations?.map((value, index) => {
              const contact: IContactPannel = {
                showMess: true,
                username: value.title,
                src: "/assets/defaultAvatar.jpg",
                sender: "YOU",
                latestMessage: "Test lastest message dc",
              };
              return (
                <>
                  <ContactPannel
                    contact={contact}
                    onClick={() => data.changeChatDetail(index)}
                  />
                  ;
                </>
              );
            })
          : "Loading"}
      </div>
    </div>
  );
}
