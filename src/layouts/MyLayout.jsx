import { useMemo, useState, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routesList from "../routes";
import { Layout } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import LayoutHeader from "./LayoutHeader";
import LeftMenu from "./LeftMenu";
import Loader from "../components/Loader/Loader";

const { Sider, Content, Footer } = Layout;

const MyLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const protectedRoutes = useMemo(() => {
    return routesList
      .filter((row) => !row.allowWithoutLogin)
      .map((row, index) => (
        <Route
          key={`protected-${row.path}-${index}`}
          exact
          path={row.path}
          element={<row.component />}
        />
      ));
  }, []);

  return (
    <Layout className="app-layout">
      <Sider
        breakpoint="lg"
        collapsedWidth="80"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        className="app-sidebar"
      >
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon">
            <RocketOutlined />
          </div>
          {!collapsed && <span className="sidebar-brand-text">CareerHub</span>}
        </div>
        <LeftMenu />
      </Sider>

      <Layout style={{ minHeight: "100vh", background: "var(--color-bg-base)" }}>
        <LayoutHeader />
        <Content className="content-container">
          <Suspense fallback={<Loader />}>
            <Routes>{protectedRoutes}</Routes>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, background: "transparent" }}>
          CareerHub © {new Date().getFullYear()} • Enterprise Application Tracker
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
