import Avatar from "./avatar";

interface IMessage {
  isOther: boolean;
  avatarSrc: string;
  content: string;
}

export default function Message(data: IMessage) {
  if (data.isOther) {
    return (
      <>
        <div className="w-full flex flex-row">
          <div className="relative top-[-20px]">
            <Avatar src={data.avatarSrc} width={"40px"} height={"40x"} />
          </div>
          <div className="bg-[#e9ecf7] h-fit px-4 py-5 ml-2 mb-5 max-w-lg break-words rounded-3xl">
            {data.content}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full flex flex-row-reverse pr-4">
        <div className="text-white bg-[#4E426D] h-fit px-4 py-5 mb-5 text-right max-w-lg break-words rounded-3xl">
          {data.content}
        </div>
      </div>
    </>
  );
}
