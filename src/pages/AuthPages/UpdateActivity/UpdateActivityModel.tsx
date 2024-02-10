import { useLocation, useParams } from "react-router-dom";
import { Form } from "antd";
import Swal from "sweetalert2";
import { useQueries } from "@tanstack/react-query";
import { PrivateAPI } from "../../../api/PrivateAPI";

export type Ability = {
  id: number;
  name: string;
};
export interface User extends Ability {}

export const UpdateActivityModel = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const location = useLocation();
  const promiseEndpoints = ["/activity/" + id, "/ability"];

  const queries = useQueries({
    queries: promiseEndpoints.map((endpoint, index) => ({
      queryKey: ["getQuery" + index],
      queryFn: () => PrivateAPI.fetchData(endpoint),
    })),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fields = form.getFieldsValue();

    const fieldValues = {
      ...fields,
      classId: Number(location.state.classId),
    };

    const data = await PrivateAPI.fetchData(
      "/activity/" + id,
      "PUT",
      fieldValues
    );

    if (data.error) {
      Swal.fire({
        title: "Erro",
        icon: "error",
        text: data.error,
      });
      return;
    }

    queries.forEach((query) => query.refetch());

    history.back();
  };

  return {
    activity: queries[0].data?.data,
    abilities: queries[1].data?.data,
    handleSubmit,
    form,
    isLoading: queries[0].isLoading || queries[1].isLoading,
  };
};

export default UpdateActivityModel;
