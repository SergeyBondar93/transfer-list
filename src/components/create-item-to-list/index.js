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

  const handleCreate = useCallback(() => {
    onSubmit({ form, listName });
  }, [form, listName]);

  if (!fields.length) {
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
              value={form[field.name] || ""}
              onChange={handleChange}
              name={field.name}
              placeholder={field.placeholder}
              id={field.id}
            />
          </div>
        );
      })}
      <Button onClick={handleCreate}>Submit</Button>
    </div>
  );
};
