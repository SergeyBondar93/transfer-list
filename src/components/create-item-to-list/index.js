import React, { useState, useEffect, useCallback, useMemo } from "react";

import Input from "@xcritical/input";
import Button from "@xcritical/button";

export const CreateItem = ({ onSubmit, fields = [], listName, item = {} }) => {
  const [form, setForm] = useState(item);

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
    fields.forEach(({ required, minLength, name, type = "string" }) => {
      if (required) {
        if (type === "string") {
          if ((form[name] || "").length < minLength) result = true;
        }
        if (type === "array") {
          const list = (form[name] || "").split(",").map((el) => el.trim());
          if (list.length < minLength) result = true;
        }
      }
    });
    return result;
  }, [form, fields]);

  const handleCreate = useCallback(() => {
    if (!disabled) {
      onSubmit({ form, listName });
    }
  }, [form, disabled, listName]);

  if (!fields.length) {
    console.error("Create Items need fields");
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "400px",
        border: "1px solid black",
        padding: "50px 0px",
      }}
    >
      {fields.map((field) => {
        if (field.type === "textarea") {
          return (
            <div
              style={{
                margin: "15px",
              }}
            >
              <textarea
                onChange={(e) => handleChange(e.target.value, e)}
                name={field.name}
                value={form[field.name]}
                placeholder={field.placeholder}
                id={field.id}
                style={{
                  width: "360px",
                  height: "200px",
                }}
              />
            </div>
          );
        }

        return (
          <div
            style={{
              margin: "15px",
            }}
          >
            <Input
              value={form[field.name]}
              onChange={handleChange}
              name={field.name}
              placeholder={field.placeholder}
              id={field.id}
            />
          </div>
        );
      })}
      <Button disabled={disabled} onClick={handleCreate}>
        Submit
      </Button>
    </div>
  );
};
