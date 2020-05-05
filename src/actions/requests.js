import { notify, Zoom } from "@xcritical/notification";

import {
  getAllListsSuccess,
  getListSuccess,
  registryUpdate,
  getError,
  setUser,
  listCreatedSuccess,
} from "./actions";

export const getAllLists = ({ dispatch }) => {
  dispatch(registryUpdate("loading", true));

  fetch("/list")
    .then((res) => res.json())
    .then((data) => dispatch(getAllListsSuccess(data)))
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));
};

export const getList = ({ dispatch, id }) => {
  dispatch(registryUpdate("loading", true));
  fetch(`/list/${id}`)
    .then((res) => res.json())
    .then((data) => dispatch(getListSuccess(data)))
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));
};

export const updateList = ({ dispatch, data, id, assignedUsers, name }) => {
  dispatch(registryUpdate("loading", true));
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
    .then((data) => {
      console.log("success");
    })
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));

  notify("List updated", {
    type: "success",
    transition: Zoom,
    autoClose: 700,
  });
};

export const createList = ({ dispatch, name, lists }) => {
  dispatch(registryUpdate("loading", true));

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

  dispatch(registryUpdate("loading", false));
};

const getUserSuccess = ({ user, dispatch }) => {
  sessionStorage.setItem("isAuth", "true");
  dispatch(setUser({ ...user.user, isAuth: true }));
  dispatch(getAllListsSuccess(user.lists));
};

export const login = ({ form, dispatch }) => {
  dispatch(registryUpdate("loading", true));

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

  dispatch(registryUpdate("loading", false));
};

export const getAuthUser = ({ dispatch }) => {
  dispatch(registryUpdate("loading", true));

  fetch("/login")
    .then((res) => res.json())
    .then((user) => getUserSuccess({ user, dispatch }))
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));
};

export const getLogout = ({ dispatch }) => {
  dispatch(registryUpdate("loading", true));
  fetch("/logout")
    .then((res) => res.json())
    .then(() => {
      sessionStorage.removeItem("isAuth");
      dispatch(setUser({ isAuth: false }));
    })
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));
};

export const register = ({ form, dispatch }) => {
  dispatch(registryUpdate("loading", true));

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

  dispatch(registryUpdate("loading", false));
};
