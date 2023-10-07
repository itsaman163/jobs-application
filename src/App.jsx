import { useState, createContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getSession } from "./helper/auth";
const MyLayout = lazy(() => import("./layouts/MyLayout"));
const Guest = lazy(() => import("./pages/Guest"));
import Loader from "./components/Loader/Loader";
// import "./assets/css/variable.css";
import "./App.css";

export const LoginContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
  setLoginData: () => {},
});

function App() {
  const [loginData, setLoginData] = useState(getSession());
  const [isLogin, setIsLogin] = useState(loginData);

  const loginContext = {
    isLogin,
    setIsLogin,
    setLoginData,
  };

  // useEffect(() => {
  //   if (loginData) {
  //     const checkExpiration = setInterval(() => {
  //       // check refresh token is expire
  //       if (Date.now() > loginData.access_expire_time) {
  //         setIsLogin(false);
  //         // deleteSession();
  //         clearInterval(checkExpiration);
  //       }
  //       return () => clearInterval(checkExpiration);
  //     }, 1000);
  //   }
  // }, [loginData]);

  return (
    <LoginContext.Provider value={loginContext}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          {isLogin ? <MyLayout /> : <Guest />}
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </LoginContext.Provider>
  );
}

export default App;
