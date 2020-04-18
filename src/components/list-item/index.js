import React, { useMemo } from "react";

import Button from "@xcritical/button";
import { WrapperItem, Description } from "./styled";

export const ListItem = ({
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

  const priority = useMemo(() => {
    if (!item.description) return 0;
    const matches = (item.description.match(/{(!+)}/) || [])[1];
    return matches?.length;
  }, [item]);

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
      <Description priority={priority}>
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
