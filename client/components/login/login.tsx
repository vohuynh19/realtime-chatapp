import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/providers/auth";
import Logo from "../shared/logo";
import SubmitButton from "../shared/submit-button";
import TextField from "../shared/text-field";

import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        username
        avatarUrl
        dob
        gender
        id
        createdAt
        updatedAt
        isOnline
      }
      token
    }
  }
`;

export default function Login() {
  const [loginmethod, { data, loading, error }] = useMutation(LOGIN);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [onWarning, setOnWarning] = useState<boolean>(false);
  const [warning, setWarning] = useState<string>("");
  const { hookloginData } = useAuth();
  const onSubmitButton = async () => {
    try {
      loginmethod({
        variables: {
          email: email,
          password: password,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(hookloginData);
  }, [hookloginData]);
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Logo height="150px" width="150px" direction="column" />

      <div
        className="bg-white 
    shadow-md rounded w-full p-4 sm:w-full sm:p-10 md:w-[700px] h-fit"
      >
        <div className="mb-4">
          <TextField
            showLabel={true}
            type="Email"
            placeholder="Email"
            onChange={setEmail}
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
        <SubmitButton onClick={() => onSubmitButton()} child={"Login"} />
        <div className="px-[5px] py-[20px] flex">
          {"If you don't have any accounts,"}
          <Link href="/register">
            <div className="mx-[10px] text-orange-700">Register now</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
