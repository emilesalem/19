import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import camera, { keyEpic } from '../../scene/camera'
import scene from '../../scene'

export const rootEpic = combineEpics(
  keyEpic
)

export const rootReducer = combineReducers({
  scene,
  camera
})
