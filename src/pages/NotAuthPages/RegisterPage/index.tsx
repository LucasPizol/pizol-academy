import { RegisterModel } from "./RegisterModel";
import { RegisterView } from "./RegisterView";

export const Register = () => {
  const methods = RegisterModel();
  return <RegisterView {...methods} />;
};
