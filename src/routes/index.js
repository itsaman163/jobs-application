import { lazy } from "react";
const Login = lazy(() => import("../pages/Guest/Login"));
const Registration = lazy(() => import("../pages/Guest/Registration"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ErrorPage = lazy(() => import("../components/ErrorPage"));
const Jobs = lazy(() => import("../pages/Jobs/Jobs"));
const PageNotFound = lazy(() => import("../components/ErrorPage/PageNotFound"));
const User = lazy(() => import("../pages/User/User"));

const routesList = [
  {
    path: "/",
    index: true,
    component: Login,
    allowWithoutLogin: true,
  },
  {
    path: "/login",
    index: true,
    component: Login,
    allowWithoutLogin: true,
  },
  {
    path: "/registration",
    index: true,
    component: Registration,
    allowWithoutLogin: true
  },
  {
    path: "*",
    component: ErrorPage,
    allowWithoutLogin: false,
  },
  {
    path: "*",
    component: PageNotFound,
    allowWithoutLogin: false,
  },
  {
    path: "/",
    index: true,
    component: Dashboard,
    allowWithoutLogin: false,
  },
  {
    path: "/jobs",
    index: true,
    component: Jobs,
    allowWithoutLogin: false,
  },
  {
    path: "/user",
    component: User,
    allowWithoutLogin: false
  }

];
export default routesList;
