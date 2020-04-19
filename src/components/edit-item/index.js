import React, { useState, useCallback } from "react";
import { Popover } from "@xcritical/popover";
import { CreateItem } from "../create-item-to-list";
import Button from "@xcritical/button";
import { schemas } from "../../schemas";
import { convertStyles } from "../../utils/popover";
import { useSelector, useDispatch } from "react-redux";
import { updateCategory } from "../../actions/requests";

export const EditItem = ({ item, index, listName, selectedCategory }) => {
  const dispatch = useDispatch();
  const { categories = [], categoryData } = useSelector((state) => {
    const { data: categories } = state.categories;
    const { data: categoryData } = state.category;
    return {
      categories,
      categoryData,
    };
  });

  const onEditEnd = useCallback(
    ({ form, listName }) => {
      const newItems = {
        ...categoryData,
        [listName]: [...categoryData[listName]],
      };

      newItems[listName][index] = form;

      updateCategory({ data: newItems, dispatch, url: selectedCategory.url });
    },
    [index, selectedCategory]
  );

  return (
    <Popover
      trigger="click"
      position="bottom left"
      content={
        <CreateItem
          listName={listName}
          item={item}
          onSubmit={onEditEnd}
          fields={schemas[selectedCategory.url]}
        />
      }
    >
      <Button>Edit</Button>
    </Popover>
  );
};
