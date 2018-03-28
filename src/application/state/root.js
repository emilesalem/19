import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import camera, { keyEpic, cameraEpic } from '../../scene/camera'
import scene, { collisionEpic } from '../../scene'
import blogosphere, { rollEpic } from '../../scene/blogosphere'
import app, { appEpic } from '../../application'
import css3d from '../../scene/css3d'
export const rootEpic = combineEpics(
  keyEpic,
  cameraEpic,
  collisionEpic,
  rollEpic,
  appEpic
)

export const rootReducer = combineReducers({
  app,
  scene,
  camera,
  css3d,
  blogosphere
})
