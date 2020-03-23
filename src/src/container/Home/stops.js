import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Card} from '../../components'
const StyledDiv = styled.div`
  background: white;
  width: 400px;
  box-sizing: border-box;
  height: 80%;
`

const StyledHeader = styled.h1`
  margin: 0px;
  height: 50px;
  border-bottom: 1px solid #333;
  padding-left: 10px;
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`

const StyledListContainer = styled.div`
  height: calc(100% - 50px);
  overflow: scroll;
`

export default class BusStops extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    busStops: PropTypes.array,
    onStopSelected: PropTypes.func
  }

  render() {
    console.log('BusStops', this.props.busStops)
    return (
      <StyledDiv>
        <StyledHeader>
          <h1>Near By Bus Stops</h1>
        </StyledHeader>
        <StyledListContainer>
          {this.props.busStops.map((stop, i) => {
            return (
              <Card key={i} onClick={() => this.props.onStopSelected(stop)}>
                <p>{stop.label}</p>
                <p>Lat : {stop.lat}</p>
                <p>Lng : {stop.lng}</p>
              </Card>
            )
          })}
        </StyledListContainer>
      </StyledDiv>
    )
  }
}
