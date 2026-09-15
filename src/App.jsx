import { useState, createContext, lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSession } from "./helper/auth";
import Loader from "./components/Loader/Loader";
import "./App.css";

const MyLayout = lazy(() => import("./layouts/MyLayout"));
const Guest = lazy(() => import("./pages/Guest"));

export const LoginContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
  setLoginData: () => {},
  loginData: null,
});

const themeConfig = {
  token: {
    colorPrimary: "#4f46e5",
    colorInfo: "#0ea5e9",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    borderRadius: 8,
    colorBgBase: "#f8fafc",
    colorBgContainer: "#ffffff",
    colorBorder: "#e2e8f0",
    colorTextHeading: "#0f172a",
    colorText: "#334155",
    colorTextSecondary: "#64748b",
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 8,
      fontWeight: 600,
      primaryShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
      colorBorder: "#cbd5e1",
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
    },
    Card: {
      borderRadiusLG: 16,
      boxShadowTertiary: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
    },
    Table: {
      borderRadiusLG: 12,
      headerBg: "#f8fafc",
      headerColor: "#475569",
      rowHoverBg: "#f1f5f9",
    },
    Modal: {
      borderRadiusLG: 16,
    },
  },
};

function App() {
  const [loginData, setLoginData] = useState(getSession());
  const [isLogin, setIsLogin] = useState(!!loginData?.token);

  const loginContext = {
    isLogin,
    setIsLogin,
    setLoginData,
    loginData,
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <LoginContext.Provider value={loginContext}>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            {isLogin ? <MyLayout /> : <Guest />}
          </Suspense>
        </BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </LoginContext.Provider>
    </ConfigProvider>
  );
}

export default App;
