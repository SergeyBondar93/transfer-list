import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  height: 50px;
  width: 100vw;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  padding-right: 20px;
`;

const LinkStyled = styled(Link)`
  padding: 15px;
  margin-right: 20px;
  font-weight: 700;
  text-decoration: none;
  color: #000;
  transition: .5s;
  ${({ active }) => active && css`
    background-color: rgb(151, 90, 231);
  `};
`



export const Header = () => {
  const { pathname } = useLocation();

  const active = useMemo(() => {
    if (pathname.includes("/login")) return '/login'
    if (pathname.includes("/register")) return "/register"
  }, [pathname])

  return (
    <Wrapper>
      <LinkStyled active={active === "/login"}  to="/login">Sign In</LinkStyled>
      <LinkStyled active={active === "/register"}  to="/register">Sign Up</LinkStyled>
    </Wrapper>
  );
};
