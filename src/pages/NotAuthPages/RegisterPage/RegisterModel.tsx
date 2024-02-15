import { Form } from "antd";
import { useAuthContext } from "../../../context/AuthContext";
import { useState } from "react";

export const RegisterModel = () => {
  const [form] = Form.useForm();

  const { isLoading, register } = useAuthContext();
  const [alert, setAlert] = useState<string>();

  const submitForm = async () => {
    const data = await register(form.getFieldsValue());

    if (data.error) {
      setAlert(data.error);
    }
  };

  return { form, isLoading, submitForm, alert };
};
