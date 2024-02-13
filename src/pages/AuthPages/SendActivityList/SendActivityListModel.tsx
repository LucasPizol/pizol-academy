import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PrivateAPI } from "../../../api/PrivateAPI";
import { Typography } from "antd";

export const SendActivityListModel = () => {
  const { id } = useParams();

  const location = useLocation();


  const { data, refetch, isRefetching } = useQuery({
    queryKey: ["getSendActivityTable" + id],
    queryFn: () => PrivateAPI.get("/sendActivity/" + id),
  });

  const columns = [
    {
      title: "Id do aluno",
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Nome do Aluno",
      dataIndex: "name",

      filters: location.state.users.map((user: any) => {
        console.log(user)
        return {
          text: user.user.name,
          value: String(user.user.id),
        };
      }),

      filterMode: "menu" as any,
      filterSearch: true,

      onFilter: (value: any, record: any) => {
        return record.id === Number(value);
      },

      render: (text: string, key: any) => {
        console.log(text);
        return <Typography.Text>{key?.name}</Typography.Text>;
      },
    },
    {
      title: "Status",
      dataIndex: "id",
      render: (id: number) => {
        const checkIfSended = data?.data.find(
          (sendActivity: { userId: number }) => sendActivity.userId === id
        );
        return checkIfSended ? (
          <Typography.Text style={{ color: "#1677ff" }}>
            Enviado
          </Typography.Text>
        ) : (
          <Typography.Text style={{ color: "#f00" }}>
            Não enviado
          </Typography.Text>
        );
      },
    },
  ];

  return {
    data,
    columns,
    refetch,
    isLoading: isRefetching,
    id,
    location
  };
};
