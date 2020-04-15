import React, { useState, useEffect, useCallback, useMemo } from "react";

import Input from "@xcritical/input";
import Button from "@xcritical/button";

export const CreateItem = ({ onCreate, fields = [], listName }) => {
  const [form, setForm] = useState({});

  const handleChange = useCallback(
    (value, e) => {
      const { name } = e.currentTarget;
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  const disabled = useMemo(() => {
    let result = false;
    fields.forEach(({ required, minLength, name, type = 'string' }) => {
      if (required) {
        if (type === 'string') {
          if ((form[name] || '').length < minLength) result = true
        };
        if (type === 'array') {
          const list = (form[name] || '').join(',').map(el => el.trim());
          if (list.length < minLength) result = true
        }
      }
    }) 
    return result
  }, [form, fields]);

  const handleCreate = useCallback(() => {
    if (!disabled) {
      console.log(form, listName)
    onCreate({form, listName});
    }
  }, [form, disabled, listName]);

  if (!fields.length) {
    console.error('Create Items need fields')
    return null
  }

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '250px',
        border: '1px solid black',
        padding: '50px 0px'
      }}
    >
      {fields.map((field) => {
        return (
          <Input 
            onChange={handleChange}
            name={ field.name } 
            placeholder={field.placeholder} 
            id={field.id} 
          />
        );
      })}
      <Button disabled={disabled} onClick={handleCreate}>
        Create
      </Button>
    </div>
  );
};
