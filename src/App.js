import React, { useState, useEffect, useCallback, useMemo } from "react";

import { Provider } from "react-redux";

import { Notification } from "@xcritical/notification";

import { store } from "./reducers";
import { Routes } from "./routes";
import { globalTheme } from "./theme";
import styled, { ThemeProvider } from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const App = () => {
  return (
    <Wrapper>
      <Provider store={store}>
        <ThemeProvider theme={globalTheme}>
          <Notification />
          <Routes />
        </ThemeProvider>
      </Provider>
    </Wrapper>
  );
};

export default App;
