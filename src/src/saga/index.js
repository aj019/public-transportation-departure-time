/*global google*/
import {takeLatest, call, put} from 'redux-saga/effects'
import axios from 'axios'
import {
  BASE_URL,
  FETCH_NEARBY_BUS_STOPS,
  FETCH_NEARBY_BUS_STOPS_SUCCESS,
  FETCH_NEARBY_BUS_STOPS_FAIL,
  FETCH_DEPARTURES,
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_FAIL,
  FETCH_DIRECTIONS,
  FETCH_DIRECTIONS_SUCCESS
} from '../constants/strings'

function fetchBusStopsApiCall(origin) {
  return axios.get(
    `${BASE_URL}/places.json?type=bus_stop&lat=${origin.lat}&lon=${origin.lng}&app_key=c96bd60a6078bb1f13227063d1529bed&app_id=0fade918`
  )
}

function* fetchBusStops(action) {
  try {
    const result = yield call(fetchBusStopsApiCall, action.payload)

    if (result.status === 200) {
      let markers = []
      var stops = result.data.member
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

      console.log('Saga successs')
      yield put({type: FETCH_NEARBY_BUS_STOPS_SUCCESS, payload: markers})
    }
  } catch (e) {
    console.log('Saga fail')
    yield put({type: FETCH_NEARBY_BUS_STOPS_FAIL})
  }
}

function* fetchDepartures(action) {
  const marker = action.payload
  try {
    const result = yield axios.get(
      `${BASE_URL}/bus/stop/${marker.data}/live.json?app_key=c96bd60a6078bb1f13227063d1529bed&app_id=0fade918&limit=20&nextbuses=no&group=no`
    )
    if (result.status === 200) {
      const departures = result.data.departures.all
      yield put({type: FETCH_DEPARTURES_SUCCESS, payload: departures})
    }
  } catch (e) {
    yield put({type: FETCH_DEPARTURES_FAIL})
  }
}

function* fetchDirections(action) {
  const {directionService, origin, urlForRoute} = action.payload
  try {
    const result = yield axios.get(urlForRoute)

    if (result.status === 200) {
      const stops = result.data.stops
      const lastStop = stops[stops.length - 1]
      const destination = {lat: lastStop.latitude, lng: lastStop.longitude}
      const directions = yield new Promise(resolve => {
        directionService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.TRANSIT,
            transitOptions: {
              modes: [google.maps.TransitMode.BUS],
              routingPreference:
                google.maps.TransitRoutePreference.FEWER_TRANSFERS
            }
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              resolve(result)
            } else {
              resolve([])
            }
          }
        )
      })

      yield put({
        type: FETCH_DIRECTIONS_SUCCESS,
        payload: directions
      })
    }
  } catch (e) {
    console.log(e)
  }
}

function* mySaga() {
  yield takeLatest(FETCH_NEARBY_BUS_STOPS, fetchBusStops)
  yield takeLatest(FETCH_DEPARTURES, fetchDepartures)
  yield takeLatest(FETCH_DIRECTIONS, fetchDirections)
}

export default mySaga
