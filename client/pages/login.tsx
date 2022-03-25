import { ReactElement } from "react";
import Login from "../components/login/login";
import AuthLayout from "../layouts/auth-layout";

function LoginPage() {
  return <Login />;
}
export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
