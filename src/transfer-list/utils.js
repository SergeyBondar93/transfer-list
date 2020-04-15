import { v1 as uuidv1 } from 'uuid';

export const createState = ({ items, lists, defaultList, fieldByCreateLists }) => {
  const newItems = items.reduce((acc, item) => {
    const currentList = item[fieldByCreateLists];
    const $defaultList = lists[defaultList];

    if (!currentList) {
      return {
        ...acc,
        [$defaultList]: [
          ...(acc[$defaultList] || []),
          item
        ]
      }
    }
    return {
      ...acc,
      [currentList]: [
        ...(acc[currentList] || []),
        item 
      ]
    }
  }, {});
  
  lists.forEach(listName => {
    if (!newItems[listName]) newItems[listName] = []
  })

  return addGuid(newItems)
}

export const addGuid = (items) => {
  return Object.entries(items).reduce((acc, [key, list]) => {
    return {
      ...acc,
      [key]: list.map(el => {
        return {
          ...el,
          _guid: uuidv1()
        }
      })
    }
  }, {})
}

export const removeGuid = items => {
  return Object.entries(items).reduce((acc, [key, list]) => {
    return {
      ...acc,
      [key]: list.map(({ _guid, ...el }) => el)
    }
  }, {})
}