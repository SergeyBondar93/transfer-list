import React from "react";

import { Popover } from "@xcritical/popover";
import Button from "@xcritical/button";

import { CreateItem } from "../create-item-to-list";
import { schemas } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { createList } from "../../actions/requests";

export const CreateList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.data);

  const onSubmit = ({ form: { name = "", lists = "" } }) => {
    const $lists = lists.split(",").map((el) => el.trim());
    createList({ dispatch, name, lists: $lists, list });
  };

  return (
    <Popover
      trigger="click"
      content={<CreateItem onSubmit={onSubmit} fields={schemas["list"]} />}
    >
      <div>
        New List
        <Button>+</Button>
      </div>
    </Popover>
  );
};
