import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducer'
import mySaga from '../saga'
const middleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(middleware))
middleware.run(mySaga)
export default store
