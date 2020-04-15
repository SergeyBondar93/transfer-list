import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TransferList } from "../components/transfer-list";
import { ItemWrapperAll, ItemWrapper } from "../components/transfer-list/styled";
import { CreateItem } from "../components/item-creator";
import { books } from "../schemas";
import { BookItem } from "../components/book-item";
import { BookCreate } from "../components/book-create";
import Button from '@xcritical/button';
import { Popover } from '@xcritical/popover';
import upperCase from "lodash/upperCase";



export const Main = () => {
  const [categoryItems, setCategoryItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryLists, setCategoryLists] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (categories[0]) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setCategoryItems(data);
          setCategoryLists(Object.keys(data));
        })
        .catch((e) => console.error(e));
    }
  }, [selectedCategory]);

  const onDragEnd = useCallback(
    (lists) => {
      fetch(`${selectedCategory}`, {
        method: "POST",
        body: JSON.stringify(lists),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCategoryItems(data)
        })
        .catch((e) => console.log(e));
    },
    [selectedCategory]
  );

  const onCreate = useCallback(
    ({ form, listName }) => {
      console.log(listName)
      const newItems = {
        ...categoryItems,
        [listName]: [...categoryItems[listName], form],
      };

      fetch(`/${selectedCategory}/`, {
        method: "POST",
        body: JSON.stringify(newItems),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((res) => {
          setCategoryItems(res)
        })
        .catch((e) => console.log(e));
    },
    [categoryItems, selectedCategory]
  );

  const onRemove = useCallback(({ index, listName }) => {
    let newItems = { ...categoryItems };
    newItems = {
      ...newItems,
      [listName]: [...categoryItems[listName].filter((_el, i) => i !== index)]
    };

    fetch(`/${selectedCategory}/`, {
      method: "POST",
      body: JSON.stringify(newItems),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        setCategoryItems(res)
      })
      .catch((e) => console.log(e));

  }, [categoryItems, selectedCategory])


  const ListItem = (props) => {
    return (
      <BookItem {...props} onRemove={onRemove}  />
    );
  };

  const BookCreateRenderer = ({ listName }) => {
    return (
    <Popover
      trigger='click'
      content={
        <CreateItem 
          listName={listName}
          onCreate={onCreate}
          fields={books}
        />
      }
    >
      <div>
        { upperCase(listName) } 
        <Button>+</Button>
      </div>
    </Popover>
    )
  }


  if (!selectedCategory || !Object.keys(categoryItems).length) {
    return <p>You havent lists in this category</p>;
  };


  return (
    <div>
      <TransferList
        items={categoryItems}
        lists={categoryLists}
        ListItem={ListItem}
        onDragEnd={onDragEnd}
        HeaderComponent={BookCreateRenderer}
      />
    </div>
  );
}