import React from 'react'
import styled, {keyframes} from 'styled-components';

export default function Tooltip({children, message}) {
  return (
    <Container>
        {children}
        <Content className="tooltip">{message}</Content>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  
  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }
  
`;

const Content = styled.div`
  display: none;
  position: absolute;
  z-index: 200;
`;

const tooltip = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1;}
`;
