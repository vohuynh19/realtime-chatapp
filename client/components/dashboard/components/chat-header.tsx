import Logo from "../../shared/logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../shared/avatar";
import { useAuth } from "../../../lib/providers/auth";

export default function ChatHeader() {
  const { user } = useAuth();
  return (
    <div className="flex w-full h-16 justify-between">
      <Logo />
      <div className="flex h-full justify-center items-center ">
        <div className="font-bold mx-2">{user?.username}</div>
        <Avatar src="/assets/defaultAvatar.jpg" width="50px" height="50px" />

        <div className="border-[1px] ml-5 border-black h-4/5"> </div>
        <div className="mx-4">
          <FontAwesomeIcon icon={faBell} size={"2x"} color="black" />
        </div>
      </div>
    </div>
  );
}
