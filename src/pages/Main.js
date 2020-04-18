import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TransferList } from "../components/transfer-list";

import { CreateItem } from "../components/create-item-to-list";
import { schemas } from "../schemas";
import { ListItem } from "../components/list-item";
import Button from "@xcritical/button";
import { Popover } from "@xcritical/popover";
import upperCase from "lodash/upperCase";
import {
  getCategories,
  getCategory,
  updateCategory,
} from "../actions/requests";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedCategory } from "../actions/actions";

export const Main = () => {
  const dispatch = useDispatch();
  const { selectedCategory = "", categories = [], categoryData } = useSelector(
    (state) => {
      const { selectedCategory, data: categories } = state.categories;
      const { data: categoryData } = state.category;
      return {
        selectedCategory,
        categories,
        categoryData,
      };
    }
  );

  useEffect(() => {
    getCategories({ dispatch });
  }, []);

  useEffect(() => {
    if (categories[0]) {
      dispatch(changeSelectedCategory(categories[0]));
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      getCategory({ dispatch, url: selectedCategory.url });
    }
  }, [selectedCategory]);

  const onDragEnd = useCallback(
    (data) => {
      updateCategory({ data, dispatch, url: selectedCategory.url });
    },
    [selectedCategory]
  );

  const onCreate = useCallback(
    ({ form, listName }) => {
      const newItems = {
        ...categoryData,
        [listName]: [...categoryData[listName], form],
      };
      updateCategory({ data: newItems, dispatch, url: selectedCategory.url });
    },
    [categoryData, selectedCategory]
  );

  const onMultiInsert = useCallback(
    ({ listName, form: { multy } }) => {
      if (!multy) return;
      const data = multy
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((description) => ({ description: description.trim() }));

      const newItems = {
        ...categoryData,
        [listName]: [...categoryData[listName], ...data],
      };
      updateCategory({ data: newItems, dispatch, url: selectedCategory.url });
    },
    [categoryData, selectedCategory]
  );

  const onRemove = useCallback(
    ({ index, listName }) => {
      let newItems = { ...categoryData };
      newItems = {
        ...newItems,
        [listName]: [...categoryData[listName].filter((_el, i) => i !== index)],
      };
      updateCategory({ data: newItems, dispatch, url: selectedCategory.url });
    },
    [categoryData, selectedCategory]
  );

  const ListItemRenderer = (props) => {
    return <ListItem {...props} onRemove={onRemove} />;
  };

  const ItemCreateRenderer = ({ listName }) => {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <Popover
          trigger="click"
          position="bottom left"
          content={
            <CreateItem
              listName={listName}
              onCreate={onCreate}
              fields={schemas[selectedCategory.url]}
            />
          }
        >
          <div>
            {upperCase(listName)}
            <Button>+</Button>
          </div>
        </Popover>
        <Popover
          trigger="click"
          position="bottom left"
          content={
            <CreateItem
              listName={listName}
              onCreate={onMultiInsert}
              fields={schemas["multy"]}
            />
          }
        >
          <div>
            <Button>Multi insert</Button>
          </div>
        </Popover>
      </div>
    );
  };

  if (!selectedCategory || !Object.keys(categoryData).length) {
    return <p>You havent lists in this category</p>;
  }

  return (
    <div>
      <TransferList
        items={categoryData}
        lists={Object.keys(categoryData)}
        ListItem={ListItemRenderer}
        onDragEnd={onDragEnd}
        HeaderComponent={ItemCreateRenderer}
      />
    </div>
  );
};
