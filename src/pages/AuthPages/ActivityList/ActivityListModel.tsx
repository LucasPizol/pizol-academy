import { useState } from "react";
import { Activity } from "./ActivityListView";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { DownloadFile } from "./helpers/downloadFile";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PrivateAPI } from "../../../api/PrivateAPI";
import { useAuthContext } from "../../../context/AuthContext";
import { Permissions } from "../../../api/Permissions";
import { Button } from "antd";

export const highPermissions = ["owner", "teacher"];

export const ActivityListModel = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { id } = useParams();
  const { user } = useAuthContext();

  const { data, isLoading, refetch } = useQuery({
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
      title: "Editar",
      dataIndex: "id",
      render: (text: string) => (
        <Link to={"/activity/" + Number(text)} state={{ classId: id }}>
          Ver
        </Link>
      ),
    },
    {
      title: "Desativar",
      dataIndex: "id",
      render: (text: string) => {
        const find = data?.data?.activity.find(
          (activity: Activity) => activity.id === Number(text)
        );

        return find.isActive ? (
          <Button
            type="primary"
            style={{ background: "#F00" }}
            onClick={() => handleDeactivate(Number(text))}
          >
            Desativar
          </Button>
        ) : (
          <Button type="primary" onClick={() => handleActivate(Number(text))}>
            Ativar
          </Button>
        );
      },
    },
  ];

  const userColumns = [
    ...columns,
    {
      title: "Entregar",
      dataIndex: "id",
      render: () => <Button type="primary">Entregar</Button>,
    },
  ];

  const userPermission = data?.data?.class.find(
    (classUser: { userId: number }) => classUser.userId === user.id
  ).role;

  const downloadMany = async () => {
    const returnFilesName = selectedRowKeys.map((id) => {
      const findName = data?.data?.activity.find(
        (activity: Activity) => activity.id === Number(id)
      );

      return findName.pdf_file_url;
    });

    await DownloadFile.downloadMany(returnFilesName);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return {
    rowSelection,
    hasSelected,
    downloadMany,
    selectedRowKeys,
    classe: {
      ...data?.data,
      activity: data?.data?.activity.map((activity: any) => {
        return {
          ...activity,
          ownerName: activity?.user?.name,
        };
      }),
    },
    isLoading,
    columns: Permissions.CheckAdminPermission(userPermission)
      ? adminColumns
      : userColumns,
    classId: id,
    userPermission,
  };
};
