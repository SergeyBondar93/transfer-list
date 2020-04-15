import styled from 'styled-components'

export const ListWrapper = styled.div`
  width: 200px;
  height: 400px;
  border: 1px solid black;
`;

export const ItemWrapper = styled.div`
  height: 30px;
  background-color: ${({ odd }) => odd ? 'rgb(217, 243, 174);' : 'white'};
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-basis: 60%;
  flex-grow: 2;
`

export const TransferListWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  user-select: none;
`


export  const SwitcherWrapper = styled.div`
  width: 40px;
  height: 16px;
  border-radius: 4px;
  background-color: lightblue;
`

export const SwitcherItem = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background-color: red;
  position: relative;
  top: 2px;
  transition: 0.2s;
  left: ${({ sortOrder }) => sortOrder === 'ask' ? '2px' : '24px' };
`
export const ItemWrapperAll = styled.div`
  display: flex;
  align-items: center;
`