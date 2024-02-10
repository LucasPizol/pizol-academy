import { Button, Table, Typography } from "antd";
import { ActivityListModel } from "./ActivityListModel";
import { useNavigate } from "react-router-dom";
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
  participants: { id: number; name: string }[];
  isActive: boolean;
  creatorName: string;
};

export const ActivityListView = ({
  isLoading,
  selectedRowKeys,
  rowSelection,
  hasSelected,
  downloadMany,
  classe,
  columns,
  userPermission,
}: ReturnType<typeof ActivityListModel>) => {
  const navigate = useNavigate();

  if (!classe) return;

  return (
    <div style={{ background: "#fff", padding: 16, borderRadius: 12 }}>
      <Typography.Title style={{ marginTop: 0, marginBottom: 32 }}>
        {classe.name}
      </Typography.Title>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            type="primary"
            onClick={downloadMany}
            disabled={!hasSelected}
            loading={isLoading}
          >
            Download
          </Button>

          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>

          <span
            style={{
              marginLeft: 8,
            }}
          >
            {!Permissions.CheckAdminPermission(userPermission) || hasSelected
              ? null
              : classe.invite_code}
          </span>
        </div>

        {!Permissions.CheckAdminPermission(userPermission) ? null : (
          <Button
            type="primary"
            onClick={() => {
              navigate("/activity/new", {
                state: { classId: classe.id },
              });
            }}
            loading={isLoading}
          >
            + Novo
          </Button>
        )}
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={classe?.activity}
        style={{ overflowX: "scroll" }}
        rowKey="id"
      />
    </div>
  );
};
