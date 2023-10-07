import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import routesList from "../routes";
import { Layout } from "antd";
import { getSession } from "../helper/auth";
import LayoutHeader from "./LayoutHeader";
import Loader from "../components/Loader/Loader";
const { Footer } = Layout;
const MyLayout = () => {
  const sesstionData = getSession();

  const [isVerifying, setIsVerifying] = useState(true);
  //   const secondDiff = getDifferenceInSecond(new Date(), sesstionData.login_time);
  useEffect(() => {
    let isMounted = false;
      setIsVerifying(false);
  }, [sesstionData?.token]);

  return (
    isVerifying ? <Loader /> :
    <Layout style={{ minHeight: "100vh" }} className="layout">
      <LayoutHeader />
      <Suspense fallback={<Loader />}>
        <Routes>
          {routesList.map((row, index) => {
            if (!row.allowWithoutLogin) {
              return (
                <Route
                  key={index}
                  exact
                  path={row.path}
                  item={row}
                  element={<row.component />}
                />
              );
            }
          })}
        </Routes>
      </Suspense>

      <Footer
        style={{
          textAlign: "center",
        }}
      >
        ©2023
      </Footer>
    </Layout>
  );
};
export default MyLayout;
