import { Spinner } from "react-activity";
import UpdateActivityModel from "./UpdateActivityModel";
import { Button, Checkbox, Form, Input, Row, Col, Typography } from "antd";
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

export const UpdateActivityView = ({
  activity,
  abilities,
  isLoading,
  handleSubmit,
  form,
}: ReturnType<typeof UpdateActivityModel>) => {
  if (isLoading) return <Spinner size={35} color="blue" />;
  if (!activity) return <Spinner size={35} color="blue" />;

  const activityAbilities = activity.abilities.map(
    (ability: { id: number }) => ability.id
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <ArrowLeftOutlined onClick={() => history.back()} size={30} />
        <Typography.Title style={{ margin: 0 }}>Atividade</Typography.Title>
      </div>
      <Form
        {...formItemLayout}
        layout="vertical"
        initialValues={{
          title: activity.title,
          resume: activity.resume,
          recurses: activity.recurses,
          objectives: activity.objectives,
          guide: activity.guide,
          abilities: activityAbilities,
        }}
        style={{
          maxWidth: 800,
        }}
        form={form}
      >
        <Form.Item label="Título" name="title" rules={ruleType}>
          <Input placeholder="Título" />
        </Form.Item>
        <Form.Item label="Resumo" name="resume">
          <Input.TextArea placeholder="Resumo" />
        </Form.Item>
        <Form.Item
          label="Objetivos"
          name="objectives"
          rules={[
            { required: true, message: "Este campo não pode ficar em branco." },
          ]}
        >
          <Input.TextArea placeholder="Resumo" />
        </Form.Item>
        <Form.Item label="Guia" name="guide" rules={ruleType}>
          <Input.TextArea placeholder="Digite o guia" />
        </Form.Item>
        <Form.Item label="Recursos" name="recurses" rules={ruleType}>
          <Input.TextArea placeholder="Recursos utilizados nesta atividade" />
        </Form.Item>

        <Form.Item name="abilities" valuePropName="abilities" rules={ruleType}>
          <Checkbox.Group
            style={{ marginRight: 40 }}
            name="abilities"
            defaultValue={activityAbilities}
          >
            <Col>
              {abilities.map((ability: { name: string; id: number }) => (
                <Row>
                  <Checkbox value={ability.id} children={ability.name} />
                </Row>
              ))}
            </Col>
          </Checkbox.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Atualizar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
