import React from "react";

import { Popover } from "@xcritical/popover";
import Button from "@xcritical/button";

import { CreateItem } from "../create-item-to-list";
import { schemas } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../actions/requests";

export const CreateCategory = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  const onCreate = ({ form: { name = "", lists = "" } }) => {
    const $lists = lists.split(",").map((el) => el.trim());
    createCategory({ dispatch, name, lists: $lists, categories });
  };

  return (
    <Popover
      trigger="click"
      content={<CreateItem onCreate={onCreate} fields={schemas["category"]} />}
    >
      <div>
        New Category
        <Button>+</Button>
      </div>
    </Popover>
  );
};
