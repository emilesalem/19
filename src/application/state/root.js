import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import camera, { keyEpic } from '../../scene/camera'

export const rootEpic = combineEpics(
  keyEpic
)

export const rootReducer = combineReducers({
  camera
})
