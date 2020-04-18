import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Sidebar from "@xcritical/sidebar";
import { routerConfig } from "./config";
import { Navigation } from "../components/navigation";

export const Routes = () => {
  return (
    <Router>
      <Sidebar>
        <Navigation />
      </Sidebar>
      <Switch>
        {routerConfig.map((route) => {
          return <Route {...route} />;
        })}
      </Switch>
    </Router>
  );
};
