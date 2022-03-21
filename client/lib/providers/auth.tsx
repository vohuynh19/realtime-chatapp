import { createContext, useContext, useState } from "react";
import { User } from "../models/user";
import { ApiService } from "../repositories/api.repo";
import { gql } from "@apollo/client";

const initUser: User = {
  id: "",
  createdAt: "",
  updatedAt: "",
  email: "",
  username: "",
  avatarUrl: "",
  dob: "",
  gender: "",
};

const AuthContext = createContext<
  Partial<{
    login: (email: string, password: string) => Promise<any>;
    logout: () => string;
    register: (userInfo: User) => User;
    user: User;
    token: string;
  }>
>({});

export function AuthProvider(props: any) {
  const [user, setUser] = useState<User>(initUser);
  const [token, setToken] = useState<string>("");
  const login = async (email: string, password: string) => {
    const LOGIN_QUERY = `
      query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          user {
            avatarUrl
            createdAt
            id
            updatedAt
            email
            username
            gender
            dob
          }
          token
        }
      }
    `;
    const variables = {
      email: email,
      password: password,
    };
    const response = await ApiService.fetchApi(LOGIN_QUERY, variables, "");
    if (response.data.login !== null) {
      setUser(response.data.login.user as User);
      setToken(response.data.login.token);
    }
    return response.data;
  };
  const logout = () => "SUCCESS";
  const register = (userInfo: User) => initUser;

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        user,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
