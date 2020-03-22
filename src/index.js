import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Home from './src/container/Home'

const rootId = 'root'
const root = document.getElementById(rootId)
export const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCK8olcHBnrwuIihenuSqP5wNQdmKuJ7VI'

const loadingElement = <div />
const containerElement = <div style={{height: '100vh'}} />
const mapElement = <div style={{height: '100vh'}} />

if (root) {
  ReactDOM.render(
    <div style={{height: '100vh'}}>
      <Home
        loadingElement={loadingElement}
        containerElement={containerElement}
        googleMapURL={googleMapURL}
        mapElement={mapElement}
      />
    </div>,
    root
  )
}
