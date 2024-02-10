import { Button, Input, Form, Typography } from "antd";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { LoginModel } from "./LoginModel";

const { Password } = Input;

export const LoginView = ({
  form,
  isLoading,
  submitForm,
  navigate,
}: ReturnType<typeof LoginModel>) => {
  return (
    <main className={styles.main}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <header className={styles.header}>
          <Typography.Title>Bem vindo ao Pizol Academy</Typography.Title>
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
            <Input placeholder="Usuário" prefix={<UserOutlined />}></Input>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Password prefix={<LockOutlined />} placeholder="Senha"></Password>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={submitForm}>
              {isLoading ? <Spinner color="#fff" size={10} /> : "Login"}
            </Button>
          </Form.Item>
          <Typography.Text>Não tem conta? </Typography.Text>
          <Typography.Link onClick={() => navigate("/auth/register")}>
            Cadastre-se já!
          </Typography.Link>
        </Form>
      </div>
    </main>
  );
};
