import { lazy } from "react";
const Login = lazy(() => import("../pages/Guest/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const ErrorPage = lazy(() => import("../components/ErrorPage"));
const Jobs = lazy(() => import("../pages/Jobs/Jobs"));
const PageNotFound = lazy(() => import("../components/ErrorPage/PageNotFound"));

const routesList = [
  {
    path: "/",
    index: true,
    component: Login,
    allowWithoutLogin: true,
  },
  {
    path: "*",
    component: ErrorPage,
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
    path: "*",
    component: PageNotFound,
    allowWithoutLogin: true,
  }

];
export default routesList;
