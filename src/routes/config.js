import { List } from "../pages";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

export const routerConfig = [
  {
    path: "/list/:id",
    component: List,
    exact: true,
  },
  {
    path: "/list",
    component: List,
    exact: true,
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    exact: true,
  },
];
