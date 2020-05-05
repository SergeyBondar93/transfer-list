import React from "react";

import { Droppable, Draggable } from "react-beautiful-dnd";

import { ListWrapper } from "./styled";

export const List = ({ items = [], listName, ListItem, HeaderComponent }) => {
  return (
    <div>
      {HeaderComponent && <HeaderComponent listName={listName} />}
      <Droppable droppableId={listName}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{}}
              id={listName}
              className="list"
            >
              <ListWrapper>
                {items.map((item, index) => {
                  return (
                    <Draggable
                      key={item._guid}
                      draggableId={item._guid}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <ListItem
                            item={item}
                            index={index}
                            provided={provided}
                            snapshot={snapshot}
                            guid={item._guid}
                            listName={listName}
                          />
                        );
                      }}
                    </Draggable>
                  );
                })}
              </ListWrapper>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
