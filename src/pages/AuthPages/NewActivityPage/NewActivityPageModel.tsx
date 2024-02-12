import { useLocation } from "react-router-dom";
import { Form } from "antd";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { PrivateAPI } from "../../../api/PrivateAPI";
import { useState } from "react";

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoadingBtn(true);
    const fields = form.getFieldsValue();

    const fieldValues = {
      ...fields,
      total_time: Number(fields.total_time),
      classId: Number(location.state.classId),
    };

    const { error } = await PrivateAPI.post("/activity", fieldValues);
    
    setLoadingBtn(false)

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
    loadingBtn
  };
};
