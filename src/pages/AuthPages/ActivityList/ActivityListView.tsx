import { Button, Table, Typography } from "antd";
import { ActivityListModel } from "./ActivityListModel";
import { useNavigate } from "react-router-dom";
import { Permissions } from "../../../api/Permissions";
import { Loading } from "../../../components/Loading/Loading";
import DragAndDrop from "./components/DragAndDrop";

export type Activity = {
  id?: number;
  title: string;
  resume: string | null;
  objectives: string;
  total_time: number;
  recurses: string;
  pdf_file_url: string;
  userId: number;
  user: {
    id: number;
    name: string;
  };
  guide: string;
  abilities: { id: number; name: string }[];
  isActive: boolean;
  creatorName: string;
  sendActivity: { userId: number; activityId: string }[];
};

export const ActivityListView = ({
  classe,
  columns,
  open,
  userPermission,
  setOpen,
  activityModal,
  refetch,
  isLoading,
}: ReturnType<typeof ActivityListModel>) => {
  const navigate = useNavigate();

  if (!classe) return <Loading />;

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 12 }}>
      <div style={{ marginBottom: 32 }}>
        <Typography.Title
          style={{
            marginTop: 0,
            fontWeight: "bold",
            color: "#1677ff",
            marginBottom: 0,
          }}
        >
          {classe.name}
        </Typography.Title>

        {!Permissions.CheckAdminPermission(userPermission) ? null : (
          <Typography.Text>
            Seu código de acesso: {classe.invite_code}
          </Typography.Text>
        )}
      </div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button type="primary" onClick={() => refetch()} loading={isLoading}>
            Atualizar
          </Button>

          <span
            style={{
              marginLeft: 8,
            }}
          ></span>
        </div>

        {!Permissions.CheckAdminPermission(userPermission) ? null : (
          <Button
            type="primary"
            onClick={() => {
              navigate("/activity/new", {
                state: { classId: classe.id },
              });
            }}
          >
            + Novo
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        dataSource={classe?.activity}
        style={{ overflowX: "scroll" }}
        rowKey="id"
      />

      <DragAndDrop
        open={open}
        setOpen={setOpen}
        myClass={classe}
        activity={activityModal!}
        refetch={refetch}
        isLoading={isLoading}
      />
    </div>
  );
};
