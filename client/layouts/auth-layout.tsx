import Head from "next/head";
import { useEffect } from "react";
import { useAuth } from "../lib/providers/auth";

export default function AuthLayout(props: any) {
  const { user, redirectToHome } = useAuth();
  useEffect(() => {
    if (user) {
      redirectToHome!();
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Login page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {props.children}
    </>
  );
}
