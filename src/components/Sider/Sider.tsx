import { Button, Flex, Layout, Menu } from "antd";
import styles from "./styles.module.css";
import { useAuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { PrivateAPI } from "../../api/PrivateAPI";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

export const SiderComponent = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["getAsideUsers"],
    queryFn: () => PrivateAPI.get("/classes"),
  });

  const classes = data?.data?.map((myClass: any) => ({
    key: "/class/" + myClass.class.id,
    label: myClass.class.name,
  }));

  const items = [
    {
      key: "classes",
      label: "Classes",
      children: classes,
    },
  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        minHeight: "100vh",
        position: "fixed",
        zIndex: "999",
        background: "#fff",
        boxShadow: "2px 0px 15px 0px rgba(0,0,0,0.187)",
        height: "100%",
      }}
    >
      <h1 className={styles.name}>{user?.name?.split(" ")[0]}</h1>
      <Flex vertical  className={styles.siderDiv} style={{ height: "100%", gap: 12 }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={({ key }) => navigate(key)}
          style={{
            background: "#1677ff",
            fontWeight: "bold",
          }}
        />
        <Button type="primary" style={{ background: "#f00", width: "100%" }} onClick={logout}>
          Logout
        </Button>
      </Flex>
    </Sider>
  );
};
