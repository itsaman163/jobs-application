import { useState, createContext, lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getSession } from "./helper/auth";
import Loader from "./components/Loader/Loader";
import "./App.css";
const MyLayout = lazy(() => import("./layouts/MyLayout"));
const Guest = lazy(() => import("./pages/Guest"));

export const LoginContext = createContext({
  isLogin: false,
  setIsLogin: () => { },
  setLoginData: () => { },
});

function App() {
  const [loginData, setLoginData] = useState(getSession());
  const [isLogin, setIsLogin] = useState(loginData);
  const loginContext = {
    isLogin,
    setIsLogin,
    setLoginData,
  };

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
