import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { generateGQL } from "../helpers/graphql";
import { User } from "../models/user";
const TOKEN_KEY = "chat-x-token";
const AuthContext = createContext<
  Partial<{
    login: (username: string, password: string) => Promise<any>;
    hookloginData: any;
    logout: (query: any) => Promise<any>;
    register: (query: any) => Promise<any>;
    user: User;
    token: string;
    redirectToLogin: Function;
    redirectToHome: Function;
  }>
>({});

export default function AuthProvider(props: any) {
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
  const [hookLogin, hookloginData] = useMutation(LOGIN);
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
    hookLogin({
      variables: {
        email: email,
        password: password,
      },
    });
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
        hookloginData,
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
