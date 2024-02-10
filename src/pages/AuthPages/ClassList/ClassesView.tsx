import { ClassesModel } from "./ClassesModel";
import { Button, Card, Col, Empty, Row } from "antd";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

type Class = {
  class: {
    id: number;
    invite_code: string;
    name: string;
    ownerId: number;
    owner: {
      id: number;
      name: string;
    };
  };
  user: {
    id: number;
    role: string;
    userId: number;
    name: string;
  };
};

export const ClassesView = ({
  classes,
  handleOpenModal,
  handleCreateClass,
}: ReturnType<typeof ClassesModel>) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={handleOpenModal}
      >
        Entrar em uma nova classe
      </Button>
      <Button
        style={{ marginBottom: 20, marginLeft: 12 }}
        onClick={handleCreateClass}
      >
        Criar nova classe
      </Button>
      {classes?.data?.length === 0 ? (
        <Empty />
      ) : (
        <Row style={{ gap: 12 }}>
          {classes?.data?.map((myClass: Class) => (
            <Col key={myClass.class.id} style={{ flex: 1, minWidth: 250 }}>
              <Card
                onClick={() => {
                  navigate("/class/" + myClass.class.id, {
                    state: {
                      class: classes?.data.find(
                        (newClass: Class) =>
                          myClass.class.id === newClass.class.id
                      ),
                    },
                  });
                }}
                title={myClass.class.name}
                className={styles.card}
              >
                <p>Criador: {myClass.class.owner.name}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
