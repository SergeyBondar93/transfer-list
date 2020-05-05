import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgb(231, 220, 245);
  position: fixed;
  width: 100vw;
  height: 100vh;
`


export const Background = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}