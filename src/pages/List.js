import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { TransferList } from "../components/transfer-list";

import { CreateItem } from "../components/create-item-to-list";
import { schemas, getFileds } from "../schemas";
import { ListItem } from "../components/list-item";
import Button from "@xcritical/button";
import { Popover } from "@xcritical/popover";
import upperCase from "lodash/upperCase";
import { updateList, getList } from "../actions/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  transformListsToTransferListComponent,
  transformListsToServer,
} from "../utils/transforms";
import { getListSuccess } from "../actions/actions";
import { useLocation, useParams } from "react-router-dom";

export const List = () => {
  const dispatch = useDispatch();
  const sortOrder = useRef(">");
  const queryParams = useParams();

  const list = useSelector((state) => {
    const { list } = state;
    return list;
  });

  useEffect(() => {
    if (queryParams?.id) {
      getList({ dispatch, id: queryParams.id });
    }
  }, []);

  const onDragEnd = useCallback(
    (data) => {
      updateList({
        data: transformListsToServer(data),
        dispatch,
        id: list._id,
      });
    },
    [list]
  );

  const onSubmit = useCallback(
    ({ form, listName }) => {
      const items = transformListsToTransferListComponent(list.data);
      items[listName] = [...items[listName], form];

      updateList({
        data: transformListsToServer(items),
        dispatch,
        id: list._id,
      });
    },
    [list]
  );

  const onMultiInsert = useCallback(
    ({ listName, form: { multy } }) => {
      const data = multy
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((description) => ({ description: description.trim() }));

      const items = transformListsToTransferListComponent(list.data);
      items[listName] = [...items[listName], ...data];

      updateList({
        data: transformListsToServer(items),
        dispatch,
        id: list._id,
      });
    },
    [list]
  );

  const onRemove = useCallback(
    ({ index, listName }) => {
      const items = transformListsToTransferListComponent(list.data);
      items[listName] = items[listName].filter((_el, i) => i !== index);

      updateList({
        data: transformListsToServer(items),
        dispatch,
        id: list._id,
      });
    },
    [list]
  );

  const onUpdateItem = useCallback(
    ({ index, listName, form }) => {
      const items = transformListsToTransferListComponent(list.data);
      items[listName][index] = form;

      updateList({
        data: transformListsToServer(items),
        dispatch,
        id: list._id,
      });
    },
    [list]
  );

  const onSort = useCallback(
    ({ listName, sortBy = "priority" }) => {
      const items = transformListsToTransferListComponent(list.data);
      items[listName] = items[listName].sort(
        ({ description: d1 }, { description: d2 }) => {
          const p1 = (d1.match(/{(!+)}/) || [])[1] || "";
          const p2 = (d2.match(/{(!+)}/) || [])[1] || "";
          if (sortOrder.current === ">")
            return p1?.length > p2?.length ? -1 : 1;
          if (sortOrder.current === "<")
            return p1?.length < p2?.length ? -1 : 1;
        }
      );
      sortOrder.current = sortOrder.current === ">" ? "<" : ">";
      dispatch(getListSuccess({ data: transformListsToServer(items) }));
    },
    [list]
  );

  const ListItemRenderer = (props) => {
    return (
      <ListItem
        {...props}
        onRemove={onRemove}
        onUpdateItem={onUpdateItem}
        list={list}
      />
    );
  };

  const ItemCreateRenderer = ({ listName }) => {
    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <Button onClick={() => onSort({ listName })}>Sort</Button>
        <Popover
          trigger="click"
          position="bottom left"
          content={
            <CreateItem
              listName={listName}
              onSubmit={onSubmit}
              fields={getFileds()}
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
              onSubmit={onMultiInsert}
              fields={schemas["multy"]}
            />
          }
        >
          <div>
            <Button>Multi</Button>
          </div>
        </Popover>
      </div>
    );
  };

  return (
    <>
      {list.data ? (
        <TransferList
          items={transformListsToTransferListComponent(list.data)}
          lists={list.data.map(({ listName }) => listName)}
          ListItem={ListItemRenderer}
          onDragEnd={onDragEnd}
          HeaderComponent={ItemCreateRenderer}
        />
      ) : (
        <p>You havent lists in this list</p>
      )}
    </>
  );
};
