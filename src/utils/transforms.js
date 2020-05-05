export const transformListsToTransferListComponent = (data) => {
  return data.reduce(
    (acc, { listName, listItems }) => ({
      ...acc,
      [listName]: listItems,
    }),
    {}
  );
};

export const transformListsToServer = (data) => {
  return Object.entries(data).map(([listName, listItems]) => ({
    listName,
    listItems,
  }));
};
