import React, { useCallback } from "react";
import { CreateList } from "../create-list";
import { useSelector, useDispatch } from "react-redux";
import { changeSelectedList } from "../../actions/actions";
import { LinkListWrapper } from "./styled";
import { Link } from "react-router-dom";
import { getList } from "../../actions/requests";

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
        marginLeft: "50px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {state.allLists.map((list) => {
        return (
          <LinkListWrapper
            onClick={() => handleClick(list._id)}
            to={`/list/${list._id}`}
          >
            {" "}
            {list.name}{" "}
          </LinkListWrapper>
        );
      })}

      <CreateList></CreateList>
    </div>
  );
};
