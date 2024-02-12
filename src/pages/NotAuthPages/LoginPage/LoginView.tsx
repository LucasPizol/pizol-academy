import { Button, Input, Form, Typography, Row, Col } from "antd";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import { LoginModel } from "./LoginModel";
import loginImage from "../../../../assets/login_background.webp";

const { Password } = Input;

export const LoginView = ({
  form,
  isLoading,
  submitForm,
  navigate,
}: ReturnType<typeof LoginModel>) => {
  return (
    <main className={styles.main}>
      <Row
        align="middle"
        style={{
          gap: 12,
          height: "70%",
          boxShadow: "0px 0px 40px 0px rgba(0,0,0,0.187)",
          borderRadius: 24,
          overflow: "hidden",
          maxWidth: 1200,
          background: "#fff",
        }}
        className={styles.row}
        wrap={false}
      >
        <Col
          className={styles.colImg}
          style={{ height: "100%", width: "100%" }}
        >
          <img
            src={loginImage}
            style={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </Col>
        <Col
          flex={1.1}
          style={{
            padding: 50,
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
            height: "100%",
          }}
          className={styles.form}
        >
          <header className={styles.header} style={{ marginBottom: 24 }}>
            <Typography.Title
              style={{
                margin: 0,
                fontWeight: "bold",
                color: "#1677ff",
                width: "100%",
              }}
            >
              Bem vindo ao Pizol Academy
            </Typography.Title>
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
              <Password
                prefix={<LockOutlined />}
                placeholder="Senha"
              ></Password>
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
          <div></div>
        </Col>
      </Row>
    </main>
  );
};
