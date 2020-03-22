import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledDiv = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 400px;
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
        <h1>BusStops</h1>
        {this.props.busStops.map((stop, i) => {
          return (
            <div onClick={() => this.props.onStopSelected(stop)}>
              <p>{stop.label}</p>
              <p>Lat : {stop.lat}</p>
              <p>Lng : {stop.lng}</p>
            </div>
          )
        })}
      </StyledDiv>
    )
  }
}
