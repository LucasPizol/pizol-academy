import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { PrivateAPI } from "../../../api/PrivateAPI";

export const ClassesModel = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["getClasses"],
    queryFn: () => PrivateAPI.get("/classes"),
  });

  const joinClass = async (invite_code: string) => {
    const { error } = await PrivateAPI.post("/class/join", { invite_code });

    if (error) {
      Swal.fire({
        title: "Erro!",
        text: error,
        icon: "error",
      });
      return;
    }

    refetch();
  };

  const handleOpenModal = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Coloque o código da sala",
      input: "text",
      inputLabel: "Sua sala",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.length !== 7) {
          return "Escreva um código válido";
        }
      },
    });

    if (isConfirmed) {
      await joinClass(value);
    }
  };

  const createClass = async (name: string) => {
    const { error } = await PrivateAPI.post("/class/create", { name });

    if (error) {
      Swal.fire({
        title: "Erro!",
        text: error,
        icon: "error",
      });
      return;
    }

    refetch();
  };

  const handleCreateClass = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Digite o nome da sua sala",
      input: "text",
      showCancelButton: true,
    });
    if (isConfirmed) {
      await createClass(value);
    }
  };

  return {
    classes: data,
    isLoading,
    handleOpenModal,
    handleCreateClass,
  };
};
