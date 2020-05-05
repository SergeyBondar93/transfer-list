import React, { useEffect, useCallback } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { routerConfig } from "./config";
import { Navigation } from "../components/navigation";
import { Sidebar } from "../components/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { Header } from "../components/header";
import { getAuthUser, getLogout } from "../actions/requests";
import Button from "@xcritical/button";
import { setUser } from "../actions/actions";

export const Routes = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const sessionAuth = sessionStorage.getItem("isAuth");
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionAuth) {
      getAuthUser({ dispatch });
    }
  }, []);

  const logout = useCallback(() => {
    getLogout({ dispatch });
  }, []);

  return (
    <Router>
      {isAuth ? (
        <Sidebar>
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
        <div
          style={{
            height: "50px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button>Account</Button>
          <Button onClick={logout}>Logout</Button>
        </div>

        <Switch>
          {routerConfig.map((route) => {
            return <Route key={route.path} {...route} />;
          })}
        </Switch>
      </div>
    </Router>
  );
};
