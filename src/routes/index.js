import React, { useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  useHistory,
  Redirect,
} from "react-router-dom";

import { getRouterConfig } from "./config";
import { Navigation } from "../components/navigation";
import { Sidebar } from "../components/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/header";
import { getAuthUser } from "../actions/requests";
import { User } from "../components/user/user";
import { Spinner } from "../components/spinner";
import { WrapperCenteredBlock } from "../components/form-elements";
import { appInit } from "../actions/actions";

const Background = ({ children }) => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: "-1",
        }}
      />
      {children}
    </>
  );
};

export const Routes = () => {
  const { isAuth, appIsInit, appError } = useSelector((state) => {
    const isAuth = state.user.isAuth;
    const appIsInit = state.app?.isInit;
    const appError = state.app?.error;
    return {
      isAuth,
      appIsInit,
      appError,
    };
  });
  const sessionAuth = sessionStorage.getItem("isAuth");
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionAuth) {
      getAuthUser({ dispatch });
    } else {
      dispatch(appInit());
    }
  }, []);

  if (!appIsInit)
    return (
      <Background>
        <WrapperCenteredBlock width="200px" border="none">
          <Spinner />
        </WrapperCenteredBlock>
      </Background>
    );

  return (
    <Background>
      <Router>
        {isAuth ? (
          <Sidebar>
            <User />
            <Navigation />
          </Sidebar>
        ) : (
          <Header></Header>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Switch>
            {getRouterConfig(isAuth).map(({ ...route }) => {
              return <Route key={route.path} {...route} />;
            })}
            <Redirect to={"/"} />
          </Switch>
        </div>
      </Router>
    </Background>
  );
};
