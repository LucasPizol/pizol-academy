import { Spinner } from "react-activity";
import { Ability, NewActivityPageModel } from "./NewActivityPageModel";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Typography,
  InputNumber,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const ruleType = [
  { required: true, message: "Este campo não pode ficar em branco." },
];

export const NewActivityPageView = ({
  abilities,
  isLoading,
  handleSubmit,
  loadingBtn,
  form,
}: ReturnType<typeof NewActivityPageModel>) => {
  if (isLoading) return <Spinner size={35} color="blue" />;

  return (
    <main
      style={{
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
          color: "#1677ff",
        }}
      >
        <ArrowLeftOutlined
          onClick={() => history.back()}
          size={30}
          style={{ fontSize: "150%" }}
        />
        <Typography.Title
          style={{ margin: 0, color: "#1677ff", fontWeight: "bold" }}
        >
          Atividade
        </Typography.Title>
      </div>
      <Form
        {...formItemLayout}
        form={form}
        layout="vertical"
        style={{
          maxWidth: 800,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[
            ...ruleType,
            {
              required: true,
              max: 30,
              min: 5,
              message: "Seu título deve ter entre 5 e 30 caracteres",
            },
          ]}
        >
          <Input placeholder="Título" />
        </Form.Item>
        <Form.Item label="Resumo" name="resume">
          <Input.TextArea placeholder="Resumo" />
        </Form.Item>
        <Form.Item label="Objetivos" name="objectives" rules={ruleType}>
          <Input.TextArea placeholder="Resumo" />
        </Form.Item>
        <Form.Item label="Guia" name="guide" rules={ruleType}>
          <Input.TextArea placeholder="Digite o guia" />
        </Form.Item>
        <Form.Item label="Recursos" name="recurses" rules={ruleType}>
          <Input.TextArea placeholder="Recursos utilizados nesta atividade" />
        </Form.Item>

        <Row>
          <Col>
            <Form.Item
              name="abilities"
              valuePropName="abilities"
              rules={ruleType}
            >
              <Checkbox.Group style={{ marginRight: 40 }}>
                <Col>
                  <Typography.Text>Habilidades</Typography.Text>
                  {abilities?.data?.map(({ id, name }: Ability) => (
                    <Row>
                      <Checkbox value={id}>{name}</Checkbox>
                    </Row>
                  ))}
                </Col>
              </Checkbox.Group>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Tempo" name="total_time" rules={ruleType}>
              <InputNumber
                placeholder="Tempo total (s)"
                required
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" loading={loadingBtn} htmlType="submit">
            Submeter
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};
