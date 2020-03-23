import {
  FETCH_NEARBY_BUS_STOPS_SUCCESS,
  FETCH_DEPARTURES_SUCCESS,
  SET_DEPARTURES,
  FETCH_DIRECTIONS_SUCCESS
} from '../constants/strings'

const initialState = {
  markers: [],
  departures: [],
  directions: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_NEARBY_BUS_STOPS_SUCCESS:
      return Object.assign({}, state, {markers: action.payload, departures: []})
    case FETCH_DEPARTURES_SUCCESS:
      return Object.assign({}, state, {departures: action.payload})
    case SET_DEPARTURES:
      return Object.assign({}, state, {departures: []})
    case FETCH_DIRECTIONS_SUCCESS:
      return Object.assign({}, state, {directions: action.payload})
    default:
      return state
  }
}
