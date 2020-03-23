import {
  FETCH_NEARBY_BUS_STOPS_SUCCESS,
  FETCH_DEPARTURES_SUCCESS,
  SET_DEPARTURES,
  FETCH_DIRECTIONS_SUCCESS
} from '../constants/strings'
const defaultOrigin = {lat: 51.5073509, lng: 0.1123}
const initialState = {
  markers: [],
  departures: [],
  directions: [],
  origin: defaultOrigin
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEARBY_BUS_STOPS_SUCCESS:
      const {origin, markers} = action.payload
      return Object.assign({}, state, {
        markers: markers,
        departures: [],
        directions: null,
        origin: origin
      })
    case FETCH_DEPARTURES_SUCCESS:
      const {departures} = action.payload
      return Object.assign({}, state, {
        departures: departures,
        markers: action.payload.markers,
        origin: action.payload.origin
      })
    case SET_DEPARTURES:
      return Object.assign({}, state, {departures: []})
    case FETCH_DIRECTIONS_SUCCESS:
      return Object.assign({}, state, {directions: action.payload})
    default:
      return state
  }
}
