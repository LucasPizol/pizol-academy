import { createContext, useContext } from "react";
import { UserAttributes } from "../designers/User/UserAttributes";
import {
  LoginAttributes,
  UserReturnAttributes,
} from "../designers/Auth/LoginAttributes";
import { RegisterAttributes } from "../designers/Auth/RegisterAttributes";

export const AuthContext = createContext(null as any);

interface AuthReturn {
  data: UserReturnAttributes;
  error: string | null;
}

interface ContextReturn {
  user: UserAttributes;
  login: (authParams: LoginAttributes) => Promise<AuthReturn>;
  register: (authParams: RegisterAttributes) => Promise<AuthReturn>;
  logout: () => void;
  isLoading: boolean;
}

export const useAuthContext = (): ContextReturn => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Ocorreu um erro");
  }

  return context;
};
