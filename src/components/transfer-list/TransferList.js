import React, { useState, useEffect } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import { TransferListWrapper } from "./styled";
import { List } from "./List";
import { createState, addGuid, removeGuid } from "./utils";

export const TransferList = ({
  items,
  lists = ["list1", "list2"],
  fieldByCreateLists = "list",
  defaultList = 0,
  needFormat = false,
  ListItem,
  onDragEnd: onDragEndProps,
  HeaderComponent
}) => {
  const [mappedItems, setMappedItems] = useState(
    needFormat
      ? createState({ items, lists, defaultList, fieldByCreateLists })
      : addGuid(items)
  );

  useEffect(() => {
    setMappedItems(
      needFormat
      ? createState({ items, lists, defaultList, fieldByCreateLists })
      : addGuid(items)
    )
  }, [
    needFormat, 
    items,
    lists,
    defaultList,
    fieldByCreateLists
  ])


  const onDragEnd = (res) => {
    if (!res.destination) return;

    const startIndex = res.source.index;
    const endIndex = res.destination.index;
    const lastListName = res.source.droppableId;
    const newListName = res.destination.droppableId;

    let result = { ...mappedItems };
    /* удаление 1 элемента из массива */
    const [removed] = result[lastListName].splice(startIndex, 1);
    /* добавление его в список куда переместили после элемента где отпустили */
    result[newListName].splice(endIndex, 0, removed);
    result[newListName] = [...result[newListName]];
    setMappedItems(result);
    onDragEndProps(removeGuid(result));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TransferListWrapper>
        {lists.map((listName) => {
          return (
            <List
              key={listName}
              setItems={setMappedItems}
              listName={listName}
              items={mappedItems[listName]}
              ListItem={ListItem}
              HeaderComponent={HeaderComponent}
            />
          );
        })}
      </TransferListWrapper>
    </DragDropContext>
  );
};
