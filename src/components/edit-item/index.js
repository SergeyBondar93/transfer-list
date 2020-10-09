import React, { useState, useCallback } from "react";
import { Popover } from "@xcritical/popover";
import { CreateItem } from "../create-item-to-list";
import Button from "@xcritical/button";
import { getFileds } from "../../schemas";
import Create from "mdi-react/CreateIcon";

export const EditItem = ({ item, index, listName, list, onUpdateItem }) => {
  return (
    <Popover
      trigger="click"
      position="bottom left"
      content={
        <CreateItem
          listName={listName}
          item={item}
          onSubmit={(params) => onUpdateItem({ ...params, index })}
          fields={getFileds(list.name)}
        />
      }
    >
      <Create size="20px" />
    </Popover>
  );
};
