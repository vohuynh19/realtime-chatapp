import { useEffect } from "react";
import { useAuth } from "../lib/providers/auth";

export default function DefaultLayout(props: any) {
  const { user, redirectToLogin } = useAuth();
  useEffect(() => {
    if (user === undefined) {
      redirectToLogin!();
    }
  }, [user]);
  return <>{props.children}</>;
}
