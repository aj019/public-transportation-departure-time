import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Card} from '../../components'
import {Icon} from '../../constants'

const StyledDiv = styled.div`
  background: white;
  width: 400px;
  box-sizing: border-box;
  height: 80%;
`

const StyledHeader = styled.div`
  margin: 0px;
  height: 50px;
  border-bottom: 1px solid #333;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
  }
`

const StyledListContainer = styled.div`
  height: calc(100% - 50px);
  overflow: scroll;
`

export default class Departures extends Component {
  static propTypes = {
    departures: PropTypes.array,
    onDestinationSelected: PropTypes.func,
    onDepartureCancelled: PropTypes.func
  }

  render() {
    return (
      <StyledDiv>
        <StyledHeader>
          <h1>Departures</h1>
          <button onClick={this.props.onDepartureCancelled}>
            <Icon iconName={'close'} fillColor={'#000'} width='20px' />
          </button>
        </StyledHeader>
        <StyledListContainer style={{height: '100%', overflow: 'scroll'}}>
          {this.props.departures.map((departure, i) => {
            return (
              <Card
                onClick={() => {
                  this.props.onDestinationSelected(departure.id)
                }}
              >
                <p>{departure.direction}</p>
                <p>Departure Time : {departure.best_departure_estimate}</p>
                <p>Operator : {departure.operator}</p>
              </Card>
            )
          })}
        </StyledListContainer>
      </StyledDiv>
    )
  }
}
