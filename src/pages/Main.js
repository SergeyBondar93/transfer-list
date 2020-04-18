import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TransferList } from "../components/transfer-list";

import { CreateItem } from "../components/create-item-to-list";
import { books } from "../schemas";
import { BookItem } from "../components/book-item";
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
      getCategory({ dispatch, selectedCategory });
    }
  }, [selectedCategory]);

  const onDragEnd = useCallback(
    (data) => {
      updateCategory({ data, dispatch, selectedCategory });
    },
    [selectedCategory]
  );

  const onCreate = useCallback(
    ({ form, listName }) => {
      const newItems = {
        ...categoryData,
        [listName]: [...categoryData[listName], form],
      };
      updateCategory({ data: newItems, dispatch, selectedCategory });
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
      updateCategory({ data: newItems, dispatch, selectedCategory });
    },
    [categoryData, selectedCategory]
  );

  const ListItem = (props) => {
    return <BookItem {...props} onRemove={onRemove} />;
  };

  const BookCreateRenderer = ({ listName }) => {
    return (
      <Popover
        trigger="click"
        content={
          <CreateItem listName={listName} onCreate={onCreate} fields={books} />
        }
      >
        <div>
          {upperCase(listName)}
          <Button>+</Button>
        </div>
      </Popover>
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
        ListItem={ListItem}
        onDragEnd={onDragEnd}
        HeaderComponent={BookCreateRenderer}
      />
    </div>
  );
};
