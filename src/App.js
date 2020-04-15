import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TransferList } from "./transfer-list";
import { ItemWrapperAll, ItemWrapper } from "./transfer-list/styled";

const ListItem = ({ provided, snapshot, item, index, guid, onRemove }) => {
  return (
    <ItemWrapperAll
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      key={guid}
      style={{
        ...provided.draggableProps.style,
      }}
    >
      <ItemWrapper odd={index % 2}>{item.name} { item.author }  </ItemWrapper>
      <button onClick={onRemove} >Remove</button>
    </ItemWrapperAll>
  );
};

const CreateItem = ({ onCreate }) => {
  const [form, setForm] = useState({});

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;

      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  const disabled = useMemo(() => {
    const { name = "", author = "" } = form;
    return name.length < 3 || author.length < 3;
  }, [form]);

  const handleCreate = useCallback(() => {
    if (!disabled) {
      onCreate(form);
    }
  }, [form, disabled]);

  return (
    <div>
      <input name="author" onChange={handleChange} />
      <input name="name" onChange={handleChange} />
      <button onClick={handleCreate} disabled={disabled}>
        Create
      </button>
    </div>
  );
};

function App() {
  const [categoryItems, setCategoryItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryLists, setCategoryLists] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (categories[0]) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setCategoryItems(data);
          setCategoryLists(Object.keys(data));
        })
        .catch((e) => console.error(e));
    }
  }, [selectedCategory]);

  const onDragEnd = useCallback(
    (lists) => {
      fetch(`${selectedCategory}`, {
        method: "POST",
        body: JSON.stringify(lists),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCategoryItems(data)
        })
        .catch((e) => console.log(e));
    },
    [selectedCategory]
  );

  const onCreate = useCallback(
    (newItem) => {
      const list = Object.keys(categoryItems)[0];

      const newItems = {
        ...categoryItems,
        [list]: [...categoryItems[list], newItem],
      };

      fetch(`/${selectedCategory}/`, {
        method: "POST",
        body: JSON.stringify(newItems),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((res) => {
          setCategoryItems(res)
        })
        .catch((e) => console.log(e));
    },
    [categoryItems, selectedCategory]
  );

  const onRemove = useCallback(({ index, listName }) => {
    let newItems = { ...categoryItems };
    newItems = {
      ...newItems,
      [listName]: [...categoryItems[listName].filter((_el, i) => i !== index)]
    };

    fetch(`/${selectedCategory}/`, {
      method: "POST",
      body: JSON.stringify(newItems),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        setCategoryItems(res)
      })
      .catch((e) => console.log(e));

  }, [categoryItems, selectedCategory])


  const ListItem = ({ provided, snapshot, item, index, guid, listName }) => {
    return (
      <ItemWrapperAll
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        key={guid}
        style={{
          ...provided.draggableProps.style,
        }}
      >
        <ItemWrapper odd={index % 2}>{item.name} { item.author }  </ItemWrapper>
        <button onClick={() => onRemove({index, listName})} >Remove</button>
      </ItemWrapperAll>
    );
  };

  if (!selectedCategory || !Object.keys(categoryItems).length) {
    return <p>You havent lists in this category</p>;
  }
  return (
    <div
      style={{
        margin: "150px",
      }}
    >
      <CreateItem onCreate={onCreate} />

      <TransferList
        items={categoryItems}
        lists={categoryLists}
        ListItem={ListItem}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}

export default App;
