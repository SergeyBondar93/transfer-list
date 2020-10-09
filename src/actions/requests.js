import { notify, Zoom } from "@xcritical/notification";

import {
  getAllListsSuccess,
  getListSuccess,
  registryUpdate,
  getError,
  setUser,
  listCreatedSuccess,
  appInit,
} from "./actions";
import { LOGOUT } from "./consts";

export const getAllLists = ({ dispatch }) => {
  fetch("/list")
    .then((res) => res.json())
    .then((data) => dispatch(getAllListsSuccess(data)))
    .catch((e) => getError(e));
};

export const getList = ({ dispatch, id }) => {
  fetch(`/list/${id}`)
    .then((res) => res.json())
    .then((data) => dispatch(getListSuccess(data)))
    .catch((e) => getError(e));
};

export const updateList = ({ dispatch, data, id, assignedUsers, name }) => {
  const requestData = {};
  /* TODO в случае ошибки вернуть прошлое состояние  */
  if (data) {
    requestData.data = data;
    dispatch(getListSuccess({ data }));
  }
  if (name) requestData.name = name;
  if (assignedUsers) requestData.assignedUsers = assignedUsers;

  fetch(`/list/${id}`, {
    method: "POST",
    body: JSON.stringify(requestData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(() => {
      console.log("success");
    })
    .catch((e) => getError(e));

  // notify("List updated", {
  //   type: "success",
  //   transition: Zoom,
  //   autoClose: 700,
  // });
};

export const createList = ({ dispatch, name, lists }) => {
  const data = lists.map((listName) => ({
    listName,
    listItems: [],
  }));

  fetch("/list", {
    method: "POST",
    body: JSON.stringify({ name, data }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(listCreatedSuccess(data));
    });
};

const getUserSuccess = ({ user, dispatch }) => {
  sessionStorage.setItem("isAuth", "true");
  dispatch(setUser({ ...user.user, isAuth: true }));
  dispatch(getAllListsSuccess(user.lists));
};

export const login = ({ form, dispatch }) => {
  fetch("/login", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((user) => getUserSuccess({ user, dispatch }))
    .catch((e) => getError(e));
};

export const getAuthUser = ({ dispatch }) => {
  fetch("/login")
    .then((res) => res.json())
    .then((user) => {
      getUserSuccess({ user, dispatch });
      dispatch(appInit());
    })
    .catch((e) => getError(e));
};

export const getLogout = ({ dispatch }) => {
  dispatch({
    type: LOGOUT,
  });

  fetch("/logout")
    .then((res) => res.json())
    .then(() => {
      sessionStorage.removeItem("isAuth");
    })
    .catch((e) => getError(e));
};

export const register = ({ form, dispatch }) => {
  fetch("/reg", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((user) => getUserSuccess({ user, dispatch }))
    .catch((e) => getError(e));
};
