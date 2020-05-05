const name = {
  name: "name",
  // required: true,
  minLength: 3,
  placeholder: "name",
};

const link = {
  name: "link",
  // required: true,
  minLength: 3,
  placeholder: "link",
};

const author = {
  name: "author",
  // required: true,
  minLength: 3,
  placeholder: "author",
};

const description = {
  name: "description",
  // required: true,
  type: "textarea",
  minLength: 3,
  placeholder: "Description, to set the priority, use {!!!} (1/2/3)",
};

const lists = {
  name: "lists",
  // required: true,
  minLength: 3,
  placeholder: "Lists",
};
const multy = {
  name: "multy",
  // required: true,
  minLength: 3,
  type: "textarea",
  placeholder:
    "Multy insert, to divide using new line. All items add to field 'description' ",
};

export const schemas = {
  books: [name, link, description],
  articles: [name, link, description],
  films: [name, link, description],
  courses: [name, link, description],
  work: [name, link, description],
  other: [name, link, description],
  list: [name, lists],
  multy: [multy],
};

export const getFileds = () => {
  return [name, link, description];
};
