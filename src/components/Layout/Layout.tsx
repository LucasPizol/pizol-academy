import { Flex, Layout, Typography } from "antd";
import { SiderComponent } from "../Sider/Sider";
import "./styles.css";
import { Header } from "antd/es/layout/layout";
const { Content } = Layout;
import headerImage from "../../../assets/header-image.svg";

export const CustomLayout = ({ children }: { children: any }) => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <SiderComponent />
      <Layout className="contentSide" style={{ background: "#fff" }}>
        <Header
          style={{
            width: "100%",
            height: 150,
            background:
              "linear-gradient(90deg, rgba(4,76,207,1) 0%, rgba(22,119,255,1) 100%)",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ height: "100%", width: "100%", padding: 12 }}
          >
            <Typography.Title style={{ color: "#fff", margin: 0 }}>
              Pizol Academy
            </Typography.Title>
            <img src={headerImage} style={{ height: "100%" }} />
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            flex: 1,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
