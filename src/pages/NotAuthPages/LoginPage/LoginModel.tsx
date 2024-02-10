import { Form } from "antd";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginModel = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { login, isLoading } = useAuthContext();

  const submitForm = async () => {
    const data = await login(form.getFieldsValue());
    return data;
  };

  return { form, isLoading, submitForm, navigate };
};
