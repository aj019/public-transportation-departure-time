import React, {Component} from 'react'
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'

import {connect} from 'react-redux'

import Departures from './departures'
import BusStops from './stops'
import Search from './search'
import styled from 'styled-components'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import {
  FETCH_NEARBY_BUS_STOPS,
  FETCH_DEPARTURES,
  SET_DEPARTURES,
  FETCH_DIRECTIONS
} from '../../constants/strings'
const defaultOrigin = {lat: 51.5073509, lng: 0.1123}

const StyledDiv = styled.div`
  position: absolute;
  background: white;
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`
class Home extends Component {
  constructor() {
    super()
    this.state = {
      directionService: new window.google.maps.DirectionsService(),
      zoom: 15,
      address: ''
    }
  }

  onDepartureCancelled = () => {
    this.props.getNearbyBusStops(defaultOrigin)
  }

  onDestinationSelected = async urlForRoute => {
    this.props.getDirections({
      origin: this.props.origin,
      urlForRoute: urlForRoute,
      directionService: this.state.directionService
    })
  }

  handleSelect = async address => {
    const results = await geocodeByAddress(address)
    const latLang = await getLatLng(results[0])
    this.setState(
      {
        address: address
      },
      () => {
        this.props.getNearbyBusStops(latLang)
      }
    )
  }

  onInputChange = data => {
    this.setState({
      address: data
    })
  }

  componentDidMount() {
    this.props.getNearbyBusStops(this.props.origin)
  }

  render() {
    const {markers, getDepartures, departures, directions} = this.props
    console.log('directions', this.props.directions)
    return (
      <div
        className='MapsWrapper'
        style={{margin: 0, position: 'absolute', top: 0}}
      >
        <GoogleMap
          center={this.props.origin}
          defaultZoom={16}
          options={{disableDefaultUI: true}}
        >
          {directions ? <DirectionsRenderer directions={directions} /> : null}
          {markers.map((marker, index) => (
            <Marker
              title={marker.title}
              onClick={() => getDepartures(marker)}
              position={marker.position}
              key={index}
              animation={marker.animation}
            />
          ))}
        </GoogleMap>
        <StyledDiv>
          <Search
            onInputChange={this.onInputChange}
            handleSelect={this.handleSelect}
            address={this.state.address}
          />

          {markers.length > 0 && departures.length === 0 && (
            <BusStops busStops={markers} onStopSelected={getDepartures} />
          )}
          {departures.length > 0 && (
            <Departures
              departures={departures}
              onDepartureCancelled={this.onDepartureCancelled}
              onDestinationSelected={this.onDestinationSelected}
            />
          )}
        </StyledDiv>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {markers, departures, directions, origin} = state
  return {
    markers: markers,
    departures: departures,
    directions: directions,
    origin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNearbyBusStops: data =>
      dispatch({type: FETCH_NEARBY_BUS_STOPS, payload: data}),
    getDepartures: data => dispatch({type: FETCH_DEPARTURES, payload: data}),
    setDepartures: data => dispatch({type: SET_DEPARTURES, payload: data}),
    getDirections: data => dispatch({type: FETCH_DIRECTIONS, payload: data})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withScriptjs(withGoogleMap(Home)))
