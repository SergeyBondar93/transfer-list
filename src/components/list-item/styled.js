import styled, { css } from "styled-components";

export const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  /* border: 1px solid rgba(0, 0, 0, 0.5); */
  /* padding: 12px; */
  margin-top: 8px;
  overflow: hidden;
  position: relative;
  transition: 0.5s;
  min-height: ${({ editing }) => {
    if (editing) return "500px";
    return "50px";
  }};
  ${({ priority }) => {
    if (priority) {
      return css`
        background: rgba(255, 0, 0, ${priority * 0.2});
        :hover {
          background: rgba(255, 0, 0, ${priority * 0.2 + 0.2});
        }
      `;
    }
    return css`
      background: rgba(255, 255, 255, 0.65);
      :hover {
        background: rgba(255, 255, 255, 0.8);
      }
    `;
  }};
`;
