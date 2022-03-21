import Avatar from "./avatar";
export interface IContactPannel {
  src: string;
  username: string;
  showMess: boolean;
  sender?: string;
  latestMessage?: string;
  // time: string;
}
export default function ContactPannel(data: {
  contact: IContactPannel;
  onClick: any;
}) {
  return (
    <>
      <div
        className="flex flex-row w-full h-14 hover:bg-gray-200 cursor-pointer my-3"
        onClick={() => data.onClick()}
      >
        <div className="mx-2 h-[56px] w-[56px]">
          <Avatar src={data.contact.src} width={"56px"} height={"56px"} />
        </div>
        <div className="flex flex-col w-[0px] flex-auto">
          <div className="font-bold truncate">{data.contact.username}</div>
          {data.contact.showMess ? (
            <div className="truncate">
              {data.contact.sender}: {data.contact.latestMessage}
            </div>
          ) : undefined}
        </div>
      </div>
    </>
  );
}
