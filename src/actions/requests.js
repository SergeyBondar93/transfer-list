import {
  getCategoriesSuccess,
  getCategorySuccess,
  registryUpdate,
  getError,
} from "./actions";

export const getCategories = ({ dispatch }) => {
  dispatch(registryUpdate("loading", true));

  fetch("/categories")
    .then((res) => res.json())
    .then((data) => dispatch(getCategoriesSuccess(data)))
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));
};

export const getCategory = ({ dispatch, selectedCategory }) => {
  dispatch(registryUpdate("loading", true));
  console.log(selectedCategory);
  fetch(`/${selectedCategory}`)
    .then((res) => res.json())
    .then((data) => dispatch(getCategorySuccess(data)))
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));
};

export const updateCategory = ({ dispatch, data, selectedCategory }) => {
  dispatch(registryUpdate("loading", true));

  fetch(`/${selectedCategory}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => dispatch(getCategorySuccess(data)))
    .catch((e) => getError(e));

  dispatch(registryUpdate("loading", false));
};

export const createCategory = ({ dispatch, name, lists, categories }) => {
  dispatch(registryUpdate("loading", true));

  fetch("/categories", {
    method: "POST",
    body: JSON.stringify([...categories, name]),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
