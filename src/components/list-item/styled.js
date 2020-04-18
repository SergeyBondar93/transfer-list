import styled from "styled-components";

export const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 5px;
  margin: 3px;
`;
export const Description = styled.div`
  background-color: ${({ priority }) => {
    return priority && `rgba(255, 0, 0, ${priority * 0.2})`;
  }};
`;
