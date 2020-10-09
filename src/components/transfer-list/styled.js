import styled from "styled-components";

export const ListWrapper = styled.div`
  height: calc(100vh - 150px);
  /* border: 1px solid #ccc; */
  border-radius: 10px;
  padding: 5px;
  overflow: auto;
  margin-left: 10px;
  margin-right: 10px;
`;

export const ItemWrapper = styled.div`
  height: 30px;
  background-color: ${({ odd }) => (odd ? "rgb(217, 243, 174);" : "white")};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-basis: 60%;
  flex-grow: 2;
`;

export const TransferListWrapper = styled.div`
  > div {
    width: ${({ listsCount }) => `${100 / listsCount}%`};
  }
  padding: 10px;
  display: flex;
  justify-content: space-between;
  user-select: none;
  flex-basis: 100%;
`;
