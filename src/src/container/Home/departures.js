import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import cross from '../../images/close.svg'

const StyledDiv = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 400px;
`

export default class Departures extends Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    departures: PropTypes.array,
    onDestinationSelected: PropTypes.func
  }

  render() {
    return (
      <StyledDiv>
        <h1>Departures</h1>
        <button>
          <img src={cross} onClick={() => {}} />
        </button>
        <div style={{height: '100%', overflow: 'scroll'}}>
          {this.props.departures.map((departure, i) => {
            return (
              <div
                style={{backgroundColor: '#333'}}
                onClick={() => {
                  this.props.onDestinationSelected(departure.id)
                }}
              >
                <p>{departure.direction}</p>
                <p>Departure Time : {departure.best_departure_estimate}</p>
                <p>Operator : {departure.operator}</p>
              </div>
            )
          })}
        </div>
      </StyledDiv>
    )
  }
}
