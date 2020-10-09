import React, { useMemo, useState, useCallback } from "react";

import Button from "@xcritical/button";
import { WrapperItem, Description } from "./styled";
import { EditItem } from "../edit-item";

import Create from "mdi-react/CreateIcon";
import RemoveIcon from "mdi-react/CloseCircleIcon";
import CheckCircleIcon from "mdi-react/CheckCircleIcon";
import CloseCircleOutlineIcon from "mdi-react/CloseCircleOutlineIcon";

export const ListItem = ({
  provided,
  snapshot,
  index,
  guid,
  listName,
  item,
  onRemove,
  list,
  onUpdateItem,
}) => {
  const [editing, setEditing] = useState(false);

  const $item = Object.entries(item).filter(([key]) => {
    return !key.startsWith("_");
  });

  const priority = useMemo(() => {
    if (!item.description) return 0;
    const matches = (item.description.match(/{(!+)}/) || [])[1];
    return matches?.length;
  }, [item]);

  const cancelEditing = useCallback(() => {
    setEditing(false);
  }, []);

  const successEditing = useCallback(() => {
    /* TODO implement */
  }, []);

  return (
    <WrapperItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      key={guid}
      priority={priority}
      editing={editing}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      <div
        style={{
          padding: "10px",
        }}
      >
        {$item.map(([name, value]) => {
          return (
            <p>
              {name} : {"  "} {value}
            </p>
          );
        })}
      </div>
      <div
        style={{
          flexBasis: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "4px",
        }}
      >
        <RemoveIcon
          size="20"
          style={{
            cursor: "pointer",
            // top: "-10px",
            // right: "-10px",
            // position: "relative",
          }}
          onClick={() => onRemove({ index, listName })}
        />
        {!editing ? (
          <Create
            size="20"
            // onUpdateItem={onUpdateItem}
            // item={item}
            // list={list}
            // index={index}
            // listName={listName}
            onClick={() => setEditing(true)}
            style={{
              cursor: "pointer",
              // bottom: "-10px",
              // right: "-10px",
              // position: "relative",
            }}
          />
        ) : (
          <div>
            <CheckCircleIcon
              onClick={successEditing}
              style={{
                cursor: "pointer",
              }}
            />
            <CloseCircleOutlineIcon
              onClick={cancelEditing}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        )}
      </div>
    </WrapperItem>
  );
};
