import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import camera, { keyEpic } from '../../scene/camera'
import scene, { collisionEpic } from '../../scene'

export const rootEpic = combineEpics(
  keyEpic,
  collisionEpic
)

export const rootReducer = combineReducers({
  scene,
  camera
})
