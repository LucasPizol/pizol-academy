import { InboxOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { PrivateAPI } from "../../../../api/PrivateAPI";
import { Activity } from "../ActivityListView";

const { Dragger } = Upload;

const DragAndDrop = ({
  open,
  setOpen,
  myClass,
  activity,
  refetch,
}: {
  open: boolean;
  setOpen: any;
  myClass: any;
  activity: Activity;
  refetch: any;
}) => {
  const [files, setFiles] = useState<RcFile[]>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSendFile = async () => {
    if (!files) return;

    const promisesMap = files.map((file) => file.arrayBuffer());

    const promises = await Promise.all(promisesMap);

    const bufferToBase64 = promises.map((buffer) => {
      const uint8Array = new Uint8Array(buffer);
      const binaryString = uint8Array.reduce(
        (acc, byte) => acc + String.fromCharCode(byte),
        ""
      );
      return btoa(binaryString);
    });

    const { error } = await PrivateAPI.post("/activity/send", {
      filesBase64: bufferToBase64,
      myClass,
      activity,
    });

    if (error) {
      messageApi.open({
        type: "error",
        content: "Ocorreu um erro ao enviar",
      });
      return;
    }

    messageApi.open({
      type: "success",
      content: "Enviado com sucesso!",
    });
    setOpen(false);
    setFiles(undefined);
    refetch();
  };

  return (
    <Modal
      title="Enviar atividade"
      open={open}
      onCancel={() => setOpen(!open)}
      onOk={handleSendFile}
    >
      <Dragger
        beforeUpload={async (file) => {
          if (!files) {
            setFiles([file]);
            return false;
          }

          setFiles([...files, file]);
          return false;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Clique ou arraste sua imagem para enviar
        </p>
      </Dragger>
      {contextHolder}
    </Modal>
  );
};

export default DragAndDrop;
