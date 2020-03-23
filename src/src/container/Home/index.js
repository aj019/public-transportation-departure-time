/*global google*/
import React, {Component} from 'react'
import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'

import axios from 'axios'
import Departures from './departures'
import BusStops from './stops'
import Search from './search'
import styled from 'styled-components'
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

const baseUrl = 'http://transportapi.com/v3/uk'

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
      origin: {lat: 51.5073509, lng: 0.1123},
      departures: [],
      // destination: {{lat: 41.8525800, lng: -87.6514100}},
      directions: null,
      directionService: new window.google.maps.DirectionsService(),
      markers: [],
      station: 'no bus stop selected',
      getDepartures: false,
      zoom: 15,
      address: ''
    }
  }

  getDepartures = async marker => {
    console.log('marker: ', marker)
    try {
      const result = await axios.get(
        `${baseUrl}/bus/stop/${marker.data}/live.json?app_key=c96bd60a6078bb1f13227063d1529bed&app_id=0fade918&limit=20&nextbuses=no&group=no`
      )
      if (result.status === 200) {
        this.setState({
          departures: result.data.departures.all
        })
      }
    } catch (e) {}
  }

  getBusStops = async () => {
    try {
      const {origin} = this.state
      const result = await axios.get(
        `${baseUrl}/places.json?type=bus_stop&lat=${origin.lat}&lon=${origin.lng}&app_key=c96bd60a6078bb1f13227063d1529bed&app_id=0fade918`
      )

      if (result.status === 200) {
        let markers = []
        var stops = result.data.member
        console.log('Stps', stops)
        for (var i = 0; i < stops.length; i++) {
          var location = {
            lat: stops[i].latitude,
            lng: stops[i].longitude
          }
          var marker = new google.maps.Marker({
            position: location,
            title: stops[i].name,
            label: stops[i].name,
            data: stops[i].atcocode,
            selected: false,
            lat: stops[i].latitude,
            lng: stops[i].longitude,
            animation: 2
          })
          markers.push(marker)
        }
        this.setState({
          markers: markers
        })
      }

      //   if(result.dat)
    } catch (e) {}
  }

  onDepartureCancelled = () => {
    this.setState({
      departures: []
    })
  }

  onDestinationSelected = async urlForRoute => {
    try {
      const result = await axios.get(urlForRoute)
      console.log(result)
      if (result.status === 200) {
        const stops = result.data.stops
        const lastStop = stops[stops.length - 1]
        const destination = {lat: lastStop.latitude, lng: lastStop.longitude}
        this.state.directionService.route(
          {
            origin: this.state.origin,
            destination: destination,
            travelMode: google.maps.TravelMode.TRANSIT,
            transitOptions: {
              modes: [google.maps.TransitMode.BUS],
              routingPreference:
                google.maps.TransitRoutePreference.FEWER_TRANSFERS
            }
          },
          (result, status) => {
            console.log('res sta', result, status)
            if (status === google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result
              })
            } else {
              console.error(`error fetching directions ${result}`)
              alert('There are no buses running on this route.')
            }
          }
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  handleSelect = async address => {
    console.log('Address', address)
    const results = await geocodeByAddress(address)
    const latLang = await getLatLng(results[0])
    this.setState(
      {
        origin: latLang,
        address: address,
        departures: []
      },
      () => {
        this.getBusStops()
      }
    )
  }

  onInputChange = data => {
    this.setState({
      address: data
    })
  }

  componentDidMount() {
    this.getBusStops()
  }

  render() {
    return (
      <div
        className='MapsWrapper'
        style={{margin: 0, position: 'absolute', top: 0}}
      >
        <GoogleMap
          center={this.state.origin}
          defaultZoom={16}
          options={{disableDefaultUI: true}}
        >
          {this.state.directions ? (
            <DirectionsRenderer directions={this.state.directions} />
          ) : null}
          {this.state.markers.map((marker, index) => (
            <Marker
              onClick={() => this.getDepartures(marker)}
              position={marker.position}
              key={index}
            />
          ))}
        </GoogleMap>
        <StyledDiv>
          <Search
            onInputChange={this.onInputChange}
            handleSelect={this.handleSelect}
            address={this.state.address}
          />

          {this.state.markers.length > 0 &&
            this.state.departures.length === 0 && (
              <BusStops
                busStops={this.state.markers}
                onStopSelected={this.getDepartures}
              />
            )}
          {this.state.departures.length > 0 && (
            <Departures
              departures={this.state.departures}
              onDepartureCancelled={this.onDepartureCancelled}
              onDestinationSelected={this.onDestinationSelected}
            />
          )}
        </StyledDiv>
      </div>
    )
  }
}

export default withScriptjs(withGoogleMap(Home))
