import React from "react";

import Button from '@xcritical/button';
import { WrapperItem, Description } from './styled';


export const BookItem = ({
  provided,
  snapshot,
  index,
  guid,
  listName,
  item,
  onRemove,
}) => {
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
        <p>Name: {item.name}</p>
        <p>Author: {item.author}</p>
      </Description>
      <Button onClick={() => onRemove({ index, listName })} >x</Button>
    </WrapperItem>
  )
};
