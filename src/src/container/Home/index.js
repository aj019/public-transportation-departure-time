import React, {Component} from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
const someLatLng = {lat: 55.751244, lng: 37.618423}
class Home extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className='MapsWrapper' style={{margin: 0}}>
        <GoogleMap
          defaultCenter={someLatLng}
          defaultZoom={16}
          options={{disableDefaultUI: true}}
        ></GoogleMap>
      </div>
    )
  }
}

export default withScriptjs(withGoogleMap(Home))
