import React, { useState, useEffect, useCallback, useMemo } from "react";

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Sidebar from '@xcritical/sidebar';
import { routerConfig } from './routes/config';
import { Provider } from "react-redux";
import { store } from "./reducers";

const Navigation = () => {
  return (
    <div>
      Navigation
    </div>
  ) 
}


const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <Provider store={store} >
        <Router>
          <Sidebar>
            <Navigation />
          </Sidebar>
          <Switch>

          {
            routerConfig.map(route => {
              return (
                <Route {...route} />
                )
              })
            }

          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
