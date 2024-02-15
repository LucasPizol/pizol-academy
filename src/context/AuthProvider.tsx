import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";
import { PublicAPI } from "../api/PublicAPI";
import { PrivateAPI } from "../api/PrivateAPI";
import { Loading } from "../components/Loading/Loading";
import { RegisterAttributes } from "../designers/Auth/RegisterAttributes";
import { LoginAttributes } from "../designers/Auth/LoginAttributes";
import { UserAttributes } from "../designers/User/UserAttributes";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserAttributes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (authParams: LoginAttributes) => {
    setIsLoading(true);
    const data = await PublicAPI.login(authParams);
    if (data.error) {
      Swal.fire({
        title: "Erro",
        icon: "error",
        text: data.error,
      });
      setIsLoading(false);

      return;
    }

    sessionStorage.setItem("AUTH_SESSION_KEY", data.token);
    setUser(data);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);

    sessionStorage.removeItem("AUTH_SESSION_KEY");
    setUser(null);

    setIsLoading(false);
  };

  const register = async (authParams: RegisterAttributes) => {
    setIsLoading(true);

    const data = await PublicAPI.register(authParams);

    if (data.error) {
      setIsLoading(false);
      return data;
    }

    sessionStorage.setItem("AUTH_SESSION_KEY", data.token);
    setUser(data);
    setIsLoading(false);
    return data;
  };

  useEffect(() => {
    PrivateAPI.get("/user").then(({ data, error }) => {
      console.log(data);
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
