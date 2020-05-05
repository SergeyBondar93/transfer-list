import styled, { css } from "styled-components";

export const WrapperCenteredBlock = styled.div`
  display: flex;
  width: ${({ width }) => width || "300px"};
  border: 1px solid black;
  border-radius: 15px;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px;
`;

export const BlockWrapper = styled.div`
  margin: 15px;
  ${({ center }) =>
    center &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;
