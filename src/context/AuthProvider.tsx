import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { PublicAPI } from "../api/PublicAPI";
import { PrivateAPI } from "../api/PrivateAPI";

type User = {
  id: number;
  username: string;
  company: {
    id: number;
    name: string;
    cnpj: string;
  };
};

export type Authentication = {
  username: string;
  password: string;
  confirmPassword?: string;
};

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (authParams: Authentication) => {
    setIsLoading(true);

    const data = await PublicAPI.login(authParams);

    if (data.error) {
      Swal.fire({
        title: "Erro",
        icon: "error",
        text: data.error,
      });
      return;
    }

    sessionStorage.setItem("AUTH_SESSION_KEY", data.token);
    setUser(data);
    setIsLoading(false);
  };

  const register = async (authParams: Authentication) => {
    setIsLoading(true);
    const data = await PublicAPI.register(authParams);
    if (data.error) {
      Swal.fire({
        title: "Erro",
        icon: "error",
        text: data.error,
      });
      return;
    }
    sessionStorage.setItem("AUTH_SESSION_KEY", data.token);
    setUser(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    PrivateAPI.get("/user").then(({ data, error }) => {
      console.log(error);
      if (!error) setUser(data);

      setIsLoading(false);
    });
  }, []);

  console.log(user)

  return (
    <AuthContext.Provider value={{ user, login, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
