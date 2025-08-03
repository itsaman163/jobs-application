import { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routesList from "../routes";
import { Layout, theme } from "antd";
import { getSession } from "../helper/auth";
import LayoutHeader from "./LayoutHeader";
import Loader from "../components/Loader/Loader";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import LeftMenu from "./LeftMenu";
const { Footer } = Layout;

const MyLayout = () => {
  const sesstionData = getSession();
  const [isVerifying, setIsVerifying] = useState(true);

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  useEffect(() => {
    setIsVerifying(false);
  }, [sesstionData?.token]);


  const protectedRoutes = useMemo(() => {
    return routesList
      .filter(row => !row.allowWithoutLogin)
      .map((row, index) => (
        <Route
          key={index}
          exact
          path={row.path}
          item={row}
          element={<row.component />}
        />
      ));
  }, [routesList]);

  const handleBreakpoint = useCallback((broken) => {
  }, [sesstionData]);

  return (
    isVerifying ? <Loader /> :
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={handleBreakpoint}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <LeftMenu />
        </Sider>
        <Layout>
          <LayoutHeader />
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                {protectedRoutes}
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Jobs API ©{new Date().getFullYear()} Created by Aman Kumar
          </Footer>
        </Layout>
      </Layout>
  );
};
export default MyLayout;

