import { useAuth } from "../../lib/providers/auth";
import ChatBody from "./components/chat-body";
import ChatHeader from "./components/chat-header";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      <div className="flex flex-col h-screen w-screen box-border">
        <ChatHeader />
        <ChatBody />
      </div>
    </>
  );
}
