import AuthPage from "../components/auth/auth-page";
import Dashboard from "../components/dashboard/dashboard";
import { useAuth } from "../lib/providers/auth";

function Home() {
  const { token } = useAuth();

  return <div>{token === "" ? <AuthPage /> : <Dashboard />}</div>;
}
export default Home;
