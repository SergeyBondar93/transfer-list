import React, { useState, useEffect, useCallback, useMemo } from "react";

import { Provider } from "react-redux";
import { store } from "./reducers";
import { Routes } from "./routes";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const App = () => {
  return (
    <Wrapper>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Wrapper>
  );
};

export default App;
