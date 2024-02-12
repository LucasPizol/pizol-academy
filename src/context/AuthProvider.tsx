import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { PublicAPI } from "../api/PublicAPI";
import { PrivateAPI } from "../api/PrivateAPI";
import { Loading } from "../components/Loading/Loading";

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const logout = async () => {
    setIsLoading(true);

    sessionStorage.removeItem("AUTH_SESSION_KEY");
    setUser(undefined);

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
    PrivateAPI.get("/user").then(({ data, error }) => {
      if (!error) setUser(data);

      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, login, register, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
