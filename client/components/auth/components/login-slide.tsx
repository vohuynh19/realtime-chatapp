import { useState } from "react";
import { useAuth } from "../../../lib/providers/auth";
import RouterButton from "../../shared/buttons/router-button";
import TextField from "../../shared/fields/text-field";

export default function LoginSlide() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [onWarning, setOnWarning] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const { login } = useAuth();

  const onSubmitButton = async () => {
    const data = await login?.(username, password);
    console.log(data.login);
  };
  return (
    <>
      <div className="bg-white  shadow-md rounded mt-[100px] px-8 pt-6 pb-8 mb-4 h-fit w-[500px]">
        <div className="mb-4">
          <TextField
            showLabel={true}
            type="Username"
            placeholder="Username"
            onChange={setUsername}
          />
        </div>
        <div className="mb-6">
          <TextField
            showLabel={true}
            type="Password"
            placeholder="******************"
            isWarning={onWarning}
            warningContent={warning}
            onChange={setPassword}
          />
        </div>
        <RouterButton onClick={() => onSubmitButton()} child={"Login"} />
      </div>
    </>
  );
}
