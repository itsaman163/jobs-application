import { lazy } from "react";

const Login = lazy(() => import("../pages/Guest/Login"));
const Registration = lazy(() => import("../pages/Guest/Registration"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Jobs = lazy(() => import("../pages/Jobs/Jobs"));
const User = lazy(() => import("../pages/User/User"));
const PageNotFound = lazy(() => import("../components/ErrorPage/PageNotFound"));

const routesList = [
  // Public Guest Routes
  {
    path: "/",
    component: Login,
    allowWithoutLogin: true,
  },
  {
    path: "/login",
    component: Login,
    allowWithoutLogin: true,
  },
  {
    path: "/registration",
    component: Registration,
    allowWithoutLogin: true,
  },

  // Protected Authenticated Routes
  {
    path: "/",
    component: Dashboard,
    allowWithoutLogin: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    allowWithoutLogin: false,
  },
  {
    path: "/jobs",
    component: Jobs,
    allowWithoutLogin: false,
  },
  {
    path: "/user",
    component: User,
    allowWithoutLogin: false,
  },

  // Catch-all 404 (MUST BE LAST)
  {
    path: "*",
    component: PageNotFound,
    allowWithoutLogin: false,
  },
  {
    path: "*",
    component: PageNotFound,
    allowWithoutLogin: true,
  },
];

export default routesList;
