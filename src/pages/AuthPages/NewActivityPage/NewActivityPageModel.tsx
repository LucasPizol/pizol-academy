import { useLocation } from "react-router-dom";
import { Form } from "antd";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { PrivateAPI } from "../../../api/PrivateAPI";
import { useState } from "react";
import { ActivityAttributes } from "../../../designers/Activity/ActivityAttributes";

export type Ability = {
  id: number;
  name: string;
};

export const NewActivityPageModel = () => {
  const [form] = Form.useForm();
  const location = useLocation();

  const { isLoading, data } = useQuery({
    queryKey: ["getAbilities"],
    queryFn: () => PrivateAPI.get("/ability"),
  });

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const handleSubmit = async (values: ActivityAttributes) => {
    setLoadingBtn(true);

    const fieldValues = {
      ...values,
      total_time: Number(values.total_time),
      classId: Number(location.state.classId),
    };

    const { error } = await PrivateAPI.post("/activity", fieldValues);

    setLoadingBtn(false);

    if (error) {
      Swal.fire({
        title: "Erro",
        icon: "error",
        text: error,
      });
      return;
    }

    history.back();
  };

  return {
    isLoading,
    abilities: data,
    handleSubmit,
    form,
    loadingBtn,
  };
};
