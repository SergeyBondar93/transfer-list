import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import * as colors from "../../theme/colors";

export const LinkListWrapper = styled(Link)`
  padding: 15px;
  text-shadow: ${({ isCurrent }) => isCurrent && "0px 0px 9px red"};
  max-width: 175px;
  cursor: pointer;
  transition: 0.5s;
  text-decoration: none;
  color: black;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 2;
`;

const rotation = keyframes`
  0% {
    transform: rotateZ(0deg);
  } 
  100% {
    transform: rotateZ(360deg);
  }
`;

export const SettingsIconWrapper = styled.div`
  cursor: pointer;
  transition: 1s;
  height: 24px;
  transform-origin: 50% 50%;
  :hover {
    animation: 3s ${rotation} infinite linear;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;
  min-width: 80px;
  :hover {
    outline: 1px solid #ccc;
    background: ${colors.MAIN};
  }
`;
