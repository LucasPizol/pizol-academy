import { Form } from "antd";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";
import { RegisterAttributes } from "../../../designers/Auth/RegisterAttributes";

export const RegisterModel = () => {
  const [form] = Form.useForm();

  const { isLoading, register } = useAuthContext();
  const [alert, setAlert] = useState<string>();

  const submitForm = async (values: RegisterAttributes) => {
    if (values.password !== values.confirmPassword) {
      setAlert("Senhas não conferem");
    }

    const data = await register(form.getFieldsValue());

    if (data.error) {
      setAlert(data.error);
    }
  };

  return { form, isLoading, submitForm, alert };
};
