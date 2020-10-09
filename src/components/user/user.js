import React, { useCallback } from "react";
import styled from "styled-components";
import Button from "@xcritical/button";
import { getLogout } from "../../actions/requests";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import ExitIcon from "mdi-react/ExitToAppIcon";

const Wrapper = styled.div`
  display: flex;
  margin-top: 40px;
  margin-left: 30px;
  margin-right: 30px;
  justify-content: space-between;
  align-items: center;
`;

export const User = () => {
  const dispatch = useDispatch();
  const { email, name, nickname, avatar } = useSelector((state) => state.user);
  const { push } = useHistory();

  const onLogout = useCallback(() => {
    getLogout({ dispatch });
    push("/");
  }, []);

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexShrink: 1,
          flexBasis: "80%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "45px",
            height: "45px",
            flexShrink: 0,
            overflow: "hidden",
            border: "1px solid black",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        >
          {avatar && <img src={avatar} width="45px" height="45px" />}
        </div>
        <p
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {nickname || name || email}dadadasdasdasdasdsadasdasdasda
        </p>
      </div>
      <div
        style={{
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <ExitIcon onClick={onLogout}></ExitIcon>
      </div>
    </Wrapper>
  );
};
