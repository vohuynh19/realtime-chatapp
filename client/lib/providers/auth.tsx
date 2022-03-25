import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../models/user";
const TOKEN_KEY = "chat-x-token";
const AuthContext = createContext<
  Partial<{
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
    register: (userInfo: User) => Promise<any>;
    user: User;
    token: string;
    redirectToLogin: Function;
    redirectToHome: Function;
  }>
>({});

export default function AuthProvider(props: any) {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  /**
   * Load token from storage
   */
  useEffect(() => {
    localStorage.setItem(TOKEN_KEY, "hello");
    setToken(localStorage.getItem(TOKEN_KEY) as string);
  }, []);

  /**
   * METHOD
   */
  const login = async (email: string, password: string) => {
    return false;
  };
  const logout = async () => {
    return false;
  };
  const register = async (userInfo: User) => {
    return false;
  };
  const redirectToLogin = () => {
    router.replace("/login");
  };

  const redirectToHome = () => {
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        redirectToLogin,
        redirectToHome,
        user,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
