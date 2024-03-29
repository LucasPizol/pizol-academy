import { Button, Flex, Table, Typography } from "antd";
import { SendActivityListModel } from "./SendActivityListModel";
import { Loading } from "../../../components/Loading/Loading";
import { DownloadFile } from "./helpers/downloadFile";
import { ActivityAttributes } from "../../../designers/Activity/ActivityAttributes";
import { ClassHasUserAttributes } from "../../../designers/ClassHasUser/ClassHasUserAttributes";
import { Permissions } from "../../../api/Permissions";

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

export const SendActivityListView = ({
  data,
  columns,
  refetch,
  isLoading,
  id,
  location,
}: ReturnType<typeof SendActivityListModel>) => {
  if (!data?.data) return <Loading />;

  const className = location.state.classe.name;
  const activityName = location.state.classe.activity.find(
    (activity: ActivityAttributes) => activity.id === Number(id)
  ).title;

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 12 }}>
      <Flex align="center" gap={12} style={{ marginBottom: 32 }}>
        <Typography.Title
          style={{
            marginTop: 0,
            fontWeight: "bold",
            color: "#1677ff",
            marginBottom: 0,
          }}
        >
          {`${className}/${activityName}`}
        </Typography.Title>
      </Flex>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex align="center" gap={12}>
          <Button
            onClick={() => DownloadFile.downloadImage(Number(id))}
            type="primary"
          >
            Download Atividades
          </Button>
          <Button type="default" onClick={() => refetch()} loading={isLoading}>
            Atualizar
          </Button>
        </Flex>
      </div>
      <Table
        dataSource={location.state.classHasUser
          .filter(
            ({ role }: ClassHasUserAttributes) =>
              !Permissions.CheckAdminPermission(role)
          )
          .map(({ user }: ClassHasUserAttributes) => user)}
        columns={columns}
        style={{ overflowX: "scroll" }}
        rowKey="id"
      />
    </div>
  );
};
