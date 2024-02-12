import { useState } from "react";
import { Activity } from "./ActivityListView";
import {
  CheckCircleOutlined,
  CloudDownloadOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { DownloadFile } from "./helpers/downloadFile";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PrivateAPI } from "../../../api/PrivateAPI";
import { useAuthContext } from "../../../context/AuthContext";
import { Permissions } from "../../../api/Permissions";
import { Button, Popover, Typography } from "antd";

export const ActivityListModel = () => {
  const [open, setOpen] = useState(false);
  const [activityModal, setActivityModal] = useState<Activity>();
  const { id } = useParams();
  const { user } = useAuthContext();

  const { data, refetch, isRefetching } = useQuery({
    queryKey: ["getTable" + id],
    queryFn: () => PrivateAPI.fetchData("/class/" + id),
  });

  const handleDeactivate = async (id: number) => {
    await PrivateAPI.put("/activity/deactivate/" + id);
    refetch();
  };

  const handleActivate = async (id: number) => {
    await PrivateAPI.put("/activity/activate/" + id);
    refetch();
  };

  const handleSendActivity = async (key: Activity) => {
    setActivityModal(key);
    setOpen(true);
  };

  const columns = [
    {
      title: "Titulo",
      dataIndex: "title",
      filters: data?.data?.activity?.map((activity: Activity) => ({
        text: activity?.title,
        value: String(activity?.id),
      })),
      filterMode: "menu" as any,
      filterSearch: true,
      onFilter: (value: any, record: any) => record.id === Number(value),
    },
    {
      title: "Tempo Total (s)",
      dataIndex: "total_time",
      sorter: (a: any, b: any) => a.total_time - b.total_time,
    },
    {
      title: "Criador",
      dataIndex: "ownerName",
    },
    {
      title: "Download PDF",
      dataIndex: "pdf_file_url",
      render: (text: string) => (
        <a onClick={() => DownloadFile.downloadOnce(text)} download>
          <CloudDownloadOutlined /> Download
        </a>
      ),
    },
  ];

  const adminColumns = [
    ...columns,
    {
      title: "Desativar",
      dataIndex: "isActive",
      render: (text: boolean, key: any) => {
        return text ? (
          <a
            type="link"
            onClick={() => handleDeactivate(key.id)}
            style={{ color: "#f00" }}
          >
            Desativar
          </a>
        ) : (
          <a type="link" onClick={() => handleActivate(key.id)}>
            Ativar
          </a>
        );
      },
    },
    {
      title: "Ações",
      dataIndex: "id",
      render: (text: string) => {
        const content = (
          <div style={{ flexDirection: "column", display: "flex" }}>
            <Link to={"/activity/" + Number(text)} state={{ classId: id }}>
              Editar
            </Link>
            <Link to={"/activity/" + Number(text)} state={{ classId: id }}>
              Entregas
            </Link>
          </div>
        );

        return (
          <Popover content={content} title="Ações">
            <MoreOutlined className="povOver" style={{ fontSize: "150%" }} />
          </Popover>
        );
      },
    },
  ];

  const userColumns = [
    ...columns,
    {
      title: "Entregar",
      dataIndex: "id",
      render: (text: string, key: Activity) => {
        const checkIfSent = key.sendActivity.find(
          (activity) => activity.userId === user.id
        );

        return checkIfSent ? (
          <div style={{ display: "flex", color: "#168CFF", gap: 4 }}>
            <CheckCircleOutlined />
            <Typography.Text style={{ color: "#168CFF" }}>
              Enviado!
            </Typography.Text>
          </div>
        ) : (
          <Button type="primary" onClick={() => handleSendActivity(key)}>
            Entregar
          </Button>
        );
      },
    },
  ];

  const userPermission = data?.data?.class.find(
    (classUser: { userId: number }) => classUser.userId === user.id
  ).role;

  return {
    classe: {
      ...data?.data,
      activity: data?.data?.activity
        .map((activity: Activity) => {
          return {
            ...activity,
            ownerName: activity?.user?.name,
          };
        })
        .sort((a: Activity, b: Activity) => {
          return a.title.localeCompare(b.title);
        }),
    },
    columns: Permissions.CheckAdminPermission(userPermission)
      ? adminColumns
      : userColumns,
    userPermission,
    open,
    setOpen,
    activityModal,
    refetch,
    isLoading: isRefetching,
  };
};
