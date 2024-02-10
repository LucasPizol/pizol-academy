import { Form } from "antd";
import { useAuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";

export const RegisterModel = () => {
  const [form] = Form.useForm();

  const { isLoading, register } = useAuthContext();

  const submitForm = async () => {
    const values = form.getFieldsValue();

    if (values.password !== values.confirmPassword) {
      Swal.fire({
        title: "Senhas não confere",
      });
    }

    const data = await register(form.getFieldsValue());

    console.log(data);
  };

  return { form, isLoading, submitForm };
};
