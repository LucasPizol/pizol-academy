import { Layout } from "antd";
import { SiderComponent } from "../../components/Sider/Sider";
import "./styles.css";
import headerImage from "../../../assets/header.jpg";
const { Header, Content, Footer } = Layout;

export const CustomLayout = ({ children }: { children: any }) => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <SiderComponent />
      <Layout className="contentSide" style={{ background: "#fff" }}>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            height: 170,
            boxShadow: "0px 0px 35px 0px rgba(0,0,0,0.178)",
          }}
        >
          <img
            style={{ height: 170, objectFit: "cover", width: "100%" }}
            src={headerImage}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            flex: 1,
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
