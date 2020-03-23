import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  cursor: pointer;
  border-bottom: 1px solid #eee;
  padding: 10px;
  &:hover {
    background-color: #eee;
  }

  p {
    margin: 0;
  }
`

export default function Card(props) {
  return <StyledDiv onClick={props.onClick}>{props.children}</StyledDiv>
}
