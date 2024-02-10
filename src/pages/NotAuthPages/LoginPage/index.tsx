import { LoginModel } from "./LoginModel";
import { LoginView } from "./LoginView";

export const Login = () => {
  const methods = LoginModel();
  return <LoginView {...methods} />;
};
