import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkListWrapper = styled(Link)`
  padding: 15px;
  border: 1px solid #ccc;
  text-shadow: ${({ isCurrent }) => isCurrent && "0px 0px 9px red"};
  max-width: 150px;
  cursor: pointer;
  transition: 0.5s;
`;
