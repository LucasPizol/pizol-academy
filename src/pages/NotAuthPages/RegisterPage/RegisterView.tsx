import { Button, Input, Form, Typography } from "antd";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { RegisterModel } from "./RegisterModel";
import { useNavigate } from "react-router-dom";

const { Password } = Input;

export const RegisterView = ({
  form,
  isLoading,
  submitForm,
}: ReturnType<typeof RegisterModel>) => {
  const navigate = useNavigate();
  return (
    <main className={styles.main}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <header className={styles.header}>
          <Typography.Title>Cadastre-se no Pizol Academy</Typography.Title>
          <Typography.Text type="secondary" className={styles.subtitle}>
            Faça a gestão de suas atividades acadêmicas
          </Typography.Text>
        </header>

        <Form form={form}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              placeholder="Usuário"
              prefix={<UserOutlined />}
              onChange={() => console.log(form.getFieldsValue())}
            ></Input>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              placeholder="Nome Completo"
              prefix={<UserOutlined />}
              onChange={() => console.log(form.getFieldsValue())}
            ></Input>
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor digite sua senha!",
              },
            ]}
          >
            <Password prefix={<LockOutlined />} placeholder="Senha"></Password>
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Por favor digite sua senha!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Password
              prefix={<LockOutlined />}
              placeholder="Confirme sua senha"
            ></Password>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={submitForm}>
              {isLoading ? <Spinner color="#fff" size={10} /> : "Login"}
            </Button>
          </Form.Item>
          <Typography.Text>Já tem uma conta? </Typography.Text>

          <Typography.Link onClick={() => navigate("/auth/login")}>
            Entre agora!
          </Typography.Link>
        </Form>
      </div>
    </main>
  );
};
