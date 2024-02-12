import { Layout } from "antd";
import { SiderComponent } from "../Sider/Sider";
import "./styles.css";
import { useState } from "react";
const { Content } = Layout;

export const CustomLayout = ({ children }: { children: any }) => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <SiderComponent />
      <Layout className="contentSide" style={{ background: "#fff" }}>
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
