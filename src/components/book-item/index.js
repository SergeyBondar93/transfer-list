import React from "react";

import Button from "@xcritical/button";
import { WrapperItem, Description } from "./styled";

export const BookItem = ({
  provided,
  snapshot,
  index,
  guid,
  listName,
  item,
  onRemove,
}) => {
  const $item = Object.entries(item).filter(([key]) => {
    return !key.startsWith("_");
  });

  return (
    <WrapperItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      key={guid}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      <Description>
        {$item.map(([name, value]) => {
          return (
            <p>
              {name} : {"  "} {value}
            </p>
          );
        })}
      </Description>
      <Button onClick={() => onRemove({ index, listName })}>x</Button>
    </WrapperItem>
  );
};
