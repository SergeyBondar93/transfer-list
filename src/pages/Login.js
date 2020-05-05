import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@xcritical/input";
import Button from "@xcritical/button";
import { login } from "../actions/requests";
import {
  WrapperCenteredBlock,
  BlockWrapper,
} from "../components/form-elements";
import { useHistory } from "react-router-dom";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});

  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user._id) {
      history.push("/list");
    }
  }, [user]);

  const handleChangeForm = (value, e) => {
    const name = e.currentTarget.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      if (form.email && form.password) {
        login({ form, dispatch });
      }
    },
    [form, dispatch]
  );

  // useEffect(() => {
  //   login({
  //     form: {
  //       email: "a@a.ru",
  //       password: "1",
  //     },
  //     dispatch,
  //   });
  // }, []);

  return (
    <WrapperCenteredBlock width="300px">
      <form onSubmit={handleClick}>
        <BlockWrapper center>
          <h3>Login</h3>
        </BlockWrapper>
        <BlockWrapper>
          <Input
            onChange={handleChangeForm}
            placeholder="email"
            name="email"
            type="email"
            shouldFitContainer
          />
        </BlockWrapper>
        <BlockWrapper>
          <Input
            onChange={handleChangeForm}
            placeholder="password"
            name="password"
            type="password"
            shouldFitContainer
          />
        </BlockWrapper>
        <BlockWrapper center>
          <Button
            disabled={!form.email || !form.password}
            onClick={handleClick}
          >
            Login
          </Button>
        </BlockWrapper>
      </form>
    </WrapperCenteredBlock>
  );
};
