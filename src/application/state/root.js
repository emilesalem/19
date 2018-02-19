import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import camera, { keyEpic } from '../../scene/camera'
import scene, { collisionEpic } from '../../scene'
import blogosphere, { rollEpic } from '../../scene/blogosphere'

export const rootEpic = combineEpics(
  keyEpic,
  collisionEpic,
  rollEpic
)

export const rootReducer = combineReducers({
  scene,
  camera,
  blogosphere
})
