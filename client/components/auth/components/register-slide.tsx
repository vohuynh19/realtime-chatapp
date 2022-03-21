import { useState } from "react";
import RouterButton from "../../shared/buttons/router-button";
import TextField from "../../shared/fields/text-field";
export default function RegisterSlide() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [onWarning, setOnWarning] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");

  function onSubmitButton() {
    if (password === verifyPassword) {
      console.log("submit successfully");
    } else {
      setOnWarning(true);
      setWarning("Password is not matching");
    }

    console.log(username);
    console.log(password);
    console.log(verifyPassword);
  }
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
        <div className="mb-4">
          <TextField
            showLabel={true}
            type="Password"
            placeholder="******************"
            isWarning={onWarning}
            warningContent=""
            onChange={setPassword}
          />
        </div>
        <div className="mb-6">
          <TextField
            showLabel={true}
            type="Verify password"
            placeholder="******************"
            isWarning={onWarning}
            warningContent={warning}
            onChange={setVerifyPassword}
          />
        </div>
        <RouterButton onClick={() => onSubmitButton()} child={"Register"} />
      </div>
    </>
  );
}
