import React, { useCallback } from "react";
import { CreateList } from "../create-list";
import { useSelector, useDispatch } from "react-redux";
import { changeSelectedList } from "../../actions/actions";
import { LinkListWrapper, SettingsIconWrapper, Wrapper } from "./styled";
import { Link } from "react-router-dom";
import { getList } from "../../actions/requests";

import SettingsIcon from "mdi-react/SettingsIcon";

export const Navigation = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClick = useCallback((id) => {
    getList({ dispatch, id });
  }, []);

  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: "30px",
        marginRight: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {state.allLists.map((list) => {
        return (
          <Wrapper>
            <LinkListWrapper
              onClick={() => handleClick(list._id)}
              to={`/list/${list._id}`}
            >
              {" "}
              {list.name}{" "}
            </LinkListWrapper>

            <SettingsIconWrapper>
              <SettingsIcon />
            </SettingsIconWrapper>
          </Wrapper>
        );
      })}
      <div
        style={{
          marginBottom: "50px",
        }}
      />

      <CreateList></CreateList>
    </div>
  );
};
