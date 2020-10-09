import { List } from "../pages";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

export const getRouterConfig = (isAuth) =>
  [
    {
      path: "/list/:id",
      component: List,
      exact: true,
      isPrivate: true,
    },
    {
      path: "/list",
      component: List,
      exact: true,
      isPrivate: true,
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
  ].filter(({ isPrivate }) => {
    if (isAuth) return true;
    return !isPrivate;
  });
