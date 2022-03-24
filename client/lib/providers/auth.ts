import { createContext, useState } from "react";
import { User } from "../models/user";
const TOKEN_KEY = "chat-x-token";
const AuthContext = createContext<
  Partial<{
    login: (email: string, password: string) => Promise<any>;
    logout: () => string;
    register: (userInfo: User) => User;
    user: User;
    token: string;
  }>
>({});

export default function AuthProvider() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>(
    localStorage.getItem(TOKEN_KEY) as string
  );

  /**
   *
   */
  const login = async (email: string, password: string) => {
    if (email === "test@gmail.com" && password === "123456") {
      setTimeout(() => {
        const testUser: User = {
          id: "123",
          createdAt: "123",
          updatedAt: "123",
          email: "testfrontend@gmail.com",
          username: "testfrontend@gmail.com",
          avatarUrl: "assets/defaultAvatar.jpg",
          dob: "01/09/2002",
          gender: "MALE",
        };
        setUser(testUser);
        setToken(token);
        localStorage.setItem(TOKEN_KEY, "here_is_token");
      }, 3000);
      return true;
    }
    return false;
  };
  const register = () => {};
  const logout = () => {};
}
